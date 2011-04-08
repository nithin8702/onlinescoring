/* HollingsheadIndex.js tabsize=4
 *
 * The Hollingshead Index Form.
 *
 * @author  Victor Petrov <victor_petrov@harvard.edu>
 * @date    April 8, 2010
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

var qID='qn10';
var radioPaddingLeft=55;

var h1={
            html:'<h1 class="huge">Occupation Scale</h1>'
};
var h2={
            html:'<h1 class="huge">Education Scale</h1>'
};
var q1=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-use-mouse q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Please mark the category that best describes \
your current occupation or your future occupation if you are a student.<br/>If \
retired, mark the category that best describes your previous occupation.'
                        },
                        {
                            id:q('q1'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            cls:'q-table',
                            width:561,
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            next:q('q2'),
                            defaults:   {
                                            next:q('q2'),
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
                                            html:'&nbsp;',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'Self (N/Ft)',
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

                                        //Higher executive
                                        {
                                            html:'Higher executives of large concerns, proprietors, and major professionals',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a1:1'),
                                            name:'OCCU_SELF',
                                            inputValue:7,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a1:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:7,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a1:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:7,
                                            xtype:'radio'
                                        },

                                        //Business managers
                                        {
                                            html:'Business managers, proprietors of medium-sized businesses, and lesser professionals',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a2:1'),
                                            name:'OCCU_SELF',
                                            inputValue:6,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a2:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:6,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a2:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:6,
                                            xtype:'radio'
                                        },

                                        //Administrative personnel
                                        {
                                            html:'Administrative personnel, owners of small businesses and minor professionals',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a3:1'),
                                            name:'OCCU_SELF',
                                            inputValue:5,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a3:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:5,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a3:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:5,
                                            xtype:'radio'
                                        },

                                        //Clerical and sales workers, technicians, and owners of little businesses
                                        {
                                            html:'Clerical and sales workers, technicians, and owners of little businesses',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a4:1'),
                                            name:'OCCU_SELF',
                                            inputValue:4,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a4:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:4,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a4:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:4,
                                            xtype:'radio'
                                        },

                                        //Skilled manual employees
                                        {
                                            html:'Skilled manual employees',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a5:1'),
                                            name:'OCCU_SELF',
                                            inputValue:3,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a5:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:3,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a5:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:3,
                                            xtype:'radio'
                                        },

                                        //Machine operators and semiskilled
                                        {
                                            html:'Machine operators and semiskilled employees',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a6:1'),
                                            name:'OCCU_SELF',
                                            inputValue:2,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a6:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:2,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a6:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:2,
                                            xtype:'radio'
                                        },

                                        //Unskilled employees
                                        {
                                            html:'Unskilled employees',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q1:a7:1'),
                                            name:'OCCU_SELF',
                                            inputValue:1,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a7:2'),
                                            name:'OCCU_MOTHER',
                                            inputValue:1,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q1:a7:3'),
                                            name:'OCCU_FATHER',
                                            inputValue:1,
                                            xtype:'radio'
                                        }
                            ]
                        }
                      ]
            };

//Current/future occupation
var q2=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:10px;padding-bottom:25px',
                items:[
                        {
                            id:q('q2'),
                            name:'OCCU_SELF_LIST',
                            xtype:'textfield',
                            fieldLabel:'Please list your current / future occupation',
                            labelStyle:'padding-top:5px;width:400px',
                            allowBlank:true,
                            width:200,
                            next:q('q3'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

//Please list your mother's occupation
var q3=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:10px;padding-bottom:25px',
                items:[
                        {
                            id:q('q3'),
                            name:'OCCU_MOTHER_LIST',
                            xtype:'textfield',
                            fieldLabel:'Please list your mother\'s occupation',
                            labelStyle:'padding-top:5px;width:400px',
                            allowBlank:true,
                            width:200,
                            next:q('q4'),
                            listeners:  {
                                            focus:onFieldFocus,
                                            blur:onFocusLost,
                                            specialkey:onEnter
                                        }
                        }
                      ]
            };

//Please list your father's occupation
var q4=     {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                style:'padding-top:10px;padding-bottom:25px',
                items:[
                        {
                            id:q('q4'),
                            name:'OCCU_FATHER_LIST',
                            xtype:'textfield',
                            fieldLabel:'Please list your father\'s occupation',
                            labelStyle:'padding-top:5px;width:400px',
                            allowBlank:true,
                            width:200,
                            next:q('q5'),
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
                cls:'q-fieldset q-use-mouse q-container',
                items:[
                        {
                            xtype:'label',
                            cls:'question-text',
                            html:'Please mark the category that best describes \
the highest level of formal education that you achieved or that you plan on \
achieving if you are a student.'
                        },
                        {
                            id:q('q5'),
                            xtype:'panel',
                            layout:'table',
                            border:false,
                            cls:'q-table',
                            width:561,
                            style:'margin-top:10px;margin-left:'+radioPaddingLeft+'px',
                            defaults:   {
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
                                            html:'&nbsp;',
                                            cls:'table-header',
                                            border:false
                                        },
                                        {
                                            html:'Self',
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

                                        //Professional
                                        {
                                            html:'Professional (MA, MS, ME, MD, PhD, LLD, and the like',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a1:1'),
                                            name:'EDU_SELF',
                                            inputValue:7,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a1:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:7,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a1:3'),
                                            name:'EDU_FATHER',
                                            inputValue:7,
                                            xtype:'radio'
                                        },

                                        //4-year
                                        {
                                            html:'Four-year college graduate (BA, BS, BM)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a2:1'),
                                            name:'EDU_SELF',
                                            inputValue:6,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a2:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:6,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a2:3'),
                                            name:'EDU_FATHER',
                                            inputValue:6,
                                            xtype:'radio'
                                        },

                                        //One to three years
                                        {
                                            html:'One to three years college (also business schools)',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a3:1'),
                                            name:'EDU_SELF',
                                            inputValue:5,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a3:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:5,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a3:3'),
                                            name:'EDU_FATHER',
                                            inputValue:5,
                                            xtype:'radio'
                                        },

                                        //High school graduate
                                        {
                                            html:'High school graduate',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a4:1'),
                                            name:'EDU_SELF',
                                            inputValue:4,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a4:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:4,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a4:3'),
                                            name:'EDU_FATHER',
                                            inputValue:4,
                                            xtype:'radio'
                                        },

                                        //Ten to 11 years
                                        {
                                            html:'Ten to 11 years of school',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a5:1'),
                                            name:'EDU_SELF',
                                            inputValue:3,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a5:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:3,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a5:3'),
                                            name:'EDU_FATHER',
                                            inputValue:3,
                                            xtype:'radio'
                                        },

                                        //Seven to nine years of school
                                        {
                                            html:'Seven to nine years of school',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a6:1'),
                                            name:'EDU_SELF',
                                            inputValue:2,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a6:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:2,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a6:3'),
                                            name:'EDU_FATHER',
                                            inputValue:2,
                                            xtype:'radio'
                                        },

                                        //Less than 7
                                        {
                                            html:'Less than seven years of school',
                                            cls:'q-table-label',
                                            border:false
                                        },
                                        {
                                            id:q('q5:a7:1'),
                                            name:'EDU_SELF',
                                            inputValue:1,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a7:2'),
                                            name:'EDU_MOTHER',
                                            inputValue:1,
                                            xtype:'radio'
                                        },
                                        {
                                            id:q('q5:a7:3'),
                                            name:'EDU_FATHER',
                                            inputValue:1,
                                            xtype:'radio'
                                        }
                            ]
                        }
                      ]
            };


var btnFinish={
                xtype:'fieldset',
                border:false,
                style:'margin-bottom:20px',
                items:[
                            {
                                id:'btnFinish',
                                xtype:'button',
                                text:'Finish',
                                icon:'images/icons/finish.png',
                                handler:btnFinishClicked
                            }
                      ]
              };

var form=   {
                id:qID,
                xtype:'form',
                border:false,
                autoScroll:false,
                buttonAlign:'left',
                title:'Hollingshead',
                schema:'HI/1.0',
                lastForm:true,
                keys:   {
                            //Digits [1-5]
                            key:[
                                    //Horizontal line
                                    49,50,51,
                                    //Numpad
                                    97,98,99
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
                items:[h1,q1,q2,q3,q4,h2,q5,btnFinish],
                submitOrder:    [
                                    "OCCU_SELF",
                                    "OCCU_MOTHER",
                                    "OCCU_FATHER",
                                    "OCCU_SELF_LIST",
                                    "OCCU_MOTHER_LIST",
                                    "OCCU_FATHER_LIST",
                                    "EDU_SELF",
                                    "EDU_MOTHER",
                                    "EDU_FATHER"
                                ]
            };

NRG.Forms.Hollingshead=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function btnFinishClicked(button)
{
    var currentForm=Ext.getCmp('tabForms').getActiveTab();
    if (currentForm.saved)
        resetForms();
    else
        promptSaveForm(currentForm);
}