<?php
require_once 'ajax.php';
require_once 'NRG/Configuration.php';
require_once '../database.php';

if (!isset($_SESSION['requestCount']))
    $_SESSION['requestCount']=1;
else
    $_SESSION['requestCount']++;

//3 strikes and you're out!
if ($_SESSION['requestCount']>5)
    ajax_error('You have reached the maximum number of requests you can make per hour. Please try again later.');

//Check for errors
if (empty($_POST))
    ajax_error('Invalid request.');

if (empty($_POST['email']))
    ajax_error('Please enter your e-mail address.');

$email=strtolower(trim($_POST['email']));

try
{
    $config=new \NRG\Configuration(CONFIG_FILE);

    $dbconf=$config->Database;

    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);
    $user=$db->searchUser($email);

    if (!empty($user))
    {
        if ($user['requested']==1)
            ajax_error('Your access request is pending approval.');

        ajax_error('Your username has been enabled, please log in.');
    }

    $db->createUser($email);
    $headers = 'From: NRG Accounts <support@neuroinfo.org>' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $message="User $email requested access to ".$_SERVER['HTTP_HOST']." from ".$_SERVER['REMOTE_ADDR'].".";

    $result=mail('support@neuroinfo.org','Online Scoring Access Request',$message,$headers);

    ajax_result(Array(
        "success"=>1,
        "mail"=>$result
    ));
}
catch (Exception $e)
{
    error_log($e->getMessage(),0);
    ajax_error("Internal server error. Please try again later");
}