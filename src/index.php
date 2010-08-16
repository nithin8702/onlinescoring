<?php

    require_once 'bootstrap.php';
//    require_once 'database.php';
//
//    try
//    {
//        $db=new Database('127.0.0.1', 'root', '%root1', 'onlinescoring');
//
//        print_r($db->getUser('victor.petrov@gmail.com'));
//    }
//    catch (Exception $e)
//    {
//        print_r($e);
//    }
//
//    die;
    
//    $_SESSION['auth']=true; //TODO: CHANGE ME
?>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Online Scoring</title>
        <link rel="stylesheet" href="js/lib/ext-3.2.1/resources/css/ext-all.css" type="text/css"/>
        <script type="text/javascript" src="js/lib/ext-3.2.1/adapter/ext/ext-base-debug-w-comments.js"></script>
        <script type="text/javascript" src="js/lib/ext-3.2.1/ext-all-debug-w-comments.js"></script>
        <script type="text/javascript">
            //Hack to get around some browser not having a default console object
            if ((typeof(window.console)=="undefined") || (window.console==null))
                window.console={log:function(){},error:function(){},warn:function(){}};
        </script>

        <?php if ($_SESSION['auth']===true): ?>
            <link rel="stylesheet" href="css/application.css" type="text/css"/>

            <!-- overrides to base library -->
            <link rel="stylesheet" type="text/css" href="js/lib/ext/ux/css/Portal.css" />
            <link rel="stylesheet" type="text/css" href="js/lib/ext/ux/css/GroupTab.css" />

            <!-- extensions -->
            <script type="text/javascript" src="js/lib/ext/ux/GroupTabPanel.js"></script>
            <script type="text/javascript" src="js/lib/ext/ux/GroupTab.js"></script>

            <script type="text/javascript" src="js/lib/ext/ux/Portal.js"></script>
            <script type="text/javascript" src="js/lib/ext/ux/PortalColumn.js"></script>
            <script type="text/javascript" src="js/lib/ext/ux/Portlet.js"></script>
            
            <!-- Forms -->
            <script type="text/javascript" src="js/store/countries.js"></script>
            <script type="text/javascript" src="js/store/states.js"></script>
            <script type="text/javascript" src="js/forms/common.js"></script>
            <script type="text/javascript" src="js/forms/AlcoholTobacco.js"></script>
            <script type="text/javascript" src="js/forms/Demographics.js"></script>
            <script type="text/javascript" src="js/forms/Education.js"></script>
            <script type="text/javascript" src="js/forms/EthnicityHandedness.js"></script>
            <script type="text/javascript" src="js/forms/Occupation.js"></script>
            <script type="text/javascript" src="js/forms/Health.js"></script>
            <!-- INDEX -->
            <script type="text/javascript" src="js/index.js.php"></script>
        <?php else: ?>
            <script type="text/javascript" src="js/lib/ext/ext.util.md5.js"></script>
            <script type="text/javascript" src="js/login.js"></script>
        <?php endif ?>
    </head>
    <body>
        <div id="divRegister" style="display:none"></div>
    </body>
</html>
