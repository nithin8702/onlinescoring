<?php

namespace NRG;

class Login
{
    protected $_username="";
    protected $_password="";
    protected $_cleartext=false;


    /** Constructor.
     * @param String $username The username, e-mail or the user ID
     * @param String $password The user's password hash or text
     * @param Boolean $cleartext Whether the password is cleartext or hashed.
     */
    public function __construct($username="", $password="", $cleartext=false)
    {
        $this->username($username);
        $this->password($password);
        $this->cleartext($cleartext);
    }

    /** Gets or sets the username.
     * @param String $value Optional new username value.
     * @return String The current username
     */
    public function username($value=null)
    {
        if (!isset($value))
            $this->_username=$value;    //SET

        return $this->_username;        //GET
    }

    /** Gets or sets the password.
     * @param String $value Optional new password
     * @return String The current password
     */
    public function password($value=null)
    {
        if (isset($value))
            $this->_password=$value;    //SET

        return $this->_password;        //GET
    }

    /** Gets or sets the cleartext password mode.
     *
     * @param bool $value Optional: True to set the cleartext mode on, false to off.
     * @return bool The current cleartext value
     */
    public function cleartext(bool $value)
    {
        if (isset($value))
               $this->_cleartext=$value; //SET

        return $this->_cleartext;       //GET
    }
}