<?php
/* Configuration.php tabsize=4
 *
 * A simple Configuration class that parses INI files and provides convenient
 * methods to access config properties. Property groups are returned as Arrays.
 * One could also get/set properties directly on the object, since this class is
 * using the PHP magic methods __get()/__set().
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
 * @todo Add ability to save configuration.
 */

namespace NRG;
/**
 * Loads a configuration INI file.
 */
class Configuration
{
    protected $_config=Array();

    /** Defaults constructor
     */
    public function __construct($file="config.ini.php")
    {
        $this->_config=$this->getConfig($file);
    }

    public function __get($property)
    {
        if (isset($this->_config[$property]))
            return $this->_config[$property];

        return null;
    }

    public function __set($property,$value)
    {
        $this->_config[$property]=$value;
    }

    /** Reads the configuration .ini file and returns an associative array
     *
     * @param string $config_file Path to the configuration file
     * @return An associative array with all the keys from the config file
     */
    private function getConfig($config_file)
    {
        $config=null;

        //Check cache
        if (function_exists('apc_fetch'))
            $config=apc_fetch($config_file);

        //On cache miss, load config from disk
        if (empty($config))
        {
            $config=parse_ini_file($config_file,true);
            if (empty($config))
                throw new Exception("Invalid configuration file. Please edit ".$config_file);
            //Try to store the configuration file in cache
            if (function_exists('apc_store'))
                apc_store($config_file, $config);
        }

        return $config;
    }
}