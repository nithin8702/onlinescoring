<?php
require_once 'ajax.php';
require_once '../database.php';
require_once 'NRG/Login/Google/ClientLogin.php';

//Verify the session
if (isset($_SESSION) && isset($_SESSION['auth']) && ($_SESSION['auth']===true))
{
  $result=Array (
                    "success"=> 1,
                    "message"  => "You are already logged in."
                );
  
  ajax_result($result);
}

//Check for errors
if (empty($_POST))
    ajax_error('Invalid request.');

if (empty($_POST['username']))
    ajax_error('Please enter your username.');

if (empty($_POST['password']))
    ajax_error('Please enter your password.');

$username=strtolower(trim($_POST['username']));
$md5password=trim($_POST['password']);

//Make sure the username and password contain only valid characters
if (!preg_match('/^[A-Za-z0-9@\.]+$/', $username))
    ajax_error('Your username contains invalid characters or is empty.');

if (!preg_match('/^[^\n\t\r]+$/',$md5password))
    ajax_error('Your password contains invalid characters or is empty.');


//$login=new NRG\Login($username,$md5password);

//Check the username and password
try
{
    //Make sure the username is registered with this application
    $db=new \Database('127.0.0.1','root','%root1','onlinescoring');
    $user=$db->getUser($username);

    if (empty($user))
        ajax_error('You must <a href="register.php">request access</a> first.');

    $auth=new NRG\Login\Google\ClientLogin($username,$md5password);
    
    $auth->login();
}
catch (\Exception $e)
{
    error_log($e->getMessage(), LOG_ERR);
    ajax_error('Internal Server error. Please try again later.');
}

//Log the user in
if ($auth->isSuccessful())
    $_SESSION['auth']=true;
else
    ajax_error("Invalid username or password.");

//Success
$result=Array("success"=>1);
ajax_result($result);