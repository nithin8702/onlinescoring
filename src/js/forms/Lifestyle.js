/* Lifestyle.js tabsize=4
 *
 * The L:ifestyle Form.
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

var qID='qn7';
var radioPaddingLeft=55;
var prefix='Q';
var question_id=0;

var instructions={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions">For each question, circle that '+
                        'answer that best describes '+
                        'how often that statement applies to you. Many of these '+
                        'questions ask about your interactions with other people. '+
                        'Please think about theway you are with most people, rather '+
                        'than special relationships you may have with spouses or '+
                        'significant others, children, siblings, and parents. '+
                        'Everyone changes over time, which can make it hard to fill '+
                        'out questions about your personality. Think about the way '+
                        'you have been the majority of your adult life rather '+
                        'than specific periods in your life or time you may have '+
                        'felt different than normal.</p>'
                 };

var headers={
                xtype:'label',
                html:'<div class="life_headers">'+
                           '<span>Very Rarely</span>'+
                           '<span>Rarely</span>'+
                           '<span>Occasionally</span>'+
                           '<span>Somewhat often</span>'+
                           '<span>Often</span>'+
                           '<span>Very Often</span>'+
                     '</div>'
            }

var footnote={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions">*** Casual interaction with  '+
                        'acquaintances, rather than special relationships such '+
                        'as with close friends and family.</p>'
                 };

var allQ=[
getQ('I like being around other people'),
getQ("I find it hard to get my words out smoothly"),
getQ("I am comfortable with unexpected changes in plans"),
getQ("It's hard for me to avoid getting sidetracked in conversation"),
getQ("I would rather talk to people to get information than to socialize"),
getQ("People have to talk me into trying something new"),
getQ("I am &quot;in-tune&quot; with the other person during conversation***"),
getQ("I have to warm myself up to the idea of visiting an unfamiliar place"),
getQ("I enjoy being in social situations"),
getQ("My voice has a flat or monotonous sound to it"),
getQ("I feel diconnected or &quot;out of sync&quot; in conversations with others***"),
getQ("People find it easy to approach me***"),
getQ("I feel a strong need for sameness from day to day"),
getQ("People ask me to repeat things I've said because they don't understand"),
getQ("I am flexible about how things should be done"),
getQ("I look forward to situations when I can meet new people"),
getQ("I have been told that I talk too much about certain topics"),
getQ("When I make conversation it is just to be polite***"),
getQ("I look forward to trying new things"),
getQ("I speak too loudly or softly"),
getQ("I can tell when someone is not interested in what I am saying***"),
getQ("I have a hard time dealing with changes in my routine"),
getQ("I am good at making small talk***"),
getQ("I act very set in my ways"),
getQ("I feel like I am really connecting with other people"),
getQ("People get frustrated by my unwillingness to bend"),
getQ("Conversation bores me***"),
getQ("I am warm and friendly in my interactions with others***"),
getQ("I leave long pauses in conversation"),
getQ("I alter my daily routine by trying something different"),
getQ("I prefer to be alone rather than with others"),
getQ("I lose track of my original point when talking to people"),
getQ("I like to closely follow a routine while working"),
getQ("I can tell when it is time to change topics in conversation***"),
getQ("I keep doing things the way I know, even if another way might be better"),
getQ("I enjoy chatting with people***")
];


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
                title:'Lifestyle',
                schema:'LIFE/1.0',
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
                listeners:  {
                                //Need both of these because show is not triggered
                                //properly the first time the panel is rendered
                                //and afterrender is not triggered when the user
                                //reactivates the tab.
                                afterrender:onFormShow,
                                show:onFormShow,
                                activate:onFormActivated
                            },
                items:[instructions,headers,allQ,footnote,btnNext],
                submitOrder:    getSequentialSubmitOrder(1,36)
            };

NRG.Forms.Lifestyle=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function getQ(label)
{
    var id=++question_id;
  
    return {
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            id:q('q'+id),
                            xtype:'radiogroup',
                            hideLabel:false,
                            fieldLabel:id+'. '+label,
                            style:'padding-left:'+radioPaddingLeft+'px;',
                            width:400,
                            labelStyle:'width:500px',
                            invalidClass:'',
                            allowBlank:true,
                            next:q('q'+(id+1)),
                            defaults:   {
                                            name:prefix+id,
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
                                            boxLabel:'1',
                                            inputValue:1
                                        },
                                        {
                                            boxLabel:'2',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel:'3',
                                            inputValue:3,
                                        },
                                        {
                                            boxLabel:'4',
                                            inputValue:4,
                                        },
                                        {
                                            boxLabel:'5',
                                            inputValue:5
                                        },
                                        {
                                            boxLabel:'6',
                                            inputValue:6
                                        }
                                    ]
                        }
                      ]
            };
}

function getSequentialSubmitOrder(start,end)
{
    var result=[];

    for (var i=start;i<=end;++i)
        result.push(prefix+i);

    return result;
}