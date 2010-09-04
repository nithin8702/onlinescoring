<?php
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

if (!isset($_GET['label']) || empty($_GET['label']))
    ajax_error('Please specify a subject label.');

$subjectLabel=trim(strtoupper($_GET['label']));

function getSubjectDataAsXml($subjectLabel)
{
    if (empty($subjectLabel))
        throw new Exception("Empty subject label.");
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    //Retrieve the form data
    $result=$db->getSubjectData($subjectLabel);

    //Retrieve and decode the final data
    $finaldata=$db->getSubjectFinalData($subjectLabel);

    $skipped=0;
    $xmlerrors=0;
    $count=0;

    //Register a new error handler to handle libxml specific errors
    $originalHandler=set_error_handler("libxml_error_handler");

    //Create an XML document to store all the data (properly)
    $xmldoc=new DomDocument();
    $xmldoc->loadXML('<result subject="'.$subjectLabel.'"/>');

    //Create an XML document to store the final form data. This will be appended
    //to $xmldoc.
    $xmlFinal=$xmldoc->createDocumentFragment();
    //Strip the <?xml .. tag
    $finalxmldata=str_replace('<?xml version="1.0"?>','',$finaldata['data']);

    $xmlFinal->appendXML($finalxmldata);

    $nodeFinal=$xmldoc->createElement('final');
    $nodeFinal->appendChild($xmlFinal);

    //Insert the <final> element into the main XML document.
    $xmldoc->documentElement->appendChild($nodeFinal);

    /* Loop through all the sessions and append the data */

    $lastSessionId=null;
    $xmlSession=null;

    //Get all the elements to construct a valid XML file
    foreach ($result as $row)
    {
        //Element doesn't conform to our schema arch? skip it.
        if (empty($row['schemaName']))
        {
            $skipped++;
            continue;
        }

        $sessionId=$row['fkSessionID'];
        $schema=$row['schemaName'];
        $sessionLabel=$row['label'];
        $dateSessionCreated=$row['datetimeCreated'];
        $subjectLabel=$row['subjectLabel'];
        $owner=$row['username'];
        $formId=$row['formID'];

        //Test data integrity
        try
        {
            $xmlForm=new DomDocument();

            if (!$xmlForm->loadXML($row['data']))
                throw new Exception("Invalid XML data: Session ".$sessionLabel);

            //Insert metadata as attributes of the <form> element
            $xmlForm->documentElement->setAttribute('id',$formId);
            $xmlForm->documentElement->setAttribute('schema',$schema);
        }
        catch (Exception $e)
        {
            //Keep track of errors
            $xmlerrors++;
            $skipped++;
            continue;
        }

        //Should we start a new session?
        if ($lastSessionId!=$sessionId)
        {
            $count++;
            //Create a <session id='foo'/> element and append it to the document
            $nodeSession=$xmldoc->createElement('session');
            $nodeSession->setAttribute('id', $sessionLabel);
            $nodeSession->setAttribute('owner',$owner);
            $nodeSession->setAttribute('date',$dateSessionCreated);

            //Insert the <session> element into the xml document
            $xmlSession=$xmldoc->documentElement->appendChild($nodeSession);
        }

        //Copy the data document as a child element of the sesssion
        $datanode=$xmldoc->importNode($xmlForm->documentElement,true);
        $nodeSession->appendChild($datanode);

        $lastSessionId=$sessionId;
    }

    //xmldoc contains the result organized as a list of sessions with form data
    $xmldoc->documentElement->setAttribute('total',$count);

    //Restore the original error handler
    set_error_handler($originalHandler);

    //print $xmldoc->saveXML();
    return $xmldoc;
}

function applyXSLtoXML(DomDocument $xmldoc, $xsltemplate)
{
    $xsldata=null;
    //Now we should load the XSL stylesheet
    if (function_exists('apc_fetch'))
        $xsldata=apc_fetch($xsltemplate);

    //Cache miss?
    if (empty($xsldata))
    {
        $xsldata=file_get_contents($xsltemplate);
        if (empty($xsldata))
            throw new Exception("Could not find subject data stylesheet.");

        //Can we cache the xsl data?
        if (function_exists('apc_store'))
            apc_store($xsltemplate,$xsldata);
    }

    //Restore the original error handler
    $originalHandler=set_error_handler('libxml_xslt_error_handler');

    //Create an XML representation of the XSL data
    $xsldom=new DomDocument();
    $xsldom->loadXML($xsldata);

    //Create an XSLT Processor instance and load the XSL into it
    $xslt=new XSLTProcessor();
    $xslt->importStylesheet($xsldom);

    //Transform the document
    $result=$xslt->transformToXml($xmldoc);

    //Restore the original error handler
    set_error_handler($originalHandler);

    return $result;
}

/** Compares the columns of repeating <row> elements.
 * Appends @diff=1 if the columns have different values, otherwise @diff=0
 * @param DomNode $rowcollection
 * @return boolean
 */
function diffRows(DomNode &$rowcollection)
{
    $result=false;
    $row=$rowcollection->firstChild;

    //Loop through all the rows
    while ($row)
    {
        //Compare all the columns
        $r=diffColumns($row->getElementsByTagName('cell'));
        $row->appendChild(new DOMAttr('diff', $r));
        if ($r==true)
            $result=true;

        $row=$row->nextSibling;
    }

    return $result;
}

/* Diffs columns in a row by comparing the first column with all the others.
 * The comparison is case-insensitive.
 * 0 means they're all the same
 * 1 means they're different
 * 2 means they're the same but empty
 */
function diffColumns(DOMNodeList $cells)
{
    if (!$cells->length)
        return 0;

    $lastValue=null;
    
    foreach ($cells as $cell)
    {
        $value=strtolower($cell->nodeValue);

        //Obtain the first value
        if ($lastValue===null)
        {
            $lastValue=$value;
            continue;
        }

        //Compare subsequent values with the first value.
        //If at least 1 is different, then return 1
        if ($value!==$lastValue)
            return 1;
    }

    //If we went through all the columns, and they all have the same
    //value then we can say that all the column values
    //are equal.
    //But if, they're empty, return 2
    if (!strlen($lastValue))
        return 2;

    return 0;
}

function libxml_error_handler($errno,$errstr,$errfile,$errline)
{
    //Ignore malformed xml for now.
    //print "$errstr at $errfile:$errline\n";
//    die;
}

function libxml_xslt_error_handler($errno,$errstr,$errfile,$errline)
{
    print "$errstr at $errfile:$errline\n";
}