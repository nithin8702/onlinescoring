<?php
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

//Require data entry privileges
setClearanceLevel(30);

//Check for errors
if (empty($_POST) || empty($_POST['subjectid']))
    ajax_error('Invalid request.');

$subjectid=trim($_POST['subjectid']);

if (empty($subjectid))
    ajax_error('Invalid Subject ID.');

if (!preg_match('/^[A-Za-z0-9]+$/',$subjectid))
    ajax_error('The Subject ID you have entered contains invalid characters.');

//Connect to the database
try
{
    $config=new \NRG\Configuration(CONFIG_FILE);
    $dbconf=$config->Database;
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);

    //Verify the subject isn't locked
    if ($db->isSubjectLocked($subjectid))
        ajax_error('Sorry, this subject has been locked. No data entry is allowed for locked subjects.');

    $session=$db->createSession($subjectid, $_SESSION['aclID']);

    $result=Array(
                    "success"=>1,
                    "session"=>$session['label']
                 );

    ajax_result($result);
}
catch (Exception $e)
{
    error_log($e->getMessage(),0);
    ajax_error('An internal server error has occured. Please try again later.'.$e->getMessage());
}
