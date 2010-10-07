<?php
/* bootstrap.php tabsize=4
 *
 * Bootstraps the application. Edit when going to production.
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
 * @todo Use the config.ini.php file to specify Production/Development-specific
 *       configuration values.
 */
error_reporting(E_ALL);
ini_set('display_errors','On');
date_default_timezone_set("America/New_York");
session_start();
if (!isset($_SESSION['auth']))
    $_SESSION['auth']=false;

//Default config.ini.php should be in the same directory as this file.
define("CONFIG_FILE",dirname(__FILE__)."/config.ini.php");

//Display an error if the user has not setup a config file
if (!file_exists(CONFIG_FILE))
	die("Please create a config.ini.php file, as specified in the README document you should have received along with the OnlineScoring package.");


