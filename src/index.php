<?php
/* index.php tabsize=4
 *
 * This file is the main entry point into the application. It tells the browser
 * to load different Javascript files, depending on whether the user is logged in
 * or not. $_SESSION['auth'] is used to check the authentication status of the user.
 * Also, this file checks the clearance level of an authenticated user and outputs
 * relevant <script> tags. $_SESSION['clearance'] is used to check the clearance
 * level.
 *
 * @author  Victor Petrov <victor_petrov@harvard.edu>
 * @date    July 20, 2010
 * @copyright (c) 2010 The Presidents and Fellows of Harvard College
 * @copyright (c) 2010 The Neuroinformatics Research Group at Harvard University
 * @license   GPLv3 http://www.gnu.org/licenses/gpl-3.0.txt
 * -----------------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * -----------------------------------------------------------------------------
 */
    require_once 'bootstrap.php';
?>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Online Scoring</title>
        <link rel="stylesheet" href="js/lib/ext-3.3.1/resources/css/ext-all.css" type="text/css"/>
        <script type="text/javascript" src="js/lib/ext-3.3.1/adapter/ext/ext-base-debug.js"></script>
        <script type="text/javascript" src="js/lib/ext-3.3.1/ext-all-debug-w-comments.js"></script>
        <script type="text/javascript">
            //Hack to get around some browser not having a default console object
            if ((typeof(window.console)=="undefined") || (window.console==null))
                window.console={log:function(){},error:function(){},warn:function(){}};
        </script>

        <?php if ($_SESSION['auth']===true)
              {
        ?>
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

            <script type="text/javascript" src="js/lib/ext/ux/PagingStore.js"></script>
            <script type="text/javascript" src="js/lib/ext/ux/PagingRowNumberer.js"></script>

            <!-- Grid Search -->
            <script type="text/javascript" src="js/lib/ext/ux/Util.js"></script>
            <script type="text/javascript" src="js/lib/ext/ux/GridSearch.js"></script>
            <link rel="stylesheet" type="text/css" href="js/lib/ext/ux/css/GridSearch.css" />

        <?php if ($_SESSION['clearance']>=30):?>
            <!-- DatePickerPlus CSS-->
            <link rel="stylesheet" type="text/css" href="js/lib/ext/ux/css/DatePickerPlus.css"/>
            <link rel="stylesheet" type="text/css" href="js/lib/ext/ux/css/DatePickerPlusPlus.css"/>
            <script type="text/javascript" src="js/lib/ext/ux/DatePickerPlus.js"></script>
            <script type="text/javascript" src="js/lib/ext/ux/DatePickerPlusPlus.js"></script>

            <!-- Forms View -->
            <script type="text/javascript" src="js/store/countries.js"></script>
            <script type="text/javascript" src="js/store/states.js"></script>
            <script type="text/javascript" src="js/forms/common.js"></script>
            <script type="text/javascript" src="js/forms/AlcoholTobacco.js"></script>
            <script type="text/javascript" src="js/forms/Demographics.js"></script>
            <script type="text/javascript" src="js/forms/Education.js"></script>
            <script type="text/javascript" src="js/forms/EthnicityHandedness.js"></script>
            <script type="text/javascript" src="js/forms/Occupation.js"></script>
            <script type="text/javascript" src="js/forms/Health.js"></script>
            <script type="text/javascript" src="js/forms/Lifestyle.js"></script>
            <script type="text/javascript" src="js/forms/Interactions.js"></script>
            <script type="text/javascript" src="js/forms/HormoneMenstrualCycle.js"></script>
            <script type="text/javascript" src="js/forms/HollingsheadIndex.js"></script>
        <?php endif; ?>

        <?php if ($_SESSION['clearance']>=50):?>
            <!-- Diff View -->
            <script type="text/javascript" src="js/lib/ext/ux/GridSearch.js"></script>
            <script type="text/javascript" src="js/diff.js"></script>
        <?php endif; ?>

        <?php if ($_SESSION['clearance']>=90):?>
            <!-- Users View -->
            <link rel="stylesheet" type="text/css" href="js/lib/ext/ux/css/RowEditor.css"/>
            <script type="text/javascript" src="js/lib/ext/ux/RowEditor.js"></script>
            <script type="text/javascript" src="js/users.js"></script>
        <?php endif; ?>

            <!-- INDEX -->
            <script type="text/javascript" src="js/index.js.php"></script>
        <?php  //if auth===false
              }
            else
            {
        ?>
            <script type="text/javascript" src="js/lib/ext/ext.util.md5.js"></script>
            <script type="text/javascript" src="js/login.js"></script>
        <?php
            }
        ?>
    </head>
    <body oncontextmenu="return false;">
        <div id="divRegister" style="display:none"></div>
    </body>
</html>
