<?php
/* index.js.php tabsize=4
 *
 * Defines the general layout and the tabs (depending on the user's clearance
 * level). The Javascript code makes reference to components defined in other
 * files (such as users.js and diff.js), thus those need to be loaded in the
 * browser first.
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

    session_start();
    header('Content-type: text/javascript');
?>

Ext.onReady(function() {

Ext.getBody().on("contextmenu",Ext.emptyFn,null,{preventDefault:true});

<?php if ((int)$_SESSION['clearance']>=30): ?>
var tabForms=       {
                        id:'tabForms',
                        xtype:'tabpanel',
                        border:false,
                        bodyBorder:false,
                        autoScroll:true,
                        hidden:true,
                        activeTab:0,
                        listeners:  {
                                        //Select the first input element in the tab panel
                                        show:onTabShow,
                                        beforetabchange:onBeforeTabChange
                                    },
                        items:  [
                                    NRG.Forms.EthnicityHandedness,
                                    NRG.Forms.Demographics,
                                    NRG.Forms.Education,
                                    NRG.Forms.Occupation,
                                    NRG.Forms.Health,
                                    NRG.Forms.AlcoholTobacco
                                ]

                    };

var toolbarForms=   {
                        xtype:'toolbar',
                        buttons:[
                                    {
                                        id:'btnSave',
                                        xtype:'button',
                                        text:'<b>Save</b>',
                                        icon:'images/icons/save.png',
                                        hidden:false,
                                        disabled:true,
                                        handler:btnSaveClicked
                                    },
                                    {
                                        xtype:'tbseparator'
                                    },
                                    {
                                        xtype:'label',
                                        forId:'txtSubjectID',
                                        iconCls:'x-icon-subject',
                                        html:'Subject ID:&nbsp;'
                                    },
                                    {
                                        id:'txtSubjectID',
                                        xtype:'textfield',
                                        allowBlank:false,
                                        blankText:'You must enter a subject ID',
                                        maskRe:/^[A-Za-z0-9]+$/,
                                        regex:/^.+$/,
                                        regexText:'Invalid Subject ID.',
                                        enableKeyEvents:true,
                                        listeners:  {
                                                        keypress:onSIDKeyEnter
                                                    }
                                    },
                                    {
                                        id:'btnGo',
                                        xtype:'button',
                                        text:'Go',
                                        icon:'images/icons/go.png',
                                        handler:btnGoClicked
                                    },
                                    {
                                        id:'btnReset',
                                        xtype:'button',
                                        text:'Reset',
                                        handler:resetForms,
                                        icon:'images/icons/reset.png'
                                    },
                                    '->',
                                    {
                                        id:'form_version',
                                        xtype:'tbtext',
                                        html:''
                                    },
                                    '-',
                                    '<img src="images/icons/clock.png"/>',
                                    {
                                        id:'clock',
                                        xtype:'tbtext',
                                        html:'00:00'
                                    },
                                    '-',
                                    {
                                        id:'btnHistory',
                                        xtype:'button',
                                        text:'History',
                                        enableToggle:true,
                                        icon:'images/icons/history.png',
                                        toggleHandler:btnHistoryToggled
                                    },
                                    {
                                        id:'btnHelp',
                                        xtype:'button',
                                        text:'Help',
                                        icon:'images/icons/help.png',
                                        handler:btnHelpClicked
                                    }

                                ]
                    }

var storeHistory=new Ext.ux.data.PagingJsonStore({
                    id:'storeHistory',
                    storeId:'storeHistory',
                    url:'ajax/mysubjects.php',
                    autoLoad:false,
                    autoDestroy:true,
                    root:'subjects',
                    totalProperty:'total',
                    idProperty:'label',
                    fields: [
                                'label',
                                'dateUpdated'
                            ],
                    sortInfo:   {
                                    field:'dateUpdated',
                                    direction:'DESC'
                                },
                    listeners:  {
                                   load:onHistoryLoaded
                                }
});

var gridHistory=    {
                        xtype:'grid',
                        id:'gridHistory',
                        stripeRows:true,
                        border:true,
                        loadMask:true,
                        width:250,
                        columns:[
                                    {
                                        id:'label',
                                        header:'Subject',
                                        sortable:true,
                                        dataIndex:'label'
                                    },
                                    {
                                        id:'dateUpdated',
                                        header:'Last updated',
                                        sortable:true,
                                        dataIndex:'dateUpdated',
                                        width:125
                                    }
                                ],
                        store:storeHistory,
                        tbar: new Ext.PagingToolbar({
                                    pageSize: 20,
                                    store: storeHistory,
                                    displayInfo: false,
                                    listeners:  {
                                                    change:onHistoryPageChanged
                                                }
                                }),
                        bbar: {
                                    xtype:'toolbar',
                                    items:  [
                                                {
                                                    id:'historyPageProgressBar',
                                                    xtype:'progress',
                                                    value:0.5,
                                                    text:'Loading ...',
                                                    width:280
                                                }
                                            ]

                              },
                        sm:new Ext.grid.RowSelectionModel()
                    };

function onHistoryPageChanged(toolbar, data)
{
    if (typeof(toolbar.ownerCt.loadMask)=="object")
        toolbar.ownerCt.loadMask.disable();

     //subjects per page
    var spp=toolbar.pageSize;
    var start=spp*(data.activePage-1) + 1;
    var end=spp*data.activePage;

    if (end>data.total)
        end=data.total;

    var pb=Ext.getCmp('historyPageProgressBar');
    if (!pb)
        return;

    if (data.total==0)
        pb.updateProgress(0,'No subjects to display');
    else
        pb.updateProgress(end/data.total,'Displaying subjects '+start+' - '+end+' of '+data.total,true);
}

function onHistoryLoaded(store, records, options)
{
    var grid=Ext.getCmp('entryRegionEast');
    grid.setTitle('History ('+store.getTotalCount()+')','');
}

var panelForms=     {
                        id:'panelForms',
                        xtype:'panel',
                        frame:true,
                        tbar:toolbarForms,
                        autoScroll:true,
                        bodyStyle:'background-color:white',
                        html:'<span id="panelFormsWelcome" class="data-entry-help" style="margin-left:20px">\
<p>&nbsp;To get started, please enter a Subject ID in the box above and press Enter.</p>\
<h3 style="margin:5px 0px 5px 10px">Hints:</h3>\
<ul><li>Use the <i>TAB</i> or <i>Enter</i> keys to cycle through form fields.</li>\
<li>Try not to use the mouse, unless you see this icon <img src="images/icons/mouse.png"></img>\
next to the question.</li>\
<li>If you see <img src="images/icons/enter_medium.png"></img> instead, use the <i>Enter</i>\
 key for navigation.</li></ul>\
</span>',
                        listeners:  {
                                        afterrender:function(){Ext.getCmp('txtSubjectID').focus();}
                                    },
                        items:[
                                tabForms
                              ]
                    };

var portalForms=    {
                        id:'portalForms',
                        title:'Online Scoring',
                        layout:'border',
                        iconCls:'x-icon-forms',
                        autoScroll:false,
                        bodyStyle:'background-color:transparent',
                        items:[{
                                    region:'center',
                                    layout:'fit',
                                    cls:'background',
                                    items:[panelForms]
                               },
                               {
                                    region:'east',
                                    layout:'fit',
                                    id:'entryRegionEast',
                                    hideMode:'display',
                                    header:true,
                                    title:'History',
                                    collapsible:true,
                                    collapsed:true,
                                    hideCollapseTool:true,
                                    frame:true,
                                    border:true,
                                    margins:'0 0 0 5',
                                    collapseMode:'mini',
                                    items:  [gridHistory]
                                }
                        ]
                    };
<?php endif; ?>
<?php if ((int)$_SESSION['clearance']>=90): ?>
var portalUsers=     {
                        xtype:'portal',
                        title:'Users',
                        layout:'fit',
                        iconCls:'x-icon-users',
                        items:  [
                                    NRG.OnlineScoring.UsersView
                                ]
                    };
<?php endif; ?>

<?php if ((int)$_SESSION['clearance']>=50): ?>
var portalScoring=    {
                        xtype:'portal',
                        title:'Diff View',
                        layout:'fit',
                        tabTip:'Diff View',
                        iconCls:'x-icon-grid',
                        items:  [
                                    NRG.OnlineScoring.DiffView
                                ]
                    };
<?php endif; ?>

var topMenu=    {
                    region:'north',
                    xtype:'toolbar',
                    height:25,
                    items:[
                                    {
                                        html:'<img alt="NRG" src="images/nrg.png" height="18" width="20" border="0" onclick="javascript:window.location=\'http://neuroinformatics.harvard.edu\'"/>',
                                        style:'text-decoration:none'
                                    },
                                    {
                                        xtype:'tbtext',
                                        html:'<a href="http://neuroinformatics.harvard.edu" target="_blank" style="position:relative;margin-left:1px;top:-1px;font-weight:bold;color:firebrick; text-decoration:none"><b>NRG</b></a>',
                                    },
                                    ' ',
                                    {
                                        xtype:'tbtext',
                                        html:'<a href="http://mail.neuroinfo.org" target="_blank">Mail</a>',
                                        style:'margin-left:1px;margin-bottom:2px'
                                    },
                                    '->',
                                    {
                                        id:'txtUsername',
                                        xtype:'tbtext',
                                        html:'<span style="position:relative;top:-1px"><b><?php print $_SESSION['username'];?></b></span>',
                                    },
                                    {
                                        xtype:'tbspacer'
                                    },
                                    '-',
                                    {
                                        xtype:'button',
                                        text:'Logout',
                                        icon:'images/icons/logout.png',
                                        handler:function()
                                        {
                                            ajaxShowWait(false);
                                            Ext.Ajax.request({
                                                url:'ajax/logout.php',
                                                success:function()
                                                {
                                                    window.onbeforeunload=null;
                                                    window.location.reload()
                                                }
                                            })
                                        }
                                    },
                                    ' '
                          ]
                };

var groupDashboard= {
                        xtype:'grouptabpanel',
                        tabWidth:130,
                        activeGroup:0,
                        bodyStyle:'background-color:transparent;border:none',
                        items:  [
                                  {
                                    mainItem:0,
                                    items:[
                                            <?php
                                                  //Data entry privileges
                                                  if ($_SESSION['clearance']>=30)
                                                      print 'portalForms,';
                                                  //Data manager privileges
                                                  if ($_SESSION['clearance']>=50)
                                                    print 'portalScoring,';
                                                  //Administrator privileges
                                                  if ($_SESSION['clearance']>=90)
                                                    print 'portalUsers';
                                            ?>
                                            ]
                                }]
                    };

var viewportMain=   {
                        id:'viewportMain',
                        layout:'border',
                        border:false,
                        items:[
                                topMenu,
                                {
                                    region:'center',
                                    layout:'fit',
                                    items:[groupDashboard]
                                }
                              ]
                    };


window.onbeforeunload=onLeave;

//Initialize QuickTips
Ext.QuickTips.init();

//Instantiate the main window
var MainWindow=new Ext.Viewport(viewportMain);

MainWindow.show();

});

<?php if ((int)$_SESSION['clearance']>=30): ?>
function btnGoClicked(button)
{
    NRG.Forms.GlobalReset=false;
    NRG.Forms.DataEntry=true;
    var txtSID=Ext.getCmp('txtSubjectID');
    
    if (!txtSID.isValid())
    {
        txtSID.focus();
        return false;
    }

    button.disable();
    txtSID.setRawValue(txtSID.getValue().toUpperCase());
    txtSID.disable();

    ajaxShowWait(false);
    Ext.Ajax.request({
        url:'ajax/session.php',
        method:'POST',
        params: {
                    subjectid:txtSID.getValue()
                },
        success:sessionRequestSucceeded,
        failure:sessionRequestFailed
    });
}

function btnHistoryToggled(button,state)
{
    var grid=Ext.getCmp('gridHistory');
    var store=grid.getStore();
    var count=store.getTotalCount();

    if (count==0)
        store.load({
                    params: {
                                start:0,
                                limit:20
                            }
                   });

    Ext.getCmp('entryRegionEast').toggleCollapse();
}

function btnHelpClicked(button)
{
    Ext.Msg.show({
                    title:'<b>Help, I\'m stuck!</b>',
                    msg:'<b>General Advice:</b><br><br><p>Use soap or olive oil to get unstuck. Otherwise, \
                    send an e-mail to <a href="mailto:vpetrov@nmr.mgh.harvard.edu">vpetrov@nmr.mgh.harvard.edu</a></p><br>\
                <p><b>Keyboard Shortcuts:</b><br>\
                        <ul class="help">\
                            <li><u>Digits 1-9:</u>&nbsp;&nbsp;&nbsp;&nbsp;Select/Deselect radio/checkbox</li>\
                            <li><u>Enter/Tab:</u>&nbsp;&nbsp;&nbsp;Move to the next field</li>\
                            <li><u>Ctrl+Shift+NumpadPlus:</u>&nbsp;&nbsp;&nbsp;Next Form</li>\
                            <li><u>Ctrl+Shift+NumpadMinus:</u>&nbsp;Previous Form</li>\
                        </ul></p>',
                    width:400,
                    buttons:{ok:'Outstanding!'},
                    icon:Ext.MessageBox.INFO
                });
}

function onSIDKeyEnter(textfield, event)
{
    if (event.getKey()==13)
    {
        var btnGo=Ext.getCmp('btnGo');
        event.stopPropagation();
        btnGoClicked(btnGo);
    }
}

function onTabShow(obj)
{
    //hack
    onFormActivated(obj.getActiveTab());
}

function nextForm()
{
    var tabpanel=Ext.getCmp('tabForms');

    if (tabpanel.getActiveTab()==0)
        return;

    var curIndex=-1;
    //Search the items array for the index of the current tab panel
    for (var i=0;i<tabpanel.items.items.length;++i)
    {
        if (tabpanel.items.items[i].id==tabpanel.getActiveTab().getId())
        {
            curIndex=i;
            break;
        }
    }

    if (curIndex<tabpanel.items.items.length-1)
        tabpanel.setActiveTab(curIndex+1);
}

function previousForm()
{
    var tabpanel=Ext.getCmp('tabForms');

    if (tabpanel.getActiveTab()==0)
        return;

    var curIndex=-1;
    //Search the items array for the index of the current tab panel
    for (var i=0;i<tabpanel.items.items.length;++i)
    {
        if (tabpanel.items.items[i].id==tabpanel.getActiveTab().getId())
        {
            curIndex=i;
            break;
        }
    }

    if (curIndex>0)
        tabpanel.setActiveTab(curIndex-1);
}

function onBeforeTabChange(tabs, newform, oldform)
{
    if (typeof(oldform)=="undefined")
        return;

    //Sometimes, things get crazy around here.
    if (oldform.id==newform.id)
        return;

    //Does the old form have a keymap associated with it?
    if (typeof(oldform.keyMap)!="undefined")
    {
        console.log('Disabling keymap for: ',oldform.id);
        oldform.keyMap.disable();         //Deactivate the keymap
    }
}

function resetForms()
{
    //Lose the session label
    NRG.Forms.SessionLabel=null;
    Ext.TaskMgr.stop(NRG.Forms.timer);
    //NRG.Forms.startTime=null;


    NRG.Forms.DataEntry=false;
    //Reset all text fields
    var txtSID=Ext.getCmp('txtSubjectID');
    txtSID.enable();
    txtSID.reset();

    //Reset all buttons
    Ext.getCmp('btnGo').show();
    Ext.getCmp('btnSave').disable();

    //Reset all forms
    var forms=Ext.getCmp('tabForms');

    for (var i=0;i<forms.items.items.length;++i)
    {
        var formCmp=forms.items.items[i];

        //Call a custom reset handler if necessary
        if (formCmp.resetHandler)
            formCmp.resetHandler(formCmp);

        formCmp.saved=false;
        formCmp.focusedEl=null;

        var form=formCmp.getForm();

        NRG.Forms.GlobalReset=true;
        form.reset();

        Ext.select('.q-valid').removeClass('q-valid');
        Ext.select('.q-invalid').removeClass('q-invalid');
        Ext.select('.q-active').removeClass('q-active');
    }

    Ext.getCmp('btnFinish').enable();

    forms.setActiveTab(0);
    forms.hide();
    Ext.getCmp('txtSubjectID').focus();
}

function sessionRequestSucceeded(data,request)
{
    Ext.getCmp('btnGo').enable();

    var response=Ext.decode(data.responseText);
    if (response.success==1)
    {
        //Store the session label
        NRG.Forms.SessionLabel=response.session;
        Ext.getCmp('btnGo').hide();
        Ext.getCmp('btnSave').enable();
        Ext.fly('panelFormsWelcome').hide();
        Ext.getCmp('tabForms').show();
        Ext.fly('clock').update('00:00');
        NRG.Forms.startTime=new Date();
        Ext.TaskMgr.start(NRG.Forms.timer);
    }
    else
    {
        Ext.getCmp('txtSubjectID').enable();
        NRG.Forms.SessionLabel=null;

        if (response.action)
            ajaxAction(response.action, response)
        else
            Ext.Msg.show({
                            title:'Aw, snap!',
                            msg:response.message,
                            icon:Ext.Msg.ERROR,
                            buttons:Ext.Msg.OK
                        });
    }
}

function sessionRequestFailed(form,data)
{
    Ext.Msg.hide();
    NRG.Forms.SessionLabel=null;
    Ext.getCmp('btnGo').enable();
    Ext.getCmp('txtSubjectID').enable();
    Ext.Msg.alert('Error','Oops, we were unable to create a data entry session for this Subject ID.<br/>Please try again later.');
}

<?php endif; ?>

function onLeave()
{
    return false;
}
