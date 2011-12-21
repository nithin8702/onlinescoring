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

$subjectlist=Array();

if (empty($argv) || empty($argv[1]))
	die("Usage: php unique.php list_of_subjects.txt\n");

$listfile=$argv[1];

if (!file_exists($listfile))
throw new Exception("File $listfile does not exist");

if (!is_readable($listfile))
throw new Exception("File $listfile is not readable");

$subjectlist=explode("\n",file_get_contents($listfile));

foreach ($subjectlist as &$label)
	$label=trim(strtoupper($label));

try
{

    $config=new \NRG\Configuration("config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],
                     $dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $subjects=$db->listSubjects();
	$labelsInDB=Array();

    foreach ($subjects as $subject)
    {
		$label=$subject['subjectLabel'];

		if (in_array($label,$labelsInDB))
			continue;

		$labelsInDB[]=trim(strtoupper($label));
    }

	$notInDB=array_diff($subjectlist,$labelsInDB);
	$notInList=array_diff($labelsInDB,$subjectlist);

	$countNotInDB=count($notInDB);
	$countNotInList=count($notInList);

	if ($countNotInDB)
		file_put_contents("not_in_db.csv",implode("\n",$notInDB));
	
	if ($countNotInList)
		file_put_contents("not_in_list.csv",implode("\n",$notInList));

	print "Subjects not in DB: $countNotInDB\n";
	print "Subjects not in List: $countNotInList\n";
}
catch (Exception $e)
{
    print $e->getMessage();
}
