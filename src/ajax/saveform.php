<?php
/* saveform.php tabsize=4
 *
 * Saves form data to the database. The form is first validated using a RelaxNG
 * schema from the SCHEMA_DIR folder (defined below). In case the schema failed
 * validation, then the script assumes the client is not using the API correctly
 * and sends an e-mail to the administrator with debug information.
 * Whitespace is converted to a single space and each value is trim()'d.
 * The data is then stored into the database and it is marked as not diffed.
 * Returns JSON.
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
 */

require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

//Require data entry privileges
setClearanceLevel(30);

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

    //Mark this data as not diff'd
    $db->storeFinalDiffState($session['subjectLabel'], 0);

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
    $result=mail($ir['to'],$ir['subject'],$email,get_mail_headers($config));

    if ($result)
        $message.="<br><br>This issue has been reported to ".$ir['to'].".<br>You will receive an e-mail when the issue is fixed.";
    else
        $message.="<br><br>Also, we were unable automatically notify ".$ir['to']." of this issue.".
            "<br>Please send an e-mail to <a href='mailto:".$ir['to']."'>".$ir['to']."</a>".
            " with screenshots and other relevant information.";

    ajax_error($message);
}