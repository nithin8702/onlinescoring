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

require_once "auth.php";
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
            $converted_data=convertFinalDataToArray($xml,Array('DATA_LABEL','RESP'));
            applyHQHack($converted_data);
	    applyDEMHack($converted_data);
            $result['data'][$subjectLabel]=$converted_data;
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

function applyHQHack(Array &$data)
{
	$totalHQ=0;
	$totalEmpty=0;

	foreach ($data as $row)
	{
		$label=$row[0];
		$value=trim($row[1]);
		if (strpos(strtoupper($label),'HQ_')!==0)
			continue;

		$totalHQ++;

		if (empty($value) || ($value==='9999') || ($value==='0'))
			$totalEmpty++;
	}

	if ($totalHQ===$totalEmpty)
		foreach ($data as &$row)
			if (strpos(strtoupper($row[0]),'HQ_')===0)
				$row[1]='9999';
}

function applyDEMHack(array &$data)
{
	foreach ($data as &$row)
	{
		$label=$row[0];
		$value=trim($row[1]);
		if ((strtoupper($label) == 'DEM_COUNTRY') && (strtoupper($value) == 'USA'))
			$row[1]='US';
	}
}
