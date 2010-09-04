<?php

define('QUERY_LIST_USERS','SELECT *, Acl.id as aclID, Roles.id as roleID FROM Acl INNER JOIN Roles ON (Acl.fkRoleID=Roles.id)');

class Database
{
    protected $_hostname="";
    protected $_username="";
    protected $_password="";
    protected $_dbname="";
    protected $_port=3306;

    protected $_server=null;

    public function __construct($host="",$user="",$pass="",$dbname="",$port=3306)
    {
        if (!class_exists('mysqli'))
            throw new Exception('Configuration Error: Please install the MySQLi extension.');

        $this->setHostname($host);
        $this->setUsername($user);
        $this->setPassword($pass);
        $this->setDBName($dbname);
        $this->setPort($port);

        $server=@new mysqli($this->_hostname, $this->_username,$this->_password, $this->_dbname);

        if ($server->connect_errno)
            throw new Exception($server->connect_error);

        $this->_server=$server;
    }

    public function getHostname()
    {
        return $this->_hostname;
    }

    public function getUsername()
    {
        return $this->_username;
    }

    public function getPassword()
    {
        return $this->_password;
    }

    public function getDBName()
    {
        return $this->_dbname;
    }

    public function getPort()
    {
        return $this->_port;
    }


    public function setHostname($value)
    {
        $this->_hostname=$value;
    }

    public function setUsername($value)
    {
        $this->_username=$value;
    }

    public function setPassword($value)
    {
        $this->_password=$value;
    }

    public function setDBName($value)
    {
        $this->_dbname=$value;
    }

    public function setPort($value)
    {
        $this->_port=$value;
    }


    /** Lists all available users
     * @return Array An associative array containg the query result
     */
    public function listUsers()
    {
        $result=Array();
        
        $query=$this->_server->query(QUERY_LIST_USERS);
        //Store the result
        if ($query->num_rows)
        {
            //Workaround for fetch_all() in case mysqlnd isn't available
            while(($row=$query->fetch_array(MYSQLI_ASSOC)))
                $result[]=$row;
        }
        $query->close();

        return $result;
    }

    /** Lists all available subjects
     * @return Array An associative array containg the query result
     */
    public function listSubjects($sort='DESC')
    {
        $result=Array();
        //ASC or DESC sorting
        if ($sort!="ASC")
            $sort="DESC";

        $query='SELECT  subjectLabel, 
                        COUNT(DISTINCT fkSessionID) as countEntries, 
                        MAX(datetimeAdded)          as dateUpdated 
                        FROM Forms 
                        INNER JOIN Sessions ON (Forms.fkSessionID=Sessions.id) 
                        GROUP BY subjectLabel 
                        ORDER BY dateUpdated '.$sort;

        $query=$this->_server->query($query);
        if ($query->num_rows)
        {
            //Workaround for fetch_all() in case mysqlnd isn't available
            while(($row=$query->fetch_array(MYSQLI_ASSOC)))
                $result[]=$row;
        }

        $query->close();

        return $result;
    }

    /** Retrieves information about a particular username */
    public function searchUser($username=NULL)
    {
        $result=Array();
        if (empty($username))
            return $result;
        $param1=$this->_server->real_escape_string($username);
        $query_string="SELECT *, Acl.id as aclID, Roles.id as roleID FROM Acl LEFT JOIN Roles ON (Acl.fkRoleID=Roles.id) WHERE Acl.username='$username'";
        //Run the query
        $query=$this->_server->query($query_string);
        if ($query===false)
            throw new Exception("SQL [$query_string]\nERROR: ".$this->_server->error);

        if ($query->num_rows)
            $result=$query->fetch_assoc();
        $query->close();
        return $result;
    }

    public function createUser($email)
    {
        $result=Array();

        if (empty($email))
            throw new Exception("Email parameter cannot be empty.");

        $email=$this->_server->real_escape_string($email);

        $query="INSERT INTO Acl (username,enabled,requested)
                VALUES('$email',0,1);";

        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);

            $insertID=$this->_server->insert_id;

            if (empty($insertID) || !is_numeric($insertID))
                throw new Exception("Invalid INSERT ID returned by MySQL for user-to-be ".$email.": '$insertID'");
        }
        catch (Exception $e)
        {
            throw new Exception("Unable to insert new user '".$email."' into the database: ".$e->getMessage());
        }

        $result=Array(
                        "id"=>$insertID,
                        "user"=>$email
                     );

        return $result;

    }

    /** Adds a new session to the Sessions table */
    public function createSession($subjectid,$aclID)
    {
        $result=Array();

        if (empty($subjectid))
            throw new Exception("Subject ID cannot be empty.");
        if (empty($aclID))
            throw new Exception("User ACL ID cannot be empty");

        $label=$subjectid.'_'.date('Y-m-d_H-i-s');
        $label=$this->_server->real_escape_string($label);
        $subjectid=$this->_server->real_escape_string($subjectid);
        $aclID=$this->_server->real_escape_string($aclID);
        
        $query="INSERT INTO Sessions (label,fkAclID,subjectLabel,datetimeCreated,timestampModified)
                VALUES('$label',$aclID,'$subjectid',NOW(),NOW());";
        
        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);

            $insertID=$this->_server->insert_id;

            if (empty($insertID) || !is_numeric($insertID))
                throw new Exception("Invalid INSERT ID returned by MySQL for session-to-be ".$label.": '$insertID'");
        }
        catch (Exception $e)
        {
            throw new Exception("Unable to insert session '".$label."' into the database: ".$e->getMessage());
        }

        $result=Array(
                        "id"=>$insertID,
                        "label"=>$label
                     );

        return $result;
    }

    public function searchSession($label)
    {
        $result=Array();

        if (empty($label))
            return $result;

        $label=$this->_server->real_escape_string($label);
        $query="SELECT * FROM Sessions WHERE label='$label' LIMIT 1;";

        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);

            if ($qr->num_rows)
                    $result=$qr->fetch_assoc();

            $qr->close();
        }
        catch (Exception $e)
        {
            throw new Exception("Cannot search for session '".$label."': ".$e->getMessage());
        }

        return $result;
    }

    public function storeForm($schemaName,$sessionid,$data)
    {
        $result=false;

        if (empty($schemaName))
            throw new Exception("Questionnaire ID cannot be empty.");
        if (empty($sessionid))
            throw new Exception("Session ID cannot be empty.");
        if (!is_numeric($sessionid))
            throw new Exception("Session ID must be numeric.");
        if (empty($data))
            throw new Exception("Form data cannot be empty.");

        $schemaName=$this->_server->real_escape_string($schemaName);
        $sessionid=$this->_server->real_escape_string($sessionid); //paranoia
        $data=$this->_server->real_escape_string($data);

        $query="INSERT INTO Forms(schemaName,fkSessionID,data,dateTimeAdded) VALUES('$schemaName',$sessionid,'$data',NOW());";

        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);

            $insertID=$this->_server->insert_id;
            if ($insertID<=0)
                throw new Exception($this->_server->error);

            $result=$insertID;
        }
        catch (Exception $e)
        {
            throw new Exception("Failed to store form '$schemaName' data for session id $sessionid : ".$e->getMessage());
        }

        return $result;
    }

    public function storeFinalForm($label, $aclID, $data)
    {
        if (!ctype_alnum($label))
            throw new Exception("Subject label must be alphanumeric.");
        if (!ctype_digit($aclID))
            throw new Exception('Invalid Access Control ID specified.');
        if (!strlen($data))
            throw new Exception('Cannot store empty form data.');

        $data=$this->_server->real_escape_string($data);
        //Paranoia
        $aclID=$this->_server->real_escape_string($aclID);
        $label=$this->_server->real_escape_string($label);

        $query="INSERT INTO final_forms(fkAclID,subjectLabel,data)
                VALUES($aclID,'$label','$data')
                ON DUPLICATE KEY UPDATE data=VALUES(data)";

        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);
        }
        catch (Exception $e)
        {
            throw new Exception("Failed to store final form for subject '$label'.".$e->getMessage());
        }
    }

    public function getSubjectFinalData($subjectLabel)
    {
        $result=Array();
        if (!ctype_alnum($subjectLabel))
            throw new Exception('Invalid subject label.');

        $subjectLabel=$this->_server->real_escape_string($subjectLabel);

        $query="SELECT id, fkAclID as aclID, data FROM final_forms WHERE subjectLabel='$subjectLabel'";

        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);

            if ($qr->num_rows)
                $result=$qr->fetch_assoc();
            
            $qr->close();
        }
        catch (Exception $e)
        {
            throw new Exception("Cannot search final form data for subject '".$subjectid."': ".$e->getMessage());
        }

        return $result;
    }

    /** Returns all the data along with all the sessions for this subject */
    public function getSubjectData($subjectid)
    {
        $result=Array();

        $subjectid=$this->_server->real_escape_string($subjectid);
        $query="SELECT *, Forms.id as formID FROM (Forms INNER JOIN Sessions ON (Forms.fkSessionID=Sessions.id) INNER JOIN Acl ON (Sessions.fkAclID=Acl.id)) WHERE subjectLabel='".$subjectid."' ORDER BY fkSessionID DESC,datetimeAdded ASC";

        try
        {
            $qr=$this->_server->query($query);
            if ($qr===false)
                throw new Exception("SQL [$query]\nERROR: ".$this->_server->error);

            if ($qr->num_rows)
            {
                //Store the result
                while (($row=$qr->fetch_assoc())!=NULL)
                    $result[]=$row;
            }

            $qr->close();
        }
        catch (Exception $e)
        {
            throw new Exception("Cannot search data for subject '".$subjectid."': ".$e->getMessage());
        }

        return $result;
    }
}