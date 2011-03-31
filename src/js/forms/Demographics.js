/* Demographics.js tabsize=4
 *
 * The Demographics Form.
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

Ext.namespace('NRG.Forms');

var qID='qn2';
var radioPaddingLeft=25;
var now=new Date();

//Subject Sex
var sSex=        {
                    id:q('q1'),
                    xtype:'radiogroup',
                    fieldLabel:'Sex',
                    invalidClass:'',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    ctCls:'q-container',
                    style:'padding-left:0px',
                    width:150,
                    height:22,
                    allowBlank:true,
                    next:q('q2'),
                    defaults:   {
                                    name:'SEX',
                                    width:75
                                },
                    listeners:  {
                                    change:radiogroupChanged,
                                    focus:onFieldFocus,
                                    blur:onFocusLost,
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

//Subject DOB proxy
var sDOB=       {
                    id:q('q2'),
                    xtype:'datefield',
                    fieldLabel:'Year of Birth',
                    labelStyle:'width:135px;text-shadow: 2px 2px 2px #ccc',
                    format:'Y',
                    width:100,
                    ctCls:'q-container',
                    allowBlank:true,
                    //Restrict DOB entries to 150 year range
                    maxValue:now,
                    minValue:new Date(1900,0,1),
                    selectOnFocus:true,
                    next:q('q3'),
                    listeners:  {
                                    valid:onDOBChange,
                                    blur:onDOBChange,
                                    change:onDOBChange,
                                    specialkey:onEnter,
                                    focus:onFieldFocus
                                }
                }

var sDOBhidden= {
                    id:q('q2:a1'),
                    name:'YOB',
                    xtype:'hidden',
                    value:NRG.Forms.NoResponse
                };

//Subject height
var sHeight=    {
                    id:q('q3'),
                    name:'HT',
                    xtype:'numberfield',
                    fieldLabel:'Height <span class="qexplanation">(inches)</span>',
                    labelStyle:'text-shadow: 2px 2px 2px #ccc',
                    width:135,
                    allowBlank:true,
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
                    name:'WT',
                    xtype:'numberfield',
                    fieldLabel:'Weight <span class="qexplanation">(pounds)</span>',
                    labelStyle:'width:135px;text-shadow: 2px 2px 2px #ccc',
                    width:100,
                    allowBlank:true,
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
                        xtype:'combo',
                        width:160,
                        value:'USA',
                        inputValue:'USA',
                        submitValue:false,
                        allowBlank:true,
                        forceSelection:false,
                        selectOnFocus:true,
                        store:NRG.Store.Countries,
                        typeAhead:true,
                        mode:'local',
                        valueField:'name',
                        displayField:'name',
                        next:q('q5:a2'),
                        listeners:  {
                                        focus:onFieldFocus,
                                        specialkey:onEnter,
                                        change:onCountryChanged
                                    }
                    };

var hiddenCountry=  {
                        id:'COUNTRY',
                        name:'COUNTRY',
                        xtype:'hidden',
                        value:'US'
                    }

//State
var birthState=     {
                        id:q('q5:a2'),
                        xtype:'combo',
                        width:125,
                        allowBlank:true,
                        selectOnFocus:true,
                        forceSelection:false,
                        next:q('q5:a3'),
                        editable:true,
                        store:NRG.Store.States,
                        typeAhead:true,
                        mode:'local',
                        valueField:'state',
                        displayField:'name',
                        listeners:  {
                                        focus:onFieldFocus,
                                        specialkey:onEnter,
                                        change:onStateChanged
                                    }
                    };

var hiddenState=    {
                        id:'STATE',
                        name:'STATE',
                        xtype:'hidden',
                        value:NRG.Forms.NoResponse
                    };



//City
var birthCity=      {
                        id:q('q5:a3'),
                        name:'CITY',
                        xtype:'textfield',
                        width:125,
                        allowBlank:true,
                        selectOnFocus:true,
                        maxLength:100,
                        next:q('q6'),
                        regex:NRG.Forms.T_StringWithQuotes,
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
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            allowBlank:true,
                            next:q('q7'),
                            defaults:   {
                                            name:'MARITAL'
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            disableQ:[q('q6:a2')],
                            items:  [
                                        {
                                            boxLabel:'Single',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Married',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Separated',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Divorced',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Widowed',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Other',
                                            enableQ:[q('q6:a2')],
                                            next:q('q6:a2'),
                                            inputValue:6
                                        }
                                    ]
                        },
                        {
                            id:q('q6:a2'),
                            name:'MARITAL_LIST',
                            xtype:'textfield',
                            width:125,
                            allowBlank:true,
                            disabled:true,
                            fieldLabel:'please specify',
                            style:'margin-top:5px',
                            labelStyle:'width:100px; padding-left:10px; font-weight:normal',
                            next:q('q7'),
                            regex:NRG.Forms.T_String,
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
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            disableQ:[q('q7:a2')],
                            next:q('q8'),
                            defaults:   {
                                            name:'HOUSE'
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Residence hall/College dormitory',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'House/Apartment/Condominium',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Senior housing (independent)',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Assisted living',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Nursing home',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Relative\'s home',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Other',
                                            enableQ:[q('q7:a2')],
                                            next:q('q7:a2'),
                                            inputValue:7
                                        }
                                    ]
                        },
                        {
                            id:q('q7:a2'),
                            name:'HOUSE_LIST',
                            xtype:'textfield',
                            width:125,
                            disabled:true,
                            allowBlank:true,
                            fieldLabel:'please specify',
                            style:'margin-top:5px',
                            labelStyle:'width:100px; padding-left:10px; font-weight:normal',
                            next:q('q8'),
                            regex:NRG.Forms.T_String,
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
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
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
                                            name:'LIVE',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'With family members - list',
                                            name:'LIVE',
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
                                                        name:'LIVE_LIST',
                                                        allowBlank:true,
                                                        style:'margin-left:35px;width:185px;margin-top:5px',
                                                        next:q('q9'),
                                                        selectOnFocus:true,
                                                        regex:NRG.Forms.T_String,
                                                        listeners:  {
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter
                                                                    }
                                                    }]
                                        },
                                        {
                                            boxLabel:'With non-family members',
                                            name:'LIVE',
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
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            disableQ:[q('q9:a2'),q('q10')],
                            next:[q('q10'), q('q11')],
                            defaults:   {
                                            name:'ENG_NAT'
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No (please specify your primary language)',
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
                                        name:'NAT_LANG',
                                        allowBlank:true,
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
                            name:'ENG_AGE',
                            xtype:'numberfield',
                            allowBlank:true,
                            fieldLabel:'If NO: At what age did you learn English?',
                            labelStyle:'width:265px;text-shadow: 2px 2px 2px #ccc',
                            style:'margin-top:5px;',
                            disabled:true,
                            minValue:0,
                            maxValue:100,
                            maxLength:6,
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
                            html:'5. Occupational status <span class="qexplanation">(check all that apply)</span>'
                        },
                        {
                            id:q('q11'),
                            xtype:'checkboxgroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px;background-color:transparent',
                            disableQ:[q('q11:a2'),q('q12')],
                            next:[q('q11:a2'),q('q12')],
                            saneCheckboxCount:4,
                            defaults:   {
                                            submitValue:false
                                        },
                            listeners:  {
                                            change:occuCheckboxChanged,
                                            specialkey:onEnter,      
                                            focus:onFieldFocus
                                        },
                            items:  [
                                        {
                                            boxLabel:'Working full-time',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Working part-time',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Student',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Retired',
                                            inputValue:5,
                                            enableQ:[q('q12')]
                                        },
                                        {
                                            boxLabel:'Volunteer worker',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Seeking employment, laid off, etc.',
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Leave of absence',
                                            inputValue:8
                                        },
                                        {
                                            boxLabel:'Other',
                                            enableQ:[q('q11:a2')],
                                            inputValue:9
                                        }
                                    ]
                        },
                        {
                            id:q('q11:a2'),
                            name:'OCCU_LIST',
                            xtype:'textfield',
                            width:125,
                            disabled:true,
                            allowBlank:true,
                            fieldLabel:'please specify',
                            style:'margin-top:5px',
                            labelStyle:'width:100px; padding-left:10px; font-weight:normal',
                            next:q('q12'),
                            regex:NRG.Forms.T_String,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            xtype:'hidden',
                            id:'OCCU_1',
                            name:'OCCU_1',
                            value:NRG.Forms.NoResponse
                        },
                        {
                            xtype:'hidden',
                            id:'OCCU_2',
                            name:'OCCU_2',
                            value:NRG.Forms.NoResponse
                        },
                        {
                            xtype:'hidden',
                            id:'OCCU_3',
                            name:'OCCU_3',
                            value:NRG.Forms.NoResponse
                        },
                        {
                            xtype:'hidden',
                            id:'OCCU_4',
                            name:'OCCU_4',
                            value:NRG.Forms.NoResponse
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
                            name:'RETIRE_YEAR',
                            xtype:'numberfield',
                            fieldLabel:'6. If you are retired, in what year did you retire?',
                            labelStyle:'width:310px;padding-top:5px;text-shadow: 2px 2px 2px #ccc',
                            disabled:true,
                            allowBlank:true,
                            minValue:1900,
                            maxValue:2010,
                            maxLength:4,
                            width:65,
                            listeners:  {
                                            change:onRetireYearChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            id:q('q12:a1'),
                            name:'RETIRE_AGE',
                            xtype:'hidden',
                            value:NRG.Forms.NoResponse,
                            minValue:16
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
                                birthCity,
                                hiddenCountry,
                                hiddenState
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
                        items:[sDOB,sDOBhidden,sWeight]
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
                schema:'DEM/1.4',
                xtype:'form',
                border:false,
                autoScroll:false,
                buttonAlign:'left',
                title:'Demographics',
                resetHandler:resetState,
                submitOrder:[
                                'SEX', 'YOB','HT','WT',
                                'COUNTRY','STATE','CITY','ZIP',
                                'MARITAL','MARITAL_LIST','HOUSE','HOUSE_LIST',
                                'LIVE','LIVE_LIST','ENG_NAT','NAT_LANG','ENG_AGE',
                                'OCCU_1','OCCU_2','OCCU_3','OCCU_4','OCCU_LIST',
                                'RETIRE_YEAR','RETIRE_AGE'
                            ],
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

function onCountryChanged(field, newval, oldval)
{
    Ext.getCmp('COUNTRY').setRawValue(newval);
}

function onStateChanged(field, newval, oldval)
{
    Ext.getCmp('STATE').setRawValue(newval);
}

function onDOBChange(field, newval, oldval)
{
    if (!field.isValid())
        return;

    newval=field.getValue();

    var hiddenDOB=Ext.getCmp('qn2:q2:a1');

    if (!newval)
    {
        hiddenDOB.setValue(NRG.Forms.NoResponse);
        return;
    }

    hiddenDOB.setValue(newval.format('Y'));
}

function onRetireYearChanged(field, newval, oldval)
{
    if (!field.isValid())
        return false;

    //Check the Date of Birth field
    var dobfield=Ext.getCmp('qn2:q2');
    var dobstr=dobfield.getValue();
    if (dobstr.length<=0)
    {
        dobfield.markInvalid('The Date of Birth field is required.');
        field.setRawValue('');
        field.markInvalid('Please complete the Date of Birth field first.');
        return false;
    }

    var dob=new Date(dobstr);
    var dobYear=dob.getFullYear();

    if (newval<=dobYear)
    {
        field.setRawValue('');
        field.markInvalid('Please enter a value that is greater than the year of birth.');
        return false;
    }

    //Compute the retirement age
    var age=newval-dobYear;

    //Set the value of the hidden age field
    var hiddenAge=Ext.getCmp('qn2:q12:a1');

    if (!hiddenAge)
        return false;

    if (defined(hiddenAge.minValue) && (age<hiddenAge.minValue))
    {
        field.setRawValue('');
        field.markInvalid('The minimum year of retirement has to be '+(dobYear+hiddenAge.minValue));
        return false;
    }
    
    hiddenAge.setValue(age);

    return true;
}

function occuCheckboxChanged(checkboxgroup,checkedItems)
{
    setSeqHiddenFieldsValues('OCCU_',checkboxgroup,checkedItems);
    checkboxgroupChanged(checkboxgroup,checkedItems);
}

function resetState(form)
{
    var stateField=Ext.getCmp(form.getId()+':q5:a2');
    if (!stateField)
        return;

    stateField.setValue('');
}

function setMaleSubject()
{
    console.log("Male subject!");
}
