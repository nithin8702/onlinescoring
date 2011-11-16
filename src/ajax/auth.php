<?php
/* auth.php tabsize=4
 *
 * Returns an error if the user is not authenticated. Include this file at the
 * top of your scripts to limit access to those script to logged in users only.
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

/* Validate the session */
if (!isset($_SESSION['auth']) || (!$_SESSION['auth']))
{
    $result=Array(
                    "success"=>0,
                    "message"=>"We're really sorry, but you've been idle for a while and your session has expired.<br><br>You will now be logged out and prompted to login again.",
                    "action"=>"refresh"
    );
    ajax_result($result);
}

function setClearanceLevel($level)
{
    if ((int)$_SESSION['clearance']<$level)
        ajax_error('You do not have sufficient permissions to perform this operation.');
}