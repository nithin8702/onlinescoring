/* Behavior.js tabsize=4
 *
 * The Behavior Form.
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

var qID='qn11';
var radioPaddingLeft=55;
var prefix='Q';
var question_id=0;

var instructions={
                    xtype:'label',
                    cls:'instructions',
                    html:'<p class="instructions">During the past month, how '+
                         'often has each of the following behaviors been a '+
                         '<i>problem</i>?</p>'
                 };

var headers={
                xtype:'label',
                html:'<div class="beh_headers">'+
                           '<span>Never</span>'+
                           '<span>Sometimes</span>'+
                           '<span>Often</span>'+
                     '</div>'
            }

var footnote={
                xtype:'label',
                cls:'instructions',
                html:'<p class="instructions"></p>'
             };
                 
var allQ=[
    getQ("I have angry outbursts","ANGBURST",3,1),
    getQ("I make careless errors when completing tasks","ERRORS",3),
    getQ("I am disorganized","DISORG",3),
    getQ("I have trouble concentrating on tasks (such as chores, reading, or work)","NOCONCEN",3),
    getQ("I tap my fingers or bounce my legs","TAPFING",3),
    getQ("I need to be reminded to begin a task even when I am willing","REMIND",3),
    getQ("I have a messy closet","CLOSET",3),
    getQ("I have trouble changing from one activity or task to another","CHNGACT",3),
    getQ("I get overwhelmed by large tasks","BIGTASKS",3),
    getQ("I forget my name","FRGTNAME",3),
    getQ("I have trouble with jobs or tasks that have more than one step","MULTISTEP",3),
    getQ("I overreact emotionally","OVERREACT",3),
    getQ("I don't notice when I cause others to feel bad or get mad until it is too late","NONOTICE",3),
    getQ("I have trouble getting ready for the day","GETREADY",3),
    getQ("I have trouble prioritizing activities","PRIORITY",3),
    getQ("I have trouble sitting still","SITSTILL",3),
    getQ("I forget what I am doing in the middle of things","MIDTASK",3),
    getQ("I don't check my work for mistakes","DBLCHECK",3),
    getQ("I have emotional outbursts for little reason","EMOBURST",3),
    getQ("I lie around the house a lot","LIEHOUSE",3),
    getQ("I start tasks (such as cooking, projects) without the right materials","NOPREP",3),
    getQ("I have trouble accepting different ways to solve problems with work, friends, or tasks","DIFFWAY",3),
    getQ("I talk at the wrong time","TALKTIME",3),
    getQ("I misjudge how difficult or easy tasks will be","MISJUDGE",3),
    getQ("I have problems getting started on my own","NOSTART",3),
    getQ("I have trouble staying on the same topic when talking","SAMETALK",3),
    getQ("I get tired","TIRED",3),
    getQ("I react more emotionally to situations than my friends","MOREEMO",3),
    getQ("I have problems waiting my turn","WAITTURN",3),
    getQ("People say that I am disorganized","OTHDISORG",3),
    getQ("I lose things (such as keys, money, wallet, homework, etc.)","LOSETHING",3),
    getQ("I have trouble thinking of a different way to solve a problem when stuck","DIFFPROB",3),
    getQ("I overreact to small problems","SMALLPROB",3),
    getQ("I don't plan ahead for future activities","FUTPLAN",3),
    getQ("I have a short attention span","ATTNSPAN",3),
    getQ("I make inappropriate sexual comments","SEXCMMT",3),
    getQ("When people seem upset with me, I don't understand why","OTHUPSET",3),
    getQ("I have trouble counting to three","THREE",3),
    getQ("I have unrealistic goals","GOALS",3),
    getQ("I leave the bathroom a mess","BATHMESS",3),
    getQ("I make careless mistakes","CARELESS",3),
    getQ("I get emotionally upset easily","EASYUPSET",3),
    getQ("I make decisions that get me into trouble (legally, financially, socially)","BADDCNS",3),
    getQ("I am bothered by having to deal with changes","DEALCHNG",3),
    getQ("I have difficulty getting excited about things","NOEXCITE",3),
    getQ("I forget instructions easily","FRGTINSTRCT",3),
    getQ("I have good ideas but cannot get them on paper","ONPAPER",3),
    getQ("I make mistakes","MISTAKE",3),
    getQ("I have trouble getting started on tasks","HARDSTART",3),
    getQ("I say things without thinking","SAYTHINK",3),
    getQ("My anger is intense but ends quickly","FASTANGER",3),
    getQ("I have trouble finishing tasks (such as chores, work)","NOFINISH",3),
    getQ("I start things last minute (such as assignments, chores, tasks)","LASTMIN",3),
    getQ("I have difficulty finishing a task on my own","OWNFINISH",3),
    getQ("People say that I am easily distracted","DISTRACT",3),
    getQ("I have trouble remembering things, even for a few minutes (such as directions, phone numbers)","NOREMEM",3),
    getQ("People say that I am too emotional","TOOEMO",3),
    getQ("I rush through things","RUSHTHRU",3),
    getQ("I get annoyed","ANNOYED",3),
    getQ("I leave my room or home a mess","HOMEMESS",3),
    getQ("I get disturbed by unexpected changes in my daily routine","UNEXCHNG",3),
    getQ("I have trouble coming up with ideas for what to do with my free time","FREETIME",3),
    getQ("I don't plan ahead for tasks","DONTPLAN",3),
    getQ("People say that I don't think before acting","THINKACT",3),
    getQ("I have trouble finding things in my room, closet, or desk","CANTFIND",3),
    getQ("I have problems organizing activities","ORGANIZE",3),
    getQ("After having a problem, I don't get over it easily","GETOVER",3),
    getQ("I have trouble doing more than one thing at a time","ONETHING",3),
    getQ("My mood changes frequently","MOODCHNG",3),
    getQ("I don't think about consequences before doing something","CONSEQ",3),
    getQ("I have trouble organizing work","ORGWORK",3),
    getQ("I get upset quickly or easily over little things","UPSETSML",3),
    getQ("I am impulsive","IMPULSIVE",3),
    getQ("I don't pick up after myself","PICKUP",3),
    getQ("I have problems completing my work","COMPLETE",3),

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
                title:'Behavior',
                schema:'BRIEF/1.0',
                lastForm:false,
                keys:   {
                            //Digits [1-3]
                            key:[
                                    //Horizontal line
                                    49,50,51,
                                    //Numpad
                                    97,98,99,
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
                submitOrder: [
                                "ANGBURST",
                                "ERRORS",
                                "DISORG",
                                "NOCONCEN",
                                "TAPFING",
                                "REMIND",
                                "CLOSET",
                                "CHNGACT",
                                "BIGTASKS",
                                "FRGTNAME",
                                "MULTISTEP",
                                "OVERREACT",
                                "NONOTICE",
                                "GETREADY",
                                "PRIORITY",
                                "SITSTILL",
                                "MIDTASK",
                                "DBLCHECK",
                                "EMOBURST",
                                "LIEHOUSE",
                                "NOPREP",
                                "DIFFWAY",
                                "TALKTIME",
                                "MISJUDGE",
                                "NOSTART",
                                "SAMETALK",
                                "TIRED",
                                "MOREEMO",
                                "WAITTURN",
                                "OTHDISORG",
                                "LOSETHING",
                                "DIFFPROB",
                                "SMALLPROB",
                                "FUTPLAN",
                                "ATTNSPAN",
                                "SEXCMMT",
                                "OTHUPSET",
                                "THREE",
                                "GOALS",
                                "BATHMESS",
                                "CARELESS",
                                "EASYUPSET",
                                "BADDCNS",
                                "DEALCHNG",
                                "NOEXCITE",
                                "FRGTINSTRCT",
                                "ONPAPER",
                                "MISTAKE",
                                "HARDSTART",
                                "SAYTHINK",
                                "FASTANGER",
                                "NOFINISH",
                                "LASTMIN",
                                "OWNFINISH",
                                "DISTRACT",
                                "NOREMEM",
                                "TOOEMO",
                                "RUSHTHRU",
                                "ANNOYED",
                                "HOMEMESS",
                                "UNEXCHNG",
                                "FREETIME",
                                "DONTPLAN",
                                "THINKACT",
                                "CANTFIND",
                                "ORGANIZE",
                                "GETOVER",
                                "ONETHING",
                                "MOODCHNG",
                                "CONSEQ",
                                "ORGWORK",
                                "UPSETSML",
                                "IMPULSIVE",
                                "PICKUP",
                                "COMPLETE"
                ]
            };

NRG.Forms.Behavior=form;

//A simple function to return a string of the form: qID:id
//this makes the JSON code above a little prettier
function q(id)
{
    return qID+':'+id;
}