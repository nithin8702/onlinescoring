<?php
require_once "../bootstrap.php";

set_include_path(get_include_path().PATH_SEPARATOR.'../');

/* Ajax Defaults */
header('Content-type: application/json');

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