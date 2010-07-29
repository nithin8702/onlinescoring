<?php
require_once 'ajax.php';
require_once 'NRG/Configuration.php';
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
    $config=new \NRG\Configuration(CONFIG_FILE);

    $dbconf=$config->Database;

    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);
    $user=$db->searchUser($username);

    if (empty($user))
        ajax_error('You must <a href="javascript:register()">request access</a> first.');

    if ($user['requested']==1)
        ajax_error('Your access request is pending approval.');

    if (!$user['enabled'])
        ajax_error('Your account has been disabled.');

    $auth=new NRG\Login\Google\ClientLogin($username,$md5password);
    
    $auth->login();

    //Log the user in
    if ($auth->isSuccessful())
    {
        $_SESSION['auth']=true;
        $_SESSION['username']=$user['username'];
        $_SESSION['role']=$user['name'];
        $_SESSION['aclID']=$user['aclID'];
        $_SESSION['roleID']=$user['roleID'];
        $_SESSION['clearance']=$user['clearance'];
    }
    else
        ajax_error("Invalid username or password.");

}
catch (\NRG\Login\Google\ClientLoginCaptchaException $e)
{
    error_log('[OnlineQuestionnaire] ERROR: Implement captcha exception at once!', LOG_ERR);
    ajax_error('Sorry, Google wants Captcha image validation.');
}
catch (\NRG\Login\Google\ClientLoginException $e)
{
    ajax_error('Invalid username or password.');
}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage(), LOG_ERR);
    ajax_error('Internal Server error. Please try again later.'.$e->getMessage());
}

//Success
$result=Array("success"=>1);
ajax_result($result);

function guest_login($username,$password)
{
    if (($username=="guest@neuroinfo.org") && ($password=="guest"))
    {
        $_SESSION['auth']=true;
        $result=Array("success"=>1);
        ajax_result($result);
    }
    else
    {
        ajax_error("Invalid username or password.");
    }

}