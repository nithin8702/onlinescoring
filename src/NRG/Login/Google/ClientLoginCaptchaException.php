<?php

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
