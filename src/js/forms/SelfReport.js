/* SelfReport.js tabsize=4
 *
 * The SelfReport Form.
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

var qID='qn13';
var radioPaddingLeft=55;
var prefix='Q';
var question_id=0;

var instructions={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions">Below is a list of items '+
                         'that describe people. For each item, choose 0, 1, or'+
                         ' 2 to describe yourself over the past 6 months. '+
                         'Please answer all items as well as you can, even if '+
                         'some do not seem to apply to you.</p>'
                 };

var headers={
                xtype:'label',
                html:'<div class="asr_headers">'+
                           '<span>Not True</span>'+
                           '<span>Somewhat/Sometimes True</span>'+
                           '<span>Very/Often True</span>'+
                     '</div>'
            }

var footnote={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions"></p>'
                 };

var q1to122=[
getQ("I am too forgetful","FORGET",2,0),
getQ("I make good use of my opportunities","USEOPPOR",2,0),
getQ("I argue a lot","ARGUE",2,0),
getQ("I work up to my ability","WORKABIL",2,0),
getQ("I blame others for my problems","BLAMEOTH",2,0),
getQN13Q("I use drugs (other than alcohol and nicotine) for non medical purposes","DRUGS"),
getQ("I brag","BRAG",2,0),
getQ("I have trouble concentrating on paying attention for long","ATTNLONG",2,0),
getQN13Q("I can’t get my mind off certain thoughts",'MINDOFF'),
getQ("I have trouble sitting still","SITSTILL",2,0),
getQ("I am too dependent on others","DEPENDOTH",2,0),
getQ("I feel lonely","LONELY",2,0),
getQ("I feel confused or in a fog","INAFOG",2,0),
getQ("I cry a lot","CRYALOT",2,0),
getQ("I am pretty honest","HONEST",2,0),
getQ("I am mean to others","MEANOTH",2,0),
getQ("I daydream a lot","DAYDREAM",2,0),
getQ("I deliberately try to hurt or kill myself","TRYHURT",2,0),
getQ("I try to get a lot of attention","LOTATTN",2,0),
getQ("I damage or destroy my things","DAMAGEMY",2,0),
getQ("I damage or destroy things belonging to others","DAMAGEOTH",2,0),
getQ("I worry about my future","WORRYFUT",2,0),
getQ("I break the rules at work or elsewhere","BREAKRULE",2,0),
getQ("I don’t eat as well as I should","DONTEAT",2,0),
getQ("I don’t get along with other people","GETALONG",2,0),
getQ("I don’t feel guilty after doing something I shouldn’t","NOTGUILTY",2,0),
getQ("I am jealous of others","JEALOUS",2,0),
getQ("I get along badly with my family","BADLYFAM",2,0),
getQN13Q("I am afraid of certain animals, situations, or places",'FEARTHNG'),
getQ("My relations with the opposite sex are poor","OPPOSEX",2,0),
getQ("I am afraid I might think or do something bad","DOBAD",2,0),
getQ("I feel that I have to be perfect","PERFECT",2,0),
getQ("I feel that no one loves me","NOLOVEME",2,0),
getQ("I feel that others are out to get me","OUTTOGET",2,0),
getQ("I feel worthless or inferior","FEELINF",2,0),
getQ("I accidentally get hurt a lot, accident-prone","ACCPRONE",2,0),
getQ("I get in many fights","FIGHTS",2,0),
getQ("My relations with neighbors are poor","NEIGHBOR",2,0),
getQ("I hang around people who get in trouble","HANGARND",2,0),
getQN13Q("I hear sounds or voices that other people think aren't there","HEARSNDS"),
getQ("I am impulsive or act without thinking","IMPULSIVE",2,0),
getQ("I would rather be alone than with others","LIKEALONE",2,0),
getQ("I lie or cheat","CHEAT",2,0),
getQ("I feel overwhelmed by my responsibilities","OVERWHELM",2,0),
getQ("I am nervous or tense","NERVOUS",2,0),
getQN13Q("Parts of my body twitch or make nervous movements","TWITCH"),
getQ("I lack self-confidence","CONFIDENCE",2,0),
getQ("I am not liked by others","NOTLIKED",2,0),
getQ("I can do certain things better than other people","BETTEROTH",2,0),
getQ("I am too fearful or anxious","FEARFUL",2,0),
getQ("I feel dizzy or lightheaded","DIZZY",2,0),
getQ("I feel too guilty","GUILTY",2,0),
getQ("I have trouble planning for the future","CANTPLAN",2,0),
getQ("I feel tired without good reason","TIRED",2,0),
getQ("My moods swing between elation and depression","MOODSWNG",2,0),

{
    xtype:'fieldset',
    border:false,
    cls:'q-fieldset q-container',
    style:"margin-left:10px",
    items:[
            {
                xtype:'label',
                cls:'x-form-item x-form-item-label',
                style:'font-weight:bold;margin-top:10px',
                html:(++question_id)+'. Physical problems <u>without known medical cause</u>:'
            },
            getQN13SubQ1(q('q'+question_id),"a. Aches or pains (<b>not</b> stomach or headaches)","ACHES",q('q'+question_id+':a2')),
            getQN13SubQ1(2,"b. Headaches","HEADACHE",q('q'+question_id+':a3')),
            getQN13SubQ1(3,"c. Nausea, feel sick","NAUSEA",q('q'+question_id+':a4')),
            getQN13SubQ1(4,"d. Problems with eyes (<b>not</b> if corrected by glasses)","PROBEYES",q('q'+question_id+':a4:1')),
            {
                xtype:'fieldset',
                border:false,
                cls:'q-container',
                items:[
                        {
                            id:q('q'+question_id+':a4:1'),
                            name:'PROBEYES_LIST',
                            xtype:'textfield',
                            width:375,
                            allowBlank:true,
                            fieldLabel:'Describe',
                            style:'margin-top:5px',
                            labelStyle:'width:60px; padding-left:+'+radioPaddingLeft/2+'px; font-weight:normal',
                            next:q('q'+question_id+':a5'),
                            regex:NRG.Forms.T_StringWithQuotes,
                            listeners:  {
                                            focus:onFieldFocus,
                                            specialkey:onEnter
                                        }
                        }
                     ]
            },
            getQN13SubQ1(5,"e. Rashes or other skin problems","RASH",q('q'+question_id+':a6')),
            getQN13SubQ1(6,"f. Stomachaches","STMCHACHE",q('q'+question_id+':a7')),
            getQN13SubQ1(7,"g. Vomiting, throwing up","VOMIT",q('q'+question_id+':a8')),
            getQN13SubQ1(8,"h. Heart pounding or racing","HEARTRACE",q('q'+question_id+':a9')),
            getQN13SubQ1(9,"i. Numbness or tingling in body parts","NUMBNESS")
   ]
},

getQN13Q("I pick my skin or other parts of my body","PICKSKIN"),
getQ("I fail to finish things I should do","NOFINISH",2,0),
getQ("There is very little that I enjoy","NOENJOY",2,0),
getQ("My work performance is poor","WORKPOOR",2,0),
getQ("I am poorly coordinated or clumsy","CLUMSY",2,0),
getQ("I would rather be with older people than with people of my own age","OLDER",2,0),
getQ("I have trouble setting priorities","PRIORITY",2,0),
getQ("I refuse to talk","WONTTALK",2,0),
getQN13Q("I repeat certain acts over and over","REPEATACT"),
getQ("I have trouble making or keeping friends","FRIENDS",2,0),
getQ("I scream or yell a lot","SCREAM",2,0),
getQ("I am secretive or keep things to myself","SECRETIVE",2,0),
getQN13Q("I see things that other people think aren’t there","SEETHNGS"),
getQ("I am self-conscious or easily embarrassed","EMBARRASS",2,0),
getQ("I worry about my family","WORRYFAM",2,0),
getQ("I meet my responsibilities to my family","RESPFAM",2,0),
getQ("I show off or clown","SHOWOFF",2,0),
getQ("I am too shy or timid","TIMID",2,0),
getQ("My behavior is irresponsible","IRRESP",2,0),
getQN13Q("I sleep more than most other people during day and/or night","SLEEP"),
getQ("I have trouble making decisions","DECIDE",2,0),
getQN13Q("I have a speech problem","SPEECH"),
getQ("I stand up for my rights","STANDUP",2,0),
getQ("My behavior is very changeable","CHNGBEH",2,0),
getQ("I steal","STEAL",2,0),
getQ("I am easily bored","BORED",2,0),
getQN13Q("I do things that other people think are strange","DOSTRANGE"),
getQN13Q("I have thoughts that other people would think are strange","THINKODD"),
getQ("I am stubborn, sullen, or irritable","STUBBORN",2,0),
getQ("My moods or feelings change suddenly","MOODFAST",2,0),
getQ("I enjoy being with people","LIKEOTHS",2,0),
getQ("I rush into things without considering the risks","RUSHINTO",2,0),
getQ("I drink too much alcohol or get drunk","GETDRUNK",2,0),
getQ("I think about killing myself","THNKKILL",2,0),
getQN13Q("I do things that may cause me trouble with the law","TROUBLAW"),
getQ("I talk too much","TALKTOO",2,0),
getQ("I tease others a lot","TEASEOTH",2,0),
getQ("I have a hot temper","TEMPER",2,0),
getQ("I think about sex too much","THINKSEX",2,0),
getQ("I threaten to hurt people","THREATEN",2,0),
getQ("I like to help others","HELPOTH",2,0),
getQ("I dislike staying in one place for very long","ONEPLACE",2,0),
getQN13Q("I have trouble sleeping","NOSLEEP"),
getQ("I stay away from my job even when I’m not sick or on vacation","AWAYJOB",2,0),
getQ("I don’t have much energy","NOENERGY",2,0),
getQ("I am unhappy, sad, or depressed","UNHAPPY",2,0),
getQ("I am louder than others","LOUDER",2,0),
getQ("People think I am disorganized","DISORG",2,0),
getQ("I try to be fair to others","TRYFAIR",2,0),
getQ("I feel that I can’t succeed","NOSUCCESS",2,0),
getQ("I tend to lose things","LOSETHNG",2,0),
getQ("I like to try new things","TRYNEW",2,0),
getQ("I wish I were of the opposite sex","OTHERSEX",2,0),
getQ("I keep from getting involved with others","NOTINVOLVE",2,0),
getQ("I worry a lot","WORRY",2,0),
getQ("I worry about my relations with the opposite sex","WORRYSEX",2,0),
getQ("I fail to pay my debts or meet other financial responsibilities","PAYDEBT",2,0),
getQ("I feel restless or fidgety","RESTLESS",2,0),
getQ("I get upset too easily","EZUPSET",2,0),
getQ("I have trouble managing money or credit cards","MONEY",2,0),
getQ("I am too impatient","IMPATIENT",2,0),
getQ("I am not good at details","DETAILS",2,0),
getQ("I drive too fast","DRIVE",2,0),
getQ("I tend to be late for appointments","LATEAPPT",2,0),
getQ("I have trouble keeping a job","KEEPJOB",2,0),
getQ("I am a happy person","AMHAPPY",2,0),
{
    xtype:'fieldset',
    border:false,
    cls:'q-fieldset q-container',
    items:[
            {
                id:q('q'+(++question_id)),
                xtype:'numberfield',
                name:'TOBACCO',
                allowBlank:true,
                allowDecimals:true,
                allowNegative:false,
                maxValue:16070400, /* seconds in 6 months */
                minValue:0,
                fieldLabel:question_id+'. In the past 6 months, about how many times per day did you use tobacco? <span class="qexplanation">(including &nbsp;&nbsp;&nbsp;smokeless tobacco)</span>',
                next:q('q'+(question_id+1)),
                selectOnFocus:true,
                style:'margin-top:5px;',
                labelStyle:'width:575px;margin-left:10px;',
                width:50,
                listeners:  {
                                focus:onFieldFocus,
                                specialkey:onEnter
                            }
            }
          ]
},
{
    xtype:'fieldset',
    border:false,
    cls:'q-fieldset q-container',
    items:[
            {
                id:q('q'+(++question_id)),
                xtype:'numberfield',
                name:'DRUNK',
                allowBlank:true,
                allowDecimals:true,
                allowNegative:false,
                maxValue:186, /* days in 6 months */
                minValue:0,
                fieldLabel:question_id+'. In the past 6 months, on how many days were you drunk?',
                next:q('q'+(question_id+1)),
                selectOnFocus:true,
                style:'margin-top:5px;',
                labelStyle:'width:410px;margin-left:10px;',
                width:50,
                listeners:  {
                                focus:onFieldFocus,
                                specialkey:onEnter
                            }
            }
          ]
},
{
    xtype:'fieldset',
    border:false,
    cls:'q-fieldset q-container',
    items:[
            {
                id:q('q'+(++question_id)),
                xtype:'numberfield',
                name:'NONMEDS',
                allowBlank:true,
                allowDecimals:true,
                allowNegative:false,
                maxValue:186, /* days in 6 months */
                minValue:0,
                fieldLabel:question_id+'. In the past 6 months, on how many days did you use drugs for nonmedical purposes? <span class="qexplanation">&nbsp;&nbsp;&nbsp;(including marijuana, cocaine, and other drugs, except alcohol and nicotine)</span>',
                next:q('q'+(question_id+1)),
                selectOnFocus:true,
                style:'margin-top:5px;',
                labelStyle:'width:575px;margin-left:10px;',
                width:50,
                listeners:  {
                                focus:onFieldFocus,
                                specialkey:onEnter
                            }
            }
          ]
}

];

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
                title:'Self-Report',
                schema:'ASR/1.0',
                lastForm:true,
                keys:   {
                            //Digits [0-2]
                            key:[
                                    //Horizontal line
                                    48,49,50,
                                    //Numpad
                                    96,97,98,
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
                items:[instructions,headers,q1to122,footnote,btnFinish],
                submitOrder: [
                                "FORGET",
                                "USEOPPOR",
                                "ARGUE",
                                "WORKABIL",
                                "BLAMEOTH",
                                "DRUGS",
                                "DRUGS_LIST",
                                "BRAG",
                                "ATTNLONG",
                                "MINDOFF",
                                "MINDOFF_LIST",
                                "SITSTILL",
                                "DEPENDOTH",
                                "LONELY",
                                "INAFOG",
                                "CRYALOT",
                                "HONEST",
                                "MEANOTH",
                                "DAYDREAM",
                                "TRYHURT",
                                "LOTATTN",
                                "DAMAGEMY",
                                "DAMAGEOTH",
                                "WORRYFUT",
                                "BREAKRULE",
                                "DONTEAT",
                                "GETALONG",
                                "NOTGUILTY",
                                "JEALOUS",
                                "BADLYFAM",
                                "FEARTHNG",
                                "FEARTHNG_LIST",
                                "OPPOSEX",
                                "DOBAD",
                                "PERFECT",
                                "NOLOVEME",
                                "OUTTOGET",
                                "FEELINF",
                                "ACCPRONE",
                                "FIGHTS",
                                "NEIGHBOR",
                                "HANGARND",
                                "HEARSNDS",
                                "HEARSNDS_LIST",
                                "IMPULSIVE",
                                "LIKEALONE",
                                "CHEAT",
                                "OVERWHELM",
                                "NERVOUS",
                                "TWITCH",
                                "TWITCH_LIST",
                                "CONFIDENCE",
                                "NOTLIKED",
                                "BETTEROTH",
                                "FEARFUL",
                                "DIZZY",
                                "GUILTY",
                                "CANTPLAN",
                                "TIRED",
                                "MOODSWNG",
                                "ACHES",
                                "HEADACHE",
                                "NAUSEA",
                                "PROBEYES",
                                "PROBEYES_LIST",
                                "RASH",
                                "STMCHACHE",
                                "VOMIT",
                                "HEARTRACE",
                                "NUMBNESS",
                                "ATTACKOTH",
                                "PICKSKIN",
                                "PICKSKIN_LIST",
                                "NOFINISH",
                                "NOENJOY",
                                "WORKPOOR",
                                "CLUMSY",
                                "OLDER",
                                "PRIORITY",
                                "WONTTALK",
                                "REPEATACT",
                                "REPEATACT_LIST",
                                "FRIENDS",
                                "SCREAM",
                                "SECRETIVE",
                                "SEETHNGS",
                                "SEETHNGS_LIST",
                                "EMBARRASS",
                                "WORRYFAM",
                                "RESPFAM",
                                "SHOWOFF",
                                "TIMID",
                                "IRRESP",
                                "SLEEP",
                                "SLEEP_",
                                "DECIDE",
                                "SPEECH",
                                "SPEECH_",
                                "STANDUP",
                                "CHNGBEH",
                                "STEAL",
                                "BORED",
                                "DOSTRANGE",
                                "DOSTRANGE_LIST",
                                "THINKODD",
                                "THINKODD_LIST",
                                "STUBBORN",
                                "MOODFAST",
                                "LIKEOTHS",
                                "RUSHINTO",
                                "GETDRUNK",
                                "THNKKILL",
                                "TROUBLAW",
                                "TROUBLAW_LIST",
                                "TALKTOO",
                                "TEASEOTH",
                                "TEMPER",
                                "THINKSEX",
                                "THREATEN",
                                "HELPOTH",
                                "ONEPLACE",
                                "NOSLEEP",
                                "NOSLEEP_",
                                "AWAYJOB",
                                "NOENERGY",
                                "UNHAPPY",
                                "LOUDER",
                                "DISORG",
                                "TRYFAIR",
                                "NOSUCCESS",
                                "LOSETHNG",
                                "TRYNEW",
                                "OTHERSEX",
                                "NOTINVOLVE",
                                "WORRY",
                                "WORRYSEX",
                                "PAYDEBT",
                                "RESTLESS",
                                "EZUPSET",
                                "MONEY",
                                "IMPATIENT",
                                "DETAILS",
                                "DRIVE",
                                "LATEAPPT",
                                "KEEPJOB",
                                "AMHAPPY",
                                "TOBACCO",
                                "DRUNK",
                                "NONMEDS"
                ]
            };

NRG.Forms.SelfReport=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}

function getQN13Q(label,name)
{
    return [{
                xtype:'fieldset',
                border:false,
                cls:'q-fieldset q-container',
                items:[
                        {
                            id:q('q'+(++question_id)),
                            xtype:'radiogroup',
                            hideLabel:false,
                            fieldLabel:question_id+'. '+label,
                            style:'padding-left:'+radioPaddingLeft+'px;',
                            width:400,
                            labelStyle:'width:500px',
                            invalidClass:'',
                            allowBlank:true,
                            next:q('q'+(question_id+1)),
                            disableQ:[q('q'+question_id+':a2')],
                            defaults:   {
                                            name:name,
                                            listeners:  {
                                                            focus:onFieldFocus,
                                                            blur:onFocusLost
                                                        }
                                        },
                            listeners:  {
                                            change:radiogroupChanged,
                                            specialkey:onEnter
                                        },
                            items: [
                                        {
                                            boxLabel:"0",
                                            inputValue:0,
                                            autoCreate:getRadioShortcut(0)
                                        },
                                        {
                                            boxLabel:"1",
                                            inputValue:1,
                                            autoCreate:getRadioShortcut(1),
                                            enableQ:[q('q'+question_id+':a2')],
                                            next:q('q'+question_id+':a2')
                                        },
                                        {
                                            boxLabel:"2",
                                            inputValue:2,
                                            autoCreate:getRadioShortcut(2),
                                            enableQ:[q('q'+question_id+':a2')],
                                            next:q('q'+question_id+':a2')
                                        }
                                  ]
                        }
                      ]
                },
                {
                    xtype:'fieldset',
                    border:false,
                    cls:'q-container',
                    items:[
                            {
                                id:q('q'+question_id+':a2'),
                                name:name+'_LIST',
                                xtype:'textfield',
                                width:400,
                                disabled:true,
                                allowBlank:true,
                                fieldLabel:'Describe',
                                style:'margin-top:5px',
                                labelStyle:'width:60px; padding-left:+'+radioPaddingLeft/4+'px; font-weight:normal',
                                next:q('q'+(question_id+1)),
                                regex:NRG.Forms.T_StringWithQuotes,
                                listeners:  {
                                                focus:onFieldFocus,
                                                specialkey:onEnter
                                            }
                            }
                         ]
                }
    ];
}

function getQN13SubQ1(subid,label,name,next)
{
    var id;

    if (typeof(next)=="undefined")
        next=q('q'+(question_id+1));

    if (typeof(subid)!="number")
        id=subid;
    else
        id=q('q'+question_id+':a'+subid);
    var result=
    {
            xtype:'fieldset',
            border:false,
            cls:'q-fieldset q-container',
            items:[
                    {
                        id:id,
                        xtype:'radiogroup',
                        hideLabel:false,
                        fieldLabel:label,
                        style:'padding-left:'+radioPaddingLeft+'px',
                        width:400,
                        labelStyle:'width:480px;font-weight:normal',
                        invalidClass:'',
                        allowBlank:true,
                        next:next,
                        defaults:   {
                                        name:name,
                                        listeners:  {
                                                        focus:onFieldFocus,
                                                        blur:onFocusLost
                                                    }
                                    },
                        listeners:  {
                                        change:radiogroupChanged,
                                        specialkey:onEnter
                                    },
                        items: getRadios(2,0)
                    }
                  ]
            }

    return result;
}
