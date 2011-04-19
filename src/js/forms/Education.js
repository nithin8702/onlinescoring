/* Education.js tabsize=4
 *
 * The Education Form.
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

var qID='qn3';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Today I have completed:'
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
                                            name:'NOW',
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
                                            boxLabel:'Less than seven years of school',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            inputValue:7
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
                            html:'My father has completed:'
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
                                            boxLabel:'Less than seven years of school',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            inputValue:7
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
                            html:'I would like to complete:'
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
                                            boxLabel:'Less than seven years of school',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
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
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'My mother has completed:'
                        },
                        {
                            id:q('q4'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            invalidClass:'',
                            allowBlank:true,
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
                                            boxLabel:'Less than seven years of school',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            inputValue:7
                                        }
                                    ]
                          }
                        ]
            };

var formFields={
                layout:'column',
                border:false,
                items:  [
                            {
                                width:400,
                                border:false,
                                items:[q1,q2]
                            },
                            {
                                columnWidth:1,
                                border:false,
                                items:[q3,q4]
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
                title:'Education',
                schema:'EDU/1.0',
                submitOrder:['NOW','FUT','DAD','MOM'],
                keys:   {
                            //Digits [1-9]
                            key:[
                                    //Horizontal line
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
                items:[formFields, btnNext]
            };

NRG.Forms.Education=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

