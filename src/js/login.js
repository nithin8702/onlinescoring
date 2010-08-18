var DEFAULT_DOMAIN='neuroinfo.org';

var ui={
            id:'window-login',
            xtype: 'window',
            title: 'Login',
            width: 300,
            closable: false,
            hidden: false,
            initHidden: false,
            modal: true,
            resizable: false,
            headerAsText: false,
            autoHeight:true,
            layout: 'fit',
            items: [
                    {
                        xtype: 'form',
                        id:'form-login',
                        title: '<a href="http://www.neuroinfo.org"><img src="images/nrg.png" border="0" style="vertical-align:middle; height:20px;width:23px;"></a>&nbsp;&nbsp;Online Scoring Login',
                        url: 'ajax/login.php',
                        method: 'POST',
                        autoHeight:true,
                        border:false,
                        items: [
                                {
                                    xtype: 'fieldset',
                                    title: '',
                                    labelWidth: 70,
                                    border:false,
                                    defaults:   {
                                                    listeners:  {
                                                                    specialkey:onEnter
                                                                }
                                                },
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
                                                selectOnFocus:true,
                                                validationEvent:'blur',
                                                listeners:{blur:onUsernameBlur}
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'txtPassword',
                                                name:'password',
                                                fieldLabel: 'Password',
                                                width:189,
                                                inputType:'password',
                                                maxlength:100,
                                                tabIndex:2
                                            },
                                            {
                                                xtype:'tbtext',
                                                id:'txtMessage',
                                                style:'color:red;padding-top:10px',
                                                html:''
                                            },
                                            {
                                                xtype:'panel',
                                                id:'msgCaptcha',
                                                border:false,
                                                layout:'fit',
                                                style:'text-align:right',
                                                hideMode:'display',
                                                hidden:true,
                                                hideLabel:false,
                                                items:[
                                                        {
                                                            xtype:'tbtext',
                                                            hideMode:'display',
                                                            border:false,
                                                            html:'<img id="imgCaptcha" src="" border="0"></img>'
                                                        },
                                                        {
                                                            border:false,
                                                            hideMode:'display',
                                                            xtype:'textfield',
                                                            id:'txtCaptcha',
                                                            name:'captchatext',
                                                            width:189,
                                                            maxlength:25,
                                                            tabIndex:3,
                                                            listeners:  {
                                                                            specialkey:onEnter
                                                                        }
                                                        }
                                                      ]
                                            },
                                            {
                                                xtype:'hidden',
                                                id:'hiddenCaptchaToken',
                                                name:'captchatoken'
                                            }
                                           ]
                                }
                               ],
                         buttons:[
                                    {
                                        id:'progressLogin',
                                        xtype:'progress',
                                        width:110,
                                        hidden:true
                                    },
                                    {
                                        id:'btnRegister',
                                        text:'Register',
                                        handler:showRegistrationForm
                                    },
                                    {
                                        id:'btnLogin',
                                        text:'<b>Login</b>',
                                        type:'submit',
                                        handler:login
                                    }
                                 ]
                     }
                    ]
        };

//var winRegister={
//                    xtype:'window',
//                    title:'Request Access',
//                    width:280,
//                    modal:true,
//                    items:  [
//                                {
//                                    xtype:'form',
//                                    bodyStyle:'padding:3px',
//                                    items:  [
//                                                {
//                                                    xtype:'textfield',
//                                                    boxlabel:'E-Mail',
//                                                    name:'regEmail',
//                                                    regex:/^\S+@\w+(\.\w+)+$/,
//                                                    selectOnFocus:true
//                                                },
//                                                {
//                                                    id:'regPanel',
//                                                    xtype:'panel',
//                                                    title:'<a href="javascript:showRegPanel();" style="color:#6666FF">Sign up for a @neuroinfo.org account</a>',
//                                                    collapsible:true,
//                                                    collapsed:true,
//                                                    border:true,
//                                                    style:'background-color:white',
//                                                    items:  [
//                                                                {
//                                                                    xtype:'fieldset',
//                                                                    border:false,
//                                                                    items:  [
//                                                                                {
//                                                                                    xtype:'textfield',
//                                                                                    fieldLabel:'First name'
//                                                                                },
//                                                                                {
//                                                                                    xtype:'textfield',
//                                                                                    fieldLabel:'Last name'
//                                                                                }
//                                                                            ]
//                                                                }
//                                                            ]
//                                                }
//                                            ],
//                                   buttons: [
//                                                {
//                                                    xtype:'button',
//                                                    type:'submit',
//                                                    text:'<b>Register</b>'
//                                                }
//                                            ]
//                                }
//                            ]
//                };

Ext.onReady(function(){

    Ext.QuickTips.init();

    Ext.Ajax.on('beforerequest',function(){
        var progressbar=Ext.getCmp('progressLogin');
        progressbar.show();
        progressbar.wait({
            animate:true,
            text:'Please wait...',
            increment:30
        });

    },this);

    Ext.Ajax.on('requestcomplete',function(){
        Ext.getCmp('progressLogin').reset(true);
    },this);

    Ext.Ajax.on('requestexception',function(){
        Ext.getCmp('progressLogin').reset(true);
    },this);

    //winRegister=Ext.ComponentMgr.create(winRegister);

    var winLogin=Ext.ComponentMgr.create(ui);
    winLogin.show();

});

function login()
{
    Ext.getCmp('btnLogin').disable();
    Ext.getCmp('btnRegister').disable();

    Ext.get('txtMessage').update('');
    Ext.fly('txtMessage').dom.style.display="none";
    Ext.fly('msgCaptcha').dom.style.display="none";

    var form=Ext.getCmp('form-login').getForm();

    Ext.Ajax.request({
        url:form.url,
        method:'POST',
        params: {
                    username:Ext.fly('txtUsername').getValue(),
//                    password:Ext.util.MD5(Ext.fly('txtPassword').getValue())
                    password:Ext.fly('txtPassword').getValue(),
                    captchatext:Ext.fly('txtCaptcha').getValue(),
                    captchatoken:Ext.fly('hiddenCaptchaToken').getValue()
                },
        success:requestSucceeded,
        failure:requestFailed
    });
}

function requestSucceeded(data,request)
{
    Ext.getCmp('btnRegister').enable();

    var message='';
    if (data.failureType=='client')
         message='Please correct all errors before continuing.';
    else
    {
        var response=Ext.decode(data.responseText);

        if (response.success==true)
        {
            var progressBar=Ext.getCmp('progressLogin');
            progressBar.show();
            progressBar.wait({
                animate:true,
                text:'Loading ...',
                increment:30
            });
            window.location.reload();
            return;
        }

        message=response.message;

        if (response.captcha)
        {
            //Update captcha url
            Ext.fly('imgCaptcha').dom.src=response.captcha.url;
            //Display captcha image and captcha textbox
            Ext.fly('msgCaptcha').removeClass('x-hide-display');
            Ext.fly('msgCaptcha').dom.style.display="";
            Ext.fly('txtCaptcha').dom.value=''; 
            Ext.fly('txtCaptcha').show();

            //Update captcha token
            Ext.getCmp('hiddenCaptchaToken').setValue(response.captcha.token);
            Ext.fly('txtCaptcha').focus();
        }
        else
        {
            Ext.fly('msgCaptcha').dom.style.display="none";
            Ext.fly('txtPassword').focus();
        }
    }

    Ext.fly('txtMessage').update(message);
    Ext.fly('txtMessage').dom.style.display="";
    Ext.getCmp('btnLogin').enable();
}

/** The request can fail for a few reasons, including:
 * 1. The form fields could not be validated
 * 2. The server could not be contacted
 *
 * This function displays an appropriate error message.
 */
function requestFailed(form,data)
{
    Ext.getCmp('btnLogin').enable();
    Ext.getCmp('btnRegister').enable();
    var msgError=Ext.get('txtMessage');
    var message='';

    if (data.failureType=='client')
         message='Please correct all errors before continuing.';
    else
    {
        if (data.response)
        {
            var response=Ext.decode(data.response.responseText);
            message=response.message;
        }
        else
            message="We could not reach the server. Please try again later.";
    }

    msgError.update(message);
    msgError.show();
}

function onEnter(obj, event)
{
    if (event.getKey()==event.ENTER)
    {
        if (!Ext.getCmp('btnLogin').disabled)
            login();
    }
}

function onUsernameBlur(field)
{
    var user=field.getValue();
    if (user.search('@')<0)
        field.setValue(user+'@'+DEFAULT_DOMAIN);
}

function showRegistrationForm(button)
{
    Ext.Msg.prompt('Request Access','Please enter your e-mail:',register);
}

function register(button,text)
{
    Ext.getCmp('btnLogin').disable();
    Ext.getCmp('btnRegister').disable();

    Ext.Ajax.request({
        url:'ajax/request.php',
        method:'POST',
        params:{
                    email:text
               },
        success:regRequestSucceeded,
        failure:regRequestFailed
    });
}

function regRequestSucceeded(data,request)
{
    Ext.getCmp('btnLogin').enable();
    Ext.getCmp('btnRegister').enable();
    var response=Ext.decode(data.responseText);

    if (response.success==true)
    {
        Ext.Msg.show({
                        title:'Success',
                        msg:'Your access request is pending approval.<br/><br/>A confirmation e-mail will be sent to you once your username is accepted.',
                        icon:Ext.Msg.INFO,
                        buttons:Ext.Msg.OK
                    });
    }
    else
    {
        Ext.fly('txtMessage').update(response.message);
        Ext.fly('txtMessage').dom.display="";
    }
}

function regRequestFailed(form,data)
{
    Ext.getCmp('btnLogin').enable();
    Ext.getCmp('btnRegister').enable();
    Ext.fly('txtMessage').update('Sorry, we are unable to contact the server. Please try again later.');
    Ext.fly('txtMessage').dom.display="";
}