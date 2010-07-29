Ext.namespace('NRG.Forms');

var qID='qn1';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'1. How often do you have a drink containing alcohol?'
                        },
                        {
                            id:q('q1'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q2'),
                            invalidClass:'',
                            enableQ:[q('q2'),q('q3')],
                            allowBlank:false,
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Never',
                                            name:q('q1:a1'),
                                            inputValue:1,
                                            next:q('q4'),
                                            disableQ:[q('q2'),q('q3')]
                                        },
                                        {
                                            boxLabel:'Monthly or less',
                                            name:q('q1:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'2-4 times a month',
                                            name:q('q1:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'2-3 times a week',
                                            name:q('q1:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'4 or more times a week',
                                            name:q('q1:a1'),
                                            inputValue:5
                                        }
                                    ]
                          }
                        ]
            };

var q2=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;If you drink, how many drinks <u>on average</u> do you have per occasion?'
                        },
                        {
                            id:q('q2'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q3'),
                            disabled:true,
                            allowBlank:false,
                            invalidClass:'',
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'1 or 2',
                                            name:q('q2:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'3 or 4',
                                            name:q('q2:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'5 or 6',
                                            name:q('q2:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'7,8 or 9',
                                            name:q('q2:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'10 or more',
                                            name:q('q2:a1'),
                                            inputValue:5
                                        }
                                    ]
                        }
                      ]
            }

var q3=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;Have you had more than 4 drinks on any occasion in the last three months?'
                        },
                        {
                            id:q('q3'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q4'),
                            allowBlank:false,
                            disabled:true,
                            invalidClass:'',
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'No',
                                            name:q('q3:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            name:q('q3:a1'),
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            }

var q4=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'2. How much do you smoke <u>on average</u> per day?'
                        },
                        {
                            id:q('q4'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q5'),
                            enableQ:[q('q5')],
                            invalidClass:'',
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'None',
                                            name:q('q4:a1'),
                                            inputValue:1,
                                            next:q('q6'),
                                            disableQ:[q('q5')]
                                        },
                                        {
                                            boxLabel:'Less than 2 cigarettes',
                                            name:q('q4:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'About 1/2 pack',
                                            name:q('q4:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'About 1 pack',
                                            name:q('q4:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'More than 1 pack',
                                            name:q('q4:a1'),
                                            inputValue:5
                                        }
                                    ]
                        }
                      ]
            }

var q5=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;If YES: when was the last time you smoked?'
                        },
                        {
                            id:q('q5'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q6'),
                            disabled:true,
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'1-15 min ago',
                                            name:q('q5:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Last 2 hours',
                                            name:q('q5:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'3-7 hours ago',
                                            name:q('q5:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'12-48 hours ago',
                                            name:q('q5:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'48 hours or more',
                                            name:q('q5:a1'),
                                            inputValue:5
                                        }
                                    ]
                        }
                      ]
            }

var q6=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'3. How much Caffeine (caffeinated soda, coffee, caffeinated tea) <u>on average</u> do you consume per day?'
                        },
                        {
                            id:q('q6'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q7')],
                            items:  [
                                        {
                                            boxLabel:'None',
                                            name:q('q6:a1'),
                                            inputValue:1,
                                            disableQ:[q('q7')]
                                        },
                                        {
                                            boxLabel:'1 cup (12 oz soda, 6oz coffee, 6oz tea)',
                                            name:q('q6:a1'),
                                            next:q('q7'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'2-3 cups',
                                            name:q('q6:a1'),
                                            next:q('q7'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'4-5 cups',
                                            name:q('q6:a1'),
                                            next:q('q7'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'6 or more cups',
                                            name:q('q6:a1'),
                                            next:q('q7'),
                                            inputValue:5
                                        }
                                    ]
                        }
                      ]
            }

var q7=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;If YES: when was the last time you had caffeine?'
                        },
                        {
                            id:q('q7'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'1-15 min ago',
                                            name:q('q7:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Last 2 hours',
                                            name:q('q7:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'3-7 hours ago',
                                            name:q('q7:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'12-48 hours ago',
                                            name:q('q7:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'48 hours or more',
                                            name:q('q7:a1'),
                                            inputValue:5
                                        }
                                    ]
                        }
                      ]
            }

var form=   {
                id:qID,
                xtype:'form',
                border:false,
                autoScroll:true,
                height:875,
                buttonAlign:'left',
                title:'Alcohol/Tobacco/Caffeine',
                keys:   {
                            //Digits [1-5]
                            key:[
                                    //Horizontal digits
                                    49,50,51,52,53,
                                    //Numpad
                                    97,98,99,100,101
                                ],
                            fn:onFormKeypress,
                            scope:this
                        },
                listeners:  {
                                //Need both of these because show is not triggered
                                //properly the first time the panel is rendered
                                //and afterrender is not triggered when the user
                                //reactivates the tab.
                                afterrender:onFormShow,
                                show:onFormShow,
                                activate:onFormActivated
                            },
                items:[q1,q2,q3,q4,q5,q6,q7],
                buttons:[
                            {
                                id:'btnFinish',
                                xtype:'button',
                                text:'Finish',
                                icon:'images/icons/finish.png',
                                handler:btnFinishClicked
                            }
                        ]
             };

NRG.Forms.AlcoholTobacco=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function btnFinishClicked(button)
{
    var currentForm=Ext.getCmp('tabForms').getActiveTab();
    if (currentForm.saved)
        resetForms();
    else
        promptSaveForm(currentForm);
}