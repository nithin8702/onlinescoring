<?php
session_start();

header('Content-type: application/json');

//Verify the session
if (isset($_SESSION) && ($_SESION['logged_in']===true))
{
    print '{
            "result": {
                        "success": 0,
                        "error":  "You are already logged in.",
                        "action": "refresh",
                        "url":    "index.php"
                    }
           }';
    die;
}
//Check for errors
if (empty($_POST))
    error('Invalid request.');

if (empty($_POST['username']))
    error('Please enter your username.');

if (empty($_POST['password']))
    error('Please enter your password.');

$username=strtolower(trim($_POST['username']));
$md5password=trim($_POST['password']);

//Make sure the username and password contain only valid characters
if (!preg_match('/^[A-Za-z0-9@\.]+$/', $username))
    error('Your username contains invalid characters or is empty.');

if (!preg_match('/^\w+$/',$md5password))
    error('Your password contains invalid characters or is empty.');


//Check the username and password
if (($username!='guest@neuroinfo.org') || ($md5password!=md5('guest')))
    error('Invalid username or password.');

//Log the user in
$_SESSION['logged_in']=true;

//Success
print '{"result":{"success":1}}';

function error($message='An internal error has occurred')
{
    print '{"result":{"success":0,"error":"'.$message.'"}}';
    flush();
    die;
}
