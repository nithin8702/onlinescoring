<?php
/* AbstractLogin.php tabsize=4
 *
 * Provides common methods and variables for all children that implement the
 * login() method. Extend this to add a new Login adapter.
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

namespace NRG\Login;

/** A common Login Interface for all Login Adapters
 */
abstract class AbstractLogin
{
    protected $_success=false;
    protected $_loginURL='';
    protected $_source='NRG-LoginAPI-0.1';
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
