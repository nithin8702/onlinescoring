<?php
/* savefinalform.php tabsize=4
 *
 * Stores the final subject data as XML into the database. Collapses whitespace
 * and trim()'s values. Returns JSON.
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
 * @todo Refuse to store the final data if the subject has been locked.
 */
require_once "ajax.php";
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';

//Require da manager privileges
setClearanceLevel(50);

//Check for errors
if (empty($_POST) || empty($_POST['label']) || empty($_POST['data']))
    ajax_error('Invalid request.');

$lock=0;

//Check the lock parameter
if (!empty($_POST['lock']))
{
    $temp=$_POST['lock'];
    if (($temp==1) || (strtolower($temp)=="true"))
        $lock=1;
}

//Trim the data, remove html tags and escape any html special chars left.
$label=trim(strip_tags($_POST['label']));
$data=trim($_POST['data']);

if (!preg_match('/^[A-Za-z0-9_\-]+$/',$label))
    ajax_error('Invalid subject label.');

if (empty($data))
    ajax_error('Cannot accept empty form data.');

$config=new \NRG\Configuration(CONFIG_FILE);

try
{
    //Register a new error handler to handle libxml specific errors
    $originalHandler=set_error_handler("libxml_error_handler");

    //Create a new DomDocument object and load the XML data into it
    $xmldata=new DomDocument();
    $xmldata->loadXML($data, LIBXML_NOBLANKS | LIBXML_NOCDATA | LIBXML_NOENT );
    //Remove whitespaces from the data
    purifyXML($xmldata->documentElement);

    //Restore the original error handler
    set_error_handler($originalHandler);

    //Retrieve the database configuration
    $dbconf=$config->Database;
    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);

    //Store the data in the database
    $db->storeFinalForm($label,$_SESSION['aclID'],$xmldata->saveXML(),$lock);

    $result=Array("success"=>1, "subject"=>$label);

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
    $message="Sorry, this subject\'s data has been corrupted.";
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