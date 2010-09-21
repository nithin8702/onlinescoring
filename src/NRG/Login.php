<?php
/* Login.php tabsize=4
 *
 * A generic class Login which is supposed to instaciate specific login adapters
 * depending on the domain name specified by the $username field.
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
 *
 * @warning Work in progress.
 * @todo    Make it happen.
 */
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