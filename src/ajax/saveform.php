<?php
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

define("SCHEMA_DIR","../schemas/");
define("SCHEMA_EXT",".rng.xml");

//Check for errors
if (empty($_POST) || empty($_POST['session']) || empty($_POST['data'])
    || (empty($_POST['schema'])))
    ajax_error('Invalid request.');

//Trim the data, remove html tags and escape any html special chars left.
$session=trim(strip_tags($_POST['session']));
$data=trim($_POST['data']);

$schemaName=trim($_POST['schema']);

if (!preg_match('/^[A-Za-z0-9_\-]+$/',$session))
    ajax_error('Invalid session label.');

//Replace dangerous combination of characters in the schema name
$schemaName=str_replace(Array('..','//'),'',$schemaName);

//Schema name should start with a letter or number, contain letters/numbers/slashes/dots
//and end with a letter or number
if (!preg_match('/^[A-Za-z0-9_][A-Za-z0-9_\/\.]+[A-Za-z0-9_]$/',$schemaName))
    ajax_error('Invalid schema name.');

if (empty($data))
    ajax_error('Cannot accept empty form data.');

$config=new \NRG\Configuration(CONFIG_FILE);

try
{
    $rng=null;

    //Register a new error handler to handle libxml specific errors
    $originalHandler=set_error_handler("libxml_error_handler");

    //Create a new DomDocument object and load the XML data into it
    $xmldata=new DomDocument();
    $xmldata->loadXML($data, LIBXML_NOBLANKS | LIBXML_NOCDATA | LIBXML_NOENT );
    //Remove whitespaces from the data
    purifyXML($xmldata->documentElement);

    //Validate the data received
    $valid=$xmldata->relaxNGValidate(SCHEMA_DIR.$schemaName.SCHEMA_EXT);

    //Restore the original error handler
    set_error_handler($originalHandler);

    if ($valid===false)
        ajax_error('Schema validation failed'); //Should not see this because of the error handler


    //Retrieve the database configuration
    $dbconf=$config->Database;
    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);
    $session=$db->searchSession($session);
    if (empty($session))
        ajax_error('Could not find your session id in the database.');

    $db->storeForm($schemaName,$session['id'],$xmldata->saveXML());

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
function purifyArray(Array &$data)
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

function purifyXML(DOMNode $parentNode)
{
    foreach ($parentNode->childNodes as $node)
    {
        if ($node->hasChildNodes())
            purifyXML($node);

        if ($node->nodeType==XML_TEXT_NODE)
            $node->nodeValue=trim(preg_replace('/\s+/',' ',$node->nodeValue));
    }
}

function libxml_error_handler($errno,$errstr,$errfile,$errline)
{
    global $config;
    $message="Sorry, the data you have submitted did not pass schema validation.";
    $ir=$config->IssueReport;
    //Prepare an e-mail message
    $email="Issue Report:\n\n".
           "Date:    ".date('Y-m-d')."\n".
           "User:    ".$_SESSION['username']."\n".
           "File:    ".$errfile.":".$errline."\n".
           "Message: ".$errstr."\n".
           "\n".
           "POST:\n".
           "--------------------------------------\n".
           print_r($_POST,true)."\n".
           "--------------------------------------\n";

    //Send e-mail
    $result=mail($ir['to'],$ir['subject'],$email);

    if ($result)
        $message.="<br><br>This issue has been reported to ".$ir['to'].".<br>You will receive an e-mail when the issue is fixed.";
    else
        $message.="<br><br>Also, we were unable automatically notify ".$ir['to']." of this issue.".
            "<br>Please send an e-mail to <a href='mailto:".$ir['to']."'>".$ir['to']."</a>".
            " with screenshots and other relevant information.";

    ajax_error($message);
}