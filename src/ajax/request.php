<?php
/* request.php tabsize=4
 *
 * Accepts a new user registration request. If the user already exists, it
 * returns different errors depending on the current status of this user (disabled,
 * still pending and no privileges yet). Otherwise, a new entry is added to the
 * database and an e-mail notification is sent to the address specified under the
 * UserRegistration section of config.ini.php.
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

require_once 'ajax.php';
require_once 'NRG/Configuration.php';
require_once '../database.php';

if (!isset($_SESSION['requestCount']))
    $_SESSION['requestCount']=1;
else
    $_SESSION['requestCount']++;

//3 strikes and you're out!
if ($_SESSION['requestCount']>5)
    ajax_error('You have reached the maximum number of registration requests allowed. Please try again later.');

//Check for errors
if (empty($_POST))
    ajax_error('Invalid request.');

if (empty($_POST['email']))
    ajax_error('Please enter your e-mail address.');

$email=strtolower(trim($_POST['email']));

try
{
    $config=new \NRG\Configuration(CONFIG_FILE);

    $dbconf=$config->Database;

    //Make sure the username is registered with this application
    $db=new Database($dbconf['host'],$dbconf['user'],$dbconf['pass'],$dbconf['name'],$dbconf['port']);
    $user=$db->searchUser($email);

    if (!empty($user))
    {
        if ($user['requested']==1)
            ajax_error('Your access request is pending approval.');

        if ($user['roleID'])
            ajax_error('Your username has been enabled, please log in.');
        else
            ajax_error('Your access request is currently being reviewed.');
    }

    //Looks like there is nothing else left to do, except add the user to the Acl table with
    //NULL privileges
    $db->createUser($email);

    $ur=$config->UserRegistration;
    //Prepare an e-mail message
    $message="User $email requested access to ".$_SERVER['HTTP_HOST']." from ".$_SERVER['REMOTE_ADDR'].".";

    //Send e-mail
    $result=mail($ur['to'],$ur['subject'],$message,get_mail_headers($config));

    //Send the result back to the server
    ajax_result(Array(
        "success"=>1,
        "mail"=>$result
    ));
}
catch (Exception $e)
{
    error_log($e->getMessage(),0);
    ajax_error("Internal server error. Please try again later");
}