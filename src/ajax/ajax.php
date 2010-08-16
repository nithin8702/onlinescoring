<?php
require_once "../bootstrap.php";
require_once "../NRG/Configuration.php";

set_include_path(get_include_path().PATH_SEPARATOR.'../');

set_error_handler("error_handler");
/* Ajax Defaults */
header('Content-type: application/json');

//Commit mail settings
$config=new \NRG\Configuration(CONFIG_FILE);
$mailconf=$config->Mail;

if (isset($mailconf) && !empty($mailconf))
{
    if (isset($mailconf['host']))
        ini_set('SMTP',$mailconf['host']);
    if (isset($mailconf['from']))
        ini_set('sendmail_from',$mailconf['from']);
}


/* Ajax functions */

function ajax_error($message='An internal error has occurred')
{
    $result=Array(
                    "success"=>0,
                    "message"=>$message
                 );
    ajax_result($result);
}

function ajax_result(Array $result)
{
    print json_encode($result);
    flush();
    exit();
}

function error_handler($errno,$errstr,$errfile,$errline)
{
    //Only enable debug output for localhost
    if ($_SERVER['REMOTE_ADDR']!="127.0.0.1")
    {
        error_log('[OnlineScoring] ERROR: '.$errstr.' at '.$errfile.':'.$errline,0);
        ajax_error("The server is experiencing technical difficulties. Please try again later.");
    }

    ajax_error($errstr.' at '.$errfile.':'.$errline);
}