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
    ajax_error('You have reached the maximum number of registration requests allowed. Please try again later.');

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

        if ($user['roleID'])
            ajax_error('Your username has been enabled, please log in.');
        else
            ajax_error('Your access request is currently being reviewed.');
    }

    //Looks like there is nothing else left to do, except add the user to the Acl table with
    //NULL privileges
    $db->createUser($email);
    //Prepare an e-mail message
    $headers = 'From: NRG Accounts <support@neuroinfo.org>' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $message="User $email requested access to ".$_SERVER['HTTP_HOST']." from ".$_SERVER['REMOTE_ADDR'].".";

    //Send e-mail
    $result=mail('support@neuroinfo.org','Online Scoring Access Request',$message,$headers);

    //Send the result back to the server
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