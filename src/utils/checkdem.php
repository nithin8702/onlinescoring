<?php
/* checkdem.php tabsize=4
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


$EDU_OCCU=Array('EDU_NOW','EDU_FUT','EDU_DAD','EDU_MOM',
                'OCCU_NOW_1','OCCU_NOW_2','OCCU_NOW_3','OCCU_NOW_4',
                'OCCU_NOW_LIST','OCCU_FUT','OCCU_FUT_LIST',
                'OCCU_DAD','OCCU_DAD_LIST','OCCU_MOM','OCCU_MOM_LIST');

$HI=Array('HI_OCCU_SELF','HI_OCCU_M','HI_OCCU_F','HI_OCCU_SELF_LIST',
          'HI_OCCU_M_LIST','HI_OCCU_F_LIST','HI_EDU_SELF','HI_EDU_M',
          'HI_EDU_F');

$label=null;
$found=Array();

if (!empty($argv) && !empty($argv[1]) && ctype_alnum(trim($argv[1])))
    $label=trim($argv[1]);


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
        
        //skip unlocked subjects
        if ((int)$subject['locked']==0)
            continue;

        $xml=getSubjectDataAsXml($subject['subjectLabel'],$db);
//        header('Content-type: application/xml');
//        print $xml->saveXML();die;

        //get /final/data
        $xpath=new DOMXPath($xml);
        $result=$xpath->query('/result/final/data');

        if (!$result || !$result->length)
            die;

        $finalxml=$result->item(0);

        $hasEDU_OCCU=xmlHasValuesForFields($finalxml,$EDU_OCCU);

        $hasHI=xmlHasValuesForFields($finalxml,$HI);


        if ($hasEDU_OCCU && $hasHI)
            $found[]=$subject['subjectLabel'];
    }

    print "Found: ".count($found)."<br/>";
    print implode("<br/>",$found);
}
catch (Exception $e)
{
    print $e->getMessage();
}


function xmlHasValuesForFields(DOMElement $final,Array $fields)
{
    foreach ($fields as $field)
    {
        $valuenode=$final->getElementsByTagName($field);

        if (!$valuenode || !$valuenode->length)
            continue;

        $value=$valuenode->item(0)->nodeValue;

        if (!is_numeric($value) || ((int)$value!=9999))
            return 1;
    }

    return 0;
}
