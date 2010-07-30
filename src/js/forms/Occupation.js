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
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q2'),
                            invalidClass:'',
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
                                            boxLabel:'Student',
                                            name:q('q1:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            name:q('q1:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            name:q('q1:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            name:q('q1:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            name:q('q1:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            name:q('q1:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            name:q('q1:a1'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            name:q('q1:a1'),
                                            inputValue:8
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            name:q('q1:a1'),
                                            inputValue:9
                                        }
                                    ]
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
                            name:q('q2'),
                            xtype:'textfield',
                            allowBlank:false,
                            hideLabel:true,
                            disabled:false,
                            next:q('q3'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
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
                                            name:q('q3:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            name:q('q3:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            name:q('q3:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            name:q('q3:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            name:q('q3:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            name:q('q3:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            name:q('q3:a1'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            name:q('q3:a1'),
                                            inputValue:8
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            name:q('q3:a1'),
                                            inputValue:9
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
                            name:q('q4'),
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:false,
                            allowBlank:false,
                            next:q('q5'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
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
                                            boxLabel:'I am retired',
                                            name:q('q5:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            name:q('q5:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            name:q('q5:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            name:q('q5:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            name:q('q5:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            name:q('q5:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            name:q('q5:a1'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            name:q('q5:a1'),
                                            inputValue:8
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            name:q('q5:a1'),
                                            inputValue:9
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
                            name:q('q6'),
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:false,
                            allowBlank:false,
                            next:q('q7'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
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
                                            name:q('q7:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Homemaker',
                                            name:q('q7:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Day Laborer <span class="q-etc">(i.e. janitor, housecleaner, cafeteria employee)</span>',
                                            name:q('q7:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Machine Operator and Manual Worker <span class="q-etc">(i.e. truck driver, construction worker)</span>',
                                            name:q('q7:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Skilled Manual Employee <span class="q-etc">(i.e. auto mechanic, carpenter, hairdresser)</span>',
                                            name:q('q7:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Clerical and Sales Worker or Technician <span class="q-etc">(i.e. retail sales, secretary, receptionist)</span>',
                                            name:q('q7:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Administrative Personnel <span class="q-etc">(i.e. administrator, supervisor, librarian)</span>',
                                            name:q('q7:a1'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Business Manager or Professional<br/><span class="q-etc">(i.e. nurse, teacher, police/fire personnel, speech therapist, PT, OT, financial manager)</span>',
                                            name:q('q7:a1'),
                                            inputValue:8
                                        },
                                        {
                                            boxLabel:'Higher Executive or Major Professional <span class="q-etc">(i.e. physician, professor, engineer, CEO)</span>',
                                            name:q('q7:a1'),
                                            inputValue:9
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
                            name:q('q8'),
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:false,
                            allowBlank:false,
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
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

