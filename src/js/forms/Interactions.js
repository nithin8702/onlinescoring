/* Interactions.js tabsize=4
 *
 * The Interactions Questionnaire
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

var qID='qn8';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'1. Which of the following best describes your marital status?'
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
                                            name:'MARITAL',
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
                                            boxLabel:'Currently married and living together, or living with someone in a marital-like relationship',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Never married and never lived with someone in a marital-like relationship',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Separated',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Divorced or formerly lived with someone in a marital-like relationship',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Widowed',
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
                            html:'2. How many children do you have?'
                        },
                        {
                            id:q('q2'),
                            xtype:'radiogroup',
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            enableQ:[q('q2a')],
                            next:q('q2a'),
                            allowBlank:true,
                            invalidClass:'',
                            cls:'small-margin-top',
                            width:500,
                            defaults:   {
                                            name:'CHILD',
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
                                            boxLabel:'0',
                                            inputValue:0,
                                            next:q('q3'),
                                            shortcutKey:0,
                                            disableQ:[q('q2a')],
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q2a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented">&nbsp;&nbsp;&nbsp;&nbsp;'+
                                'IF YES: How many of your children do you see or '+
                                'talk to at least once every 2 weeks?'
                        },
                        {
                            id:q('q2a'),
                            xtype:'radiogroup',
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q3'),
                            allowBlank:true,
                            disabled:true,
                            invalidClass:'',
                            cls:'small-margin-top',
                            width:500,
                            defaults:   {
                                            name:'CHILD_SEE',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        },
                                            checked:false
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
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
                            html:'3. Are either of your parents living?'
                        },
                        {
                            id:q('q3'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q3a'),
                            enableQ:[q('q3a')],
                            invalidClass:'',
                            defaults:   {
                                            name:'PARENT',
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
                                            boxLabel:'Neither',
                                            inputValue:1,
                                            next:q('q4'),
                                            disableQ:[q('q3a')]
                                        },
                                        {
                                            boxLabel:'Mother only',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Father only',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Both',
                                            inputValue:4
                                        }
                                    ]
                        }
                      ]
            }

var q3a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented">&nbsp;&nbsp;&nbsp;&nbsp;'+
                                'IF YES: Do you see or talk to either of your '+
                                'parents at least once every 2 weeks?'
                        },
                        {
                            id:q('q3a'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q4'),
                            disabled:true,
                            defaults:   {
                                            name:'PARENT_SEE',
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
                                            boxLabel:'Neither',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Mother only',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Father only',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Both',
                                            inputValue:4
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
                            html:'4. Are either of your in-laws (partner\'s parents) living?'
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
                                            name:'IN_LAW',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q4a')],
                            next:q('q4a'),
                            items:  [
                                        {
                                            boxLabel:'Neither',
                                            inputValue:1,
                                            next:q('q5'),
                                            disableQ:[q('q4a')]
                                        },
                                        {
                                            boxLabel:'Mother only',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Father only',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Both',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'Not applicable',
                                            inputValue:5,
                                            next:q('q5'),
                                            disableQ:[q('q4a')]
                                        }
                                    ]
                        }
                      ]
            }

var q4a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented">&nbsp;&nbsp;&nbsp;&nbsp;'+
                                'IF YES: Do you see or talk to either of your '+
                                'partner\'s parents at least once every 2 weeks?'
                        },
                        {
                            id:q('q4a'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q5'),
                            defaults:   {
                                            name:'IN_LAW_SEE',
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
                                            boxLabel:'Neither',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Mother only',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Father only',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Both',
                                            inputValue:4
                                        },
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
                            html:'<div class="qverylong">5. How many other relatives '+
                                '(other than your spouse, parents, and children) '+
                                'do you feel close to?'
                        },
                        {
                            id:q('q5'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'REL',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q5a')],
                            next:q('q5a'),
                            items:  [
                                        {
                                            boxLabel:'0',
                                            inputValue:0,
                                            next:q('q6'),
                                            disableQ:[q('q5a')],
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q5a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'<div class="qverylong qindented">&nbsp;&nbsp;&nbsp;&nbsp;'+
                                '5a. How many of those relatives do you see or talk '+
                                'to at least once every 2 weeks?</div>'
                        },
                        {
                            id:q('q5a'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q6'),
                            defaults:   {
                                            name:'REL_SEE',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
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
                            html:'<div class="qverylong">6. How many close friends '+
                                'do you have? <p class="qexplanation">(Meaning '+
                                'people that you feel at east with, can talk to '+
                                'about private matters, can call on for help)</p>'
                        },
                        {
                            id:q('q6'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'FRIEND',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q6a')],
                            next:q('q6a'),
                            items:  [
                                        {
                                            boxLabel:'0',
                                            inputValue:0,
                                            next:q('q7'),
                                            disableQ:[q('q6a')],
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q6a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'<div class="qverylong qindented">&nbsp;&nbsp;&nbsp;&nbsp;6a. How many of those friends do you see or talk to at least once every 2 weeks?</div>'
                        },
                        {
                            id:q('q6a'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q7'),
                            defaults:   {
                                            name:'FRIEND_SEE',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
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
                            html:'7. Do you belong to a church, temple or other religious group?'
                        },
                        {
                            id:q('q7'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'RELIGION',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q7a')],
                            next:q('q7a'),
                            items:  [
                                        {
                                            boxLabel:'No',
                                            inputValue:1,
                                            next:q('q8'),
                                            disableQ:[q('q7a')]
                                        },
                                        {
                                            boxLabel:'Yes',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            }


var q7a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented">IF YES: How many members '+
                                'of your church, temple or religious group do you '+
                                'talk to at least once every 2 weeks? '+
                                '<p class="qexplanation">(This includes at group '+
                                'meetings and services)</p></div>'
                        },
                        {
                            id:q('q7a'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q8'),
                            defaults:   {
                                            name:'RELIGION_SEE',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }


var q8=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'8. Do you attend any classes (school, university, technical training or adult education) on a regular basis?'
                        },
                        {
                            id:q('q8'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'SCHOOL',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q8a')],
                            next:q('q8a'),
                            items:  [
                                        {
                                            boxLabel:'No',
                                            inputValue:1,
                                            next:q('q9'),
                                            disableQ:[q('q8a')]
                                        },
                                        {
                                            boxLabel:'Yes',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            }


var q8a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented qindented">IF YES: How many fellow '+
                                'students or teachers do you talk to at least '+
                                'once every 2 weeks? '+
                                '<p class="qexplanation">(This includes at class '+
                                'meetings)</p></div>'
                        },
                        {
                            id:q('q8a'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q9'),
                            defaults:   {
                                            name:'SCHOOL_SEE',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q9=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'9. Are you currently employed either full or part-time?'
                        },
                        {
                            id:q('q9'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'WORK',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q9a'),q('q9b')],
                            next:q('q9a'),
                            items:  [
                                        {
                                            boxLabel:'No',
                                            inputValue:1,
                                            next:q('q10'),
                                            disableQ:[q('q9a'),q('q9b')]
                                        },
                                        {
                                            boxLabel:'Yes, self-employed',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Yes, employed by others',
                                            inputValue:3
                                        }
                                    ]
                        }
                      ]
            }


var q9a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'IF YES: How many people '+
                                ' do you supervise?'
                        },
                        {
                            id:q('q9a'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q9b'),
                            defaults:   {
                                            name:'WORK_SUPER',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q9b=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented">IF YES: How many people '+
                                'at work (other than those you supervise) do you '+
                                'talk to at least once every 2 weeks?</div>'
                        },
                        {
                            id:q('q9b'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q10'),
                            defaults:   {
                                            name:'WORK_SEE',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q10=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'10. How many of your neighbors do you visit or talk '+
                                'to at least once every 2 weeks?'
                        },
                        {
                            id:q('q10'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q11'),
                            defaults:   {
                                            name:'NEIGHBOR',
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
                                            boxLabel:'0',
                                            inputValue:0,
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
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
                            html:'11. Are you currently involved in regular volunteer work?'
                        },
                        {
                            id:q('q11'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'VOL',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q11a')],
                            next:q('q11a'),
                            items:  [
                                        {
                                            boxLabel:'No',
                                            inputValue:1,
                                            next:q('q12'),
                                            disableQ:[q('q11a')]
                                        },
                                        {
                                            boxLabel:'Yes',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            }


var q11a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text qindented',
                            html:'<div class="qverylong qindented">IF YES: How many people '+
                                'involved in this volunteer work do you talk to '+
                                'about volunteering-related issues at least every '+
                                '2 weeks?</div>'
                        },
                        {
                            id:q('q11a'),
                            xtype:'radiogroup',
                            cls:'small-margin-top',
                            width:500,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            next:q('q12'),
                            defaults:   {
                                            name:'VOL_SEE',
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
                                            boxLabel:'0',
                                            inputValue:-1,
                                            listeners:  {
                                                            //Hack to avoid the browser
                                                            //from selecting this radio when
                                                            //inputValue=0 and the question is
                                                            //disabled. So we set inputValue
                                                            //to -1 and then use this callback to
                                                            //correct the value to 0.
                                                            change:function(self,newvalue,oldvalue)
                                                            {
                                                                self.inputValue=0;
                                                                self.getEl().dom.defaultValue=0;
                                                                self.getEl().dom.value=0;
                                                            }
                                                        },
                                            autoCreate: getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:'1',
                                            inputValue:1,
                                            autoCreate: getRadioShortcut(1)
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2,
                                            autoCreate: getRadioShortcut(2)
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                            autoCreate: getRadioShortcut(3)
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                            autoCreate: getRadioShortcut(4)
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5,
                                            autoCreate: getRadioShortcut(5)
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6,
                                            autoCreate: getRadioShortcut(6)
                                        },
                                        {
                                            boxLabel:'7+',
                                            inputValue:7,
                                            autoCreate: getRadioShortcut(7)
                                        }
                                    ]
                        }
                      ]
            }

var q12=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            labelStyle:'width:500px',
                            html:'<div class="qverylong">12. Do you belong to any groups in which you talk '+
                                'to one or more members of the group about group-related '+
                                'issues at least once every 2 weeks?'+
                                '<p class="qexplanation qindented">Examples include social '+
                                'clubs, recreational groups, trade unions, commercial groups, '+
                                'professional organizations, groups concerned with '+
                                'children like the PTA or Boy Scouts, groups concerned '+
                                'with community service, etc.'+'</p></div>',
                        },
                        {
                            id:q('q12'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'GROUP',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q12a')],
                            next:q('q12a'),
                            items:  [
                                        {
                                            boxLabel:'No',
                                            inputValue:1,
                                            disableQ:[q('q12a')]
                                        },
                                        {
                                            boxLabel:'Yes',
                                            inputValue:2
                                        }
                                    ]
                        }
                      ]
            }

var q12a=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'<div class="qverylong qindented">IF YES: Consider those groups in which you talk '+
                                'to a fellow group member at least once every 2 weeks. '+
                                'Please provide the following information for each '+
                                'such group: the name or type of group and the total '+
                                'number of members in that group that you talk to '+
                                'at least once every 2 weeks</div>'
                        },
                        {
                            id:q('q12a'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            width:500,
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
                                                columns:2
                                            },
                            items:  [
                                        //--- TABLE HEADER ---
                                        {
                                            html:'Name or type of group',
                                            cls:'table-header'
                                        },
                                        {
                                            html:'Members',
                                            cls:'table-header'
                                        },

                                        //--- TABLE BODY

                                        //First row
                                        {
                                            id:q('q12:a1:1'),
                                            name:'GROUP_NAME_1',
                                            xtype:'textfield',
                                            next:q('q12:a1:2')
                                        },
                                        {
                                            id:q('q12:a1:2'),
                                            name:'GROUP_NUM_1',
                                            xtype:'numberfield',
                                            allowDecimals:false,
                                            allowNegative:false,
                                            maxValue:NRG.Forms.NoResponse,
                                            minValue:1,
                                            next:q('q12:a2:1'),
                                            width:50,
                                            cls:'qhalf-indented'
                                        },
                                        //Second row
                                        {
                                            id:q('q12:a2:1'),
                                            name:'GROUP_NAME_2',
                                            xtype:'textfield',
                                            next:q('q12:a2:2')
                                        },
                                        {
                                            id:q('q12:a2:2'),
                                            name:'GROUP_NUM_2',
                                            xtype:'numberfield',
                                            allowDecimals:false,
                                            allowNegative:false,
                                            maxValue:NRG.Forms.NoResponse,
                                            minValue:1,
                                            next:q('q12:a3:1'),
                                            width:50,
                                            cls:'qhalf-indented'
                                        },

                                        //Third row
                                        {
                                            id:q('q12:a3:1'),
                                            name:'GROUP_NAME_3',
                                            xtype:'textfield',
                                            next:q('q12:a3:2')
                                        },
                                        {
                                            id:q('q12:a3:2'),
                                            name:'GROUP_NUM_3',
                                            xtype:'numberfield',
                                            allowDecimals:false,
                                            allowNegative:false,
                                            maxValue:NRG.Forms.NoResponse,
                                            minValue:1,
                                            next:q('q12:a4:1'),
                                            width:50,
                                            cls:'qhalf-indented'
                                        },

                                        //Forth row
                                        {
                                            id:q('q12:a4:1'),
                                            name:'GROUP_NAME_4',
                                            xtype:'textfield',
                                            next:q('q12:a4:2')
                                        },
                                        {
                                            id:q('q12:a4:2'),
                                            name:'GROUP_NUM_4',
                                            xtype:'numberfield',
                                            allowDecimals:false,
                                            allowNegative:false,
                                            maxValue:NRG.Forms.NoResponse,
                                            minValue:1,
                                            next:q('q12:a5:1'),
                                            width:50,
                                            cls:'qhalf-indented'
                                        },
                                        //Forth row
                                        {
                                            id:q('q12:a5:1'),
                                            name:'GROUP_NAME_5',
                                            xtype:'textfield',
                                            next:q('q12:a5:2')
                                        },
                                        {
                                            id:q('q12:a5:2'),
                                            name:'GROUP_NUM_5',
                                            xtype:'numberfield',
                                            allowDecimals:false,
                                            allowNegative:false,
                                            maxValue:NRG.Forms.NoResponse,
                                            minValue:1,
                                            width:50,
                                            cls:'qhalf-indented'
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
                xtype:'form',
                border:false,
                autoScroll:false,
                buttonAlign:'left',
                lastForm:false,
                title:'Interactions',
                schema:'INT/1.0',
                submitOrder: [
                                'MARITAL', 'CHILD', 'CHILD_SEE',
                                'PARENT', 'PARENT_SEE', 'IN_LAW', 'IN_LAW_SEE',
                                'REL', 'REL_SEE','FRIEND', 'FRIEND_SEE',
                                'RELIGION', 'RELIGION_SEE', 'SCHOOL', 'SCHOOL_SEE',
                                'WORK', 'WORK_SUPER', 'WORK_SEE', 'NEIGHBOR',
                                'VOL', 'VOL_SEE', 'GROUP',
                                'GROUP_NAME_1', 'GROUP_NUM_1',
                                'GROUP_NAME_2', 'GROUP_NUM_2',
                                'GROUP_NAME_3', 'GROUP_NUM_3',
                                'GROUP_NAME_4', 'GROUP_NUM_4',
                                'GROUP_NAME_5', 'GROUP_NUM_5'
                             ],
                keys:   {
                            //Digits [1-5]
                            key:[
                                    //Horizontal digits
                                    48,49,50,51,52,53,54,55,
                                    //Numpad
                                    96,97,98,99,100,101,102,103
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
                items:[ q1,q2,q2a,q3,q3a,q4,q4a,q5,q5a,q6,q6a,q7,q7a,q8,q8a,q9,
                        q9a,q9b,q10,q11,q11a,q12,q12a,btnNext]
             };

NRG.Forms.Interactions=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}