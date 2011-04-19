<?php
/* ClientLoginException.php tabsize=4
 *
 * A base class for all exceptions thrown by the ClientLogin class.
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

/** A custom exception class triggered when the ClientLoginException failed.
 * @extends \Exception
 */
class ClientLoginException extends \Exception
{
    /** Default constructor: calls the parent constructor
     * @param <type> $message Error message
     * @param Exception $previous Previous Exception
     */
    public function __construct($message, Exception $previous = null)
    {
        // make sure everything is assigned properly
        parent::__construct($message, 0, $previous);
    }
}