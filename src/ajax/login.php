<?php
/* login.php tabsize=4
 *
 * Authenticates those users that have Google accounts. To support other
 * authentication mechanisms, instanciate a different class than \NRG\Google\ClientLogin.
 * Supports Captcha messages.
 *
 * @author  Victor Petrov <victor_petrov@harvard.edu>
 * @date    July 20, 2010
 * @copyright (c) 2010 The Presidents and Fellows of Harvard College
 * @copyright (c) 2010 The Neuroinformatics Research Group at Harvard University
 * @license   GPLv3 <http://www.gnu.org/licenses/gpl-3.0.txt>
 * -----------------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * -----------------------------------------------------------------------------
 *
 * @todo Refactor this code to make use of the generic \NRG\Login.
 */

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

$captchatext=null;
$captchatoken=null;

if (isset($_POST['captchatext']))
    $captchatext=trim($_POST['captchatext']);
if (isset($_POST['captchatoken']))
    $captchatoken=trim($_POST['captchatoken']);

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
        ajax_error('You must <a href="javascript:showRegistrationForm()">request access</a> first.');

    if ($user['requested']==1)
        ajax_error('Your access request is pending approval.');

    if (!$user['enabled'])
        ajax_error('Your account has been disabled.');

    if ((!isset($user['roleID'])) || ($user['roleID']==NULL))
        ajax_error('Sorry, your account hasn\'t been assigned any privileges yet. Please try again later.');

    $logged_in=false;

    if (($username=="guest@neuroinfo.org") && ($md5password=="guest"))
        $logged_in=true;
    else
    {
        $auth=new NRG\Login\Google\ClientLogin($username,$md5password);

        if (!empty($captchatext) && !empty($captchatoken))
        {
            $auth->setCaptchaText($captchatext);
            $auth->setCaptchaToken($captchatoken);
        }

        //Attempt to authenticate the user
        $auth->login();

        if ($auth->isSuccessful())
            $logged_in=true;
    }

    //If authentication was successful, log the user in
    if ($logged_in)
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
    $result=Array(
                    "success"=>0,
                    "message"=>"Please enter the following validation code:",
                    "captcha"=>Array(
                                        "url"   => $e->getCaptchaURL(),
                                        "token" => $e->getCaptchaToken()
                                    )
                 );

    ajax_result($result);
}
catch (\NRG\Login\Google\ClientLoginException $e)
{
    ajax_error('Invalid username or password.');
}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage(), 0);
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