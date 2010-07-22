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
                            allowBlank:false,
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Less than seven years of school',
                                            name:q('q1:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            name:q('q1:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            name:q('q1:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            name:q('q1:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            name:q('q1:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            name:q('q1:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            name:q('q1:a1'),
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
                            allowBlank:false,
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Not Applicable/Unknown',
                                            name:q('q2:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Less than seven years of school',
                                            name:q('q2:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            name:q('q2:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            name:q('q2:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            name:q('q2:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            name:q('q2:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            name:q('q2:a1'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            name:q('q2:a1'),
                                            inputValue:8
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
                            allowBlank:false,
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Less than seven years of school',
                                            name:q('q3:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            name:q('q3:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            name:q('q3:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            name:q('q3:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            name:q('q3:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            name:q('q3:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            name:q('q3:a1'),
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
                            allowBlank:false,
                            listeners:  {
                                            change:radiogroupChanged,
                                            valid:onFieldValid,
                                            invalid:onFieldInvalid,
                                            specialkey:onEnter
                                        },
                            items:  [
                                        {
                                            boxLabel:'Not Applicable/Unknown',
                                            name:q('q4:a1'),
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'Less than seven years of school',
                                            name:q('q4:a1'),
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'Seven to nine years of school <span class="q-etc">(Junior high/Middle School)</span>',
                                            name:q('q4:a1'),
                                            inputValue:3
                                        },
                                        {
                                            boxLabel:'Ten to 11 years of school <span class="q-etc">(part high school)</span>',
                                            name:q('q4:a1'),
                                            inputValue:4
                                        },
                                        {
                                            boxLabel:'High school graduate',
                                            name:q('q4:a1'),
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'One to three years college <span class="q-etc">(also business schools)</span>',
                                            name:q('q4:a1'),
                                            inputValue:6
                                        },
                                        {
                                            boxLabel:'Four-year college graduate <span class="q-etc">(BA, BS, BM)</span>',
                                            name:q('q4:a1'),
                                            inputValue:7
                                        },
                                        {
                                            boxLabel:'Professional Degree <span class="q-etc">(MA, MS, ME, MD, PhD, LLD)</span>',
                                            name:q('q4:a1'),
                                            inputValue:8
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

var form=   {
                id:qID,
                xtype:'form',
                border:false,
                autoScroll:true,
                title:'Education',
                keys:   {
                            //Digits [1-9]
                            key:[49,50,51,52,53,54,55,56,57],
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
                items:[formFields]
            };

NRG.Forms.Education=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

