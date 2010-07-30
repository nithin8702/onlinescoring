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
$jsonData=trim(strip_tags($_POST['data']));

if (!preg_match('/^[A-Za-z0-9_\-]+$/',$session))
    ajax_error('Invalid session label.');

if (!preg_match('/^[[A-Za-z0-9\:_]+$/',$qid))
    ajax_error('Invalid form id.');

if (empty($jsonData))
    ajax_error('Cannot accept empty form data.');

try
{
    //Convert JSON to associative arrays
    $data=json_decode($jsonData,true);
    //Remove whitespaces from the data
    purify($data);
    //Convert the array back to JSON
    $jsonData=json_encode($data);

    $config=new \NRG\Configuration(CONFIG_FILE);

    $dbconf=$config->Database;

    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);
    $session=$db->searchSession($session);
    if (empty($session))
        ajax_error('Could not find your session id in the database.');

    $db->storeForm($qid,$session['id'],$jsonData);

    $result=Array("success"=>1);

    ajax_result($result);
}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage(),0);
    ajax_error('Internal Server error. Please try again later.'.$e->getMessage());
}

/** Walks recursively through an array and trims whitespace.
 *  Compresses multiple spaces into 1
 * @param array $data
 */
function purify(Array &$data)
{
    foreach ($data as $key=>&$value)
    {
        trim($key);

        if (is_array($value))
            purify($value);
        else
            $value=trim(preg_replace('/\s+/',' ',$value));
    }
}