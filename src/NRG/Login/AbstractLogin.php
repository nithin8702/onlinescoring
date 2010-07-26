<?php

namespace NRG\Login;

/** A common Login Interface for all Login Adapters
 *
 * @author Victor Petrov
 */
abstract class AbstractLogin
{
    protected $_success=false;
    protected $_loginURL='';
    protected $_source='NRG-GoogleAPI-0.1';
    protected $_username='';
    protected $_password='';


    /** Override this function to perform the actual login.
    * @return
    */
    public abstract function login();

    /** Gets the username.
     * @return string The user's email
     */
    public function getUsername()
    {
        return $this->_email;
    }

    /** Sets the user's username.
     * @param string $value New email value
     */
    public function setUsername($value)
    {
        $this->_username=$value;
    }

    /** Gets the user's password
     * @return string The password
     */
    public function getPassword()
    {
        return $this->_password;
    }

    /** Sets the user's password
     * @param string $value New password
     */
    public function setPassword($value)
    {
        $this->_password=$value;
    }

    /** Checks whether the login succeeded or not
     * @return bool true on Success, false on Failure
     */
    public function isSuccessful()
    {
        return $this->_success;
    }

    /** Gets the URL to the Google ClientLogin service
     * @return string The ClientLogin URL
     */
    public function getLoginURL()
    {
        return $this->_loginURL;
    }

    /** Sets the URL to the Google ClientLogin service
     * @param string $value New URL
     */
    public function setLoginURL($value)
    {
        $this->_loginURL=$value;
    }

    /** Gets the Google ClientLogin source
     * @return string the Source
     */
    public function getSource()
    {
        return $this->_source;
    }

    /** Sets the Google ClientLogin source
     * @param string $value New source
     */
    public function setSource($value)
    {
        $this->_source=$value;
    }

}
?>
