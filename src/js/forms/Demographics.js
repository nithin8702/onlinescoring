Ext.namespace('NRG.Forms');

var qID='qn2';
var radioPaddingLeft=25;
var now=new Date();

//Subject Sex
var sSex=        {
                    id:q('q1'),
                    name:q('q1'),
                    xtype:'radiogroup',
                    fieldLabel:'Sex',
                    invalidClass:'',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    ctCls:'q-container',
                    style:'padding-left:0px',
                    width:150,
                    height:22,
                    allowBlank:false,
                    next:q('q2'),
                    listeners:  {
                                    change:radiogroupChanged,
                                    focus:onFieldFocus,
                                    specialkey:onEnter
                                },
                    items:  [
                                {
                                    boxLabel:'Male',
                                    name:q('q1:a1'),
                                    inputValue:1,
                                    width:75

                                },
                                {
                                    boxLabel:'Female',
                                    name:q('q1:a1'),
                                    inputValue:2,
                                    width:75
                                }
                            ]
                };

//Subject DOB
var sDOB=       {
                    id:q('q2'),
                    name:q('q2'),
                    xtype:'datefield',
                    fieldLabel:'Date of Birth <span style="text-shadow:none;font-weight:normal;color:gray">(m/d/Y)</span>',
                    labelStyle:'width:135px;text-shadow: 2px 2px 2px #ccc',
                    boxLabel:'mm/dd/yyyy',
                    width:100,
                    ctCls:'q-container',
                    allowBlank:false,
                    //Restrict DOB entries to 150 year range
                    maxValue:now,
                    minValue:new Date(1900,0,1),
                    selectOnFocus:true,
                    next:q('q3'),
                    listeners:  {
                                    specialkey:onEnter,
                                    focus:onFieldFocus
                                }
                }

//Subject height
var sHeight=    {
                    id:q('q3'),
                    name:q('q3'),
                    xtype:'numberfield',
                    fieldLabel:'Height (inches)</i>',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    width:135,
                    allowBlank:false,
                    allowDecimals:true,
                    allowNegative:false,
                    maxLength:7,
                    maxValue:100,
                    minValue:25,
                    selectOnFocus:true,
                    ctCls:'q-container',
                    next:q('q4'),
                    listeners:  {
                                    specialkey:onEnter,
                                    focus:onFieldFocus
                                }
                };

//Subject Weight
var sWeight=    {
                    id:q('q4'),
                    name:q('q4'),
                    xtype:'numberfield',
                    fieldLabel:'Weight (pounds)',
                    labelStyle:'width:135px;text-shadow: 2px 2px 2px #ccc',
                    width:100,
                    allowBlank:false,
                    allowDecimals:true,
                    allowNegative:false,
                    maxLength:7,
                    maxValue:1400,
                    minValue:30,
                    selectOnFocus:true,
                    ctCls:'q-container',
                    next:q('q5:a1'),
                    listeners:  {
                                    specialkey:onEnter,
                                    focus:onFieldFocus
                                }
                };

//Subject's place of birth

//Country
var birthCountry=   {
                        id:q('q5:a1'),
                        name:q('q5:a1'),
                        xtype:'textfield',
                        width:160,
                        value:'United States of America',
                        allowBlank:false,
                        selectOnFocus:true,
                        next:q('q5:a2'),
                        listeners:  {
                                        focus:onFieldFocus,
                                        specialkey:onEnter
                                    }
                    };

//State
var birthState=     {
                        id:q('q5:a2'),
                        name:q('q5:a2'),
                        xtype:'textfield',
                        width:125,
                        allowBlank:false,
                        selectOnFocus:true,
                        next:q('q5:a3'),
                        listeners:  {
                                        focus:onFieldFocus,
                                        specialkey:onEnter
                                    }
                    };

//City
var birthCity=      {
                        id:q('q5:a3'),
                        name:q('q5:a3'),
                        xtype:'textfield',
                        width:125,
                        allowBlank:true,
                        selectOnFocus:true,
                        next:q('q6'),
                        listeners:  {
                                        focus:onFieldFocus,
                                        specialkey:onEnter
                                    }
                    };

//Subject marital status
var q6=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'1. Current marital status'
                        },
                        {
                            id:q('q6'),
                            name:q('q6'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            allowBlank:false,
                            next:q('q7'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            disableQ:[q('q6:a2')],
                            items:  [
                                        {
                                            boxLabel:'Single',
                                            name:q('q6:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Married',
                                            name:q('q6:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Separated',
                                            name:q('q6:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Divorced',
                                            name:q('q6:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Widowed',
                                            name:q('q6:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Other',
                                            name:q('q6:a1'),
                                            enableQ:[q('q6:a2')],
                                            next:q('q6:a2'),
                                            inputValue:6
                                        }
                                    ]
                        },
                        {
                            id:q('q6:a2'),
                            name:q('q6:a2'),
                            xtype:'textfield',
                            width:125,
                            disabled:true,
                            fieldLabel:'please specify',
                            style:'margin-top:5px',
                            labelStyle:'width:100px; padding-left:10px; font-weight:normal',
                            next:q('q7'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

//Subject housing
var q7=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'2. In which type of housing do you live?'
                        },
                        {
                            id:q('q7'),
                            name:q('q7'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            disableQ:[q('q7:a2')],
                            next:q('q8'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Residence hall/College dormitory',
                                            name:q('q7:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'House/Apartment/Condominium',
                                            name:q('q7:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Senior housing (independent)',
                                            name:q('q7:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Assisted living',
                                            name:q('q7:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Nursing home',
                                            name:q('q7:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Relative\'s home',
                                            name:q('q7:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Other',
                                            name:q('q7:a1'),
                                            enableQ:[q('q7:a2')],
                                            next:q('q7:a2'),
                                            inputValue:7
                                        }
                                    ]
                        },
                        {
                            id:q('q7:a2'),
                            name:q('q7:a2'),
                            xtype:'textfield',
                            width:125,
                            disabled:true,
                            fieldLabel:'please specify',
                            style:'margin-top:5px',
                            labelStyle:'width:100px; padding-left:10px; font-weight:normal',
                            next:q('q8'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

//Subject roommates
var q8=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'3. With whom do you live?'
                        },
                        {
                            id:q('q8'),
                            name:q('q8'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            disableQ:[q('q8:a2')],
                            next:q('q9'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Alone',
                                            name:q('q8:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'With family members - list',
                                            name:q('q8:a1'),
                                            inputValue:2,
                                            enableQ:[q('q8:a2')],
                                            next:q('q8:a2')
                                        },
                                        {
                                            xtype:'panel',
                                            autoWidth:false,
                                            bodyStyle:'background-color:transparent',
                                            border:false,
                                            items:[{
                                                        disabled:true,
                                                        id:q('q8:a2'),
                                                        xtype:'textfield',
                                                        name:q('q8:a2'),
                                                        style:'margin-left:35px;width:185px;margin-top:5px',
                                                        next:q('q9'),
                                                        selectOnFocus:true,
                                                        listeners:  {
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    }
                                                    }]
                                        },
                                        {
                                            boxLabel:'With non-family members',
                                            name:q('q8:a1'),
                                            inputValue:3
                                        }
                                    ]
                        }
                      ]
            };

//Subject English/native
var q9=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'4. Is English your native language?'
                        },
                        {
                            id:q('q9'),
                            name:q('q9'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            disableQ:[q('q9:a2'),q('q10')],
                            next:[q('q10'), q('q11')],
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            name:q('q9:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No (please specify your primary language)',
                                            name:q('q9:a1'),
                                            inputValue:2,
                                            enableQ:[q('q9:a2'),q('q10')],
                                            next:q('q9:a2')
                                        }
                                     ]
                        },
                        {
                            xtype:'panel',
                            autoWidth:false,
                            border:false,
                            bodyStyle:'background-color:transparent;padding-top:5px',
                            items:[{
                                        disabled:true,
                                        id:q('q9:a2'),
                                        xtype:'textfield',
                                        name:q('q9:a2'),
                                        style:'margin-left:90px;width:205px',
                                        next:q('q10'),
                                        listeners:  {
                                                        focus:onFieldFocus,
                                                        specialkey:onEnter
                                                    }
                                  }]
                        }
                      ]
            };

//Subject English/age
var q10=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:5px;padding-bottom:39px',
                items:[
                        {
                            id:q('q10'),
                            name:q('q10'),
                            xtype:'numberfield',
                            fieldLabel:'If NO: At what age did you learn English?',
                            labelStyle:'width:265px;text-shadow: 2px 2px 2px #ccc',
                            style:'margin-top:5px;',
                            disabled:true,
                            minValue:1,
                            maxValue:100,
                            maxLength:3,
                            width:35,
                            next:q('q11'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

//Subject work
var q11=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container q-use-enter',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'5. Occupational status (check all that apply)'
                        },
                        {
                            id:q('q11'),
                            name:q('q11'),
                            xtype:'checkboxgroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:false,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px;background-color:transparent',
                            disableQ:[q('q11:a2'),q('q12')],
                            next:[q('q11:a2'),q('q12')],
                            listeners:  {
                                            change:checkboxgroupChanged,
                                            specialkey:onEnter,      
                                            focus:onFieldFocus
                                        },
                            items:  [
                                        {
                                            boxLabel:'Working full-time',
                                            name:q('q11:a1:1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Working part-time',
                                            name:q('q11:a1:2'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Student',
                                            name:q('q11:a1:3'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            name:q('q11:a1:4'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Retired',
                                            name:q('q11:a1:5'),
                                            inputValue:5,
                                            enableQ:[q('q12')]
                                        },
                                        {
                                            boxLabel:'Volunteer worker',
                                            name:q('q11:a1:6'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Seeking employment, laid off, etc.',
                                            name:q('q11:a1:7'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Leave of absence',
                                            name:q('q11:a1:8'),
                                            inputValue:8
                                        },
                                        {
                                            boxLabel:'Other',
                                            name:q('q11:a1:9'),
                                            enableQ:[q('q11:a2')],
                                            inputValue:9
                                        }
                                    ]
                        },
                        {
                            id:q('q11:a2'),
                            name:q('q11:a2'),
                            xtype:'textfield',
                            width:125,
                            disabled:true,
                            fieldLabel:'please specify',
                            style:'margin-top:5px',
                            labelStyle:'width:100px; padding-left:10px; font-weight:normal',
                            next:q('q12'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

//Subject Retire/year
var q12=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:10px;padding-bottom:25px',
                items:[
                        {
                            id:q('q12'),
                            name:q('q12'),
                            xtype:'numberfield',
                            fieldLabel:'6. If you are retired, in what year did you retire?',
                            labelStyle:'width:310px;padding-top:5px;text-shadow: 2px 2px 2px #ccc',
                            disabled:true,
                            allowBlank:false,
                            minValue:1900,
                            maxValue:2010,
                            maxLength:4,
                            width:65,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var birthFields=    {
                        xtype:'fieldset',
                        border:false,
                        layout:'hbox',
                        title:'Place of Birth',
                        height:40,
                        ctCls:'q-container',
                        items:[
                                {
                                    xtype:'label',
                                    cls:'question-text',
                                    style:'font-weight:bold;padding:5px 5px 0px 20px;',
                                    html:'Country'
                                },
                                birthCountry,
                                {
                                    xtype:'label',
                                    cls:'question-text',
                                    style:'font-weight:bold;padding:5px 5px 0px 20px;',
                                    html:'State'
                                },
                                birthState,
                                {
                                    xtype:'label',
                                    cls:'question-text',
                                    style:'font-weight:bold;padding:5px 5px 0px 20px;',
                                    html:'City'
                                },
                                birthCity
                              ]
                    };

var leftFields=     {
                        xtype:'fieldset',
                        border:false,
                        style:'margin:0px;padding:0px',
                        items:[sSex,sHeight]
                    }

var rightFields=    {
                        xtype:'fieldset',
                        style:'margin:0px;padding:0px',
                        border:false,
                        items:[sDOB,sWeight]
                    };

var leftBottomFields=   {
                            xtype:'fieldset',
                            border:false,
                            style:'padding:0px',
                            items:[q6,q7,q8]
                        }

var rightBottomFields=  {
                            xtype:'fieldset',
                            border:false,
                            style:'padding:0px',
                            items:[q9,q10,q11,q12]
                        }

var bottomFields=   {
                        layout:'column',
                        border:false,
                        items:  [
                                    {
                                        width:300,
                                        border:false,
                                        padding:0,
                                        items:[leftBottomFields]
                                    },
                                    {
                                        columnWidth:1,
                                        border:false,
                                        items:[rightBottomFields]
                                    }
                                ]

                    };

var middleFields=   {
                        layout:'fit',
                        border:false,
                        items:[birthFields]
                    };


var topFields={
                layout:'column',
                border:false,
                items:  [
                            {
                                width:300,
                                border:false,
                                items:[leftFields]
                            },
                            {
                                columnWidth:1,
                                border:false,
                                items:[rightFields]
                            }
                        ]
            };

var btnNext={
                xtype:'fieldset',
                border:false,
                style:'margin-bottom:20px',
                items:[
                            {
                                id:q('btnNext'),
                                xtype:'button',
                                text:'Next Form',
                                icon:'images/icons/next.png',
                                handler:btnNextFormClicked
                            }
                      ]
              };
var form=   {
                id:qID,
                xtype:'form',
                border:false,
                autoScroll:false,
                buttonAlign:'left',
                title:'Demographics',
                keys:   {
                            //Digits [1-9]
                            key:[
                                    //Horizontal digits
                                    49,50,51,52,53,54,55,56,57,58,
                                    //Numpad
                                    97,98,99,100,101,102,103,104,105
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
                items:  [topFields,middleFields,bottomFields,btnNext]
            };

NRG.Forms.Demographics=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}