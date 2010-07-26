<?php
error_reporting(E_ALL);
ini_set('display_errors','On');
date_default_timezone_set("America/New_York");
session_start();
if (!isset($_SESSION['auth']))
    $_SESSION['auth']=false;