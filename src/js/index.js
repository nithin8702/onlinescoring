window.onkeypress=function(key)
{
    if (key.keyCode==9)
    {
        //Don't do anything funky if Shift+Tab was pressed.
        if (key.shiftKey)
            return;

        key.preventDefault();
        key.stopPropagation();
        console.log('TAB ',key,key.cancelable);
        var currentForm=Ext.getCmp('tabForms').getActiveTab();
        //console.log('Focus is at: ', currentForm.focusedEl);
        //currentForm.focusedEl.up('div').highlight();
        nextField(currentForm.focusedEl);
    }
}

Ext.onReady(function() {

var tabForms=       {
                        id:'tabForms',
                        xtype:'tabpanel',
                        border:false,
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
                                    {
                                        xtype:'tbfill'
                                    },
                                    {
                                        xtype:'button',
                                        text:'Logout',
                                        icon:'images/icons/logout.png',
                                        handler:function()
                                        {
                                            Ext.Ajax.request({
                                                url:'ajax/logout.php',
                                                success:function(){window.location.reload()}
                                            })
                                        }
                                    },
                                    {
                                        xtype:'tbseparator'
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

var panelForms=     {
                        id:'panelForms',
                        xtype:'panel',
                        tbar:toolbarForms,
                        autoScroll:true,
                        html:'<span id="panelFormsWelcome" class="data-entry-help" style="margin-left:20px">\
<p>&nbsp;To get started, please enter a Subject ID in the box above and press Enter.</p>\
<h3 style="margin:5px 0px 5px 10px">Hints:</h3>\
<ul><li>Use the <i>TAB</i> or <i>Enter</i> keys to cycle through form fields.</li>\
<li>Try not to use the mouse, unless you see this icon <img src="images/icons/mouse.png"></img>\
next to the question.</li>\
<li>If you see <img src="images/icons/enter_medium.png"></img> instead, use the <i>Enter</i>\
 key for navigation.</li>\
</span>',
                        listeners:  {
                                        afterrender:function(){Ext.getCmp('txtSubjectID').focus();}
                                    },
                        keys:   {
                                    key:[107,109],
                                    fn:onTabKeypress,
                                    scope:this
                                },
                        items:[tabForms]
                    };

var portalForms=    {
                        id:'portalForms',
                        xtype:'portal',
                        title:'Data entry',
                        layout:'fit',
                        style:'padding:10px',
                        iconCls:'x-icon-forms',
                        autoScroll:true,
                        items:[panelForms]
                    };

var portalUsers=     {
                        xtype:'portal',
                        title:'Users',
                        layout:'fit',
                        style:'padding:10px',
                        iconCls:'x-icon-users',
                        items:[{html:'Under construction'}]
                    };

var portalScoring=    {
                        xtype:'portal',
                        title:'Online Scoring',
                        layout:'fit',
                        tabTip:'Online Scoring',
                        items:  [
                                    {
                                        html:''
                                    }
                                ]
                    };

var groupDashboard= {
                        xtype:'grouptabpanel',
                        tabWidth:130,
                        activeGroup:0,
                        items:  [{
                                    mainItem:0,
                                    items:[portalScoring,portalForms,portalUsers]
                                }]
                    };
var viewportMain=     {
                        id:'viewportMain',
                        layout:'fit',
                        items:[groupDashboard]
                    };


//Initialize QuickTips
Ext.QuickTips.init();

//Instantiate the main window
var MainWindow=new Ext.Viewport(viewportMain);

MainWindow.show();

});

function btnGoClicked(button)
{
    NRG.Forms.GlobalReset=false;
    var txtSID=Ext.getCmp('txtSubjectID');
    
    if (!txtSID.isValid())
    {
        txtSID.focus();
        return false;
    }

    Ext.Ajax.request({
        url:'Lock/check',
        method:'POST',
        params: {
                    session:txtSID.getValue()
                }

    });

    txtSID.setRawValue(txtSID.getValue().toUpperCase());

    txtSID.disable();
    button.hide();
    Ext.getCmp('btnSave').enable();

    Ext.fly('panelFormsWelcome').hide();
    Ext.getCmp('tabForms').show();

    return true;
}

function btnHelpClicked(button)
{
    Ext.Msg.show({
                    title:'Help',
                    msg:'<b>Keyboard Shortcuts:</b><br>\
                        <ul class="help">\
                            <li>Digits 1-9:&nbsp;Select/Deselect option</li>\
                            <li>Enter:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move to the next field</li>\
                        </ul>',
                    width:300,
                    button:Ext.MessageBox.OK,
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

function onTabKeypress(keycode,tabs,data)
{
    switch(keycode)
    {
        //Numpad +
        case 107:   nextForm();break;
        //Numpad -
        case 109:   previousForm(); break;
    }
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
        var form=forms.items.items[i].getForm();

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