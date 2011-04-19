/* HormoneMenstrualCycle.js tabsize=4
 *
 * The Hormone/Menstrual Cycle Form.
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

var qID='qn9';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'1. Are you <u>currently</u> using hormonal birth control or any hormone-based medication?'
                        },
                        {
                            id:q('q1'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'BC',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q1a')],
                            next:q('q1a'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2,
                                            next:q('q2'),
                                            disableQ:[q('q1a')]
                                        }
                                    ]
                        }
                      ]
            }


var q1a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'IF YES, please specify:'
                        },
                        {
                            id:q('q1a'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            disabled:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            disableQ:[q('q1a:1'),q('q1a:2'),q('q1a:4')],
                            next:[q('q2')],
                            textProxyId:q('q1a:5'),
                            defaults:   {
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupWithTextboxesChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'birth control pill <span class="qexplanation">(generic or brand name if known)</span>',
                                            inputValue:1,
                                            enableQ:[q('q1a:1')],
                                            next:q('q1a:1'),
                                            name:'BC_TYPE'
                                        },
                                        {
                                            xtype:'panel',
                                            autoWidth:false,
                                            bodyStyle:'background-color:transparent',
                                            border:false,
                                            items:[
                                                    {
                                                        disabled:true,
                                                        id:q('q1a:1'),
                                                        xtype:'textfield',
                                                        allowBlank:true,
                                                        style:'margin-left:35px;width:185px;margin-top:5px',
                                                        next:q('q2'),
                                                        selectOnFocus:true,
                                                        regex:NRG.Forms.T_StringWithQuotes,
                                                        listeners:  {
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter,
                                                                        change:onRadiogroupTextProxyChanged
                                                                    }
                                                    }]
                                        },
                                        {
                                            boxLabel:'intrauterine device (IUD) <span class="qexplanation">(Mirena or ParaGard if known)</span>',
                                            inputValue:2,
                                            enableQ:[q('q1a:2')],
                                            next:q('q1a:2'),
                                            name:'BC_TYPE'
                                        },
                                        {
                                            xtype:'panel',
                                            autoWidth:false,
                                            bodyStyle:'background-color:transparent',
                                            border:false,
                                            items:[
                                                    {
                                                        disabled:true,
                                                        id:q('q1a:2'),
                                                        xtype:'textfield',
                                                        allowBlank:true,
                                                        style:'margin-left:35px;width:185px;margin-top:5px',
                                                        next:q('q2'),
                                                        selectOnFocus:true,
                                                        regex:NRG.Forms.T_StringWithQuotes,
                                                        listeners:  {
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter,
                                                                        change:onRadiogroupTextProxyChanged
                                                                    }
                                                    }]
                                        },
                                        {
                                            boxLabel:'birth control shot <span class="qexplanation">(Depo-Provera)</span>',
                                            inputValue:3,
                                            next:q('q2'),
                                            name:'BC_TYPE'
                                        },
                                        {
                                            boxLabel:'Other <span class="qexplanation">(please specify)</span>',
                                            inputValue:4,
                                            enableQ:[q('q1a:4')],
                                            next:q('q1a:4'),
                                            name:'BC_TYPE'
                                        },
                                        {
                                            xtype:'panel',
                                            autoWidth:false,
                                            bodyStyle:'background-color:transparent',
                                            border:false,
                                            items:[{
                                                        disabled:true,
                                                        id:q('q1a:4'),
                                                        xtype:'textfield',
                                                        allowBlank:true,
                                                        style:'margin-left:35px;width:185px;margin-top:5px',
                                                        next:q('q2'),
                                                        selectOnFocus:true,
                                                        regex:NRG.Forms.T_StringWithQuotes,
                                                        listeners:  {
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter,
                                                                        change:onRadiogroupTextProxyChanged
                                                                    }
                                                    }]
                                        },
                                     ]
                        },
                        {
                            id:q('q1a:5'),
                            name:'BC_NAME',
                            xtype:'hidden',
                            value:NRG.Forms.NoResponse
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
                            html:'2. Have you <u>ever</u> been on hormonal birth control or any hormone-based medication?'
                        },
                        {
                            id:q('q2'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'BC_PREV',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q2a'),q('q2b'),q('q2c')],
                            next:q('q2a'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2,
                                            next:q('q3'),
                                            disableQ:[q('q2a'),q('q2b'),q('q2c')]
                                        }
                                    ]
                        }
                      ]
            }


var q2abc=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container qpadded',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'IF YES, please specify:'
                        },
                        {
                            disabled:true,
                            id:q('q2a'),
                            xtype:'textfield',
                            name:'BC_PREV_TYPE',
                            allowBlank:true,
                            fieldLabel:'What kind',
                            next:q('q2b'),
                            enableQ:[q('q2b')],
                            selectOnFocus:true,
                            style:'margin-top:10px;',
                            labelStyle:'width:250px;margin:2px 10px 0px 25px;',
                            regex:NRG.Forms.T_StringWithQuotes,
                            width:200,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            disabled:true,
                            id:q('q2b'),
                            xtype:'textfield',
                            name:'BC_PREV_TIME',
                            allowBlank:true,
                            fieldLabel:'How long were you on hormonal birth control / medication',
                            next:q('q2c'),
                            enableQ:q('q2c'),
                            selectOnFocus:true,
                            style:'margin-top:10px;',
                            labelStyle:'width:250px;margin:2px 10px 0px 25px;',
                            width:200,
                            regex:NRG.Forms.T_StringWithQuotes,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        },
                        {
                            disabled:true,
                            id:q('q2c'),
                            xtype:'textfield',
                            name:'BC_PREV_STOP',
                            allowBlank:true,
                            fieldLabel:'When did you stop using hormonal birth control / medication',
                            next:q('q3'),
                            selectOnFocus:true,
                            style:'margin-top:10px;',
                            labelStyle:'width:250px;margin:2px 10px 0px 25px;',
                            width:200,
                            regex:NRG.Forms.T_StringWithQuotes,
                            listeners:  {
                                            focus:onFieldFocus,
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
                            html:'3. Have you ever been pregnant (including miscarriage or abortion)?'
                        },
                        {
                            id:q('q3'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'PREG',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q3a')],
                            next:q('q3a'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2,
                                            next:q('q4'),
                                            disableQ:[q('q3a')]
                                        },
                                        {
                                            boxLabel:'Not sure',
                                            inputValue:3,
                                            next:q('q4'),
                                            disableQ:[q('q3a')]
                                        }
                                    ]
                        }
                      ]
            }

var q3a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container qpadded',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qpadded',
                            html:'IF YES:'
                        },
                        {
                            disabled:true,
                            id:q('q3a'),
                            xtype:'numberfield',
                            name:'PREG_NUM',
                            allowBlank:true,
                            allowDecimals:false,
                            allowNegative:false,
                            maxValue:100,
                            minValue:1,
                            fieldLabel:'How many times have you been pregnant (including miscarriages or abortions)',
                            next:q('q4'),
                            selectOnFocus:true,
                            style:'margin-top:10px;',
                            labelStyle:'width:400px;margin:2px 10px 0px 25px;',
                            width:50,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
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
                            html:'4. Do you plan to become pregnant in the next year?'
                        },
                        {
                            id:q('q4'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'PREG_PLAN',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            next:q('q5'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Not sure',
                                            inputValue:3
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
                            html:'5. Do you have a period every month?'
                        },
                        {
                            id:q('q5'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'PER',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            next:q('q6'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Not sure',
                                            inputValue:3
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
                            id:q('q6'),
                            xtype:'numberfield',
                            name:'PER_LENGTH',
                            allowBlank:true,
                            allowDecimals:false,
                            allowNegative:false,
                            maxValue:31,
                            minValue:0,
                            fieldLabel:'6. How many <u>days</u> does your period (menstrual flow) usually last',
                            next:q('q7'),
                            selectOnFocus:true,
                            style:'margin-top:10px;',
                            labelStyle:'width:445px;margin-left:0px; margin-bottom:25px',
                            width:50,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
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
                            html:'7. How regular is your menstrual cycle?'
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
                                            name:'PER_REG'
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'My period comes &quot;like clockwork&quot; every month',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'The timing of my period varies from month to month. It\'s hard to predict when it will come.',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Not sure',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Other/comments:',
                                            enableQ:[q('q7:a2')],
                                            next:q('q7:a2'),
                                            inputValue:4
                                        }
                                    ]
                        },
                        {
                            id:q('q7:a2'),
                            name:'PER_REG_OTHER',
                            xtype:'textfield',
                            width:300,
                            disabled:true,
                            allowBlank:true,
                            style:'margin-top:5px;margin-left:85px',
                            next:q('q8'),
                            regex:NRG.Forms.T_StringWithQuotes,
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
                next:q('q9'),
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'8. How often do you get your period? <span class="qexplanation">(average is every 28 days though typical cycles range from 21-35 days)</span>'
                        },
                        {
                            id:q('q8'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            next:q('q9'),
                            disableQ:q('q8:a1'),
                            defaults:   {
                                            name:'PER_FREQ'
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            id:q('q8a'),
                                            boxLabel:'Number of days:',
                                            inputValue:NRG.Forms.NoResponse,
                                            next:q('q8:a1'),
                                            enableQ:q('q8:a1')
                                        },
                                        {
                                            xtype:'panel',
                                            autoWidth:false,
                                            bodyStyle:'background-color:transparent',
                                            border:false,
                                            items:[{
                                                        disabled:true,
                                                        id:q('q8:a1'),
                                                        proxyFor:q('q8a'),
                                                        xtype:'numberfield',
                                                        allowBlank:true,
                                                        allowDecimals:false,
                                                        allowNegative:false,
                                                        maxValue:365,
                                                        minValue:0,
                                                        style:'margin-left:140px;margin-top:5px',
                                                        next:q('q9'),
                                                        width:50,
                                                        selectOnFocus:true,
                                                        listeners:  {
                                                                        focus:onFieldFocus,
                                                                        specialkey:onEnter,
                                                                        change:onQ8TextChanged
                                                                    }
                                                    }]
                                        },
                                        {
                                            boxLabel:'Not sure',
                                            inputValue:99
                                        }                                    
                                    ]
                        }
                      ]
            };

var q9=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            id:q('q9'),
                            xtype:'numberfield',
                            name:'PER_FIRST',
                            allowBlank:true,
                            allowDecimals:true,
                            allowNegative:false,
                            maxValue:100,
                            minValue:0,
                            fieldLabel:'9. At what age did you have your first menstrual period?',
                            next:q('q10'),
                            selectOnFocus:true,
                            style:'margin-top:10px;',
                            labelStyle:'width:445px;margin-left:0px',
                            width:50,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

var q10=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'10. Have you ever experienced amenorrhea (&ge; 3 months without a period when not pregnant)?'
                        },
                        {
                            id:q('q10'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'AMEN',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            next:q('q11'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            }


var q11=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'11. Do you keep track of your menstrual cycle? <span class="qexplanation">(i.e. make note of when you get your period each month)</span>'
                        },
                        {
                            id:q('q11'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q12'),
                            defaults:   {
                                            name:'PER_TRACK',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            next:q('q12'),
                            items:  [
                                        {
                                            boxLabel:'Yes',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'No',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Sometimes',
                                            inputValue:3
                                        }
                                    ]
                        }
                      ]
            }

var q12={
            xtype:'fieldset',
            border:false,
            cls:'q-fieldset q-container',
            items:[
                    {
                        xtype:'label',
                        cls:'question-text',
                        html:'<div class="qverylong medium-margin-bottom">12. Using the calendars below, please indicate which days you were on your period over the last 6 months (including the present month if applicable).<ul class="qpadded small-margin-bottom small-margin-top"><li>Use <span style="color:darkgreen;font-weight:bold;text-decoration:underline">green</span> (1 click) to mark dates you are certain you were on your period.</li><li>Use <span style="color:darkorange;font-weight:bold;text-decoration:underline">orange</span> (2 clicks) to mark dates you think you were on your period.</li></ul>If you aren’t sure, simply leave the month blank. If you keep a written record of your period, please use that data to help you complete the calendars.</div>'
                    },
                    {
                        xtype:'panel',
                        cls:'qpadded',
                        id:q('q12'),
                        items:[
                                {
                                    id:q('calendar'),
                                    xtype:'datepickerplusplus',
                                    value:adjustDate(0,-3),
                                    maxDate:new Date(),
                                    showToday:false,
                                    renderTodayButton:false,
                                    usePickerPlus:true,
                                    noOfMonth:4,
                                    noOfMonthPerRow:4,
                                    multiSelection:true,
                                    multiSelectByCTRL:false,
                                    renderOkUndoButtons:false,
                                    disablePartialUnselect:false,
                                    summarizeHeader:true,
                                    showActiveDate:true,
                                    allowMouseWheel:false,
                                    markNationalHolidays:false,
                                    showWeekNumber:true,
                                    format:'Y-m-d',
                                    startDay:1,
                                    listeners:
                                        {
                                            markCertainDate:onDateMarkedAsCertain,
                                            markUnsureDate:onDateMarkedAsUnsure,
                                            unmarkDate:onDateUnmarked
                                        }
                                }
                            ]
                        },
                        {
                            xtype:'hidden',
                            name:'CAL_CERTAIN',
                            id:q('q12:a'),
                            value:NRG.Forms.NoResponse
                        },
                        {
                            xtype:'hidden',
                            name:'CAL_NOTSURE',
                            id:q('q12:b'),
                            value:NRG.Forms.NoResponse
                        }
                  ]
        }

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
                title:'Hormone/Menstrual Cycle',
                schema:'HMC/1.0',
                keys:   {
                            //Digits [1-5]
                            key:[
                                    //Horizontal line
                                    49,50,51,52,53,54,
                                    //Numpad
                                    97,98,99,100,101,102
                                ],
                            fn:onFormKeypress,
                            scope:this
                        },
                customReset:function()
                {
                    Ext.getCmp('qn9:calendar').reset();
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
                items:[q1,q1a,q2,q2abc,q3,q3a,q4,q5,q6,q7,q8,q9,q10,q11,q12,btnNext],
                submitOrder: [
                                'BC', 'BC_TYPE', 'BC_NAME', 'BC_PREV',
                                'BC_PREV_TYPE', 'BC_PREV_TIME', 'BC_PREV_STOP',
                                'PREG', 'PREG_NUM', 'PREG_PLAN', 'PER',
                                'PER_LENGTH', 'PER_REG', 'PER_REG_OTHER',
                                'PER_FREQ', 'PER_FIRST', 'AMEN', 'PER_TRACK',
                                'CAL_CERTAIN', 'CAL_NOTSURE'
                             ]
            };

NRG.Forms.HormoneMenstrualCycle=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function onQ8TextChanged(field,newvalue,oldvalue)
{
    if (typeof(field.proxyFor)=="undefined")
        return;

    var cmp=Ext.getCmp(field.proxyFor);

    if (typeof(cmp)=="undefined")
        return;

    cmp.inputValue=newvalue;
    cmp.getEl().dom.defaultValue=newvalue;
    cmp.getEl().dom.value=newvalue;
}

function radiogroupWithTextboxesChanged(group, radio)
{
    radiogroupChanged(group,radio);

    if ((typeof(radio)=="undefined") || (radio==null))
    {
        setRadiogroupTextProxyValue(group,"");
        return;
    }
    
    var textboxID=group.getId()+":"+radio.getGroupValue();

    group.getEl().select('input[type="text"]').each(function(el,c,index)
    {
        var cmp=Ext.getCmp(el.dom.id);
        
        if (el.dom.id!=textboxID)
        {
            el.dom.value="";
            if (typeof(cmp)!="undefined")
                cmp.disable();
        }
        else
        {
            if (typeof(cmp)!="undefined")
                cmp.enable();

            setRadiogroupTextProxyValue(group,cmp.getValue());
        }
    });
}

function setRadiogroupTextProxyValue(group,value)
{
    if (typeof(group.textProxyId)=="undefined")
        return;

    var cmp=Ext.getCmp(group.textProxyId);

    if (typeof(cmp)=="undefined")
        return;

    var realvalue=value;

    if ((typeof(value)=="undefined") || (value==null) || (value==""))
        realvalue=NRG.Forms.NoResponse;

    cmp.setValue(realvalue);
    console.log("New value of ",cmp.getId()," is : '",cmp.getValue(),"'");
}

function onRadiogroupTextProxyChanged(textbox,newvalue,oldvalue)
{
    var rg=textbox.findParentByType('radiogroup');

    if (typeof(rg)!="undefined")
        setRadiogroupTextProxyValue(rg,newvalue);
}

function adjustDate(years,months,days)
{
    var now = new Date();
    var result=null;

    //Ints?
    years+=0;
    months+=0;

    if (typeof(days)=="undefined")
    {
        result= new Date(now.getFullYear()+years, now.getMonth()+months, 1);
    }
    else
    {
        days+=0;
        result= new Date(now.getFullYear()+years, now.getMonth()+months, now.getDate()+days);
    }

    console.log(result.toLocaleString());
    return result;
}

function onDateMarkedAsCertain(datepicker,el,date)
{
    var q12a=Ext.getCmp('qn9:q12:a');
    //Make sure the dates are sorted
    var dates=datepicker.datesCertain.sort();
    q12a.setValue(dates.join(","));
    console.log("Certain:",q12a.getValue());
}

function onDateMarkedAsUnsure(datepicker,el,date)
{
    var q12b=Ext.getCmp('qn9:q12:b');
    var dates=datepicker.datesUnsure.sort();
    q12b.setValue(dates.join(","));
    console.log("Unsure:",q12b.getValue());
}

function onDateUnmarked(datepicker,el,date)
{
    var q12a=Ext.getCmp('qn9:q12:a');
    var q12b=Ext.getCmp('qn9:q12:b');
    var dates1=datepicker.datesCertain.sort();
    var dates2=datepicker.datesUnsure.sort();

    if (dates1.length>0)
        q12a.setValue(dates1.join(","));
    else
        q12a.setValue(NRG.Forms.NoResponse);

    if (dates2.length>0)
        q12b.setValue(dates2.join(","));
    else
        q12b.setValue(NRG.Forms.NoResponse);

    console.log("Certain:",q12a.getValue());
    console.log("Unsure:",q12b.getValue());
}