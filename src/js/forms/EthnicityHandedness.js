Ext.namespace('NRG.Forms');

var qID='qn4';
var radioPaddingLeft=25;

//Subject Sex
var sSex=        {
                    id:q('q1'),
                    name:q('q1'),
                    xtype:'radiogroup',
                    fieldLabel:'SEX',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    invalidClass:'',
                    width:140,
                    allowBlank:false,
                    next:q('q2'),
                    ctCls:'q-container',
                    style:'padding-left:0px',
                    listeners:  {
                                    change:radiogroupChanged,
                                    focus:onFieldFocus,
                                    specialkey:onEnter
                                },
                    items:  [
                                {
                                    boxLabel:'Male',
                                    name:q('q1:a1'),
                                    inputValue:1
                                },
                                {
                                    boxLabel:'Female',
                                    name:q('q1:a1'),
                                    inputValue:2
                                }
                            ]
                };

//Subject age
var sAge=    {
                    id:q('q2'),
                    name:q('q2'),
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
                                    focus:onFieldFocus
                                }
                };

var q3= {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-use-enter q-container',
                style:'padding-top:10px',
                hideLabel:true,
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'SELECT THE NUMBER OF THE HIGHEST GRADE YOU HAVE COMPLETED:'
                        },
                        {
                            xtype:'radiogroup',
                            id:q('q3'),
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-top:10px',
                            layout:'column',
                            next:q('q4'),
                            hideLabel:true,
                            width:500,
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus
                                        },
                            items:  [
                                        //First column
                                        {
                                            columnWidth:.25,
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'Grade School'
                                                    },
                                                    {
                                                        id:q('q3:1'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        style:'padding-left:0px',
                                                        allowBlank:true,
                                                        next:q('q3:2'),
                                                        hideLabel:true,
                                                        columns:1,
                                                        itemCls:'q-container',
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'1',
                                                                    name:q('q3:a1'),
                                                                    inputValue:1
                                                                },
                                                                {
                                                                    boxLabel:'2',
                                                                    name:q('q3:a1'),
                                                                    inputValue:2
                                                                },
                                                                {
                                                                    boxLabel:'3',
                                                                    name:q('q3:a1'),
                                                                    inputValue:3
                                                                },
                                                                {
                                                                    boxLabel:'4',
                                                                    name:q('q3:a1'),
                                                                    inputValue:4
                                                                },
                                                                {
                                                                    boxLabel:'5',
                                                                    name:q('q3:a1'),
                                                                    inputValue:5
                                                                },
                                                                {
                                                                    boxLabel:'6',
                                                                    name:q('q3:a1'),
                                                                    inputValue:6
                                                                },
                                                                {
                                                                    boxLabel:'7',
                                                                    name:q('q3:a1'),
                                                                    inputValue:7
                                                                },
                                                                {
                                                                    boxLabel:'8',
                                                                    name:q('q3:a1'),
                                                                    inputValue:8
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        
                                        //Second column
                                        {
                                            columnWidth:.25,
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'High School'
                                                    },
                                                    {
                                                        id:q('q3:2'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        style:'padding-left:0px',
                                                        allowBlank:true,
                                                        next:q('q3:3'),
                                                        hideLabel:true,
                                                        columns:1,
                                                        itemCls:'q-container',
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'9',
                                                                    name:q('q3:a2'),
                                                                    inputValue:1
                                                                },
                                                                {
                                                                    boxLabel:'10',
                                                                    name:q('q3:a2'),
                                                                    inputValue:2
                                                                },
                                                                {
                                                                    boxLabel:'11',
                                                                    name:q('q3:a2'),
                                                                    inputValue:3
                                                                },
                                                                {
                                                                    boxLabel:'12 or GED',
                                                                    name:q('q3:a2'),
                                                                    inputValue:4
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        //Third column
                                        {
                                            columnWidth:.25,
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'College'
                                                    },
                                                    {
                                                        id:q('q3:3'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        allowBlank:true,
                                                        next:q('q3:4'),
                                                        style:'padding-left:0px',
                                                        hideLabel:true,
                                                        columns:1,
                                                        itemCls:'q-container',
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'13',
                                                                    name:q('q3:a3'),
                                                                    inputValue:1
                                                                },
                                                                {
                                                                    boxLabel:'14',
                                                                    name:q('q3:a3'),
                                                                    inputValue:2
                                                                },
                                                                {
                                                                    boxLabel:'15',
                                                                    name:q('q3:a3'),
                                                                    inputValue:3
                                                                },
                                                                {
                                                                    boxLabel:'16',
                                                                    name:q('q3:a3'),
                                                                    inputValue:4
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        //Forth column
                                        {
                                            columnWidth:.25,
                                            items:[
                                                    {
                                                        xtype:'label',
                                                        text:'Graduate School'
                                                    },
                                                    {
                                                        id:q('q3:4'),
                                                        xtype:'radiogroup',
                                                        invalidClass:'',
                                                        allowBlank:true,
                                                        next:q('q4'),
                                                        hideLabel:true,
                                                        columns:1,
                                                        itemCls:'q-container',
                                                        style:'padding-left:0px',
                                                        listeners:  {
                                                                        change:q3groupChanged,
                                                                        focus:onFieldFocus,
                                                                        specialkey:onq3Enter
                                                                    },
                                                        items:[
                                                                {
                                                                    boxLabel:'17',
                                                                    name:q('q3:a4'),
                                                                    inputValue:1
                                                                },
                                                                {
                                                                    boxLabel:'18',
                                                                    name:q('q3:a4'),
                                                                    inputValue:2
                                                                },
                                                                {
                                                                    boxLabel:'19',
                                                                    name:q('q3:a4'),
                                                                    inputValue:3
                                                                },
                                                                {
                                                                    boxLabel:'20',
                                                                    name:q('q3:a4'),
                                                                    inputValue:4
                                                                }
                                                              ]
                                                    }
                                                  ]
                                        },
                                        {
                                            xtype:'radio',
                                            id:'q3-hidden-value',
                                            name:'q3-hidden-value',
                                            hidden:true,
                                            inputValue:1
                                        },
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
                            name:q('q4'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            width:400,
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q5'),
                            hideLabel:true,
                            columns:1,
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Not Hispanic or Latino',
                                            name:q('q4:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Hispanic or Latino',
                                            name:q('q4:a1'),
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
                            name:q('q5'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q6'),
                            columns:1,
                            hideLabel:true,
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'American Indian/Alaskan Native',
                                            name:q('q5:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Asian',
                                            name:q('q5:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Native Hawaiian or Other Pacific Islander',
                                            name:q('q5:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Black or African American',
                                            name:q('q5:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'White',
                                            name:q('q5:a1'),
                                            inputValue:5
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
                            name:q('q6'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            columns:1,
                            next:q('q7'),
                            hideLabel:true,
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Strongly Left',
                                            name:q('q6:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Left',
                                            name:q('q6:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'No Preference (Ambidextrous)',
                                            name:q('q6:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Right',
                                            name:q('q6:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Strongly Right',
                                            name:q('q6:a1'),
                                            inputValue:5
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
                            name:q('q7'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q8'),
                            hideLabel:true,
                            columns:1,
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Always Left',
                                            name:q('q7:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Usually Left',
                                            name:q('q7:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'No Preference (Ambidextrous)',
                                            name:q('q7:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Usually Right',
                                            name:q('q7:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Always Right',
                                            name:q('q7:a1'),
                                            inputValue:5
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
                            name:q('q8'),
                            xtype:'radiogroup',
                            invalidClass:'',
                            allowBlank:false,
                            style:'padding-left:'+radioPaddingLeft+'px; margin-bottom:20px',
                            hideLabel:true,
                            columns:1,
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Always Left',
                                            name:q('q8:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Usually Left',
                                            name:q('q8:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'No Preference (Ambidextrous)',
                                            name:q('q8:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Usually Right',
                                            name:q('q8:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Always Right',
                                            name:q('q8:a1'),
                                            inputValue:5
                                        }
                                    ]
                        }
                      ]
          };

//var footer={
//                xtype:'panel',
//                height:100,
//                tbar:{
//                        xtype:'toolbar',
//                        buttons:[
//                                    {
//                                        xtype:'button',
//                                        text:'Next'
//                                    }
//                                ]
//                     },
//                items:  [{html:'&nbsp;'}],
//            };

var form=   {
                id:qID,
                xtype:'form',
                border:false,
                title:'Ethnicity/Handedness',
                buttonAlign:'left',
                height:900,
                keys:   {
                            //Digits [1-9]
                            key:[49,50,51,52,53,54,55,56,57,58],
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
                items:  [sSex,sAge,q3,q4,q5,q6,q7,q8],
                buttons:[
                            {
                                xtype:'button',
                                text:'Next Form',
                                icon:'images/icons/next.png',
                                handler:btnSaveClicked
                            }
                        ]
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

    Ext.getCmp('q3-hidden-value').setValue(true);

    var fID=radiogroup.findParentByType('form').getId();

    var q3=Ext.get(fID+':q3');

    //Clear all other radio groups in q3 except this one
    //Yay, harcoded goodness!
    for (var i=1;i<=4;++i)
    {
        var rgID=fID+':q3:'+i;
        //Skip this radiogroup
        if (rgID==radiogroup.getId())
            continue;

        var rg=Ext.getCmp(rgID);

        if (rg.getValue())
            rg.setValue(0);
    }

    var qContainer=getQContainer(checked);
    if (qContainer)
    {
        console.log('  q3groupChanged(): Removing active class from parent container: '+qContainer.id);
        setQActive(qContainer,false);
    }

}

function onq3Enter(field,e)
{
    if (e.getKey()!=e.ENTER)
        return;

    var fID=field.findParentByType('form').getId();

    //User must select a radio button before leaving q3
    var q3=Ext.getCmp(fID+':q3');

    if (!q3.isValid())
        return;

    //Execute the standard callback
    onEnter(q3,e);
}