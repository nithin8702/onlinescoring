Ext.ns('NRG.OnlineScoring');

var storeRoles=new Ext.data.JsonStore({
    id:'storeRoles',
    url:'ajax/roles.php',
    autoLoad:true,
    autoDestroy:true,
    root:'roles',
    totalProperty:'total',
    idProperty:'id',
    fields: [
                {name:'id',type:'int'},
                'name',
                {name:'clearance',type:'int'}
            ]
});

// create the combo instance
var combo = new Ext.form.ComboBox({
    typeAhead: false,
    editable:false,
    triggerAction: 'all',
    lazyRender:true,
    mode: 'local',
    store: storeRoles,
    valueField: 'id',
    displayField: 'name'
});


NRG.OnlineScoring.RowEditor=new Ext.ux.grid.RowEditor({
                                        saveText: 'Update',
                                        listeners:  {
                                                        validateedit:validateUserEntry
                                                    }
                                    });

// The new DataWriter component.
var writer = new Ext.data.JsonWriter({
    encode: false,

});

var storeUsers=new Ext.data.JsonStore({
                    id:'storeUsers',
                    url:'ajax/users.php',
                    autoLoad:true,
                    autoDestroy:true,
                    restful:false,
                    root:'users',
                    totalProperty:'total',
                    idProperty:'aclID',
                    fields: [
                                'aclID',
                                'username',
                                {name:'enabled',type:'int'},
                                {name:'requested',type:'int'},
                                {name:'role',mapping:'fkRoleID', type:'int'}
                            ],
                    sortInfo:   {
                                    field:'requested',
                                    direction:'DESC'
                                },
                    listeners:  {
                                    update:onUsersUpdated,
                                    add:onUsersAdded
                                }
                 });

var toolbarUsers=   {
                        xtype:'toolbar',
                        items:  [
                                    {
                                        id:'btnSaveUsers',
                                        xtype:'button',
                                        icon:'images/icons/save.png',
                                        text:'Save',
                                        disabled:true,
                                        handler:onSaveUserChanges
                                    },
                                    {
                                        id:'btnDiscardUserChanges',
                                        xtype:'button',
                                        icon:'images/icons/reset.png',
                                        text:'Discard',
                                        disabled:true,
                                        handler:onDiscardUserChanges
                                    },
                                    '-',
                                    {
                                        id:'btnAddUser',
                                        xtype:'button',
                                        icon:'images/icons/add_user.png',
                                        text:'Add user',
                                        handler:onAddUserClicked
                                    },
                                    {
                                        id:'btnAccount',
                                        xtype:'button',
                                        text:'Account',
                                        icon:'images/icons/account.png',
                                        disabled:true,
                                        menu:   {
                                                    xtype:'menu',
                                                    plain:true,
                                                    items:  [
                                                                {
                                                                    id:'btnEnableAccount',
                                                                    text:'Enable',
                                                                    icon:'images/icons/enabled_big.png',
                                                                    handler:enableSelectedUser
                                                                },
                                                                {
                                                                    id:'btnDisableAccount',
                                                                    text:'Disable',
                                                                    icon:'images/icons/disabled_big.png',
                                                                    handler:disableSelectedUser
                                                                },
                                                                '-',
                                                                {
                                                                    id:'btnRemoveUser',
                                                                    icon:'images/icons/remove.png',
                                                                    text:'Remove',
                                                                    handler:onRemoveUser
                                                                }
                                                            ]
                                                }
                                    }
                                ]
                    }

var gridUsers=  {
                    xtype:'grid',
                    title:'Users',
                    iconCls:'x-icon-users',
                    loadMask:true,
                    stripeRows:true,
                    store: storeUsers,
                    tbar:toolbarUsers,
                    columns:[
                                new Ext.grid.RowNumberer(),
                                {
                                    header:'',
                                    dataIndex:'enabled',
                                    width:18,
                                    sortable:true,
                                    renderer:renderUserEnabled,
                                    editor: new Ext.form.Checkbox({})
                                },
                                {
                                    header:'Username',
                                    dataIndex:'username',
                                    sortable:true,
                                    width:200,
                                    renderer:renderUsername,
                                    editor:new Ext.form.TextField({})
                                },
                                {
                                    header:'Access Level',
                                    dataIndex:'role',
                                    sortable:true,
                                    width:100,
                                    renderer:renderRole,
                                    editor:combo
                                }
                            ],
                    plugins:    [
                                    NRG.OnlineScoring.RowEditor
                                ],
                    sm:new Ext.grid.RowSelectionModel({
                        singleSelect:true,
                        listeners:  {
                                        rowselect:onUserRowSelected
                                    }
                    })
                };

NRG.OnlineScoring.GridUsers=new Ext.grid.GridPanel(gridUsers);

var ui= {
            xtype:'panel',
            frame:true,
            layout:'border',
            items:  [
                        {
                            region:'center',
                            bodyStyle:'background-color:white',
                            layout:'fit',
                            border:true,
                            items:  [
                                        NRG.OnlineScoring.GridUsers
                                    ]
                        }
                    ]
        }

NRG.OnlineScoring.UsersView=ui;

function onUsersLoaded(store)
{
    console.log('Users loaded.');
}

function renderUserEnabled(value,metadata,record,rowIndex,colIndex,store)
{
    if (record.get('requested')==1)
        metadata.css='row-user-new'
    else
    if ((value==1) || (value=="true"))
        metadata.css='row-user-enabled';
    else
        metadata.css='row-user-disabled';
    
    return "";
}

function renderUsername(value,metadata,record,rowIndex,colIndex,store)
{
    if (record.get('requested')==1)
        return '<b>'+value+'<b>';

    return value;
}

function renderRole(value,metadata,record,rowIndex,colIndex,store)
{
    var result=storeRoles.findExact('id',value);

    if (result<0)
        return "";

    var role=storeRoles.getAt(result);

    return role.get('name');
}

function onUsersUpdated(store, record, operation)
{
    console.log(operation,record);

    if (operation==Ext.data.Record.EDIT)
    {
        var dup=checkDuplicate(record);

        console.log('Duplicate check for ',record.get('username'),' returned ',dup);

        if (dup)
        {
            if (record.phantom)
                store.remove(record);
            else
                record.reject();

            Ext.Msg.show({
                title:'Duplicate Username',
                msg:'An entry for user \''+record.get('username')+'\' already exists.<br>Your changes have been reverted.',
                icon:Ext.Msg.ERROR,
                buttons:Ext.Msg.OK
            });
            return;
        }

        Ext.getCmp('btnSaveUsers').enable();
        Ext.getCmp('btnDiscardUserChanges').enable();

        if (record.get('requested')==1)
            record.set('requested',0);

        if (record.getChanges())
            record.markDirty();
    }
}

function onUserRowSelected(selmodel,rowIndex,record)
{
    Ext.getCmp('btnAccount').enable();
    if (record.get('enabled')==1)
    {
        Ext.getCmp('btnEnableAccount').disable();
        Ext.getCmp('btnDisableAccount').enable();
    }
    else
    {
        Ext.getCmp('btnEnableAccount').enable();
        Ext.getCmp('btnDisableAccount').disable();
    }

}

/**
 * onAdd
 */
function onAddUserClicked(btn, ev)
{
    var grid=NRG.OnlineScoring.GridUsers;
    var editor=NRG.OnlineScoring.RowEditor;
    var u = new grid.store.recordType({
        enabled : 0,
        requested:1,
        username:'',
        role:null
    });
    editor.stopEditing();
    grid.store.add(Array(u));
    var last_row=grid.store.getTotalCount()-1;
    editor.startEditing(last_row);
}

function getSelectedUser()
{
    var grid=NRG.OnlineScoring.GridUsers;
    var rec = grid.getSelectionModel().getSelected();

    return rec;
}
/**
 * onDelete
 */
function onRemoveUser()
{
    var user=getSelectedUser();

    if (!user.get('aclID'))
        return removeSelectedUser();

    if (user.get('enabled')!=0)
    {
        Ext.Msg.show({
            title:'Warning',
            msg:'This will <u>permanently</u> remove the user from the system.<br>Would you like to <b>disable</b> the account instead?',
            icon:Ext.Msg.WARNING,
            buttons:{
                        yes:'Disable',
                        no:'Remove',
                        cancel:'Cancel'
                    },
            fn:onDisableOrRemoveUserAnswer
        })
    }
    else
    {
        Ext.Msg.show({
            title:'Sanity Check',
            msg:'Are you absolutely sure you want to remove this user?',
            icon:Ext.Msg.QUESTION,
            buttons:{
                        yes:'Yes, I\'m sure',
                        no:'No, keep it',
                        cancel:'Cancel'
                    },
            fn:onRemoveUserAnswer
        })
    }

    return true;
}

function onRemoveUserAnswer(answer)
{
    if (answer=="yes")
        removeSelectedUser();
}

function onDisableOrRemoveUserAnswer(answer)
{
    if (answer=="yes")
        disableSelectedUser();
    else
    if (answer=="no")
        removeSelectedUser();
}

function removeSelectedUser()
{
    var grid=NRG.OnlineScoring.GridUsers;
    var rec = getSelectedUser();
    if (!rec)
    {
        console.warn('+ removeSelectedUser(): Could not find selected record.');
        return;
    }

    Ext.getCmp('btnAccount').disable();

    if (typeof(rec.get('aclID'))=="undefined")
    {
        console.log('record is phantom?',rec.phantom,' or aclID is undefined:',rec.get('aclID'));
        grid.store.remove(rec);
        return;
    }

    console.log('Performing Ajax request');

    grid.loadMask.show();
    Ext.Ajax.request({
        url:grid.getStore().url,
        method:'DELETE',
        params: {
                    user:rec.get('username')
                },
        success:onDeleteUserSuccess,
        failure:onDeleteUserFailed
    })

    return;
}

function onDeleteUserSuccess(response,options)
{
    var result=Ext.decode(response.responseText);
    var grid=NRG.OnlineScoring.GridUsers;
    grid.loadMask.hide();

    if (result.success!=1)
    {

        Ext.Msg.show({
            title:'Delete User',
            msg:result.message,
            icon:Ext.Msg.ERROR,
            buttons:Ext.Msg.OK
        });
        return;
    }

    var store=grid.getStore();
    var record=getSelectedUser();
      
    store.remove(record);
}

function onDeleteUserFailed(response,options)
{
    NRG.OnlineScoring.GridUsers.loadMask.hide();
    Ext.Msg.show({
        title:'Oops',
        msg:'We were unable to contact the server at this time. Please try again later.',
        icon:Ext.Msg.ERROR,
        buttons:Ext.Msg.OK
    });
}

function onDiscardUserChanges(button)
{
    var grid=NRG.OnlineScoring.GridUsers;

    grid.getStore().rejectChanges();
    button.disable();
    Ext.getCmp('btnSaveUsers').disable();
}


function enableSelectedUser(button)
{
    var user=getSelectedUser();

    user.set('enabled',1);

    Ext.getCmp('btnEnableAccount').disable();
    Ext.getCmp('btnDisableAccount').enable();

}

function disableSelectedUser()
{
    var rec = getSelectedUser();
    rec.set('enabled',0);

    Ext.getCmp('btnEnableAccount').enable();
    Ext.getCmp('btnDisableAccount').disable();
}

function onSaveUserChanges(button)
{
    var grid=NRG.OnlineScoring.GridUsers;
    var records=Array();
    var result=Array();

    //Find dirty records
    grid.getStore().each(function(record){
        if (record.dirty==true)
            records.push(record);
    })

    if (!records.length)
    {
        Ext.getCmp('btnSaveUsers').disable();
        Ext.getCmp('btnDiscardUserChanges').disable();
        return;
    }

    for (var i=0;i<records.length;++i)
    {
        var record=records[i];
        result.push(record.data);
    }

    doInsertUpdateUsers(result);
}

function onUsersAdded(store, records, atIndex)
{
    console.log('Added',records[0]);
}

function doInsertUpdateUsers(data)
{
    var grid=NRG.OnlineScoring.GridUsers;

    grid.loadMask.show();

    Ext.Ajax.request({
        url:grid.getStore().url,
        method:'POST',
        params:{
                    users:Ext.encode(data)
               },
        success:onInsertUpdateUsersSuccess,
        failure:onInsertUpdateUsersFailed
    })
}

function onInsertUpdateUsersSuccess(request, options)
{
    var grid=NRG.OnlineScoring.GridUsers;
    grid.loadMask.hide();
    var response=Ext.decode(request.responseText);

    //On server error
    if (response.success==0)
    {
        Ext.Msg.show({
            title:'Oops',
            msg:response.message,
            icon:Ext.Msg.ERROR,
            buttons:Ext.Msg.OK
        });
        return;
    }

    //On Success
    for (var i=0;i<response.total;++i)
    {
        var info=response.users[i];
        var rowIndex=grid.getStore().findExact('username',info.username);

        if (rowIndex<0)
        {
            console.warn('Could not find row index for username ',info.username);
            continue;
        }

        var record=grid.getStore().getAt(rowIndex);
        record.set('aclID',info.aclID);
        record.commit();
    }

    Ext.getCmp('btnSaveUsers').disable();
    Ext.getCmp('btnDiscardUserChanges').disable();
}

function onInsertUpdateUsersFailed(request,options)
{
    NRG.OnlineScoring.GridUsers.loadMask.hide();
    Ext.Msg.show({
        title:'Oops',
        msg:'We were unable to contact the server. Please try again later.',
        icon:Ext.Msg.ERROR,
        buttons:Ext.Msg.OK
    })
}

function checkDuplicate(record)
{
    var store=NRG.OnlineScoring.GridUsers.getStore();
    var same=0;

    var index=store.indexOf(record);

    if (index<0)
        return same;

    store.each(function(rec){
        var recindex=store.indexOf(rec);

        //Skip same record
        if (recindex==index)
            return;

        if (record.get('username').toLowerCase()==rec.get('username').toLowerCase())
                same++;
    });

    return same;
}

function validateUserEntry(editor,changes,record,rowIndex)
{
    var cancel=false;
    
    if (typeof(changes.username)=="undefined")
    {
        if ((!record.get('username')) || (!record.get('username').length))
            cancel=true;
    }
    else
        if (!changes.username.length)
            cancel=true;
            
    if (typeof(changes.role)=="undefined")
    {
        if ((!record.get('role')) || (!record.get('role').toString().length))
            cancel=true;
    }
    else
        if (!changes.role.toString().length)
            cancel=true;

    if (cancel)
    {
        //Remove empty phantom records
        if ((record.phantom) && (!record.get('username').length) && ((record.get('role')==null) || (!record.get('role').toString().length)))
        {
            NRG.OnlineScoring.GridUsers.getStore().remove(record);
        }
    }
 
    return !cancel;
}