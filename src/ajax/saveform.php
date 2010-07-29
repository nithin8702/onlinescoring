<?php
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

//Check for errors
if (empty($_POST) || empty($_POST['session']) || empty($_POST['id']) || empty($_POST['data']))
    ajax_error('Invalid request.');

//Trim the data, remove html tags and escape any html special chars left.
$session=trim(strip_tags($_POST['session']));
$qid=trim(strip_tags($_POST['id']));
$data=trim(strip_tags($_POST['data']));

if (!preg_match('/^[A-Za-z0-9_\-]+$/',$session))
    ajax_error('Invalid session label.');

if (!preg_match('/^[[A-Za-z0-9\:_]+$/',$qid))
    ajax_error('Invalid form id.');

if (empty($data))
    ajax_error('Cannot accept empty form data.');

try
{
    $config=new \NRG\Configuration(CONFIG_FILE);

    $dbconf=$config->Database;

    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);
    $session=$db->searchSession($session);
    if (empty($session))
        ajax_error('Could not find your session id in the database.');

    $db->storeForm($qid,$session['id'],$data);

    $result=Array("success"=>1);

    ajax_result($result);
}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage(), LOG_ERR);
    ajax_error('Internal Server error. Please try again later.'.$e->getMessage());
}