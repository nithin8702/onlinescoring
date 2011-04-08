/* AlcoholTobacco.js tabsize=4
 *
 * The Alcohol/Tobacco/Caffeine Form.
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

var qID='qn1';
var radioPaddingLeft=55;

var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'1. How often do you have a drink containing alcohol?'
                        },
                        {
                            id:q('q1'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q2'),
                            invalidClass:'',
                            enableQ:[q('q2'),q('q3')],
                            allowBlank:true,
                            defaults:   {
                                            name:'ALC_FREQ',
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
                                            boxLabel:'Never',
                                            inputValue:1,
                                            next:q('q4'),
                                            disableQ:[q('q2'),q('q3')]
                                        },
                                        {
                                            boxLabel:'Monthly or less',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'2-4 times a month',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'2-3 times a week',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'4 or more times a week',
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
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;If you drink, how many drinks <u>on average</u> do you have per occasion?'
                        },
                        {
                            id:q('q2'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q3'),
                            disabled:true,
                            allowBlank:true,
                            invalidClass:'',
                            defaults:   {
                                            name:'ALC_AMOUNT',
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
                                            boxLabel:'1 or 2',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'3 or 4',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'5 or 6',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'7,8 or 9',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'10 or more',
                                            inputValue:5
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
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;Have you had more than 4 drinks on any occasion in the last three months?'
                        },
                        {
                            id:q('q3'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q4'),
                            allowBlank:true,
                            disabled:true,
                            invalidClass:'',
                            defaults:   {
                                            name:'ALC_REC_BINGE',
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
            }

var q4=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'2. How much do you smoke <u>on average</u> per day?'
                        },
                        {
                            id:q('q4'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q5'),
                            enableQ:[q('q5')],
                            invalidClass:'',
                            defaults:   {
                                            name:'CIG_FREQ',
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
                                            boxLabel:'None',
                                            inputValue:1,
                                            next:q('q6'),
                                            disableQ:[q('q5')]
                                        },
                                        {
                                            boxLabel:'Less than 2 cigarettes',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'About 1/2 pack',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'About 1 pack',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'More than 1 pack',
                                            inputValue:5
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
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;If YES: when was the last time you smoked?'
                        },
                        {
                            id:q('q5'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            next:q('q6'),
                            disabled:true,
                            defaults:   {
                                            name:'CIG_RECENT',
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
                                            boxLabel:'1-15 min ago',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Last 2 hours',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'3-7 hours ago',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'12-48 hours ago',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'48 hours or more',
                                            inputValue:5
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
                            html:'3. How much Caffeine (caffeinated soda, coffee, caffeinated tea) <u>on average</u> do you consume per day?'
                        },
                        {
                            id:q('q6'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            defaults:   {
                                            name:'CAFF_FREQ',
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            enableQ:[q('q7')],
                            items:  [
                                        {
                                            boxLabel:'None',
                                            inputValue:1,
                                            disableQ:[q('q7')]
                                        },
                                        {
                                            boxLabel:'1 cup (12 oz soda, 6oz coffee, 6oz tea)',
                                            next:q('q7'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'2-3 cups',
                                            next:q('q7'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'4-5 cups',
                                            next:q('q7'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'6 or more cups',
                                            next:q('q7'),
                                            inputValue:5
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
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;If YES: when was the last time you had caffeine?'
                        },
                        {
                            id:q('q7'),
                            xtype:'radiogroup',
                            columns:1,
                            hideLabel:true,
                            allowBlank:true,
                            invalidClass:'',
                            style:'padding-left:'+radioPaddingLeft+'px',
                            disabled:true,
                            defaults:   {
                                            name:'CAFF_RECENT',
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
                                            boxLabel:'1-15 min ago',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Last 2 hours',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'3-7 hours ago',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'12-48 hours ago',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'48 hours or more',
                                            inputValue:5
                                        }
                                    ]
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
                lastForm:false,
                title:'Alcohol/Tobacco/Caffeine',
                schema:'ATC/1.0',
                submitOrder: [
                                'ALC_FREQ', 'ALC_AMOUNT', 'ALC_REC_BINGE',
                                'CIG_FREQ', 'CIG_RECENT',
                                'CAFF_FREQ', 'CAFF_RECENT'
                             ],
                keys:   {
                            //Digits [1-5]
                            key:[
                                    //Horizontal digits
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
                items:[q1,q2,q3,q4,q5,q6,q7,btnNext]
             };

NRG.Forms.AlcoholTobacco=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}