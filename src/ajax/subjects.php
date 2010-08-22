<?php
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $result=$db->listSubjects();
    $c=count($result);
    for ($i=0;$i<$c;$i++)
    {
        $row=$result[$i];
        $row['subjectLabel'].=$i;
        $result[]=$row;
    }

    $i=0;
    foreach ($result as &$row)
    {
        //Add a new # column
        $row['nr']=++$i;
        //Convert the date to Unix Timestamp
        //$row['dateUpdated']=strtotime($row['dateUpdated']);
    }

    ajax_result(Array(
                        "total"     => count($result),
                        "subjects"  => $result
                     ));
}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage().' at '.$e->getFile().':'.$e->getLine(),0);
}