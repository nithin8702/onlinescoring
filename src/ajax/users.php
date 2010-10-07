<?php
/* users.php tabsize=4
 *
 * Handles REST requests to manage users. Returns JSON.
 *      GET     List users
 *      POST    Create/Update user
 *      DELETE  Mark user as deleted (rows are never deleted from the db)
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
setClearanceLevel(90);

try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");
    
    $success=1;
    $message="";
    $result=Array();

    $method=$_SERVER['REQUEST_METHOD'];

    try
    {
        switch ($method)
        {
            case 'GET':     $result=$db->listUsers();break;
            case 'POST':    $users=json_decode($_POST['users']);
                            $result=doInsertUpdateUsers($users,$db);
                            break;
           case 'DELETE':
                            $data=file_get_contents('php://input');
                            $data=explode('=',$data,2);
                            if (!isset($data[1]) || empty($data[1]))
                                ajax_error('Your browser has sent an invalid request. Please try again.');

                            $user=trim(urldecode($data[1]));
                            if (empty($user))
                                ajax_error('Sorry, but we cannot delete this user. Please try again later.');

                            $result=$db->deleteUser($user);
                            break;
           default:
                    ajax_error("Unsupported request method.");
        }
    }
    catch(Exception $e)
    {
        $success=0;
        $message=$e->getMessage();
    }
    //Output result
    ajax_result(Array(
                        "success"   => $success,
                        "message"   => $message,
                        "total"     => count($result),
                        "users"     => $result
                     ));

}
catch (\Exception $e)
{
    error_log('[OnlineQuestionnaire] ERROR: '.$e->getMessage().' at '.$e->getFile().':'.$e->getLine(),0);
}

function doInsertUpdateUsers(Array $users, Database $db)
{
    $result=Array();

    foreach ($users as $user)
    {
        if (property_exists($user,'aclID'))
            $aclID=$user->aclID;
        else
            $aclID=null;

        if (!property_exists($user,'username'))
            throw new Exception("Username field not found for user with aclID=",aclID);
        else
            $username=$user->username;

        if (!property_exists($user,'role'))
            $fkRoleID=NULL;
        else
            $fkRoleID=$user->role;

        if (!property_exists($user,'enabled'))
            $enabled=0;
        else
            $enabled=(int)$user->enabled;

        $requested=0;

        $insertID=$db->storeUser($aclID,$username,$fkRoleID, $enabled,$requested);

        $result[]=Array("aclID"=>$insertID,"username"=>$username);
    }

    return $result;
}