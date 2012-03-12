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
                         '2 to describe yourself over the past 6 months. '+
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

var allQ=[
getQ("I am too forgetful","FORGET",2,0),
getQ("I make good use of my opportunities","USEOPPOR",2,0),
getQ("I argue a lot","ARGUE",2,0),
getQ("I work up to my ability","WORKABIL",2,0),
getQ("I blame others for my problems","BLAMEOTH",2,0),
getQ("I use drugs (other than alcohol and nicotine) for non medical purposes (describe):","DRUGS",2,0),
getQ("I brag","BRAG",2,0),
getQ("I have trouble concentrating on paying attention for long","ATTNLONG",2,0),
getQ("I can’t get my mind off certain thoughts (describe):","MINDOFF",2,0),
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
getQ("I am afraid of certain animals, situations, or places (describe):","FEARTHNG",2,0),
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
getQ("I hear sounds or voices that other people think aren’t there (describe):","HEARSNDS",2,0),
getQ("I am impulsive or act without thinking","IMPULSIVE",2,0),
getQ("I would rather be alone than with others","LIKEALONE",2,0),
getQ("I lie or cheat","CHEAT",2,0),
getQ("I feel overwhelmed by my responsibilities","OVERWHELM",2,0),
getQ("I am nervous or tense","NERVOUS",2,0),
getQ("Parts of my body twitch or make nervous movements (describe): ","TWITCH",2,0),
getQ("I lack self-confidence","CONFIDENCE",2,0),
getQ("I am not liked by others","NOTLIKED",2,0),
getQ("I can do certain things better than other people","BETTEROTH",2,0),
getQ("I am too fearful or anxious","FEARFUL",2,0),
getQ("I feel dizzy or lightheaded","DIZZY",2,0),
getQ("I feel too guilty","GUILTY",2,0),
getQ("I have trouble planning for the future","CANTPLAN",2,0),
getQ("I feel tired without good reason","TIRED",2,0),
getQ("My moods swing between elation and depression","MOODSWNG",2,0),
getQ("I physically attack people","ATTACKOTH",2,0),
getQ("I pick my skin or other parts of my body (describe):","PICKSKIN",2,0),
getQ("I fail to finish things I should do","NOFINISH",2,0),
getQ("There is very little that I enjoy","NOENJOY",2,0),
getQ("My work performance is poor","WORKPOOR",2,0),
getQ("I am poorly coordinated or clumsy","CLUMSY",2,0),
getQ("I would rather be with older people than with people of my own age","OLDER",2,0),
getQ("I have trouble setting priorities","PRIORITY",2,0),
getQ("I refuse to talk","WONTTALK",2,0),
getQ("I repeat certain acts over and over (describe):","REPEATACT",2,0),
getQ("I have trouble making or keeping friends","FRIENDS",2,0),
getQ("I scream or yell a lot","SCREAM",2,0),
getQ("I am secretive or keep things to myself","SECRETIVE",2,0),
getQ("I see things that other people think aren’t there (describe):","SEETHNGS",2,0),
getQ("I am self-conscious or easily embarrassed","EMBARRASS",2,0),
getQ("I worry about my family","WORRYFAM",2,0),
getQ("I meet my responsibilities to my family","RESPFAM",2,0),
getQ("I show off or clown","SHOWOFF",2,0),
getQ("I am too shy or timid","TIMID",2,0),
getQ("My behavior is irresponsible","IRRESP",2,0),
getQ("I sleep more than most other people during day and/or night (describe):","SLEEP",2,0),
getQ("I have trouble making decisions","DECIDE",2,0),
getQ("I have a speech problem (describe):","SPEECH",2,0),
getQ("I stand up for my rights","STANDUP",2,0),
getQ("My behavior is very changeable","CHNGBEH",2,0),
getQ("I steal","STEAL",2,0),
getQ("I am easily bored","BORED",2,0),
getQ("I do things that other people think are strange (describe):","DOSTRANGE",2,0),
getQ("I have thoughts that other people would think are strange (describe): ","THINKODD",2,0),
getQ("I am stubborn, sullen, or irritable","STUBBORN",2,0),
getQ("My moods or feelings change suddenly","MOODFAST",2,0),
getQ("I enjoy being with people","LIKEOTHS",2,0),
getQ("I rush into things without considering the risks","RUSHINTO",2,0),
getQ("I drink too much alcohol or get drunk","GETDRUNK",2,0),
getQ("I think about killing myself","THNKKILL",2,0),
getQ("I do things that may cause me trouble with the law (describe):","TROUBLAW",2,0),
getQ("I talk too much","TALKTOO",2,0),
getQ("I tease others a lot","TEASEOTH",2,0),
getQ("I have a hot temper","TEMPER",2,0),
getQ("I think about sex too much","THINKSEX",2,0),
getQ("I threaten to hurt people","THREATEN",2,0),
getQ("I like to help others","HELPOTH",2,0),
getQ("I dislike staying in one place for very long","ONEPLACE",2,0),
getQ("I have trouble sleeping (describe):","NOSLEEP",2,0),
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
                items:[instructions,headers,allQ,footnote,btnFinish],
                submitOrder:    getSequentialSubmitOrder(1,126)
            };

NRG.Forms.SelfReport=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}