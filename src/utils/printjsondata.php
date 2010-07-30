<!DOCTYPE HTML>
<html>
    <head>
        <title>Subject Data</title>
        <style>
            tr:nth-child(odd)
            {
                background-color:#E0E0E6;
            }
        </style>
    </head>
    <body>
        <div style="height:1000px">
<?php
require_once "../bootstrap.php";
require_once "../NRG/Configuration.php";
require_once "../database.php";

if (!isset($_GET['id']))
    throw new Exception("Please specify a subject ID.");

$subjectid=trim($_GET['id']);

$limit=0;
if (isset($_GET['limit']))
    $limit=trim($_GET['limit']);

print "<b>$subjectid</b><br/>";
try
{
    $config=new \NRG\Configuration("../config.ini.php");
    $dbconfig=$config->Database;
    $db=new Database($dbconfig['host'],$dbconfig['user'],$dbconfig['pass'],$dbconfig['name']);

    if (!$db)
        throw new Exception("Couldn't connect to the database.");

    $result=$db->getSubjectData($subjectid);

    $lastsid=null;
    $count=0;
    if (!empty($result))
    {
        foreach ($result as $row)
        {
            $user=$row['username'];
            $date=$row['datetimeAdded'];
            $qid=$row['qid'];
            $sid=$row['fkSessionID'];
            $data=json_decode($row['data'],true);

            if ($sid!=$lastsid)
            {
                $count++;
                if (($limit) && ($count>$limit))
                    break;
                if ($lastsid!=null)
                {
                    print "</tbody></table></div>";
                    print "<div style='float:left'>";
                }
                else
                    print "<div style='float:left'>";

                print "<table border=0 cellspacing=0 style='border:1px solid gray; font-family:Verdana;font-size:12px'><tbody>";
                print "<tr style='background-color:#C0C0DD'><td><b>Date:</b></td><td>$date</td></tr>";
                print "<tr style='background-color:#C0C0DD;'><td><b>User:</b></td><td>$user</td></tr>";
            }

           foreach ($data as $field=>$value)
               print "<tr><td>$field</td><td>$value</td></tr>";

            $lastsid=$sid;
         }

         print "</tbody></table></div>";
    }
    else
        print "No data found.";
}
catch (Exception $e)
{
    print $e->getMessage();
}
?>
        </div>
</body>
</html>