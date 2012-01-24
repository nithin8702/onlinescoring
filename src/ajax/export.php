<?php
/* subjectdata.php tabsize=4
 *
 * Retrieves subject data from the database. Transforms the original XML into
 * tabular XML with repeating <row> elements using an XSL stylesheet.
 * Returns XML or a JSON error.
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
 * @todo Change the code to return only XML and use HTTP status codes.
 * @warning The XSL file used will be cached, if possible. If you update your
 *          XSL, make sure to disable APC caching.
 * @see ../utils/subjectdata.php
 */

require_once "ajax.php";
require_once "NRG/Configuration.php";
require_once "NRG/Login/Google/ClientLogin.php";
require_once '../database.php';
require_once "../utils/subjectdata.php";

ini_set('memory_limit',256*1024*1024); //256MB

define('XSL_SUBJECT_DATA','../xsl/subjectdata.xsl');
define('MAX_LABELS',100);

if (!isset($_SERVER['PHP_AUTH_USER']))
    ajax_http_auth_error("This service requires an authenticated user");

$config=NULL;
$dbconfig=NULL;
$setupconfig=NULL;
$db=NULL;
$logged_in=false;

try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $setupconfig=$config->Setup;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);
}
catch (Exception $e)
{
    ajax_error($e->getMessage());
}

//------
// AUTH
//------
try
{
    $user=$_SERVER['PHP_AUTH_USER'];
    $pass=$_SERVER['PHP_AUTH_PW'];

    //try to use the export user
    if (isset($setupconfig['export_user']) && isset($setupconfig['export_key']))
    {
        $export_user=strtolower($setupconfig['export_user']);
        $export_key=$setupconfig['export_key'];

        if ((strtolower($user)==$export_user) && ($pass==$export_key))
            $logged_in=true;
    }

    //if not, try to authenticate against Google Apps
    if (!$logged_in)
    {
        try
        {

            $auth=new \NRG\Login\Google\ClientLogin($_SERVER['PHP_AUTH_USER'],$_SERVER['PHP_AUTH_PW']);

            //Attempt to authenticate the user
            $auth->login();

            if ($auth->isSuccessful())
                $logged_in=true;
        }
        catch (\NRG\Login\Google\ClientLoginException $e)
        {
            $logged_in=false;
            ajax_http_auth_error("Invalid username or password");
        }
    }

    //if none of the options above worked, return an error
    if (!$logged_in)
        ajax_http_auth_error("Invalid username or password");
}
catch(Exception $e)
{
    ajax_http_auth_error($e->getMessage());
}

if (!isset($_REQUEST['label']) || empty($_REQUEST['label']))
    ajax_error('Please specify a subject label.');

$labels=explode(",",trim(strtoupper($_REQUEST['label'])));

if (count($labels)>MAX_LABELS)
    ajax_error("Your request has exceeded the maximum number of subject labels allowed (".MAX_LABELS.")");

$xml="";
$result=Array("success"=>1,
              "count"=>0,
              "data"=>Array());
try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");
  
    foreach ($labels as $subjectLabel)
    {
        //Skip subjects that were not locked
        if (!$db->isSubjectLocked($subjectLabel))
            continue;

        $xml=NULL;

        $xml=getSubjectFinalDataAsXML($subjectLabel,$db);

        if ($xml)
        {
            $result['data'][$subjectLabel]=convertFinalDataToArray($xml,Array('DATA_LABEL','RESP'));
            ++$result['count'];
        }
    }
}
catch (Exception $e)
{
    ajax_error($e->getMessage());
}

$content_type='application/json';

//output
header('Content-type: '.$content_type);

print json_encode($result);
