<?php
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