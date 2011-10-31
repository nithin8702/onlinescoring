<?php
/* checkdiff.php tabsize=4
 *
 * This file checks each subject's data for entry errors and then marks a subject
 * as 'with errors' or 'without errors'. The info is then used to highlight
 * subjects with errors in the Subjects table.
 *
 * @warning Usually, a cron job is set up to run this script at regular intervals.
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

set_include_path(get_include_path().PATH_SEPARATOR.'../');
require_once "../NRG/Configuration.php";
require_once '../database.php';
require_once "subjectdata.php";
//set time limit to one hour
set_time_limit(3600);
define('XSL_SUBJECT_DATA','../xsl/subjectdata.xsl');

$label=null;

if (!empty($argv) && !empty($argv[0]) && ctype_alnum(trim($argv[0])))
    $label=trim($argv[0]);


try
{
    $config=new \NRG\Configuration("config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],
                     $dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $subjects=$db->listSubjects();

    foreach ($subjects as $subject)
    {
        //Skip subjects that don't match $label, if necessary
        if (!empty($label) && $subject['subjectLabel']!==$label)
            continue;
        
        //If the subject has been locked, make sure it is never highlighted as
        //having errors
        if ((int)$subject['locked']==1)
        {
            $db->storeFinalDiffState($subject['subjectLabel'],1);
            continue;
        }

        $xml=getSubjectDataAsXml($subject['subjectLabel'],$db);
    //    header('Content-type: application/xml');
    //    print $xml->saveXML();die;
        $result=applyXSLtoXML($xml, XSL_SUBJECT_DATA);

        $xml=new DomDocument();
        $xml->loadXML($result);

        $rows=$xml->getElementsByTagName('rows')->item(0);
        $diffResult=diffRows($rows);

        if ($diffResult['diff']>0)
            $db->storeFinalDiffState($subject['subjectLabel'],-1);
        else
            if ($diffResult['empty']>0)
                $db->storeFinalDiffState($subject['subjectLabel'],-2);
            else
                $db->storeFinalDiffState($subject['subjectLabel'],1);
    }
}
catch (Exception $e)
{
    print $e->getMessage();
}