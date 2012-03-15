/* SCL.js tabsize=4
 *
 * The SCL Form.
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

var qID='qn12';
var radioPaddingLeft=55;
var prefix='Q';
var question_id=0;

var instructions={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions">Below is a list of problems '+
                         'people sometimes have. Read each one carefully and '+
                         'circle the number that best describes <i>how much '+
                         'that problem has distressed or bother you during the'+
                         ' past 7 days including today. Do not skip any items.'+
                         '</p>'
                 };

var headers={
                xtype:'label',
                html:'<div class="scl_headers">'+
                           '<span>Not at all</span>'+
                           '<span>A little bit</span>'+
                           '<span>Moderately</span>'+
                           '<span>Quite a bit</span>'+
                           '<span>Extremely</span>'+
                     '</div>'
            }

var footnote={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions"></p>'
                 };

var allQ=[
    getQ("Headaches","HEADACHE",4,0),
    getQ("Nervousness or shakiness inside","NERVOUS",4,0),
    getQ("Repeated unpleasant thoughts that won’t leave your mind","BADTHGHT",4,0),
    getQ("Faintness or dizziness","DIZZY",4,0),
    getQ("Loss of sexual interest or pleasure","NOSEX",4,0),
    getQ("Feeling critical of others","CRITICAL",4,0),
    getQ("The idea that someone else can control your thoughts","OTHCNTRL",4,0),
    getQ("Feeling others are to blame for most of your troubles","OTHBLAME",4,0),
    getQ("Trouble remembering things","REMEMBER",4,0),
    getQ("Worried about sloppiness or carelessness","SLOPPY",4,0),
    getQ("Feeling easily annoyed or irritated","ANNOYED",4,0),
    getQ("Pains in heart or chest","CHESTPAIN",4,0),
    getQ("Feeling afraid in open spaces or on the streets","FEAROPEN",4,0),
    getQ("Feeling low in energy or slowed down","LOWENERGY",4,0),
    getQ("Thoughts of ending your life","ENDLIFE",4,0),
    getQ("Hearing voices that other people do not hear","HEARSNDS",4,0),
    getQ("Trembling","TREMBLE",4,0),
    getQ("Feeling that most people cannot be trusted","NOTRUST",4,0),
    getQ("Poor appetite","APPETITE",4,0),
    getQ("Crying easily","CRYEASY",4,0),
    getQ("Feeling shy or uneasy with the opposite sex","SHYSEX",4,0),
    getQ("Feelings of being trapped or caught","TRAPPED",4,0),
    getQ("Suddenly scared for no reason","FASTFEAR",4,0),
    getQ("Temper outbursts that you could not control","OUTBURST",4,0),
    getQ("Feeling afraid to go out of your house alone","HOMEALONE",4,0),
    getQ("Blaming yourself for things","BLAME",4,0),
    getQ("Pains in lower back","BACKPAIN",4,0),
    getQ("Feeling blocked in getting things done","BLOCKED",4,0),
    getQ("Feeling lonely","LONELY",4,0),
    getQ("Feeling blue","FEELBLUE",4,0),
    getQ("Worrying too much about things","WORRY",4,0),
    getQ("Feeling no interest in things","NOINTEREST",4,0),
    getQ("Feeling fearful","FEARFUL",4,0),
    getQ("Your feelings being easily hurt","FEELHURT",4,0),
    getQ("Other people being aware of your private thoughts","OTHKNOW",4,0),
    getQ("Feeling others do not understand you or are unsympathetic","DONTKNOW",4,0),
    getQ("Feeling that people are unfriendly or dislike you","NOLIKEME",4,0),
    getQ("Having to do things very slowly to insure correctness","DOSLOWLY",4,0),
    getQ("Heart pounding or racing","HEARTRACE",4,0),
    getQ("Nausea or upset stomach","NAUSEA",4,0),
    getQ("Feeling inferior to others","FEELINF",4,0),
    getQ("Soreness of your muscles","SORENESS",4,0),
    getQ("Feeling that you are watched or talked about by others","WATCHED",4,0),
    getQ("Trouble falling asleep","ASLEEP",4,0),
    getQ("Having to check and double-check what you do","DBLCHECK",4,0),
    getQ("Difficulty making decisions","NODECIDE",4,0),
    getQ("Feeling afraid to travel on buses, subways, or trains","FEARTRANS",4,0),
    getQ("Trouble getting your breath","BREATH",4,0),
    getQ("Hot or cold spells","HOTCOLD",4,0),
    getQ("Having to avoid certain things, places, or activities because they frighten you","AVOIDFEAR",4,0),
    getQ("Your mind going blank","MINDBLANK",4,0),
    getQ("Numbness or tingling in parts of your body","NUMBNESS",4,0),
    getQ("A lump in your throat","LUMP",4,0),
    getQ("Feeling hopeless about the future","HOPELESS",4,0),
    getQ("Trouble concentrating","NOCONCEN",4,0),
    getQ("Feeling weak in parts of your body","FEELWEAK",4,0),
    getQ("Feeling tense or keyed up","TENSE",4,0),
    getQ("Heavy feelings in your arms or legs","HEAVYARM",4,0),
    getQ("Thoughts of death or dying","DEATH",4,0),
    getQ("Overeating","OVEREAT",4,0),
    getQ("Feeling uneasy when people are watching or talking about you","OTHWATCH",4,0),
    getQ("Having thoughts that are not your own","NOTMYOWN",4,0),
    getQ("Having urges to beat, injure, or harm someone","URGEHARM",4,0),
    getQ("Awakening in the early morning","EARLYMORN",4,0),
    getQ("Having to repeat the same actions such as touching, counting,","REPEATACT",4,0),
    getQ("Sleep that is restless or disturbed","SLEEP",4,0),
    getQ("Having urges to break or smash things","URGEBREAK",4,0),
    getQ("Having ideas or beliefs that others do not share","SNGLIDEA",4,0),
    getQ("Feeling very self-conscious with others","SELFCONSC",4,0),
    getQ("Feeling uneasy in crowds, such as shopping or at a movie","CROWDS",4,0),
    getQ("Feeling everything is an effort","ALLEFFORT",4,0),
    getQ("Spells of terror or panic","TERROR",4,0),
    getQ("Feeling uncomfortable about eating or drinking in public","PUBLICEAT",4,0),
    getQ("Getting into frequent arguments","FREQARGUE",4,0),
    getQ("Feeling nervous when you are left alone","LEFTALONE",4,0),
    getQ("Others not giving you proper credit for your achievements","NOCREDIT",4,0),
    getQ("Feeling lonely even when you are with people","ALONEWITH",4,0),
    getQ("Feeling so restless you couldn’t sit still","SITSTILL",4,0),
    getQ("Feelings of worthlessness","WORTHLESS",4,0),
    getQ("The feeling that something bad is going to happen to you","FUTBAD",4,0),
    getQ("Shouting or throwing things","SHOUT",4,0),
    getQ("Feeling afraid you will faint in public","FAINT",4,0),
    getQ("Feeling that people will take advantage of you if you let them","ADVANTAGE",4,0),
    getQ("Having thoughts about sex that bother you a lot","BOTHERSEX",4,0),
    getQ("The idea that you should be punished for your sins","PUNISHSIN",4,0),
    getQ("Thoughts and images of a frightening nature","IMGFEAR",4,0),
    getQ("The idea that something serious is wrong with your body","WRNGBODY",4,0),
    getQ("Never feeling close to another person","NOTCLOSE",4,0),
    getQ("Feelings of guilt","GUILT",4,0),
    getQ("The idea that something is wrong with your mind","WRNGMIND",4,0),
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
                title:'SCL',
                schema:'SCL/1.0',
                lastForm:true,
                keys:   {
                            //Digits [0-4]
                            key:[
                                    //Horizontal line
                                    48,49,50,51,52,
                                    //Numpad
                                    96,97,98,99,100,
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
                submitOrder: [
                    "HEADACHE",
                    "NERVOUS",
                    "BADTHGHT",
                    "DIZZY",
                    "NOSEX",
                    "CRITICAL",
                    "OTHCNTRL",
                    "OTHBLAME",
                    "REMEMBER",
                    "SLOPPY",
                    "ANNOYED",
                    "CHESTPAIN",
                    "FEAROPEN",
                    "LOWENERGY",
                    "ENDLIFE",
                    "HEARSNDS",
                    "TREMBLE",
                    "NOTRUST",
                    "APPETITE",
                    "CRYEASY",
                    "SHYSEX",
                    "TRAPPED",
                    "FASTFEAR",
                    "OUTBURST",
                    "HOMEALONE",
                    "BLAME",
                    "BACKPAIN",
                    "BLOCKED",
                    "LONELY",
                    "FEELBLUE",
                    "WORRY",
                    "NOINTEREST",
                    "FEARFUL",
                    "FEELHURT",
                    "OTHKNOW",
                    "DONTKNOW",
                    "NOLIKEME",
                    "DOSLOWLY",
                    "HEARTRACE",
                    "NAUSEA",
                    "FEELINF",
                    "SORENESS",
                    "WATCHED",
                    "ASLEEP",
                    "DBLCHECK",
                    "NODECIDE",
                    "FEARTRANS",
                    "BREATH",
                    "HOTCOLD",
                    "AVOIDFEAR",
                    "MINDBLANK",
                    "NUMBNESS",
                    "LUMP",
                    "HOPELESS",
                    "NOCONCEN",
                    "FEELWEAK",
                    "TENSE",
                    "HEAVYARM",
                    "DEATH",
                    "OVEREAT",
                    "OTHWATCH",
                    "NOTMYOWN",
                    "URGEHARM",
                    "EARLYMORN",
                    "REPEATACT",
                    "SLEEP",
                    "URGEBREAK",
                    "SNGLIDEA",
                    "SELFCONSC",
                    "CROWDS",
                    "ALLEFFORT",
                    "TERROR",
                    "PUBLICEAT",
                    "FREQARGUE",
                    "LEFTALONE",
                    "NOCREDIT",
                    "ALONEWITH",
                    "SITSTILL",
                    "WORTHLESS",
                    "FUTBAD",
                    "SHOUT",
                    "FAINT",
                    "ADVANTAGE",
                    "BOTHERSEX",
                    "PUNISHSIN",
                    "IMGFEAR",
                    "WRNGBODY",
                    "NOTCLOSE",
                    "GUILT",
                    "WRNGMIND",
                ]
            };

NRG.Forms.SCL=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}