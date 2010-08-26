Ext.namespace('NRG.Forms');

var qID='qn4';
var radioPaddingLeft=25;

//Subject Sex
var sSex=        {
                    id:q('q1'),
                    xtype:'radiogroup',
                    fieldLabel:'SEX',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    invalidClass:'',
                    width:140,
                    allowBlank:false,
                    next:q('q2'),
                    ctCls:'q-container',
                    style:'padding-left:0px',
                    defaults:   {
                                    name:'SEX',
                                    listeners:  {
                                                    focus:onFieldFocus,
                                                    blur:onFocusLost
                                                }
                                },
                    listeners:  {
                                    change:radiogroupChanged,
                                    focus:onFieldFocus,
                                    specialkey:onEnter
                                },
                    items:  [
                                {
                                    boxLabel:'Male',
                                    inputValue:1
                                },
                                {
                                    boxLabel:'Female',
                                    inputValue:2
                                }
                            ]
                };

//Subject age
var sAge=    {
                    id:q('q2'),
                    name:'AGE',
                    xtype:'numberfield',
                    fieldLabel:'AGE',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    width:120,
                    allowBlank:false,
                    allowDecimals:false,
                    allowNegative:false,
                    maxLength:3,
                    maxValue:100,
                    minValue:1,
                    ctCls:'q-container',
                    selectOnFocus:true,
                    next:q('q3:1'),
                    listeners:  {
                                    specialkey:onEnter,
                                    focus:onFieldFocus,
                                    blur:onFocusLost
                                }
                };

var q3= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:10px',
                hideLabel:true,
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'SELECT THE NUMBER OF THE HIGHEST GRADE YOU HAVE COMPLETED:'
                        },
                        {
                            xtype:'fieldset',
                            id:'EDUC',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-top:10px;padding-left:'+radioPaddingLeft+'px;background-color:transparent',
                            layout:'column',
                            next:q('q4'),
                            hideLabel:true,
                            width:500,
                            border:false,
                            noShortcuts:true,
                            defaults:   {
                                            border:false
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            blur:onFocusLost
                                        },
                            items:  [
                                        //First column
                                        {
                                            columnWidth:.25,
                                            bodyStyle:'background-color:transparent',
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'Grade School',
                                                        cls:'question-text'
                                                    },
                                                    {
                                                        id:q('q3:1'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        style:'padding-left:0px;background-color:transparent',
                                                        allowBlank:true,
                                                        next:q('q3:2'),
                                                        hideLabel:true,
                                                        columns:1,
                                                        ignoreValidState:true,
                                                        minValue:1,
                                                        maxValue:8,
                                                        itemCls:'q-container',
                                                        defaults:   {
                                                                        name:'EDUC',
                                                                        listeners:  {
                                                                                        focus:onFieldFocus,
                                                                                        blur:onFocusLost
                                                                                    }
                                                                    },
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'1',
                                                                    inputValue:1
                                                                },
                                                                {
                                                                    boxLabel:'2',
                                                                    inputValue:2
                                                                },
                                                                {
                                                                    boxLabel:'3',
                                                                    inputValue:3
                                                                },
                                                                {
                                                                    boxLabel:'4',
                                                                    inputValue:4
                                                                },
                                                                {
                                                                    boxLabel:'5',
                                                                    inputValue:5
                                                                },
                                                                {
                                                                    boxLabel:'6',
                                                                    inputValue:6
                                                                },
                                                                {
                                                                    boxLabel:'7',
                                                                    inputValue:7
                                                                },
                                                                {
                                                                    boxLabel:'8',
                                                                    inputValue:8
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        
                                        //Second column
                                        {
                                            columnWidth:.25,
                                            bodyStyle:'background-color:transparent',
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'High School',
                                                        cls:'question-text'
                                                    },
                                                    {
                                                        id:q('q3:2'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        style:'padding-left:0px;background-color:transparent',
                                                        allowBlank:true,
                                                        next:q('q3:3'),
                                                        hideLabel:true,
                                                        columns:1,
                                                        minValue:1,
                                                        maxValue:4,
                                                        ignoreValidState:true,
                                                        itemCls:'q-container',
                                                        defaults:   {
                                                                        name:'EDUC',
                                                                        listeners:  {
                                                                                        focus:onFieldFocus,
                                                                                        blur:onFocusLost
                                                                                    }
                                                                    },
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'9',
                                                                    inputValue:9
                                                                },
                                                                {
                                                                    boxLabel:'10',
                                                                    inputValue:10
                                                                },
                                                                {
                                                                    boxLabel:'11',
                                                                    inputValue:11
                                                                },
                                                                {
                                                                    boxLabel:'12 or GED',
                                                                    inputValue:12
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        //Third column
                                        {
                                            columnWidth:.25,
                                            bodyStyle:'background-color:transparent',
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'College',
                                                        cls:'question-text'
                                                    },
                                                    {
                                                        id:q('q3:3'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        allowBlank:true,
                                                        next:q('q3:4'),
                                                        style:'padding-left:0px;background-color:transparent',
                                                        hideLabel:true,
                                                        columns:1,
                                                        minValue:1,
                                                        maxValue:4,
                                                        ignoreValidState:true,
                                                        itemCls:'q-container',
                                                        defaults:   {
                                                                        name:'EDUC',
                                                                        listeners:  {
                                                                                        focus:onFieldFocus,
                                                                                        blur:onFocusLost
                                                                                    }
                                                                    },
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'13',
                                                                    inputValue:13
                                                                },
                                                                {
                                                                    boxLabel:'14',
                                                                    inputValue:14
                                                                },
                                                                {
                                                                    boxLabel:'15',
                                                                    inputValue:15
                                                                },
                                                                {
                                                                    boxLabel:'16',
                                                                    inputValue:16
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        //Forth column
                                        {
                                            columnWidth:.25,
                                            bodyStyle:'background-color:transparent',
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'Graduate School',
                                                        cls:'question-text'
                                                    },
                                                    {
                                                        id:q('q3:4'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        allowBlank:true,
                                                        next:q('q4'),
                                                        hideLabel:true,
                                                        columns:1,
                                                        minValue:1,
                                                        maxValue:4,
                                                        ignoreValidState:true,
                                                        validationHandler:q3Validator,
                                                        itemCls:'q-container',
                                                        style:'padding-left:0px;background-color:transparent',
                                                        defaults:   {
                                                                        name:'EDUC',
                                                                        listeners:  {
                                                                                        focus:onFieldFocus,
                                                                                        blur:onFocusLost
                                                                                    }
                                                                    },
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onq3Enter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'17',
                                                                    inputValue:17
                                                                },
                                                                {
                                                                    boxLabel:'18',
                                                                    inputValue:18
                                                                },
                                                                {
                                                                    boxLabel:'19',
                                                                    inputValue:19
                                                                },
                                                                {
                                                                    boxLabel:'20',
                                                                    inputValue:20
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        }
                                    ]
                        }
                      ]
            };

var q4= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Ethnic Category'
                        },
                        {
                            id:q('q4'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            width:400,
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q5'),
                            hideLabel:true,
                            columns:1,
                            defaults:   {
                                            name:'ETHNIC',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Not Hispanic or Latino',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Hispanic or Latino',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
          };

var q5= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Racial Category'
                        },
                        {
                            id:q('q5'),
                            xtype:'checkboxgroup',
                            invalidClass:'',
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q6'),
                            columns:1,
                            hideLabel:true,
                            saneCheckboxCount:4,
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:raceCheckboxChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'American Indian/Alaskan Native',
                                            inputValue:1,
                                            ranking:2,
                                            submitValue:false
                                        },
                                        {
                                            boxLabel:'Asian',
                                            inputValue:2,
                                            ranking:4,
                                            submitValue:false
                                        },
                                        {
                                            boxLabel:'Native Hawaiian or Other Pacific Islander',
                                            inputValue:3,
                                            ranking:1,
                                            submitValue:false
                                        },
                                        {
                                            boxLabel:'Black or African American',
                                            inputValue:4,
                                            ranking:3,
                                            submitValue:false
                                        },
                                        {
                                            boxLabel:'White',
                                            inputValue:5,
                                            ranking:5,
                                            submitValue:false
                                        },
                                        {
                                            id:'RACE_1',
                                            name:'RACE_1',
                                            xtype:'hidden',
                                            value:NRG.Forms.NoResponse
                                        },
                                        {
                                            id:'RACE_2',
                                            name:'RACE_2',
                                            xtype:'hidden',
                                            value:NRG.Forms.NoResponse
                                        },
                                        {
                                            id:'RACE_3',
                                            name:'RACE_3',
                                            xtype:'hidden',
                                            value:NRG.Forms.NoResponse
                                        },
                                        {
                                            id:'RACE_4',
                                            name:'RACE_4',
                                            xtype:'hidden',
                                            value:NRG.Forms.NoResponse
                                        }
                                    ]
                        }
                      ]
          };

var q6= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Indicate your Overall Handedness:'
                        },
                        {
                            id:q('q6'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            columns:1,
                            next:q('q7'),
                            hideLabel:true,
                            defaults:   {
                                            name:'HAND',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Strongly Left',
                                            inputValue:-2,
                                            shortcutKey:1
                                        },
                                        {
                                            boxLabel:'Left',
                                            inputValue:-1,
                                            shortcutKey:2
                                        },
                                        {
                                            boxLabel:'No Preference (Ambidextrous)',
                                            inputValue:0,
                                            shortcutKey:3
                                        },
                                        {
                                            boxLabel:'Right',
                                            inputValue:1,
                                            shortcutKey:4
                                        },
                                        {
                                            boxLabel:'Strongly Right',
                                            inputValue:2,
                                            shortcutKey:5
                                        }
                                    ]
                        }
                      ]
          };

var q7= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Which hand do you write with?'
                        },
                        {
                            id:q('q7'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q8'),
                            hideLabel:true,
                            columns:1,
                            defaults:   {
                                            name:'WRITE',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Always Left',
                                            inputValue:-2
                                        },
                                        {
                                            boxLabel:'Usually Left',
                                            inputValue:-1
                                        },
                                        {
                                            boxLabel:'No Preference (Ambidextrous)',
                                            inputValue:0
                                        },
                                        {
                                            boxLabel:'Usually Right',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Always Right',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
          };

var q8= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                height:160,
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Which hand do you throw with?'
                        },
                        {
                            id:q('q8'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px; margin-bottom:20px',
                            hideLabel:true,
                            columns:1,
                            defaults:   {
                                            name:'THROW',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Always Left',
                                            inputValue:-2
                                        },
                                        {
                                            boxLabel:'Usually Left',
                                            inputValue:-1
                                        },
                                        {
                                            boxLabel:'No Preference (Ambidextrous)',
                                            inputValue:0
                                        },
                                        {
                                            boxLabel:'Usually Right',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Always Right',
                                            inputValue:2
                                        }
                                    ]
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
                schema:'EH/1.0',
                xtype:'form',
                border:false,
                title:'Ethnicity/Handedness',
                buttonAlign:'left',
                autoScroll:false,
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
                items:  [sSex,sAge,q3,q4,q5,q6,q7,q8,btnNext]
          };


NRG.Forms.EthnicityHandedness=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
//@warning --- DO NOT USE WITH CALLBACKS OR IN OTHER FILES ---
function q(id)
{
    return qID+':'+id;
}

function q3groupChanged(radiogroup, checked)
{
    //Nothing selected? Abort.
    if (!checked)
        return;

    console.log('+ q3groupChanged('+radiogroup.id+'): Radio checked: '+checked.name+':'+checked.inputValue);

    var fID=radiogroup.findParentByType('form').getId();

    var qContainer=getQContainer(checked);
    if (qContainer)
    {
        console.log('  q3groupChanged(): Removing active class from parent container: '+qContainer.id);
        setQActive(qContainer,false);
    }
    
//    var q3hidden=Ext.getCmp('EDUC');
//
//    q3hidden.setRawValue(checked.inputValue);
//    q3hidden.setValue(false);
//    q3hidden.setValue(true);
//
    var q3=Ext.getCmp('EDUC');
    nextField(q3);
}

function onq3Enter(field,e)
{
    if (e.getKey()!=e.ENTER)
        return;

    var fID=field.findParentByType('form').getId();

    //User must select a radio button before leaving q3
    var q3=Ext.getCmp('');

    if (!q3.isValid())
        return;

    //Execute the standard callback
    onEnter(q3,e);
}

function q3Validator(q3subgroup)
{
    var i=1;
    var group=Ext.getCmp('qn4:q3:'+i);
    
    while (group)
    {
        if (group.isValid())
            return true;
        ++i;
        group=Ext.getCmp('qn4:q3:'+i);
    }

    return false;
}

function raceCheckboxChanged(checkboxgroup,checkedItems)
{
    setSeqHiddenFieldsValues('RACE_',checkboxgroup,checkedItems);
    checkboxgroupChanged(checkboxgroup, checkedItems);
}