<?php
/* subjects.php tabsize=4
 *
 * Retrieves a list of subjects from the database. Returns JSON.
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

//Require data manager privileges
setClearanceLevel(50);

$field=null;
$direction="DESC";
$format=null;
$content_type=null;
$content_disposition=null;

if (isset($_GET['field']))
{
    $temp=trim($_GET['field']);
    if (strlen($temp) && ctype_alnum($temp))
        $field=$temp;
}

if (isset($_GET['direction']))
{
    $temp=strtoupper(trim($_GET['direction']));
    if (($temp=="ASC") || ($temp=="DESC"))
        $direction=$temp;
}

if (isset($_GET['format']))
{
    $temp=strtoupper(trim($_GET['format']));
    switch ($temp)
    {
        case 'CSV': $format=$temp;
                    $content_type='text/csv';
                    $content_disposition="attachment; filename=subjects.csv";
                    break;
    }
}


try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $result=$db->listSubjects($field,$direction);
    
    if (empty($format))
    {
        ajax_result(Array(
                            "total"     => count($result),
                            "subjects"  => $result
                         ));
    }
    else
    {
        header('Content-type: '.$content_type);
        header('Content-disposition: '.$content_disposition);
        
        switch ($format)
        {
            case 'CSV': print toCSV($result, Array('Label','Entries','Last Changed','Locked'),Array('diff'));
        }

    }
}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage().' at '.$e->getFile().':'.$e->getLine(),0);
}


function toCSV(Array $data,Array $headers=null,Array $ignore=null)
{
    $rows=Array();

    foreach ($headers as &$h)
        $h='"'.$h.'"';

    $rows[]=implode(',',$headers);

    foreach ($data as $row)
    {
        $newrow=Array();

        foreach ($row as $label=>$cell)
        {
            if (in_array($label,$ignore))
                continue;
            
            if (!is_numeric($cell))
                $newrow[]='"'.$cell.'"';
            else
                $newrow[]=$cell;
        }

        if (!empty($newrow))
            $rows[]=implode(',',$newrow);
    }

    return implode("\n",$rows);
}