<?php
require_once "bootstrap.php";

$xmlstring='  <form version="1.0">
            <EH_SEX>1</EH_SEX>
        </form>
"';

$xml=new DomDocument();
$xml->loadXML(trim($xmlstring));
$result=$xml->schemaValidate('schemas/EH.xsd');

if ($result)
    print "Valid";
else
    print "Invalid";