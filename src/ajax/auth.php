<?php
/* auth.php tabsize=4
 *
 * Returns an error if the user is not authenticated. Include this file at the
 * top of your scripts to limit access to those script to logged in users only.
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

require_once('ajax.php');
require_once "NRG/Configuration.php";
require_once "NRG/Login/Google/ClientLogin.php";

/* basic auth ? */
if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW']))
{
    $config=new \NRG\Configuration("../config.ini.php");
    basic_auth($config->Setup);
}
else
/* regular auth */
if (!isset($_SESSION['auth']) || (!$_SESSION['auth']))
{
    $result=Array(
                    "success"=>0,
                    "message"=>"We're really sorry, but you've been idle for a while and your session has expired.<br><br>You will now be logged out and prompted to login again.",
                    "action"=>"refresh"
    );
    ajax_result($result);
}

function setClearanceLevel($level)
{
    //cannot currently detect clearance level for basic-auth users
    if (isset($_SERVER['PHP_AUTH_USER']))
        return;

    if ((int)$_SESSION['clearance']<$level)
        ajax_error('You do not have sufficient permissions to perform this operation.');
}

function basic_auth(Array $setupconfig)
{
    try
    {
        $user=$_SERVER['PHP_AUTH_USER'];
        $pass=$_SERVER['PHP_AUTH_PW'];

        //try to use the export user
        if (isset($setupconfig['export_user']) && isset($setupconfig['export_key']))
        {
            $export_user=strtolower($setupconfig['export_user']);
            $export_key=$setupconfig['export_key'];

            if ((strtolower($user)==$export_user) && ($pass==$export_key))
                $logged_in=true;
        }

        //if not, try to authenticate against Google Apps
        if (!$logged_in)
        {
            try
            {
                $auth=new \NRG\Login\Google\ClientLogin($_SERVER['PHP_AUTH_USER'],$_SERVER['PHP_AUTH_PW']);

                //Attempt to authenticate the user
                $auth->login();

                if ($auth->isSuccessful())
                    $logged_in=true;
            }
            catch (\NRG\Login\Google\ClientLoginException $e)
            {
                $logged_in=false;
                ajax_http_auth_error("Invalid username or password");
            }
        }

        //if none of the options above worked, return an error
        if (!$logged_in)
            ajax_http_auth_error("Invalid username or password");
    }
    catch(Exception $e)
    {
        ajax_http_auth_error($e->getMessage());
    }
}
