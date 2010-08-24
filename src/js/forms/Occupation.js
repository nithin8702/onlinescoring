Ext.namespace('NRG.Forms');

var qID='qn5';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Today I am/was (if retired) a/an:'
                        },
                        {
                            id:q('q1'),
                            xtype:'checkboxgroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q2'),
                            invalidClass:'',
                            allowBlank:false,
                            saneCheckboxCount:4,
                            defaults:   {
                                            submitValue:false,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:occuNowChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Student',
                                            inputValue:997,
                                            ranking:8
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            inputValue:998,
                                            ranking:9
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            inputValue:1,
                                            ranking:1
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            inputValue:2,
                                            ranking:2
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            inputValue:3,
                                            ranking:3
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            inputValue:4,
                                            ranking:4
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            inputValue:5,
                                            ranking:5
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            inputValue:6,
                                            ranking:6
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            inputValue:7,
                                            ranking:7
                                        }
                                    ]
                        },
                        {
                            id:'NOW_1',
                            name:'NOW_1',
                            xtype:'hidden',
                            value:NRG.Forms.NoResponse
                        },
                        {
                            id:'NOW_2',
                            name:'NOW_2',
                            xtype:'hidden',
                            value:NRG.Forms.NoResponse
                        },
                        {
                            id:'NOW_3',
                            name:'NOW_3',
                            xtype:'hidden',
                            value:NRG.Forms.NoResponse
                        },
                        {
                            id:'NOW_4',
                            name:'NOW_4',
                            xtype:'hidden',
                            value:NRG.Forms.NoResponse
                        }
                      ]
            };

var q2=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-bottom:10px',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Please list your current/previous occupation:'
                        },
                        {
                            id:q('q2'),
                            name:'NOW_LIST',
                            xtype:'textfield',
                            allowBlank:true,
                            hideLabel:true,
                            disabled:false,
                            next:q('q3'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
                            regex:NRG.Forms.T_String,
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var q3=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'My father is/was (if retired) a/an:'
                        },
                        {
                            id:q('q3'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q4'),
                            invalidClass:'',
                            allowBlank:false,
                            defaults:   {
                                            name:'DAD',
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
                                            boxLabel:'Not Applicable/Unknown',
                                            inputValue:999
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            inputValue:998
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            inputValue:7
                                        }
                                    ]
                        }
                      ]
            };

var q4=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-bottom:10px',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Please list your father\'s occupation:'
                        },
                        {
                            id:q('q4'),
                            name:'DAD_LIST',
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:false,
                            allowBlank:true,
                            next:q('q5'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
                            regex:NRG.Forms.T_String,
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var q5=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'In the future, I plan my career to be a/an:'
                        },
                        {
                            id:q('q5'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q6'),
                            invalidClass:'',
                            allowBlank:true,
                            defaults:   {
                                            name:'FUT',
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
                                            boxLabel:'I am retired',
                                            inputValue:997
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            inputValue:998
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            inputValue:7
                                        }
                                    ]
                        }
                      ]
            };

var q6=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-bottom:10px',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Please list your planned future occupation:'
                        },
                        {
                            id:q('q6'),
                            name:'FUT_LIST',
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:false,
                            allowBlank:true,
                            next:q('q7'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
                            regex:NRG.Forms.T_String,
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter,
                                        }
                        }
                      ]
            };


var q7=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'My mother is/was (if retired) a/an:'
                        },
                        {
                            id:q('q7'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q8'),
                            invalidClass:'',
                            allowBlank:false,
                            defaults:   {
                                            name:'MOM',
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
                                            boxLabel:'Not Applicable/Unknown',
                                            inputValue:999
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            inputValue:998
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            inputValue:7
                                        }
                                    ]
                        }
                      ]
            };

var q8=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-bottom:10px',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Please list your mother\'s occupation:'
                        },
                        {
                            id:q('q8'),
                            name:'MOM_LIST',
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:false,
                            allowBlank:true,
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
                            regex:NRG.Forms.T_String,
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var formFields={
                layout:'column',
                border:false,
                items:  [
                            {
                                width:500,
                                border:false,
                                items:[q1,q2,q3,q4]
                            },
                            {
                                width:500,
                                border:false,
                                items:[q5,q6,q7,q8]
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
                title:'Occupation',
                schema:'OCCU/1.0',
                submitOrder:[
                                'NOW_1','NOW_2','NOW_3','NOW_4','NOW_LIST',
                                'FUT','FUT_LIST','DAD','DAD_LIST','MOM','MOM_LIST'
                            ],
                keys:   {
                            //Digits [1-9]
                            key:[
                                    //Horizontal
                                    49,50,51,52,53,54,55,56,57,
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
                items:[formFields,btnNext]
            };

NRG.Forms.Occupation=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function occuNowChanged(checkboxgroup,checkedFields)
{
    setSeqHiddenFieldsValues('NOW_',checkboxgroup,checkedFields);
    checkboxgroupChanged(checkboxgroup,checkedFields);
}