Ext.namespace('NRG.Forms');

var qID='qn6';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'1. Compared to other people your own age, how would you rate your physical health?'
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
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Much worse than average',
                                            name:q('q1:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Worse than average',
                                            name:q('q1:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Average',
                                            name:q('q1:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Better than average',
                                            name:q('q1:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Much better than average',
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
                            html:'2. How satisfied are you with your present health?'
                        },
                        {
                            id:q('q2'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q3'),
                            invalidClass:'',
                            allowBlank:false,
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Not at all satisfied',
                                            name:q('q2:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Not very satisfied',
                                            name:q('q2:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Neither satisfied not dissatisfied',
                                            name:q('q2:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Somewhat satisfied',
                                            name:q('q2:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Extremely satisfied',
                                            name:q('q2:a1'),
                                            inputValue:5
                                        }
                                    ]
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
                            html:'3. Have you ever lost consciousness for more than 10 minutes because of a head injury?'
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
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
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
            };

var q4=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'4. Are you on post-menopausal estrogen replacement therapy?'
                        },
                        {
                            id:q('q4'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q5'),
                            invalidClass:'',
                            allowBlank:false,
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'No',
                                            name:q('q4:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            name:q('q4:a1'),
                                            inputValue:2
                                        }
                                    ]
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
                            html:'5. List all prescription and nonprescription medications you use <u>at least once a week</u>:'
                        },
                        {
                            id:q('q5'),
                            name:q('q5'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            width:681,
                            next:q('q6'),
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            bodyStyle:'padding:5px',
                                            listeners:  {
                                                            valid:onFieldValid,
                                                            invalid:onFieldInvalid
                                                        }
                                        },
                            layoutConfig:   {
                                                columns:4
                                            },
                            items:  [
                                        //--- TABLE HEADER ---
                                        {
                                            html:'Name of medication',
                                            cls:'table-header'
                                        },
                                        {
                                            html:'Strength (if known)',
                                            cls:'table-header'
                                        },
                                        {
                                            html:'Numbers of times used <u>per week</u>',
                                            cls:'table-header'
                                        },
                                        {
                                            html:'N/A',
                                            cls:'table-header'
                                        },

                                        //--- TABLE BODY

                                        //First row
                                        {
                                            id:q('q5:a1:1'),
                                            name:q('q5:a1:1'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a1:2'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter,
                                                            valid:onFieldValid
                                                        }
                                        },
                                        {
                                            id:q('q5:a1:2'),
                                            name:q('q5:a1:2'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a1:3'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a1:3'),
                                            name:q('q5:a1:3'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a1:4'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a1:4'),
                                            name:q('q5:a1:4'),
                                            xtype:'checkbox',
                                            inputValue:1,
                                            hideLabel:true,
                                            next:q('q5:a2:1'),
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },

                                        //Second row
                                        {
                                            id:q('q5:a2:1'),
                                            name:q('q5:a2:1'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a2:2'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a2:2'),
                                            name:q('q5:a2:2'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a2:3'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a2:3'),
                                            name:q('q5:a2:3'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a2:4'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a2:4'),
                                            name:q('q5:a2:4'),
                                            xtype:'checkbox',
                                            hideLabel:true,
                                            inputValue:2,
                                            next:q('q5:a3:1'),
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },

                                        //Third row
                                        {
                                            id:q('q5:a3:1'),
                                            name:q('q5:a3:1'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a3:2'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a3:2'),
                                            name:q('q5:a3:2'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a3:3'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a3:3'),
                                            name:q('q5:a3:3'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a3:4'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a3:4'),
                                            name:q('q5:a3:4'),
                                            xtype:'checkbox',
                                            inputValue:3,
                                            hideLabel:true,
                                            next:q('q5:a4:1'),
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },

                                        //Forth row
                                        {
                                            id:q('q5:a4:1'),
                                            name:q('q5:a4:1'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a4:2'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a4:2'),
                                            name:q('q5:a4:2'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a4:3'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a4:3'),
                                            name:q('q5:a4:3'),
                                            xtype:'textfield',
                                            hideLabel:true,
                                            disabled:false,
                                            next:q('q5:a4:4'),
                                            width:215,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                                        {
                                            id:q('q5:a4:4'),
                                            name:q('q5:a4:4'),
                                            xtype:'checkbox',
                                            inputValue:4,
                                            hideLabel:true,
                                            next:q('q6'),
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        }
                                    ]
                        }
                      ]
            };





var q6=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-use-mouse q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'6. Please check which of following conditions you have now or have had in the past.'
                        },
                        {
                            id:q('q6'),
                            name:q('q6'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            cls:'q-table',
                            width:561,
                            next:q('q7'),
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            bodyStyle:'padding:5px',
                                            ctCls:'q-table-td-border',
                                            listeners:  {
                                                            valid:onFieldValid,
                                                            invalid:onFieldInvalid,
                                                            specialkey:onEnter
                                                        }
                                        },
                            layoutConfig:   {
                                                columns:4
                                            },
                            items:  [
                                        //--- TABLE HEADER ---
                                        {
                                            html:'Condition',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'In your lifetime',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'Currently (now)',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'N/A',
                                            cls:'table-header',
                                            border:false
                                        },

                                        //--- TABLE BODY
                                        {
                                            html:'Cancer (other than skin cancer)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a1:1'),
                                            name:q('q6:a1:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a1:2'),
                                            name:q('q6:a1:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a1:3'),
                                            name:q('q6:a1:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },

                                        {
                                            html:'Chronic migraine headaches',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a2:1'),
                                            name:q('q6:a2:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a2:2'),
                                            name:q('q6:a2:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a2:3'),
                                            name:q('q6:a2:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Diabetes
                                        {
                                            html:'Diabetes',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a3:1'),
                                            name:q('q6:a3:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a3:2'),
                                            name:q('q6:a3:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a3:3'),
                                            name:q('q6:a3:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Encephalitis or meningitis
                                        {
                                            html:'Encephalitis or meningitis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a4:1'),
                                            name:q('q6:a4:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a4:2'),
                                            name:q('q6:a4:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a4:3'),
                                            name:q('q6:a4:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Epilepsy
                                        {
                                            html:'Epilepsy',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a5:1'),
                                            name:q('q6:a5:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a5:2'),
                                            name:q('q6:a5:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a5:3'),
                                            name:q('q6:a5:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //High blood pressure
                                        {
                                            html:'High blood pressure',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a6:1'),
                                            name:q('q6:a6:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a6:2'),
                                            name:q('q6:a6:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a6:3'),
                                            name:q('q6:a6:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Multiple sclerosis
                                        {
                                            html:'Multiple sclerosis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a7:1'),
                                            name:q('q6:a7:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a7:2'),
                                            name:q('q6:a7:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a7:3'),
                                            name:q('q6:a7:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Parkinson’s disease
                                        {
                                            html:'Parkinson\'s disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a8:1'),
                                            name:q('q6:a8:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a8:2'),
                                            name:q('q6:a8:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a8:3'),
                                            name:q('q6:a8:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Stroke
                                        {
                                            html:'Stroke',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a9:1'),
                                            name:q('q6:a9:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a9:2'),
                                            name:q('q6:a9:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a9:3'),
                                            name:q('q6:a9:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Depression (diagnosed or treated)
                                        {
                                            html:'Depression (diagnosed or treated)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a10:1'),
                                            name:q('q6:a10:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a10:2'),
                                            name:q('q6:a10:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a10:3'),
                                            name:q('q6:a10:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Attention Deficit Hyperactivity Disorder
                                        {
                                            html:'Attention Deficit Hyperactivity Disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a11:1'),
                                            name:q('q6:a11:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a11:2'),
                                            name:q('q6:a11:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a11:3'),
                                            name:q('q6:a11:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Anxiety disorder
                                        {
                                            html:'Anxiety disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a12:1'),
                                            name:q('q6:a12:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a12:2'),
                                            name:q('q6:a12:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a12:3'),
                                            name:q('q6:a12:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Personality disorder
                                        {
                                            html:'Personality disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a13:1'),
                                            name:q('q6:a13:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a13:2'),
                                            name:q('q6:a13:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a13:3'),
                                            name:q('q6:a13:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Schizophrenia or other psychotic disorder
                                        {
                                            html:'Schizophrenia or other psychotic disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a14:1'),
                                            name:q('q6:a14:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a14:2'),
                                            name:q('q6:a14:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a14:3'),
                                            name:q('q6:a14:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Bipolar disorder
                                        {
                                            html:'Bipolar disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a15:1'),
                                            name:q('q6:a15:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a15:2'),
                                            name:q('q6:a15:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a15:3'),
                                            name:q('q6:a15:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Alcohol Abuse or Dependence
                                        {
                                            html:'Alcohol Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a16:1'),
                                            name:q('q6:a16:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a16:2'),
                                            name:q('q6:a16:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a16:3'),
                                            name:q('q6:a16:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Other Substance Abuse or Dependence
                                        {
                                            html:'Other Substance Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a17:1'),
                                            name:q('q6:a17:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a17:2'),
                                            name:q('q6:a17:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a17:3'),
                                            name:q('q6:a17:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Other Substance Abuse or Dependence
                                        {
                                            html:'Other significant illnesses (please list)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a18:1'),
                                            name:q('q6:a18:1'),
                                            xtype:'textfield',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q6:a18:2'),
                                            name:q('q6:a18:2'),
                                            xtype:'textfield',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q6:a18:3'),
                                            name:q('q6:a18:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        }
                                    ]
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
                            html:'7. Are you currently taking any medication for a psychiatric or neurology problem?<br/><span class="q-etc" style="padding-left:25px">(such as an antidepressant, an anti-anxiety medication, a mood stabilizer, an antipsychotic or an anticonvulsant)</span>'
                        },
                        {
                            id:q('q7'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disableQ:q('q7:a2'),
                            next:q('q8'),
                            invalidClass:'',
                            allowBlank:false,
                            next:q('q8'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'No',
                                            name:q('q7:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            name:q('q7:a1'),
                                            inputValue:2,
                                            enableQ:q('q7:a2'),
                                            next:q('q7:a2')
                                        }
                                    ]
                        },
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'If yes, what is the purpose of the medication?'
                        },
                        {
                            id:q('q7:a2'),
                            name:q('q7:a2'),
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:true,
                            next:q('q8'),
                            width:250,
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var q8=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'8. Have you ever taken one of the medications listed on the back of this sheet in the past?'
                        },
                        {
                            id:q('q8'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disableQ:q('q8:a2'),
                            invalidClass:'',
                            allowBlank:false,
                            next:q('q9'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'No',
                                            name:q('q8:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            name:q('q8:a1'),
                                            inputValue:2,
                                            enableQ:q('q8:a2'),
                                            next:q('q8:a2')
                                        }
                                    ]
                        },
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'If yes, what medication(s) and for how long?'
                        },
                        {
                            id:q('q8:a2'),
                            name:q('q8:a2'),
                            xtype:'textfield',
                            hideLabel:true,
                            disabled:true,
                            width:250,
                            next:q('q9'),
                            style:'margin-left:'+radioPaddingLeft+'px; margin-top:10px',
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var q9=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-use-mouse q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'9. Please check which of following conditions\
 your mother, your father, or any of your siblings currently<br/>\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;have now or have had in the past. Please \
answer these questions as they apply to your biological relatives <br/>\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and not to your parents or siblings through\
 adoption or marriage.'
                        },
                        {
                            id:q('q9'),
                            name:q('q9'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            cls:'q-table',
                            width:561,
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            next:q('q10'),
                            defaults:   {
                                            bodyStyle:'padding:5px',
                                            ctCls:'q-table-td-border',
                                            listeners:  {
                                                            valid:onFieldValid,
                                                            invalid:onFieldInvalid,
                                                            specialkey:onEnter
                                                        }
                                        },
                            layoutConfig:   {
                                                columns:4
                                            },
                            items:  [
                                        //--- TABLE HEADER ---
                                        {
                                            html:'Condition',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'Mother',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'Father',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'Sibling',
                                            cls:'table-header',
                                            border:false
                                        },

                                        //Heart attack
                                        {
                                            html:'Heart attack',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a1:1'),
                                            name:q('q7:a1:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a1:2'),
                                            name:q('q7:a1:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a1:3'),
                                            name:q('q7:a1:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Alzheimer's disease
                                        {
                                            html:'Alzheimer\'s disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a2:1'),
                                            name:q('q7:a2:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a2:2'),
                                            name:q('q7:a2:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a2:3'),
                                            name:q('q7:a2:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Aging dementia that is not Alzheimer\'s
                                        {
                                            html:'Aging dementia that is not Alzheimer\'s',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a3:1'),
                                            name:q('q7:a3:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a3:2'),
                                            name:q('q7:a3:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a3:3'),
                                            name:q('q7:a3:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Multiple sclerosis
                                        {
                                            html:'Multiple sclerosis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a4:1'),
                                            name:q('q7:a4:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a4:2'),
                                            name:q('q7:a4:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a4:3'),
                                            name:q('q7:a4:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Cancer (other than skin cancer)
                                        {
                                            html:'Cancer (other than skin cancer)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a5:1'),
                                            name:q('q7:a5:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a5:2'),
                                            name:q('q7:a5:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a5:3'),
                                            name:q('q7:a5:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Chronic migraine headaches
                                        {
                                            html:'Chronic migraine headaches',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a6:1'),
                                            name:q('q7:a6:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a6:2'),
                                            name:q('q7:a6:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a6:3'),
                                            name:q('q7:a6:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Diabetes
                                        {
                                            html:'Diabetes',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a7:1'),
                                            name:q('q7:a7:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a7:2'),
                                            name:q('q7:a7:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a7:3'),
                                            name:q('q7:a7:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Encephalitis or meningitis
                                        {
                                            html:'Encephalitis or meningitis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a8:1'),
                                            name:q('q7:a8:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a8:2'),
                                            name:q('q7:a8:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a8:3'),
                                            name:q('q7:a8:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Epilepsy
                                        {
                                            html:'Epilepsy',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a9:1'),
                                            name:q('q7:a9:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a9:2'),
                                            name:q('q7:a9:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a9:3'),
                                            name:q('q7:a9:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //High blood pressure
                                        {
                                            html:'High blood pressure',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a10:1'),
                                            name:q('q7:a10:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a10:2'),
                                            name:q('q7:a10:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a10:3'),
                                            name:q('q7:a10:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Parkinson’s disease
                                        {
                                            html:'Parkinson\'s disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a11:1'),
                                            name:q('q7:a11:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a11:2'),
                                            name:q('q7:a11:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a11:3'),
                                            name:q('q7:a11:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Stroke
                                        {
                                            html:'Stroke',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a12:1'),
                                            name:q('q7:a12:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a12:2'),
                                            name:q('q7:a12:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a12:3'),
                                            name:q('q7:a12:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Depression (diagnosed or treated)
                                        {
                                            html:'Depression (diagnosed or treated)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a13:1'),
                                            name:q('q7:a13:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a13:2'),
                                            name:q('q7:a13:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a13:3'),
                                            name:q('q7:a13:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Attention Deficit Hyperactivity Disorder
                                        {
                                            html:'Attention Deficit Hyperactivity Disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a14:1'),
                                            name:q('q7:a14:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a14:2'),
                                            name:q('q7:a14:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a14:3'),
                                            name:q('q7:a14:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Anxiety disorder
                                        {
                                            html:'Anxiety disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a15:1'),
                                            name:q('q7:a15:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a15:2'),
                                            name:q('q7:a15:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a15:3'),
                                            name:q('q7:a15:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Personality disorder
                                        {
                                            html:'Personality disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a16:1'),
                                            name:q('q7:a16:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a16:2'),
                                            name:q('q7:a16:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a16:3'),
                                            name:q('q7:a16:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Schizophrenia or other psychotic disorder
                                        {
                                            html:'Schizophrenia or other psychotic disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a17:1'),
                                            name:q('q7:a17:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a17:2'),
                                            name:q('q7:a17:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a17:3'),
                                            name:q('q7:a17:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Bipolar disorder
                                        {
                                            html:'Bipolar disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a18:1'),
                                            name:q('q7:a18:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a18:2'),
                                            name:q('q7:a18:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a18:3'),
                                            name:q('q7:a18:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Alcohol Abuse or Dependence
                                        {
                                            html:'Alcohol Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a19:1'),
                                            name:q('q7:a19:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a19:2'),
                                            name:q('q7:a19:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a19:3'),
                                            name:q('q7:a19:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Other Substance Abuse or Dependence
                                        {
                                            html:'Other Substance Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a20:1'),
                                            name:q('q7:a20:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a20:2'),
                                            name:q('q7:a20:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a20:3'),
                                            name:q('q7:a20:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        },
                                        //Mild mental illness but details are unknown
                                        {
                                            html:'Mild mental illness but details are unknown',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q7:a21:1'),
                                            name:q('q7:a21:1'),
                                            xtype:'checkbox',
                                            inputValue:1
                                        },
                                        {
                                            id:q('q7:a21:2'),
                                            name:q('q7:a21:2'),
                                            xtype:'checkbox',
                                            inputValue:2
                                        },
                                        {
                                            id:q('q7:a21:3'),
                                            name:q('q7:a21:3'),
                                            xtype:'checkbox',
                                            inputValue:3
                                        }
                                ]
                        }
                      ]
            };

//Subject Retire/year
var q10=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:10px;padding-bottom:25px',
                items:[
                        {
                            id:q('q10'),
                            name:q('q10'),
                            xtype:'numberfield',
                            fieldLabel:'10. How many biological siblings do you have?',
                            labelStyle:'padding-top:5px;width:300px',
                            allowBlank:false,
                            minValue:0,
                            maxValue:99,
                            maxLength:2,
                            width:65,
                            format:'Y',
                            next:q('q11'),
                            listeners:  {
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var q11=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'11. Do you know your mother\'s health history well enough that the answers above are accurate?'
                        },
                        {
                            id:q('q11'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            allowBlank:false,
                            next:q('q12'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'No',
                                            name:q('q11:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            name:q('q11:a1'),
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            };

var q12=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'12. Do you know your father\'s health history well enough that the answers above are accurate?'
                        },
                        {
                            id:q('q12'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            allowBlank:false,
                            next:q('q13'),
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'No',
                                            name:q('q12:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            name:q('q12:a1'),
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            };

var q13=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Enter any additional comments in the box below:'
                        },
                        {
                            id:q('q13'),
                            xtype:'textarea',
                            hideLabel:true,
                            width:450,
                            height:125,
                            style:'margin-left:'+radioPaddingLeft+'px;margin-top:10px;margin-bottom:40px',
                            invalidClass:'',
                            listeners:  {
                                            blur:nextField,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var form=   {
                id:qID,
                xtype:'form',
                border:false,
                autoScroll:true,
                title:'Health',
                keys:   {
                            //Digits [1-5]
                            key:[49,50,51,52,53],
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
                items:[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13]
            };

NRG.Forms.Health=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}