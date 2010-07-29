<?php

namespace NRG;
/**
 * Description of Configuration
 *
 * @author Victor
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