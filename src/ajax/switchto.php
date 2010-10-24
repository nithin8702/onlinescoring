<?php
/* login.php tabsize=4
 *
 * Authenticates those users that have Google accounts. To support other
 * authentication mechanisms, instanciate a different class than \NRG\Google\ClientLogin.
 * Supports Captcha messages.
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
 * @todo Refactor this code to make use of the generic \NRG\Login.
 */

require_once 'ajax.php';
require_once "auth.php";
require_once 'NRG/Configuration.php';
require_once '../database.php';
require_once 'NRG/Login/Google/ClientLogin.php';

define("SYSTEM_USERNAME",'SYSTEM');

//Require admin privileges
setClearanceLevel(90);

//Check for errors
if (empty($_POST) || empty($_POST['username']))
    ajax_error('Invalid request.');

$username=strtolower(trim($_POST['username']));

//Make sure the username and password contain only valid characters
if (!preg_match('/^[A-Za-z0-9@\.]+$/', $username))
    ajax_error('Your username contains invalid characters or is empty.');

//Check the username and password
try
{
    $config=new \NRG\Configuration(CONFIG_FILE);
    $user=Array();

    $dbconf=$config->Database;

    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);

    $user=$db->searchUser($username);

    if (empty($user))
        ajax_error('Invalid user.');

    if ($user['requested']==1)
        ajax_error('This user is still pending for approval.');

    if (!$user['enabled'])
        ajax_error('This user account has been disabled.');

    if ((!isset($user['roleID'])) || ($user['roleID']==NULL))
        ajax_error('Please assign privileges to this account prior to switching users.');

    $_SESSION['auth']=true;
    $_SESSION['username']=$user['username'];
    $_SESSION['role']=$user['name'];
    $_SESSION['aclID']=$user['aclID'];
    $_SESSION['roleID']=$user['roleID'];
    $_SESSION['clearance']=$user['clearance'];

}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage(), 0);
    ajax_error('Internal Server error. Please try again later.'.$e->getMessage());
}

//Success
$result=Array("success"=>1);
ajax_result($result);

