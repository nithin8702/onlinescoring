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
define('NO_VALUE','9999');

$label=null;

if (!empty($argv) && !empty($argv[1]) && ctype_alnum(trim($argv[1])))
    $label=trim($argv[1]);


try
{
    $result=Array();
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
        if ((int)$subject['locked']==0)
            continue;

        $xml=getSubjectFinalDataAsXml($subject['subjectLabel'],$db);

        $node=$xml->documentElement->firstChild;

        while ($node)
        {
            if (!strlen(trim($node->nodeValue)))
            {
                $node->nodeValue=NO_VALUE;
                if (!isset($result[$subject['subjectLabel']]))
                    $result[$subject['subjectLabel']]=0;
                else
                    $result[$subject['subjectLabel']]++;
            }

            $node=$node->nextSibling;
        }

        $db->storeFinalForm($subject['subjectLabel'],
                            $xml->documentElement->getAttribute('aclID'),
                            $xml->saveXML(),$subject['locked']);
    }


    foreach ($result as $s=>$c)
        print "$s: $c\n";
}
catch (Exception $e)
{
    print $e->getMessage();
}
