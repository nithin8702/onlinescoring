<?php

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