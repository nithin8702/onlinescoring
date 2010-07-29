<?php
/* Validate the session */
if (!isset($_SESSION['auth']) || (!$_SESSION['auth']))
{
    $result=Array(
                    "success"=>0,
                    "message"=>"We're really sorry, but you've been idle for a while and your session has expired.<br><br>You will now be logged out and prompted to login again.",
                    "action"=>"refresh"
    );
    ajax_result($result);
}