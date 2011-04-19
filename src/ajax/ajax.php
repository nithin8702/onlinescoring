<?php
/* ajax.php tabsize=4
 *
 * Common include file for all AJAX request handlers. Performs common bootstrap
 * tasks for ajax requests. Traps PHP errors, logs them to syslog and returns
 * a generic server error message.
 * 
 *      ajax_error()        Terminates the execution and outputs an error message (JSON)
 *      ajax_result()       Terminates the execution with a success code (JSON)
 *      get_mail_headers()  Generates appropriate mail headers based on the config file
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

require_once "../bootstrap.php";
require_once "../NRG/Configuration.php";

set_include_path(get_include_path().PATH_SEPARATOR.'../');

set_error_handler("error_handler");

//Commit mail settings
$config=new \NRG\Configuration(CONFIG_FILE);
$mailconf=$config->Mail;

if (isset($mailconf) && !empty($mailconf))
{
    if (isset($mailconf['host']))
        ini_set('SMTP',$mailconf['host']);
    if (isset($mailconf['from']))
        ini_set('sendmail_from',$mailconf['from']);
}





/** Returns an error message to an ajax request.
 * @param String $message Error message
 * @return JSON
 */
function ajax_error($message='An internal error has occurred')
{
    header('Content-type: application/json');

    $result=Array(
                    "success"=>0,
                    "message"=>$message
                 );
    ajax_result($result);
}

/** Returns the result of an AJAX request in a JSON object.
 * @param array $result Result/List of fields to encode
 * @result JSON
 */
function ajax_result(Array $result)
{
    header('Content-type: application/json');

    print json_encode($result);
    flush();
    exit();
}

/** Traps PHP errors and logs them to syslog. Outputs a generic JSON error
 * Calls ajax_error() which terminates the execution.
 * @param <type> $errno     Error number
 * @param <type> $errstr    Error message
 * @param <type> $errfile   Path to the file where the error occurred
 * @param <type> $errline   The line number where the error occurred
 */
function error_handler($errno,$errstr,$errfile,$errline)
{
    //Only enable debug output for localhost
    if ($_SERVER['REMOTE_ADDR']!="127.0.0.1")
    {
        error_log('[OnlineScoring] ERROR: '.$errstr.' at '.$errfile.':'.$errline,0);
        ajax_error("The server is experiencing technical difficulties. Please try again later.");
    }

    ajax_error($errstr.' at '.$errfile.':'.$errline);
}

/** Builds a string containing appropriate mail headers to be passed to mail().
 * Check the [Mail] section of the config.ini.php file.
 * @param \NRG\Configuration $config the global configuration object
 * @return String
 */
function get_mail_headers(\NRG\Configuration $config)
{
    return 'From: '.$config->Mail['from']."\r\n" .'X-Mailer: PHP/' . phpversion();
}