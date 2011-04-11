/* Health.js tabsize=4
 *
 * The Health Form.
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
                            allowBlank:true,
                            defaults:   {
                                            name:'HEALTH',
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
                                            boxLabel:'Much worse than average',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Worse than average',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Average',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Better than average',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Much better than average',
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
                            allowBlank:true,
                            defaults:   {
                                            name:'SATISFY',
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
                                            boxLabel:'Not at all satisfied',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Not very satisfied',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Neither satisfied nor dissatisfied',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Somewhat satisfied',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Extremely satisfied',
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
                            allowBlank:true,
                            defaults:   {
                                            name:'CONSCIOUS',
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
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
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
                            next:q('q5:a0'),
                            invalidClass:'',
                            allowBlank:true,
                            defaults:   {
                                            name:'POST_MENO',
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
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
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
                            id:q('q5:a0'),
                            xtype:'checkbox',
                            inputValue:1,
                            boxLabel:'N/A',
                            hideLabel:true,
                            ctCls:'leftpaddinghack',
                            submitValue:false,
                            next:q('q5:a1:1'),
                            listeners:  {
                                            check:onQ5NA,
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            id:q('q5'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            width:645,
                            next:q('q6:a0'),
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            bodyStyle:'padding:5px',
                                            hideLabel:true,
                                            disabled:false,
                                            width:215,
                                            selectOnFocus:true,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },
                            layoutConfig:   {
                                                columns:3
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

                                        //--- TABLE BODY

                                        //First row
                                        {
                                            id:q('q5:a1:1'),
                                            name:'MED_1',
                                            xtype:'textfield',
                                            next:q('q5:a1:2')
                                        },
                                        {
                                            id:q('q5:a1:2'),
                                            name:'MED_STRENGTH_1',
                                            xtype:'textfield',
                                            next:q('q5:a1:3')
                                        },
                                        {
                                            id:q('q5:a1:3'),
                                            name:'MED_FREQ_1',
                                            xtype:'textfield',
                                            next:q('q5:a2:1')
                                        },

                                        //Second row
                                        {
                                            id:q('q5:a2:1'),
                                            name:'MED_2',
                                            xtype:'textfield',
                                            next:q('q5:a2:2')
                                        },
                                        {
                                            id:q('q5:a2:2'),
                                            name:'MED_STRENGTH_2',
                                            xtype:'textfield',
                                            next:q('q5:a2:3')
                                        },
                                        {
                                            id:q('q5:a2:3'),
                                            name:'MED_FREQ_2',
                                            xtype:'textfield',
                                            next:q('q5:a3:1')
                                        },

                                        //Third row
                                        {
                                            id:q('q5:a3:1'),
                                            name:'MED_3',
                                            xtype:'textfield',
                                            next:q('q5:a3:2')
                                        },
                                        {
                                            id:q('q5:a3:2'),
                                            name:'MED_STRENGTH_3',
                                            xtype:'textfield',
                                            next:q('q5:a3:3')
                                        },
                                        {
                                            id:q('q5:a3:3'),
                                            name:'MED_FREQ_3',
                                            xtype:'textfield',
                                            next:q('q5:a4:1')
                                        },

                                        //Forth row
                                        {
                                            id:q('q5:a4:1'),
                                            name:'MED_4',
                                            xtype:'textfield',
                                            next:q('q5:a4:2')
                                        },
                                        {
                                            id:q('q5:a4:2'),
                                            name:'MED_STRENGTH_4',
                                            xtype:'textfield',
                                            next:q('q5:a4:3')
                                        },
                                        {
                                            id:q('q5:a4:3'),
                                            name:'MED_FREQ_4',
                                            xtype:'textfield',
                                            next:q('q5:a5')
                                        }
                                    ]
                        },
                        {
                            id:q('q5:a5'),
                            name:'RX',
                            xtype:'numberfield',
                            fieldLabel:'Number of prescription meds',
                            labelStyle:'width:225px',
                            style:'width:50px',
                            ctCls:'toppaddinghack q-container',
                            next:q('q5:a6'),
                            selectOnFocus:true,
                            value:NRG.Forms.NoResponse,
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            id:q('q5:a6'),
                            name:'NON_RX',
                            xtype:'numberfield',
                            fieldLabel:'Number of non-prescription meds',
                            labelStyle:'width:225px',
                            style:'width:50px',
                            ctCls:'q-container',
                            next:q('q6:a0'),
                            selectOnFocus:true,
                            value:NRG.Forms.NoResponse,
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
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
                            html:'6. Please check which of following conditions you have now or have had in the past:'
                        },

                        {
                            id:q('q6'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            cls:'q-table',
                            width:650,
                            next:q('q7'),
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            shortcut:'x',
                                            bodyStyle:'padding:5px',
                                            ctCls:'q-table-td-border',
                                            listeners:  {
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
                                            id:q('q6:a0'),
                                            width:75,
                                            submitValue:false,
                                            xtype:'checkbox',
                                            inputValue:1,
                                            boxLabel:'<span class="table-header">N/A</span>',
                                            hideLabel:true,
                                            next:q('q7'),
                                            listeners:  {
                                                            check:onQ6NA,
                                                            blur:onFocusLost,
                                                            focus:onFieldFocus,
                                                            specialkey:onEnter
                                                        }
                                        },

                                        //--- TABLE BODY
                                        {
                                            html:'Cancer (other than skin cancer)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a1:1'),
                                            name:'CANC',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a1:2'),
                                            name:'CANC',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a1:3'),
                                            name:'CANC',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        {
                                            html:'Chronic migraine headaches',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a2:1'),
                                            name:'MIGRAINE',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a2:2'),
                                            name:'MIGRAINE',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a2:3'),
                                            name:'MIGRAINE',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Diabetes
                                        {
                                            html:'Diabetes',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a3:1'),
                                            name:'DIABETES',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a3:2'),
                                            name:'DIABETES',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a3:3'),
                                            name:'DIABETES',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Encephalitis or meningitis
                                        {
                                            html:'Encephalitis or meningitis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a4:1'),
                                            name:'ENCEPH',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a4:2'),
                                            name:'ENCEPH',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a4:3'),
                                            name:'ENCEPH',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Epilepsy
                                        {
                                            html:'Epilepsy',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a5:1'),
                                            name:'EPILEPSY',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a5:2'),
                                            name:'EPILEPSY',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a5:3'),
                                            name:'EPILEPSY',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //High blood pressure
                                        {
                                            html:'High blood pressure',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a6:1'),
                                            name:'HBP',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a6:2'),
                                            name:'HBP',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a6:3'),
                                            name:'HBP',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Multiple sclerosis
                                        {
                                            html:'Multiple sclerosis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a7:1'),
                                            name:'MS',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a7:2'),
                                            name:'MS',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a7:3'),
                                            name:'MS',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Parkinson’s disease
                                        {
                                            html:'Parkinson\'s disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a8:1'),
                                            name:'PARK',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a8:2'),
                                            name:'PARK',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a8:3'),
                                            name:'PARK',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Stroke
                                        {
                                            html:'Stroke',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a9:1'),
                                            name:'STROKE',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a9:2'),
                                            name:'STROKE',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a9:3'),
                                            name:'STROKE',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Depression (diagnosed or treated)
                                        {
                                            html:'Depression (diagnosed or treated)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a10:1'),
                                            name:'DEP',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a10:2'),
                                            name:'DEP',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a10:3'),
                                            name:'DEP',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Attention Deficit Hyperactivity Disorder
                                        {
                                            html:'Attention Deficit Hyperactivity Disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a11:1'),
                                            name:'ADHD',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a11:2'),
                                            name:'ADHD',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a11:3'),
                                            name:'ADHD',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Anxiety disorder
                                        {
                                            html:'Anxiety disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a12:1'),
                                            name:'ANX',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a12:2'),
                                            name:'ANX',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a12:3'),
                                            name:'ANX',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Personality disorder
                                        {
                                            html:'Personality disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a13:1'),
                                            name:'PD',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a13:2'),
                                            name:'PD',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a13:3'),
                                            name:'PD',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Schizophrenia or other psychotic disorder
                                        {
                                            html:'Schizophrenia or other psychotic disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a14:1'),
                                            name:'SCH',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a14:2'),
                                            name:'SCH',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a14:3'),
                                            name:'SCH',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Bipolar disorder
                                        {
                                            html:'Bipolar disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a15:1'),
                                            name:'BP',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a15:2'),
                                            name:'BP',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a15:3'),
                                            name:'BP',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Alcohol Abuse or Dependence
                                        {
                                            html:'Alcohol Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a16:1'),
                                            name:'AA',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a16:2'),
                                            name:'AA',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a16:3'),
                                            name:'AA',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Other Substance Abuse or Dependence
                                        {
                                            html:'Other Substance Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a17:1'),
                                            name:'SA',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a17:2'),
                                            name:'SA',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a17:3'),
                                            name:'SA',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        //Other Substance Abuse or Dependence
                                        {
                                            html:'Other significant illnesses',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a18:1'),
                                            name:'OTHER',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q6:a19'),
                                            listeners:  {
                                                            check:onOtherPastIllnessesChecked
                                                        }
                                        },
                                        {
                                            id:q('q6:a18:2'),
                                            name:'OTHER',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q6:a19'),
                                            listeners:  {
                                                            check:onOtherPastIllnessesChecked
                                                        }
                                        },
                                        {
                                            id:q('q6:a18:3'),
                                            name:'OTHER',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:  {
                                                            check:onOtherPastIllnessesChecked
                                                        }
                                        },
                                        {
                                            ctCls:'q-container',
                                            colspan:4,
                                            xtype:'textfield',
                                            id:q('q6:a19'),
                                            next:q('q7'),
                                            name:'OTHER_LIST',
                                            width:640,
                                            submitValue:true,
                                            allowBlank:true,
                                            disabled:true,
                                            border:false,
                                            listeners:  {
                                                            blur:onFocusLost,
                                                            focus:onFieldFocus
                                                        }
                                        },
                                        //Asthma
                                        {
                                            html:'Asthma',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a20:1'),
                                            name:'ASTHMA',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a20:2'),
                                            name:'ASTHMA',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a20:3'),
                                            name:'ASTHMA',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Chronic liver disease
                                        {
                                            html:'Chronic liver disease or hepatitis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a21:1'),
                                            name:'LIVER',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a21:2'),
                                            name:'LIVER',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a21:3'),
                                            name:'LIVER',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Heart attack or bypass surgery
                                        {
                                            html:'Heart attack or bypass surgery',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a22:1'),
                                            name:'HEART_ATT',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a22:2'),
                                            name:'HEART_ATT',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a22:3'),
                                            name:'HEART_ATT',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Heart problems
                                        {
                                            html:'Heart problems',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a23:1'),
                                            name:'HEART_PROB',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a23:2'),
                                            name:'HEART_PROB',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a23:3'),
                                            name:'HEART_PROB',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Kidney disease
                                        {
                                            html:'Kidney disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a24:1'),
                                            name:'KIDNEY',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a24:2'),
                                            name:'KIDNEY',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a24:3'),
                                            name:'KIDNEY',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Leukemia
                                        {
                                            html:'Leukemia',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a25:1'),
                                            name:'LEUK',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a25:2'),
                                            name:'LEUK',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a25:3'),
                                            name:'LEUK',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Pneumonia
                                        {
                                            html:'Pneumonia',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a26:1'),
                                            name:'PNEU',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a26:2'),
                                            name:'PNEU',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a26:3'),
                                            name:'PNEU',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Rheumatoid arthritis or other autoimmune disorders
                                        {
                                            html:'Rheumatoid arthritis or other autoimmune disorders',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a27:1'),
                                            name:'ARTH',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a27:2'),
                                            name:'ARTH',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a27:3'),
                                            name:'ARTH',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },

                                        //Stomach ulcers
                                        {
                                            html:'Stomach ulcers',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q6:a28:1'),
                                            name:'ULCER',
                                            xtype:'radio',
                                            inputValue:2,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a28:2'),
                                            name:'ULCER',
                                            xtype:'radio',
                                            inputValue:1,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },
                                        {
                                            id:q('q6:a28:3'),
                                            name:'ULCER',
                                            xtype:'radio',
                                            inputValue:3,
                                            next:q('q7'),
                                            listeners:{check:updateIllnessCount}
                                        },


                                        {
                                            id:'HQ_LIFETIME',
                                            name:'LIFETIME',
                                            xtype:'hidden',
                                            value:0
                                        },
                                        {
                                            id:'HQ_NOW',
                                            name:'NOW',
                                            xtype:'hidden',
                                            value:0
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
                            html:'7. Are you currently taking any medication for a psychiatric or neurological problem?<br/><span class="q-etc" style="padding-left:25px">(such as an antidepressant, an anti-anxiety medication, a mood stabilizer, an antipsychotic or an anticonvulsant)</span>'
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
                            allowBlank:true,
                            defaults:   {
                                            name:'NOW_PSYMED',
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
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
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
                            name:'NOW_PSYMED_LIST',
                            xtype:'textfield',
                            hideLabel:true,
                            allowBlank:true,
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
                            html:'8. Have you ever taken medications in the past?'
                        },
                        {
                            id:q('q8'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disableQ:[q('q8:a2'),q('q8:a3')],
                            invalidClass:'',
                            allowBlank:true,
                            next:q('q9'),
                            defaults:   {
                                            name:'PAST_PSYMED',
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
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
                                            inputValue:2,
                                            enableQ:[q('q8:a2'),q('q8:a3')],
                                            next:q('q8:a2')
                                        }
                                    ]
                        },
                        {
                            id:q('q8:a2'),
                            name:'PAST_PSYMED_MED',
                            xtype:'textfield',
                            fieldLabel:'<span class="question-label">If yes, what medication(s)</span>',
                            labelStyle:'width:200px',
                            hideLabel:false,
                            disabled:true,
                            allowBlank:true,
                            width:250,
                            next:q('q8:a3'),
                            style:'margin-top:10px',
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            id:q('q8:a3'),
                            name:'PAST_PSYMED_TIME',
                            xtype:'textfield',
                            fieldLabel:'<span class="question-label">and for how long',
                            labelStyle:'width:200px',
                            disabled:true,
                            allowBlank:true,
                            width:150,
                            next:q('q9'),
                            style:'margin-top:10px',
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
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            cls:'q-table',
                            width:561,
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            next:q('q10'),
                            defaults:   {
                                            next:q('q10'),
                                            bodyStyle:'padding:5px',
                                            ctCls:'q-table-td-border',
                                            listeners:  {
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
                                            id:q('q9:a1:1'),
                                            name:'FAM_HEART_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a1:2'),
                                            name:'FAM_HEART_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a1:3'),
                                            name:'FAM_HEART_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Alzheimer's disease
                                        {
                                            html:'Alzheimer\'s disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a2:1'),
                                            name:'FAM_ALZ_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a2:2'),
                                            name:'FAM_ALZ_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a2:3'),
                                            name:'FAM_ALZ_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Aging dementia that is not Alzheimer\'s
                                        {
                                            html:'Aging dementia that is not Alzheimer\'s',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a3:1'),
                                            name:'FAM_NOTALZ_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a3:2'),
                                            name:'FAM_NOTALZ_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a3:3'),
                                            name:'FAM_NOTALZ_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Multiple sclerosis
                                        {
                                            html:'Multiple sclerosis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a4:1'),
                                            name:'FAM_MS_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a4:2'),
                                            name:'FAM_MS_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a4:3'),
                                            name:'FAM_MS_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Cancer (other than skin cancer)
                                        {
                                            html:'Cancer (other than skin cancer)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a5:1'),
                                            name:'FAM_CANC_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a5:2'),
                                            name:'FAM_CANC_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a5:3'),
                                            name:'FAM_CANC_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Chronic migraine headaches
                                        {
                                            html:'Chronic migraine headaches',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a6:1'),
                                            name:'FAM_MIGRAINE_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a6:2'),
                                            name:'FAM_MIGRAINE_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a6:3'),
                                            name:'FAM_MIGRAINE_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Diabetes
                                        {
                                            html:'Diabetes',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a7:1'),
                                            name:'FAM_DIABETES_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a7:2'),
                                            name:'FAM_DIABETES_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a7:3'),
                                            name:'FAM_DIABETES_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Encephalitis or meningitis
                                        {
                                            html:'Encephalitis or meningitis',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a8:1'),
                                            name:'FAM_ENCEPH_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a8:2'),
                                            name:'FAM_ENCEPH_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a8:3'),
                                            name:'FAM_ENCEPH_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Epilepsy
                                        {
                                            html:'Epilepsy',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a9:1'),
                                            name:'FAM_EPILEPSY_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a9:2'),
                                            name:'FAM_EPILEPSY_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a9:3'),
                                            name:'FAM_EPILEPSY_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //High blood pressure
                                        {
                                            html:'High blood pressure',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a10:1'),
                                            name:'FAM_HBP_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a10:2'),
                                            name:'FAM_HBP_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a10:3'),
                                            name:'FAM_HBP_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Parkinson’s disease
                                        {
                                            html:'Parkinson\'s disease',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a11:1'),
                                            name:'FAM_PARK_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a11:2'),
                                            name:'FAM_PARK_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a11:3'),
                                            name:'FAM_PARK_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Stroke
                                        {
                                            html:'Stroke',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a12:1'),
                                            name:'FAM_STROKE_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a12:2'),
                                            name:'FAM_STROKE_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a12:3'),
                                            name:'FAM_STROKE_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Depression (diagnosed or treated)
                                        {
                                            html:'Depression (diagnosed or treated)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a13:1'),
                                            name:'FAM_DEP_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a13:2'),
                                            name:'FAM_DEP_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a13:3'),
                                            name:'FAM_DEP_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Attention Deficit Hyperactivity Disorder
                                        {
                                            html:'Attention Deficit Hyperactivity Disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a14:1'),
                                            name:'FAM_ADHD_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a14:2'),
                                            name:'FAM_ADHD_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a14:3'),
                                            name:'FAM_ADHD_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Anxiety disorder
                                        {
                                            html:'Anxiety disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a15:1'),
                                            name:'FAM_ANX_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a15:2'),
                                            name:'FAM_ANX_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a15:3'),
                                            name:'FAM_ANX_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Personality disorder
                                        {
                                            html:'Personality disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a16:1'),
                                            name:'FAM_PD_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a16:2'),
                                            name:'FAM_PD_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a16:3'),
                                            name:'FAM_PD_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Schizophrenia or other psychotic disorder
                                        {
                                            html:'Schizophrenia or other psychotic disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a17:1'),
                                            name:'FAM_SCH_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a17:2'),
                                            name:'FAM_SCH_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a17:3'),
                                            name:'FAM_SCH_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Bipolar disorder
                                        {
                                            html:'Bipolar disorder',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a18:1'),
                                            name:'FAM_BP_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a18:2'),
                                            name:'FAM_BP_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a18:3'),
                                            name:'FAM_BP_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Alcohol Abuse or Dependence
                                        {
                                            html:'Alcohol Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a19:1'),
                                            name:'FAM_AA_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a19:2'),
                                            name:'FAM_AA_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a19:3'),
                                            name:'FAM_AA_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Other Substance Abuse or Dependence
                                        {
                                            html:'Other Substance Abuse or Dependence',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a20:1'),
                                            name:'FAM_SA_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a20:2'),
                                            name:'FAM_SA_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a20:3'),
                                            name:'FAM_SA_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        //Mild mental illness but details are unknown
                                        {
                                            html:'Mild mental illness but details are unknown',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q9:a21:1'),
                                            name:'FAM_OTHER_M',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a21:2'),
                                            name:'FAM_OTHER_F',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        },
                                        {
                                            id:q('q9:a21:3'),
                                            name:'FAM_OTHER_S',
                                            handler:updateFamHiddenField,
                                            xtype:'checkbox'
                                        }
                                ]
                        },
                        // HIDDEN FIELDS
                        {
                            id:q('q9:a1'),
                            name:'FAM_HEART',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a2'),
                            name:'FAM_ALZ',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a3'),
                            name:'FAM_NOTALZ',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a4'),
                            name:'FAM_MS',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a5'),
                            name:'FAM_CANC',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a6'),
                            name:'FAM_MIGRAINE',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a7'),
                            name:'FAM_DIABETES',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a8'),
                            name:'FAM_ENCEPH',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a9'),
                            name:'FAM_EPILEPSY',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a10'),
                            name:'FAM_HBP',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a11'),
                            name:'FAM_PARK',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a12'),
                            name:'FAM_STROKE',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a13'),
                            name:'FAM_DEP',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a14'),
                            name:'FAM_ADHD',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a15'),
                            name:'FAM_ANX',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a16'),
                            name:'FAM_PD',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a17'),
                            name:'FAM_SCH',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a18'),
                            name:'FAM_BP',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a19'),
                            name:'FAM_AA',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a20'),
                            name:'FAM_SA',
                            xtype:'hidden',
                            value:0
                        },
                        {
                            id:q('q9:a21'),
                            name:'FAM_OTHER',
                            xtype:'hidden',
                            value:0
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
                            name:'NUM_SIB',
                            xtype:'numberfield',
                            fieldLabel:'10. How many biological siblings do you have?',
                            labelStyle:'padding-top:5px;width:300px',
                            allowBlank:true,
                            minValue:0,
                            maxValue:99,
                            maxLength:2,
                            width:65,
                            next:q('q11'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
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
                            allowBlank:true,
                            next:q('q12'),
                            defaults:   {
                                            name:'MOM_HEALTH',
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
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
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
                            allowBlank:true,
                            next:q('q13'),
                            defaults:   {
                                            name:'DAD_HEALTH',
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
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Yes',
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
                            name:'ADD_LIST',
                            allowBlank:true,
                            hideLabel:true,
                            width:450,
                            height:125,
                            style:'margin-left:'+radioPaddingLeft+'px;margin-top:10px;margin-bottom:40px',
                            invalidClass:'',
                            listeners:  {
                                            specialkey:onEnter
                                        }
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
                title:'Health',
                schema:'HQ/1.3',
                keys:   {
                            //Digits [1-5]
                            key:[
                                    //Horizontal line
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
                items:[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,btnNext],
                submitOrder:    [
                                    "HEALTH",
                                    "SATISFY",
                                    "CONSCIOUS",
                                    "POST_MENO",
                                    {
                                        name:"RX",
                                        defaultValue:0
                                    },
                                    {
                                        name:"NON_RX",
                                        defaultValue:0
                                    },
                                    "MED_1", "MED_STRENGTH_1","MED_FREQ_1",
                                    "MED_2", "MED_STRENGTH_2","MED_FREQ_2",
                                    "MED_3", "MED_STRENGTH_3","MED_FREQ_3",
                                    "MED_4", "MED_STRENGTH_4","MED_FREQ_4",
                                    "CANC",
                                    "MIGRAINE",
                                    "DIABETES",
                                    "ENCEPH",
                                    "EPILEPSY",
                                    "HBP",
                                    "MS",
                                    "PARK",
                                    "STROKE",
                                    "DEP",
                                    "ADHD",
                                    "ANX",
                                    "PD",
                                    "SCH",
                                    "BP",
                                    "AA",
                                    "SA",
                                    "OTHER",
                                    "OTHER_LIST",
                                    "ASTHMA",
                                    "LIVER",
                                    "HEART_ATT",
                                    "HEART_PROB",
                                    "KIDNEY",
                                    "LEUK",
                                    "PNEU",
                                    "ARTH",
                                    "ULCER",
                                    "LIFETIME",
                                    "NOW",
                                    "NOW_PSYMED",
                                    "NOW_PSYMED_LIST",
                                    "PAST_PSYMED",
                                    "PAST_PSYMED_MED",
                                    "PAST_PSYMED_TIME",
                                    {
                                        name:"FAM_HEART",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HEART_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HEART_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HEART_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ALZ",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ALZ_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ALZ_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ALZ_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_NOTALZ",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_NOTALZ_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_NOTALZ_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_NOTALZ_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MS",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MS_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MS_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MS_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_CANC",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_CANC_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_CANC_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_CANC_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MIGRAINE",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MIGRAINE_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MIGRAINE_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_MIGRAINE_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DIABETES",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DIABETES_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DIABETES_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DIABETES_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ENCEPH",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ENCEPH_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ENCEPH_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ENCEPH_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_EPILEPSY",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_EPILEPSY_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_EPILEPSY_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_EPILEPSY_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HBP",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HBP_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HBP_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_HBP_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PARK",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PARK_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PARK_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PARK_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_STROKE",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_STROKE_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_STROKE_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_STROKE_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DEP",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DEP_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DEP_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_DEP_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ADHD",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ADHD_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ADHD_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ADHD_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ANX",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ANX_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_ANX_F",
                                         handler:checkbox2integer,
                                       defaultValue:0
                                    },
                                    {
                                        name:"FAM_ANX_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PD",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PD_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PD_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_PD_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SCH",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SCH_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SCH_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SCH_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_BP",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_BP_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_BP_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_BP_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_AA",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_AA_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_AA_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_AA_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SA",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SA_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SA_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_SA_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_OTHER",
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_OTHER_M",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_OTHER_F",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },
                                    {
                                        name:"FAM_OTHER_S",
                                        handler:checkbox2integer,
                                        defaultValue:0
                                    },

                                    "NUM_SIB",
                                    "DAD_HEALTH",
                                    "MOM_HEALTH",
                                    "ADD_LIST",
                                ]
            };

NRG.Forms.Health=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function onQ5NA(checkbox,checked)
{
    var table=Ext.getCmp('qn6:q5');
    var rx=Ext.getCmp('qn6:q5:a5');
    var nonrx=Ext.getCmp('qn6:q5:a6');

    var qContainer=getQContainer(checkbox);

    if (checked)
    {
        //Disable all input elements in the table to prevent them from receiving TAB/ShiftTab focus.
        table.getEl().select('input').each(function(obj){obj.dom.disabled=true});
        table.disable();
        
        rx.setValue(0);
        nonrx.setValue(0);
        rx.disable();
        nonrx.disable();
        checkbox.next='qn6:q6';
        //Mark the question as valid
        //Normally, the onFieldValid callback would be called,
        //but we disabled it for this checkbox
        if (qContainer)
            setQValidity(qContainer,true);
    }
    else
    {
        table.enable();
        //Enable all input elements in the table
        table.getEl().select('input').each(function(obj){obj.dom.disabled=false;});
        rx.setValue(NRG.Forms.NoResponse);
        nonrx.setValue(NRG.Forms.NoResponse);
        rx.enable();
        nonrx.enable();
        checkbox.next='qn6:q5:a1:1';

        if (qContainer)
            qContainer.removeClass('q-valid');
    }

    nextField(checkbox,checkbox.next);
}

function onQ6NA(checkbox,checked)
{
    var q6=Ext.getCmp('qn6:q6');

    if (!q6)
        return;

    q6.getEl().select('input[id$=":3"]').each(function(checkbox)
    {
        var components=checkbox.id.split(":",4);
        var a=components[2];
        var id=a.substr(1);

        //Answer ID of "other", followed by asthma, leukemia, etc
        if (id>19)
        {
            var cb=Ext.getCmp(checkbox.id);
            cb.setValue(checked);
        }
    })

    if (checked)
    {
        Ext.getCmp('HQ_LIFETIME').setValue(0);
        Ext.getCmp('HQ_NOW').setValue(0);
    }
    else
        updateIllnessCount(checkbox, true);
}

function onOtherPastIllnessesChecked(field, checked)
{
    console.log('Past Illness: ', field, checked);
    updateIllnessCount(field, true);

    var other=Ext.getCmp('qn6:q6:a19');
    if ( (field.id=='qn6:q6:a18:3') && (checked))
    {
        other.setValue('');
        other.disable();
    }
    else
        other.enable();

    //Only trigger nextField() for the radio that was checked
    if (checked)
        nextField(field);
}

function updateIllnessCount(field, checked)
{
    if (!checked)
        return;

    var q6=Ext.getCmp('qn6:q6');

    if (!q6)
        return;

    var countLifetime=0;
    var countNow=0;

    //Here we select all radio buttons under the "In your lifetime" and then "Currently (now)" columns,
    //and then use a callback to count the number of radio buttons that are checked.
    //Unfortunately, Ext.DomQuery can't be used to select on dom values, which is why this process
    //requires this iteration
    q6.getEl().select('input[type="radio"][id$=":1"]').each(function(cb){if (cb.dom.checked) countLifetime++});
    q6.getEl().select('input[type="radio"][id$=":2"]').each(function(cb){if (cb.dom.checked) countNow++});

    Ext.getCmp('HQ_LIFETIME').setValue(countLifetime);
    Ext.getCmp('HQ_NOW').setValue(countNow);

    //console.log('Updating illness count: ',countLifetime,countNow);
}

function updateFamHiddenField(cb,checked)
{
    if (!cb)
        return;

    var splitID=cb.id.split(':');
    var rootID=splitID[0]+":"+splitID[1]+":"+splitID[2];

    var hidden=Ext.getCmp(rootID);
    if (!hidden)
        return;
    var value=hidden.getValue();

    if (checked)
        value++;
    else
    {
        value--;
        if (value<=0)
            value=0;

    }

    hidden.setValue(value);
}

/* Must return a value. Basically this transforms checkbox "on" values to 1. */
function checkbox2integer(cbValue)
{
    if (cbValue)
        return 1;

    return 0;
}