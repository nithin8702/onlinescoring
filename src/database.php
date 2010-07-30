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
        if ($query->num_rows)
            $result=$query->fetch_all(MYSQLI_ASSOC);

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
        $query_string=QUERY_LIST_USERS." WHERE Acl.username='$username'";
        //Run the query
        $query=$this->_server->query($query_string);
        if ($query===false)
            throw new Exception("SQL [$query_string]\nERROR: ".$this->_server->error);

        if ($query->num_rows)
            $result=$query->fetch_assoc();
        $query->close();
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

    public function storeForm($qid,$sessionid,$data)
    {
        $result=false;

        if (empty($qid))
            throw new Exception("Questionnaire ID cannot be empty.");
        if (empty($sessionid))
            throw new Exception("Session ID cannot be empty.");
        if (!is_numeric($sessionid))
            throw new Exception("Session ID must be numeric.");
        if (empty($data))
            throw new Exception("Form data cannot be empty.");

        $qid=$this->_server->real_escape_string($qid);
        $sessionid=$this->_server->real_escape_string($sessionid); //paranoia
        $data=$this->_server->real_escape_string($data);

        $query="INSERT INTO Forms(qid,fkSessionID,data,dateTimeAdded) VALUES('$qid',$sessionid,'$data',NOW());";

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
            throw new Exception("Failed to store form '$qid' data for session id $sessionid : ".$e->getMessage());
        }

        return $result;
    }
}