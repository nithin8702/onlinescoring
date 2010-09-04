<?php
require_once "subjectdatautil.php";

define('XSL_SUBJECT_DATA','../xsl/subjectdata.xsl');

if (!isset($_GET['label']) || empty($_GET['label']))
    ajax_error('Please specify a subject label.');

$subjectLabel=trim(strtoupper($_GET['label']));

try
{
    $xml=getSubjectDataAsXml($subjectLabel);
//    header('Content-type: application/xml');
//    print $xml->saveXML();die;
    $result=applyXSLtoXML($xml, XSL_SUBJECT_DATA);

    $xml=new DomDocument();
    $xml->loadXML($result);

    $rows=$xml->getElementsByTagName('rows')->item(0);
    $hasDiff=diffRows($rows);
}
catch (Exception $e)
{
    ajax_error($e->getMessage());
}

header('Content-type: application/xml');

//Decode and print
print $xml->saveXML();