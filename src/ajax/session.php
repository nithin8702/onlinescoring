<?php
/* session.php tabsize=4
 *
 * Creates a new data entry session for a subject. If the subject is locked,
 * the request is denied.
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

//Check for errors
if (empty($_POST) || empty($_POST['subjectid']))
    ajax_error('Invalid request.');

$subjectid=trim($_POST['subjectid']);

if (empty($subjectid))
    ajax_error('Invalid Subject ID.');

if (!preg_match('/^[A-Za-z0-9]+$/',$subjectid))
    ajax_error('The Subject ID you have entered contains invalid characters.');

//Connect to the database
try
{
    $config=new \NRG\Configuration(CONFIG_FILE);
    $dbconf=$config->Database;
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);

    //Verify the subject isn't locked
    if ($db->isSubjectLocked($subjectid))
        ajax_error('Sorry, this subject has been locked. No data entry is allowed for locked subjects.');

    $session=$db->createSession($subjectid, $_SESSION['aclID']);

    $result=Array(
                    "success"=>1,
                    "session"=>$session['label']
                 );

    ajax_result($result);
}
catch (Exception $e)
{
    error_log($e->getMessage(),0);
    ajax_error('An internal server error has occured. Please try again later.'.$e->getMessage());
}
