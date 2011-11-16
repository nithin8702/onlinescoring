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
require_once "auth.php";
require_once "NRG/Configuration.php";
require_once '../database.php';
require_once "../utils/subjectdata.php";

//Require data manager privileges
setClearanceLevel(50);

define('XSL_SUBJECT_DATA','../xsl/subjectdata.xsl');

if (!isset($_GET['label']) || empty($_GET['label']))
    ajax_error('Please specify a subject label.');

$final=false;
$format='xml';

if (isset($_GET['final']) && in_array(strtolower($_GET['final']),
                                      Array('1','true','yes','y')))
    $final=true;

if ($final && isset($_GET['format']) && !empty($_GET['format']))
    $format=strtolower(trim($_GET['format']));

$subjectLabel=trim(strtoupper($_GET['label']));
$xml="";

try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $xml=NULL;

    if ($final)
        $xml=getSubjectFinalDataAsXML($subjectLabel,$db);
    else
    {
        $xml=getSubjectDataAsXml($subjectLabel, $db);
        /** WARNING: This function caches the XSL file. */
        $result=applyXSLtoXML($xml, XSL_SUBJECT_DATA);
    //    header('Content-type: application/xml');
    //    print $xml->saveXML();die;


        $xml=new DomDocument();
        $xml->loadXML($result);

    //    header('Content-type: application/xml');
    //    print $xml->saveXML();die;

        $rows=$xml->getElementsByTagName('rows')->item(0);
        $hasDiff=diffRows($rows);
    }
}
catch (Exception $e)
{
    ajax_error($e->getMessage());
}

$content_type='application/xml';
$content_disposition=null;
$result="";

switch ($format)
{
    case 'csv':$content_type='text/csv';
               $content_disposition="attachment; filename=".$subjectLabel.".csv";
               $result=convertFinalDataToCSV($xml,
                                             Array('DATA_LABEL','RESP'));
               break;
    default: $result=$xml->saveXML();
}

//output
header('Content-type: '.$content_type);
if ($content_disposition)
    header('Content-disposition: '.$content_disposition);
print $result;