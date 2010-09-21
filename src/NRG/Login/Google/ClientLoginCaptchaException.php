<?php
/* ClientLoginCaptchaException.php tabsize=4
 *
 * When Google thinks it had enough of your invalid requests, it will ask you to
 * supply a code shown in an image. This exception should be thrown to indicate
 * that the user has to input the code in the image. Use getCaptchaURL() and
 * getCaptchaToken() to retrieve the image that needs to be displayed and the
 * token to be verified by google along with the code entered by the user.
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
namespace NRG\Login\Google;

require_once "ClientLoginException.php";

/** A custom exception class triggered when the ClientLogin API responds with a
 * Captcha challenge. This class contains the Captcha URL and Token that can be
 * used to repeat the login request.
 * @extends \Google\ClientLoginException
 */
class ClientLoginCaptchaException extends ClientLoginException
{
    protected $_captchaURL='';
    protected $_captchaToken='';

    /** Default constructor: calls the parent constructor
     * @param string $message Error message
     * @param Exception $previous Previous Exception
     */
    public function __construct($captchaURL, $captchaToken)
    {
        // make sure everything is assigned properly
        parent::__construct("Captcha image validation required.");

        $this->_captchaURL=$captchaURL;
        $this->_captchaToken=$captchaToken;
    }

    /** Returns the Captcha URL to be prefixed by 'http://www.google.com/accounts'
     * @return string Captcha URL
     */
    public function getCaptchaURL()
    {
        return $this->_captchaURL;
    }

    /** Returns the captcha token to repeat the login request
     * @return string
     */
    public function getCaptchaToken()
    {
        return $this->_captchaToken;
    }
}
