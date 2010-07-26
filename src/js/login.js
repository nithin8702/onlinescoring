var ui={
            xtype: 'window',
            title: 'Login',
            width: 300,
            height: 170,
            closable: false,
            hidden: false,
            initHidden: false,
            modal: true,
            resizable: false,
            headerAsText: false,
            layout: 'fit',
            items: [
                    {
                        xtype: 'form',
                        id:'form-login',
                        title: 'Login',
                        url: 'ajax/login.php',
                        method: 'POST',
                        items: [
                                {
                                    xtype: 'fieldset',
                                    title: '',
                                    labelWidth: 70,
                                    height: 95,
                                    border:false,
                                    items: [
                                            {
                                                xtype: 'textfield',
                                                id:'txtUsername',
                                                name:'username',
                                                fieldLabel: 'Username',
                                                width:189,
                                                maxlength:30,
                                                vtype:'email',
                                                tabIndex:1,
                                                value:'guest@neuroinfo.org',
                                                listeners:  {
                                                                specialkey:onEnter
                                                            }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'txtPassword',
                                                name:'password',
                                                fieldLabel: 'Password',
                                                width:189,
                                                inputType:'password',
                                                maxlength:100,
                                                tabIndex:2,
                                                listeners:  {
                                                                specialkey:onEnter
                                                            }
                                            },
                                            {
                                                xtype:'tbtext',
                                                id:'msgError',
                                                html:'',
                                                hidden:false
                                            }
                                           ]
                                }
                               ],
                         buttons:[
                                    {
                                        text:'<b>Login</b>',
                                        type:'submit',
                                        handler:login
                                    }
                                 ]
                     }
                    ]
        };

Ext.onReady(function(){
    Ext.QuickTips.init();
    
    var winLogin=Ext.ComponentMgr.create(ui);
    winLogin.show();
});

function login()
{
    var form=Ext.getCmp('form-login').getForm();

    Ext.Ajax.request({
        url:form.url,
        method:'POST',
        params: {
                    username:Ext.fly('txtUsername').getValue(),
//                    password:Ext.util.MD5(Ext.fly('txtPassword').getValue())
                    password:Ext.fly('txtPassword').getValue()
                },
        success:requestSucceeded,
        failure:requestFailed
    });
}

function requestSucceeded(data,request)
{
    console.log('success:',data,request);
    var msgError=Ext.get('msgError');
    var message='';
    if (data.failureType=='client')
         message='Please correct all errors before continuing.';
    else
    {
        var response=Ext.decode(data.responseText);

        if (response.success==true)
        {
            window.location.reload();
            return;
        }

        message=response.message;
    }

    msgError.update('<span class="message-error">'+message+'</span>');
    msgError.show();
}

function requestFailed(form,data)
{
    console.log('failure',data);
    var msgError=Ext.get('msgError');
    var message='';
    if (data.failureType=='client')
         message='Please correct all errors before continuing.';
    else
    {
        var response=Ext.decode(data.response.responseText);
        message=response.message;
    }

    msgError.update('<span class="message-error">'+message+'</span>');
    msgError.show();

}

function onEnter(obj, event)
{
    if (event.getKey()==event.ENTER)
        login();
}