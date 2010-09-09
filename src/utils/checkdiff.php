<?php
set_include_path(get_include_path().PATH_SEPARATOR.'../');
require_once "../NRG/Configuration.php";
require_once '../database.php';
require_once "subjectdata.php";
//set time limit to one hour
set_time_limit(3600);
define('XSL_SUBJECT_DATA','../xsl/subjectdata.xsl');

try
{
    $config=new \NRG\Configuration("config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $subjects=$db->listSubjects();

    foreach ($subjects as $subject)
    {
        $xml=getSubjectDataAsXml($subject['subjectLabel'],$db);
    //    header('Content-type: application/xml');
    //    print $xml->saveXML();die;
        $result=applyXSLtoXML($xml, XSL_SUBJECT_DATA);

        $xml=new DomDocument();
        $xml->loadXML($result);

        $rows=$xml->getElementsByTagName('rows')->item(0);
        $hasDiff=diffRows($rows);

        if ($hasDiff==0)
            $db->storeFinalDiffState($subject['subjectLabel'],1);
        else
            $db->storeFinalDiffState($subject['subjectLabel'],-1);
    }
}
catch (Exception $e)
{
    print $e->getMessage();
}