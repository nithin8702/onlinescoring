<?php
/* subjectdata.php tabsize=4
 *
 * Utility functions for fetching and manipulating subject data XML:
 *      getSubjectDataAsXml() - returns a DomDocument containing the subject's data
 *      applyXSLtoXML()       - transforms the XML using an XSL stylesheet.
 *      diffRows()            - loops over a collection of <row> elements and appends
 *                              an attribute called 'diff' if the columns have different
 *                              values (@diff=1), otherwise, @diff=0.
 *      diffColumns()         - loops over a collection of <column> elements and
 *                              returns 0 if all values are the same,
 *                                      1 if the values are different
 *                                  and 2 if the values are the same but empty
 * 
 * @author  Victor Petrov <victor_petrov@harvard.edu>
 * @date    July 20, 2010
 * @copyright (c) 2010 The Presidents and Fellows of Harvard College
 * @copyright (c) 2010 The Neuroinformatics Research Group at Harvard University
 * @license   GPLv3 <http://www.gnu.org/licenses/gpl-3.0.txt>
 * -----------------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * -----------------------------------------------------------------------------
 */
function getSubjectDataAsXml($subjectLabel, Database $db)
{
    if (empty($subjectLabel))
        throw new Exception("Empty subject label.");

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
    if ($xmlFinal->hasChildNodes())
        $nodeFinal->appendChild($xmlFinal);
    $locked=0;
    if ($finaldata['locked']>0)
        $locked=$finaldata['locked'];
    $nodeFinal->setAttribute('locked', $locked);

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
        $dateSessionCreated=$row['dateSessionCreated'];
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
    if (!empty($originalHandler))
        set_error_handler($originalHandler);

    //print $xmldoc->saveXML();
    return $xmldoc;
}

/** Returns the subject's final data as XML.
 * @param String $subjectLabel
 * @param Database $db
 * @return DomDocument The Subject data as XML
 */
function getSubjectFinalDataAsXML($subjectLabel, Database $db)
{
    if (empty($subjectLabel))
        throw new Exception("Empty subject label.");

    //Retrieve the form data
    $result=$db->getSubjectFinalData($subjectLabel);

    if (empty($result) || !strlen($result['data']))
        return NULL;

    //Register a new error handler to handle libxml specific errors
    $originalHandler=set_error_handler("libxml_error_handler");

    //Create an XML document to store all the data (properly)
    $xmldoc=new DomDocument();
    if (empty($result['data']))
        $result['data']='<result/>';
    $xmldoc->loadXML($result['data']);
    $xmldoc->documentElement->setAttribute('locked',$result['locked']);
    $xmldoc->documentElement->setAttribute('subject',$subjectLabel);
    $xmldoc->documentElement->setAttribute('aclID',$result['aclID']);

    if (!empty($originalHandler))
        set_error_handler($originalHandler);

    return $xmldoc;
}

/** Transforms the XML using the XSL stylesheet. This function uses APC to cache
 * the XSL data. It also checks to see whether the XSL file has been modified
 * since it was last cached. If it did, the function loads the new data and
 * caches it, along with the file modification time.
 * WARNING: Uses APC to cache the XSL file!
 *
 * @param DomDocument $xmldoc
 * @param <type> $xsltemplate
 * @return <type> 
 */
function applyXSLtoXML(DomDocument $xmldoc, $xsltemplate)
{
    //Make sure XSLT is available
    if (!class_exists('XSLTProcessor'))
        throw new Exception('Class XSLTProcessor is not available. Please install the XSLT extension for PHP.');
    $xsldata=null;
    
    //Now we should load the XSL stylesheet
    if (function_exists('apc_fetch'))
    {
        $success=false;
        //Get cached mtime
        $xsl_cacheddate=apc_fetch("mtime:".$xsltemplate,$success);
        
        if ($success)
        {
            //Clear the stat cache to make sure we're reading the latest mtime
            clearstatcache();
            //Get real mtime
            $file_lastdate=@filemtime($xsltemplate);

            if (($file_lastdate!==FALSE) && ($file_lastdate<=$xsl_cacheddate))
                $xsldata=apc_fetch($xsltemplate);
        }
    }

    //Cache miss?
    if (empty($xsldata))
    {
        $xsldata=file_get_contents($xsltemplate);
        if (empty($xsldata))
            throw new Exception("Could not find subject data stylesheet.");

        //Can we cache the xsl data? Max cache time: 24 hours
        if (function_exists('apc_store'))
        {
            //Cache the data
            apc_store($xsltemplate,$xsldata);

            //Clear the stat cache to get the latest mtime
            clearstatcache();
            //Get xsl mtime
            $file_lastdate=@filemtime($xsltemplate);

            if ($file_lastdate!==FALSE)
            {
                //Store the mtime in the cache
                apc_store("mtime:".$xsltemplate,$file_lastdate);
            }
        }
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
    if (!empty($originalHandler))
        set_error_handler($originalHandler);

    return $result;
}


function getFinalDataAsXML($subjectLabel, Database $db)
{

}


/** Compares the columns of repeating <row> elements.
 * Appends @diff=1 if the columns have different values, otherwise @diff=0
 * @param DomNode $rowcollection
 * @return int Number of rows that are different
 */
function diffRows(DomNode &$rowcollection)
{
    $result=Array("diff"=>0,"empty"=>0);
    $row=$rowcollection->firstChild;

    //Loop through all the rows
    while ($row)
    {
        $r=0;
        //See the Final column has a value
        $f=$row->getElementsByTagName('final')->item(0);

        //Compare all the columns
        if (empty($f->nodeValue))
            $r=diffColumns($row->getElementsByTagName('cell'));

        $row->appendChild(new DOMAttr('diff', $r));

        switch ($r)
        {
            case 1:$result['diff']++;break;
            case 2:$result['empty']++;break;
        }

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

    $firstValue="";
    
    foreach ($cells as $cell)
    {
        $value=strtolower($cell->nodeValue);

        //Skip empty cells
        if (!strlen($value))
            continue;

        //Obtain the first value
        if (!strlen($firstValue))
        {
            $firstValue=$value;
            continue;
        }

        //Compare subsequent values with the first value.
        //If at least 1 is different, then return 1
        if ($value!==$firstValue)
            return 1;
    }

    //If we went through all the columns, and they all have the same
    //value then we can say that all the column values
    //are equal.
    //But if, they're empty, return 2
    if (!strlen($firstValue))
        return 2;

    return 0;
}

function convertFinalDataToArray(DOMDocument $xml,Array $headers)
{
    $result=Array();
    $i=0;

    $result[]=$headers;

    $root=$xml->documentElement;
    if ($root->hasChildNodes())
    {
        $node=$root->firstChild;
        while ($node)
        {
            $row=Array();
            $row[]=$node->localName;
            $row[]=urldecode($node->nodeValue);

            $node=$node->nextSibling;
            $result[]=$row;
        } 
    }

    return $result;
}

function convertFinalDataToCSV(DOMDocument $xml,Array $headers)
{
    $result=Array();
    $i=0;

    foreach ($headers as &$h)
        $h="\"$h\"";

    $result[]=implode(",",$headers);
    $root=$xml->documentElement;
    if ($root->hasChildNodes())
    {
        $row=Array();

        $node=$root->firstChild;
        while ($node)
        {
            $row='"'.$node->localName.'"';
            $row.=',"'.urldecode($node->nodeValue).'"';

            $node=$node->nextSibling;

            $result[]=$row;
        }
    }

    return implode("\n",$result);
}

function libxml_error_handler($errno,$errstr,$errfile,$errline)
{
    //Ignore malformed xml for now.
    print "$errstr at $errfile:$errline\n";
    die;
}

function libxml_xslt_error_handler($errno,$errstr,$errfile,$errline)
{
    print "$errstr at $errfile:$errline\n";
}
