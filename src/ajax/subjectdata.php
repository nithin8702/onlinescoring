<?php
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';
require_once "../utils/subjectdata.php";

//Require data manager privileges
setClearanceLevel(50);

define('XSL_SUBJECT_DATA','../xsl/subjectdata.xsl');

if (!isset($_GET['label']) || empty($_GET['label']))
    ajax_error('Please specify a subject label.');

$subjectLabel=trim(strtoupper($_GET['label']));

try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");
    
    $xml=getSubjectDataAsXml($subjectLabel, $db);
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