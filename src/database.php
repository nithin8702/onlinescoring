<?php

define('QUERY_LIST_USERS','SELECT * FROM Acl INNER JOIN Roles ON (Acl.fkRoleID=Roles.id)');

class Database
{
    protected $_hostname="";
    protected $_username="";
    protected $_password="";
    protected $_dbname="";

    protected $_server=NULL;

    public function __construct($host="",$user="",$pass="",$dbname="")
    {
        $this->setHostname($host);
        $this->setUsername($user);
        $this->setPassword($pass);
        $this->setDBName($dbname);

        $this->_server=new mysqli($this->_hostname, $this->_username,
                $this->_password, $this->_dbname);
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


    /** Lists all available users
     * @return Array An associative array containg the query result
     */
    public function getUsers()
    {
        $result=Array();
        
        $query=$this->_server->query(QUERY_LIST_USERS);
        if ($query->num_rows)
            $result=$query->fetch_all(MYSQLI_ASSOC);

        $query->close();

        return $result;
    }

    /** Retrieves information about a particular username */
    public function getUser($username=NULL)
    {
        $result=Array();
        if (empty($username))
            return $result;
        $param1=$this->_server->real_escape_string($username);
        $query_string=QUERY_LIST_USERS." WHERE Acl.username='$username'";
        //Run the query
        $query=$this->_server->query($query_string);

        if ($query->num_rows)
            $result=$query->fetch_assoc();

        return $result;
    }
}