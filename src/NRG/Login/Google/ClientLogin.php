<?php
namespace NRG\Login\Google;

require_once "NRG/Login/AbstractLogin.php";
require_once "NRG/Login/Google/ClientLoginException.php";
require_once "NRG/Login/Google/ClientLoginCaptchaException.php";

define('HTTP_RESPONSE_OK',200);
define('HTTP_RESPONSE_FORBIDDEN',403);
define('CLIENT_LOGIN_URL','https://www.google.com/accounts/ClientLogin');
define('CAPTCHA_URL_PREFIX','http://www.google.com/accounts/');

/** Implements the Google ClientLogin interface to login a client using an
 * email and password.
 *
 * @see http://code.google.com/apis/gdata/faq.html#clientlogin for details on
 * the service constants.
 */
class ClientLogin extends \NRG\Login\AbstractLogin
{
    /* Account types constants*/
    const ACCOUNT_GOOGLE='GOOGLE';
    const ACCOUNT_HOSTED='HOSTED';
    const ACCOUNT_HOSTED_OR_GOOGLE='HOSTED_OR_GOOGLE';

    /* Service constants */
    const SERVICE_ANALYTICS='analytics';
    const SERVICE_PROVISIONING='apps';
    const SERVICE_BASEDATA='gbase';
    const SERVICE_SITES='jotspot';
    const SERVICE_BLOGGER='blogger';
    const SERVICE_BOOK_SEARCH='print';
    const SERVICE_CALENDAR='cl';
    const SERVICE_CODE_SEARCH='codesearch';
    const SERVICE_CONTACTS='cp';
    const SERVICE_DOCS='writely';
    const SERVICE_FINANCE='finance';
    const SERVICE_GMAIL='mail';
    const SERVICE_HEALTH='health';
    const SERVICE_HEALTH_SANDBOX='weaver';
    const SERVICE_MAPS='local';
    const SERVICE_PICASA='lh2';
    const SERVICE_SIDEWIKI='annotateweb';
    const SERVICE_SPREADSHEETS='wise';
    const SERVICE_WEBMASTER='sitemaps';
    const SERVICE_YOUTUBE='youtube';
    const SERVICE_SEARCH='cprose';
    const SERVICE_TRANSLATOR='gtrans';
    const SERVICE_FEEDBURNER='feedburner';
    const SERVICE_PREDICTION='xapi';
    const SERVICE_GENERIC='xapi';

    /* Protected members */
    protected $_service=self::SERVICE_GENERIC;
    protected $_accountType=self::ACCOUNT_HOSTED_OR_GOOGLE;
    protected $_contentType='application/x-www-form-urlencoded';

    protected $_captchaText='';
    protected $_captchaToken='';
    

    /** Default constructor
     * @param string $email     User's email
     * @param string $password  User's password
     */
    public function __construct($email='', $password='')
    {
        if (!class_exists('HttpRequest'))
            throw new \Exception("Please install the pecl_http extension.");

        $this->setLoginURL(CLIENT_LOGIN_URL);
        $this->setUsername($email);
        $this->setPassword($password);
    }

    /** Getsthe Google ClientLogin service id
     * @return string The service id
     * @see The SERVICE_* public constants of this class
     */
    public function getService()
    {
        return $this->_service;
    }

    /** Sets the Google ClientLogin service id
     * @param string $value New service id
     * @see The SERVICE_* public constants of this class
     */
    public function setService($value)
    {
        $this->_service=$value;
    }

    /** Gets the type of account validation to be performed by Google.
     * @return string The account type
     * @see http://code.google.com/apis/accounts/docs/AuthForInstalledApps.html#AuthProcess
     * @see Public ACCOUNT_* constants of this class
     */
    public function getAccountType()
    {
        return $this->_accountType;
    }

    /** Sets the type of account validation to be performed by Google.
     * @param string $value New account type auth
     * @see http://code.google.com/apis/accounts/docs/AuthForInstalledApps.html#AuthProcess
     * @see Public ACCOUNT_* constants of this class
     */
    public function setAccountType($value=null)
    {
        $this->_accountType=$value;
    }

    /** Gets the contentType to be used when making login requests.
     * According to the Google ClientLogin docs, it should be 'application/x-www-form-urlencoded'
     * @see http://code.google.com/apis/accounts/docs/AuthForInstalledApps.html#AuthProcess
     */
    public function getContentType()
    {
        return $this->_contentType;
    }

    /** Sets the contentType to be used when making login requests.
     * According to the Google ClientLogin docs, it should be 'application/x-www-form-urlencoded'
     * @param string $value
     * @see http://code.google.com/apis/accounts/docs/AuthForInstalledApps.html#AuthProcess
     */
    public function setContentType($value)
    {
        $this->_contentType=$value;
    }

    /** Gets the Captcha text
     * @return string The Captcha text
     */
    public function getCaptchaText()
    {
        return $this->_captchaText;
    }

    /** Sets the Captcha text
     * @param string $value Captcha Text provided by the user
     */
    public function setCaptchaText($value)
    {
        $this->_captchaText=$value;
    }

    /** Gets the Captcha token
     * @return string The Captcha token
     */
    public function getCaptchaToken()
    {
        return $this->_captchaToken;
    }

     /** Sets the Captcha token
     * @param string $value Token provided by Google (sent to the client first)
     */
    public function setCaptchaToken($value)
    {
        $this->_captchaToken=$value;
    }

    /** Returns the session key for this class
     * @return string Session ID
     */
    public function getSessionKey()
    {
        return __CLASS__;
    }

    /** Performs the first login attempt
     *
     */
    public function login()
    {
        try
        {
            //Create a new POST request
            $request=new \HttpRequest($this->_loginURL, \HTTP_METH_POST);
            //Set the content type
            $request->setContentType($this->_contentType);
            //Add POST data
            $request->addPostFields(Array(
                                            'accountType'=> $this->_accountType,
                                            'Email'      => $this->_username,
                                            'Passwd'     => $this->_password,
                                            'service'    => $this->_service,
                                            'source'     => $this->_source
                                         ));

            //Should we include Captcha information?
            if (!empty($this->_captchaText) && !empty($this->_captchaToken))
                    $request->addPostFields(Array(
                                                    'logintoken'  => $this->_captchaToken,
                                                    'logincaptcha'=> $this->_captchaText
                                                 ));

//            print '------- REQUEST -------------';
//            print_r($request);
            //
            //Make the request
            $response=$request->send();

//            print '------- RESPONSE ------------';
//            print_r($response);

            //Success?
            if ($response->getResponseCode()==HTTP_RESPONSE_OK)
            {
                //Split the repsonse body into tokens
                $tokens=explode("\n",$response->getBody());
                //Save each token into the session object
                foreach($tokens as $id_val)
                {
                    //Split into token_name=
                    $token=explode('=',$id_val);
                    if (empty($token[0]))       //Skip invalid tokens
                        continue;
                    //Save the tokens in the session object for future use
                    $_SESSION[$this->getSessionKey().'::'.$token[0]]=$token[1];
                }

                $this->_success=true;
                return true;
            }

            //Captcha?
            if ($response->getResponseCode()==HTTP_RESPONSE_FORBIDDEN)
            {
                $captchaURL='';
                $captchaToken='';

                //Split the response body into tokens
                $tokens=explode("\n",$response->getBody());
                foreach($tokens as $id_val)
                {
                    //This splits the parameters we got from Google into
                    //ID=Value strings. $token[0]=id, $token[1]=value.
                    //'2' allows the token to contain '=' chars
                    $token=explode('=',$id_val,2);
                    if ($token[0]=='CaptchaUrl')
                        $captchaURL=CAPTCHA_URL_PREFIX.trim($token[1]);
                    elseif ($token[0]=='CaptchaToken')
                        $captchaToken=trim($token[1]);
                }
                //Should we throw a CaptchaException?
                if (!empty($captchaToken) && !empty($captchaURL))
                    throw new ClientLoginCaptchaException($captchaURL,$captchaToken);
                else
                    throw new ClientLoginException($request->getBody());
            }
        }
        catch (HttpException $e)
        {
            throw new ClientLoginException("An error has occurred while trying".
                    " to login: ".$e->getMessage(), $e);
        }

        //For all other responses, return false
        return false;
    }
}
