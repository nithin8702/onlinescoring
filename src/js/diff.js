/* diff.js tabsize=4
 *
 * Defines the Diff View tab, subjects grid, data grid and related actions.
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

Ext.ns('NRG.OnlineScoring');
Ext.ns('NRG.OnlineScoring.Cache');
NRG.OnlineScoring.Cache.SubjectData=Array();

//Make sure the paging toolbar loads the data from the server when the Refresh
//button is clicked
Ext.override(Ext.PagingToolbar, {
    doRefresh: function(){
        delete this.store.lastParams;
        //empty the cache (if new entries come in, onClick will load data from
        //the cache. This is a quick way of making sure new data gets always
        //fetched from the server)
        NRG.OnlineScoring.Cache.SubjectData=Array();
        if (this.ownerCt.loadMask)
            this.ownerCt.loadMask.enable();
        this.doLoad(this.cursor);
    }
});

/* Right click menus */
//Context menu for <cell> columns right click
var cxmenuDiffCellCol=new Ext.menu.Menu({
    id:'cxmenuDiffCellCol',
    shadow:false,
    items:  [
                {
                    id:'menuitemCopyOneCell',
                    text:'Copy <span id="cellValueToCopy">this</span> to <b>Final</b>',
                    icon:'images/icons/copyCell.png',
                    handler:onCopyOneCellToFinal,
                    //Custom config property, used to hold the record of the cell to be copied
                    //when this menu item is selected
                    cellRecord:'',
                    cellField:''
                },
                '-',
                {
                    id:'menuitemCopySelected',
                    text:'Copy selection to <b>Final</b>',
                    icon:'images/icons/copyAll2Final.png',
                    handler:onCopySelectedToFinal,
                    disabled:true
                },
                {
                    text:'Copy column to <b>Final</b>',
                    icon:'images/icons/copySelected.png',
                    handler:onCopyCellsToFinal
                }
            ]
})

Ext.override(Date.prototype,{
    getShortMonthName: function(month)
    {
        console.log('Getting short month name for: ', month);
        return 'Aug';
    }
})

var storeSubjects=new Ext.ux.data.PagingJsonStore({
    id:'storeSubjects',
    autoLoad:false,
    autoDestroy:true,
    storeId:'storeSubjects',
    url:'ajax/subjects.php',
    root:'subjects',
    totalProperty:'total',
    idProperty:'subjectLabel',
    sortInfo:   {
                    field:'dateUpdated',
                    direction:'DESC'
                },
    fields: [
                'subjectLabel',
                {name:'countEntries', type:'int'},
                {name:'dateUpdated',  type:'string'},
                {name:'locked',       type:'int'},
                {name:'diff',         type:'int'}
            ],
    listeners:  {
                    load:onSubjectsLoaded
                }
 });

//A simple paging grid that displays all subjects in a paged view
NRG.OnlineScoring.GridSubjects=new Ext.grid.GridPanel({
                        id:'gridSubjects',
                        xtype:'grid',
                        store:storeSubjects,
                        stripeRows:true,
                        loadMask:true,
                        columns:[
                                    new Ext.ux.grid.PagingRowNumberer({
                                        width:32
                                    }),
                                    {
                                        header:'',
                                        dataIndex:'locked',
                                        width:18,
                                        sortable:true,
                                        renderer:renderSubjectLock
                                    },
                                    {
                                        header:'Subject',
                                        dataIndex:'subjectLabel',
                                        width:75,
                                        sortable:true,
                                        renderer:renderSubjectLabel
                                    },
                                    {
                                        header:'#',
                                        dataIndex:'countEntries',
                                        width:25,
                                        sortable:true
                                    },
                                    {
                                        header:'Last entry on',
                                        //xtype:'datecolumn',
                                        //format:'M d, Y g:ia',
                                        dataIndex:'dateUpdated',
                                        sortable:true,
                                        width:115
                                    }
                                ],
                        tbar: new Ext.PagingToolbar({
                                    pageSize: 20,
                                    store: storeSubjects,
                                    displayInfo: false,
                                    listeners:  {
                                                    change:onSubjectsPageChanged
                                                }
                                }),
                        bbar: {
                                    xtype:'toolbar',
                                    items:  [
                                                {
                                                    id:'subjectPageProgressBar',
                                                    xtype:'progress',
                                                    value:0.5,
                                                    text:'Loading ...',
                                                    width:280
                                                }
                                            ]

                              },
                        sm:new Ext.grid.RowSelectionModel({
                                                            singleSelect:true,
                                                            listeners:  {
                                                                            beforerowselect:onBeforeSubjectSelected
                                                                        }
                                                          }),
                        listeners:  {
                                        rowclick:onSubjectSelected,
                                        viewready:onSubjectsViewReady
                                    }
                    });

var tbarDiffGrid=   {
                        xtype:'toolbar',
                        items:  [
                                    {
                                        id:'btnSaveAndLock',
                                        text:'Save & Lock',
                                        icon:'images/icons/save.png',
                                        handler:onSaveAndLock
                                    },
                                    '-',
                                    {
                                        id:'btnChanges',
                                        text:'Changes',
                                        icon:'images/icons/diff.png',
                                        menu:   {
                                                    xtype:'menu',
                                                    plain:true,
                                                    items:  [
                                                                {
                                                                    id:'btnSaveDiff',
                                                                    text:'Remember',
                                                                    icon:'images/icons/save_all.png',
                                                                    handler:onSaveDiff
                                                                },
                                                                '-',
                                                                {
                                                                    id:'btnCancelDiff',
                                                                    text:'Forget All',
                                                                    icon:'images/icons/reset.png',
                                                                    handler:onCancelDiff
                                                                },
                                                                {
                                                                    id:'btnCancelSelectedDiff',
                                                                    text:'Forget Selected',
                                                                    icon:'images/icons/removeSelected.png',
                                                                    handler:onCancelSelectedDiff
                                                                }
                                                            ]
                                                }
                                    }
                                ]
                    };

//The grid on the right of the page that displays the information
NRG.OnlineScoring.GridDiff=new Ext.grid.EditorGridPanel({
                                id:'gridDiff',
                                xtype:'editorgrid',
                                title:'PG43VH',
                                iconCls:'',
                                headerAsText:true,
                                stripeRows:true,
                                border:true,
                                hidden:true,
                                collapsible:true,
                                loadMask:true,
                                colModel:new Ext.grid.ColumnModel({
                                            columns:[]
                                        }),
                                store:new Ext.data.ArrayStore(),
                                tbar: tbarDiffGrid,
                                listeners:  {
                                                beforeedit:  onGridDiffBeforeEdit,
                                                reconfigure: onGridDiffReconfigured,
                                                celldblclick: onCellDoubleClicked,
                                                cellcontextmenu: onCellContextMenu
                                            },
                                sm:new Ext.grid.RowSelectionModel()
                            });

var ui= {
            xtype:'panel',
            frame:true,
            layout:'border',
            items:  [
                        {
                            region:'center',
                            bodyStyle:'background-color:white',
                            layout:'fit',
                            border:true,
                            items:  [
                                        NRG.OnlineScoring.GridDiff
                                    ]
                        },
                        {
                            region:"west",
                            id:'panelSubjects',
                            title:'Subjects',
                            iconCls:'x-icon-subjects',
                            layout:'fit',
                            margin: '0 2 2 2',
                            cmargins: '2 2 2 2',
                            collapsible:true,
                            split:true,
                            minSize:285,
                            width:285,
                            items:  [
                                        NRG.OnlineScoring.GridSubjects
                                    ]
                        }
                    ]
        }

NRG.OnlineScoring.DiffView=ui;

function onSubjectsPageChanged(toolbar, data)
{
    if (typeof(toolbar.ownerCt.loadMask)=="object")
        toolbar.ownerCt.loadMask.disable();

     //subjects per page
    var spp=toolbar.pageSize;
    var start=spp*(data.activePage-1) + 1;
    var end=spp*data.activePage;

    if (end>data.total)
        end=data.total;

    var pb=Ext.getCmp('subjectPageProgressBar');
    if (!pb)
        return;

    if (data.total==0)
        pb.updateProgress(0,'No subjects to display');
    else
        pb.updateProgress(end/data.total,'Displaying subjects '+start+' - '+end+' of '+data.total,true);
}


function onSubjectSelected(grid, index, e)
{
    grid.nextSelection=null;
    var record=grid.getStore().getAt(index);
    var s=record.get('subjectLabel');

    getSubjectData(s);
}

function getSubjectData(subjectLabel)
{
    var grid=NRG.OnlineScoring.GridDiff;
    if (!grid.isVisible())
        grid.show();
    grid.setTitle(subjectLabel,'');
    grid.subject=subjectLabel;

    //Disable the Save button
    Ext.getCmp('btnChanges').disable();


    //Show the loadmask
    if (typeof(grid.loadMask)=="object")
        grid.loadMask.show();

    //Cache hit?
    if (NRG.OnlineScoring.Cache.SubjectData[subjectLabel])
    {
        loadSubjectData(NRG.OnlineScoring.Cache.SubjectData[subjectLabel]);
    }
    else
    {
        //On cache miss, make an ajax request
        Ext.Ajax.request({
            url:'ajax/subjectdata.php',
            method:'GET',
            params: {
                        label:subjectLabel
                    },
            success: onGetSubjectData,
            failure: onGetSubjectDataFailed
        });
    }
}

//@Callback function for the get subject data ajax request
function onGetSubjectData(response, request)
{
    var xmldata=response.responseXML;
    var subject=xmldata.documentElement.getAttribute('subject');

    console.log("Caching "+subject+"'s data.");
    NRG.OnlineScoring.Cache.SubjectData[subject]=xmldata;

    //Load the data into the grid's store
    loadSubjectData(xmldata); 
}

//Loads the subject data into the store
function loadSubjectData(xmldata)
{
    //Get columns
    var headers=xmldata.getElementsByTagName('columns')[0];

    //Get rows
    var rows=xmldata.getElementsByTagName('row');
    //No rows, no data
    if (!rows.length)
        return;
    //Take a row to parse
    var row=rows[0];

    //Get a list of cells
    var cells=row.getElementsByTagName('cell');

    var store=generateSubjectDataStore(cells);
    var columns=generateSubjectDataColumns(cells, headers);

    //Decode all strings inside the Store and then reconfigure the grid
    store.loadData(xmldata);
    NRG.OnlineScoring.GridDiff.locked=xmldata.documentElement.getAttribute('locked');
    NRG.OnlineScoring.GridDiff.reconfigure(store, columns);
}

function onGetSubjectDataFailed(req)
{
    var grid=NRG.OnlineScoring.GridDiff;
    grid.hide();
    NRG.OnlineScoring.GridDiff.LoadMask.hide();

    Ext.Msg.alert('We were unable to connect to the server. Please try again later.');
}

function generateSubjectDataColumns(cells, headers)
{
    var columns=[
                    new Ext.grid.RowNumberer({
                                                width:25
                                             }),
//                    {
//                        id:'fieldDiff',
//                        header:'Diff',
//                        dataIndex:'diff',
//                        width:20
//                    },
                    {
                        id:'fieldName',
                        header:'<span class="diff-col-header-label">Data_Label</span>',
                        dataIndex:'field',
                        width:150,
                        renderer: renderFieldName
                    },
                    {
                        id:'fieldValue',
                        header:'<span class="diff-col-header-final">Final</span>',
                        dataIndex:'final',
                        editor:new Ext.form.TextField({
                                    allowBlank:false
                                }),
                        renderer: renderFinalColumn
                    }
                ];

    //Create all other columns
    for (var i=0;i<cells.length;++i)
    {
        var owner=headers.childNodes[i].getAttribute('owner');
        var datetime=headers.childNodes[i].getAttribute('date').split(' ',1);
        //Workaround for firefox. Chrome can instanciate a Date obj directly from
        //datetime[0]
        var datesplit=datetime[0].split('-',3);
        var dateobj=new Date(datesplit[0],datesplit[1]-1,datesplit[2]);
        
        var col=    {
                        id:'column'+i,
                        header:'<span class="diff-col-header-owner">'+owner.split('@',1)+'</span>'+
                               '<span class="diff-col-header-date">on '+dateobj.format('M d, Y')+'</span>',
                        dataIndex:'cell'+i,
                        width:175
                    };
        columns.push(col);
    }

    var model=new Ext.grid.ColumnModel({
        defaults:   {
                        sortable:true
                    },
        columns:columns
    })

    return model;
}

function generateSubjectDataStore(cells)
{
    //The first column should contain the name of the field
    var fields= [
                    {
                        name:'diff',
                        mapping:'@diff',
                        type:'int'
                    },
                    {
                        name:'field',
                        mapping:'@field'
                    },
                    {
                        name:'final',
                        mapping:'final'
                    }
                ]

    //The rest of the columns are generated
    for (var i=0;i<cells.length;++i)
    {
        var field=  {
                        name:'cell'+i,
                        mapping:'cell[formID='+cells[i].getAttribute('formID')+']'
                    }
        fields.push(field);
    }

    var store=new Ext.data.XmlStore({
        autoDestroy:true,
        storeId:'storeDiff',
        record:'rows/row',
        idPath:'@field',
        fields:fields,
        listeners:  {
                        load:onDiffStoreLoaded,
                        update:onDiffValuesUpdated
                    }
    });

    return store;
}

function renderSubjectLabel(value,metadata,record,rowIndex,colIndex,store)
{
    var cssClass='';

    if (parseInt(record.get('locked'))==0)
    {
        switch (parseInt(record.get('diff')))
        {
            case -1:if (rowIndex%2==1)
                        cssClass+='row-diff-odd';
                    else
                        cssClass+='row-diff-even';
                    break;
            case 2:if (rowIndex%2==1)
                        cssClass+='row-diff-empty-odd';
                    else
                        cssClass+='row-diff-empty-even'
                    break;
            case 0:if (rowIndex%2==1)
                        cssClass+='row-subject-unchecked-odd';
                    else
                        cssClass+='row-subject-unchecked-even';
                    break;
            case 1:if (rowIndex%2==1)
                        cssClass+='row-subject-ok-odd';
                    else
                        cssClass+='row-subject-ok-even';
                    break;
        }
    }

    metadata.css=cssClass;

    return value;
}

function renderSubjectLock(value,metadata,record,rowIndex,colIndex,store)
{
    if (value==1)
        metadata.css='row-subject-locked';
    else
        metadata.css='row-subject-unlocked';
    return "";
}

function renderFieldName(value, metadata, record, rowIndex, colIndex, store)
{
    var cssClass='row-diff ';

    switch (parseInt(record.get('diff')))
    {
        case 1:if (rowIndex%2==1)
                    cssClass+='row-diff-odd';
                else
                    cssClass+='row-diff-even';
                break;
        case 2:if (rowIndex%2==1)
                    cssClass+='row-diff-empty-odd';
                else
                    cssClass+='row-diff-empty-even'
                break;
    }

    metadata.css=cssClass;

    return value;
}

function renderFinalColumn(value, metadata, record, rowIndex, colIndex, store)
{
    metadata.css='row-final';
    return value;
}

function onSubjectsViewReady(grid)
{
    // grid.loadMask.show();
    grid.getStore().load({
                            params: {
                                        start:0,
                                        limit:20
                                    }
                         });

    ajaxShowWait(false);
}

function onGridDiffBeforeEdit(params)
{
    if (params.grid.locked==true)
        return false;

    return true;
}

function onGridDiffReconfigured(grid, store, colmodel)
{
    //Hide the loadmask
    if (typeof(grid.loadMask)=="object")
        grid.loadMask.hide();

    if (grid.locked==true)
    {
        Ext.getCmp('btnChanges').disable();
        Ext.getCmp('btnSaveAndLock').disable();
    }
    else
    {
        Ext.getCmp('btnSaveAndLock').enable();
    }

    gridDiffUpdateTitle(grid);
}

/* Creates an XML representation of the labels and final values in a diff grid */
function getFinalDiffXML(grid)
{
    var store=grid.getStore();

    var recordCount=store.getCount();

    var xml="<data>";

    for (var i=0;i<recordCount;++i)
    {
        var record=store.getAt(i);
        var field=record.get('field');
        xml+='<'+field+'>'+encodeURIComponent(record.get('final'))+'</'+field+">\n";
    }

    xml+="</data>";

    return xml;
}

/* Saves the XML diff data on the server, optionally locking it */
function onSaveDiff(button, event, lock)
{
    Ext.getCmp('btnChanges').disable();
    var grid=NRG.OnlineScoring.GridDiff;
    var xml=getFinalDiffXML(grid);

    if (!defined(lock))
        lock=0;
    else
        lock=1;

    //Show loadmask
    if (typeof(grid.loadMask))
        grid.loadMask.show();

    //Save the data to the server
    Ext.Ajax.request({
        url:'ajax/savefinalform.php',
        method:'POST',
        params: {
                    label:grid.subject,
                    data:xml,
                    lock:lock
                },

        success:onSaveDiffSuccess,
        failure:onSaveDiffFailed
    })
}

/* Saves the final data *permanently* on the server and locks this subject.
 * This function is essentially a wrapper for onSaveDiff
 */
function onSaveAndLock(button, event)
{
    var store=NRG.OnlineScoring.GridDiff.getStore();
    var countRecords=store.getTotalCount();
    var foundEmpty=false;
    var subject=NRG.OnlineScoring.GridDiff.subject;

    //Iterate over each record and check whether its Final value is empty
    for (var i=0;i<countRecords;++i)
    {
        var record=store.getAt(i);
        if (!record.get('final').toString().length)
        {
            foundEmpty=true;
            break;
        }
    }

    //Display a warning dialog in case empty Final cells are found
    if (foundEmpty)
        Ext.Msg.show({
            title:'Sanity Check',
            msg:'It seems there are empty cells in the <b>Final</b> column.<br>'+
                'Are you sure you want to <u>lock</u> '+subject+"'s data?",
            icon:Ext.Msg.WARNING,
            buttons:Ext.Msg.YESNOCANCEL,
            fn:onSaveAndLockWarning
        });
    else
        onSaveDiff(null,null,true);
}

function onSaveAndLockWarning(answer, options)
{
    if (answer=="yes")
        onSaveDiff(null,null,true);
}

/* @callback */
function onSaveDiffSuccess(response, options)
{
    var result=Ext.decode(response.responseText);
    var grid=NRG.OnlineScoring.GridDiff;

    if (typeof(grid.loadMask)=="object")
        grid.loadMask.hide();

    if (result.success==1)
    {
        grid.edited=false;
        grid.getStore().commitChanges();
        //Remove the cached entry. This will force the app to refresh this subejct's
        //data the next time the user clicks on it
        NRG.OnlineScoring.Cache.SubjectData[result.subject]=null;

        //Lock the subject
        if (defined(options.params.lock) && (options.params.lock==1))
        {
            grid.locked=true;
            gridDiffUpdateTitle(grid);

            markSubjectAsLocked(result.subject);
        }

        var gridSubjects=NRG.OnlineScoring.GridSubjects;
        //Did the user save this while trying to view another subject?
        if (gridSubjects.nextSelection)
            focusNextSubject();
    }
    else
        Ext.Msg.show({
            title:'Oops!',
            msg:result.message,
            icon:Ext.Msg.ERROR,
            buttons:Ext.Msg.OK
        })
}

function onSaveDiffFailed(response, options)
{
    var grid=NRG.OnlineScoring.GridDiff;

    //Enable the Save button
    Ext.getCmp('btnChanges').disable();

    if (typeof(grid.loadMask)=="object")
        grid.loadMask.hide();

    Ext.Msg.show({
        title:'Oops!',
        msg:'We were unable to contact the server. Please try again later.',
        icon:Ext.Msg.ERROR,
        buttons:Ext.Msg.OK
    });
}

function onBeforeSubjectSelected(selmodel,rowIndex,keepExisting,record)
{
    var diffgrid=NRG.OnlineScoring.GridDiff;
    NRG.OnlineScoring.GridSubjects.nextSelection=record;

    if (diffgrid.edited==true)
    {
        Ext.Msg.show({
                        title:'Save?',
                        msg:'Do you want to save your changes to subject '+diffgrid.subject+'?',
                        buttons:Ext.Msg.YESNOCANCEL,
                        icon:Ext.Msg.QUESTION,
                        fn:onSaveDiffQAnswer
                    });
        return false;
    }

    return true;
}

function onSaveDiffQAnswer(button, text, config)
{
    //If the user chose to save his changes, simulate a click on the Save button
    if (button=="yes")
    {
        onSaveDiff(Ext.getCmp('btnSaveDiff'));
    }
    else
        if (button=="no")
            focusNextSubject();
        else
        {
            NRG.OnlineScoring.GridSubjects.nextSelection=null;
        }
}

function focusNextSubject()
{
        //Mark the grid as not edited
        var gridDiff=NRG.OnlineScoring.GridDiff;
        gridDiff.edited=false;
        //Otherwise, force a new selection
        var gridSubjects=NRG.OnlineScoring.GridSubjects;
        var subject=gridSubjects.nextSelection.get('subjectLabel');

        //Highlight the next subject row
        gridSubjects.getSelectionModel().selectRecords(Array(gridSubjects.nextSelection));
        gridSubjects.nextSelection=null;
        //Request data for the next subject
        getSubjectData(subject);

}

//URLDecode all final records
function onDiffStoreLoaded(store, records, options)
{
    for (var i=0;i<records.length;++i)
    {
        var record=records[i];
        var fieldCount=record.fields.getCount();
        var initialValue="";
        var match=true;
        //Determines whether to pre-populate the final column by comparing all other <cell> columns
        //If a value already exists in the 'final' column, then do not pre-populate.
        var compare=!record.data['final'].length;

        //Set compare to false if the DiffGrid is locked
        if (NRG.OnlineScoring.GridDiff.locked==true)
            compare=false;

        //Decode all fields and see whether all <cell> values are the same
        for (var j=0;j<fieldCount;++j)
        {
            var field=record.fields.item(j).name;
            //Decode
            record.data[field]=decodeURIComponent(record.data[field]);

            if (!compare)
                continue;
            
            var cellColumn=field.indexOf('cell');
            //Don't perform comparisons for non-<cell> columns
            if ((cellColumn<0) || (!record.data[field].toString().length))
                continue;

            //Store the value of the first encountered non-empty <cell> column into initialValue
            if (!initialValue.toString().length)
                initialValue=record.data[field];
            else
            {
                //Compare values (case insensitive)
                if (record.data[field].toString().toLowerCase()!=initialValue.toString().toLowerCase())
                    match=false;
            }
        }

        //If all <cell> columns have the same value, store it in the final column
        if (compare && match && initialValue.toString().length)
            record.set('final',initialValue);
    }
}

function onDiffValuesUpdated(store, record, operation)
{
    //Update diff column so that the cells in the Data_Label column are properly
    //highlighted, but only in case the initial value was not 0
    var diff=diffRecord(record);
    record.set('diff',diff);

    //If the grid was edited, enable save/cancel buttons and update the title
    if (operation==Ext.data.Record.EDIT)
    {
        //Enable save and cancel buttons
        Ext.getCmp('btnChanges').enable();
        
        var grid=NRG.OnlineScoring.GridDiff;
        grid.edited=true;
        //grid.setTitle('* '+grid.subject+);
        gridDiffUpdateTitle(grid);
    }
    else if (operation==Ext.data.Record.REJECT)
    {
        if (diff>0)
            gridDiffUpdateTitle(NRG.OnlineScoring.GridDiff);
    }
}

function onCancelDiff(button)
{
    var grid=NRG.OnlineScoring.GridDiff;

    grid.edited=false;
    grid.getStore().rejectChanges();
    grid.setTitle(grid.subject,'');
    Ext.getCmp('btnChanges').disable();
    gridDiffUpdateTitle(grid);
}

function onCancelSelectedDiff(button)
{
    var grid=NRG.OnlineScoring.GridDiff;

    //No selections? return.
    if (!grid.getSelectionModel().hasSelection())
        return;

    var selected=grid.getSelectionModel().getSelections();
    var countSelected=selected.length;

    for (var i=0;i<countSelected;++i)
        selected[i].reject();

    //No more modified records left?
    if (!grid.getStore().getModifiedRecords().length)
    {
        Ext.getCmp('btnChanges').disable();
        grid.edited=false;
    }
}

function getFieldNameAt(columnIndex,grid)
{
    return grid.getColumnModel().getDataIndex(columnIndex);
}

function getCellValueAt(rowIndex,field,grid)
{
    //Find the record that contains the actual data
    var record=grid.getStore().getAt(rowIndex);
    //Retrieve the value at that cell
    var value=record.get(field);

    return value;
}

function onCellDoubleClicked(grid, rowIndex, columnIndex, event)
{
    if (grid.locked==1)
        return;
    //Since columns can be moved around, the columnIndex variable is used
    //to find the name of the data field the cell's column maps to.
    var field=getFieldNameAt(columnIndex,grid);

    //Skip cells that came from elements other than <cell>
    //in their case, the name of the data field starts with 'cell'
    if (!field.match(/^cell/))
        return;

    //Find the record that contains the actual data
    var record=grid.getStore().getAt(rowIndex);
    //Retrieve the value at that cell
    var value=record.get(field);

    //Replace the Final value with the value in the double-clicked cell
    record.set('final',value);
}

function onCellContextMenu(grid, rowIndex, columnIndex, event)
{
    //Do nothing if the grid is locked
    if (grid.locked==true)
        return;

    var field=getFieldNameAt(columnIndex,grid);
    var value=getCellValueAt(rowIndex,field,grid);
    var record=grid.getStore().getAt(rowIndex);

    //Context menu clears final value
    if (field=='final')
    {
        if (record.isModified('final'))
            record.reject();
        else
            record.set('final','');

        gridDiffUpdateTitle(NRG.OnlineScoring.GridDiff);
    }
    
    if (field=='field')
        return;
    
    if (field.match(/^cell/))
    {
        //Update custom config property
        var menu=Ext.getCmp('cxmenuDiffCellCol');
        menu.cellRecord=record;
        menu.cellField=field;

        if (!value.length)
            value='(empty)';
        else
        //Make sure the display length of the value is reasonable
        if (value.length>15)
            value=value.substring(0,15)+'...';

        //Enable 'Copy selection to Final' if there's something selected in the grid
        if (grid.getSelectionModel().hasSelection())
            Ext.getCmp('menuitemCopySelected').enable();
        else
            Ext.getCmp('menuitemCopySelected').disable();

        //Block the browser's popup menu
        event.preventDefault();

        //Display custom context menu
        menu.showAt(event.xy);
        //Update the cell value displayed
        Ext.get('cellValueToCopy').update(value);
    }
}

function onCopyOneCellToFinal(item, event)
{
    //var item=Ext.getCmp('menuitemCopyOneCell');
    var record=item.parentMenu.cellRecord;
    var field=item.parentMenu.cellField;

    record.set('final',record.get(field));
}

function onCopySelectedToFinal(item,event)
{
    var selections=NRG.OnlineScoring.GridDiff.getSelectionModel().getSelections();
    var countSelected=selections.length;
    var field=item.parentMenu.cellField;
    
    for (var i=0;i<countSelected;++i)
    {
        var record=selections[i];
        record.set('final',record.get(field));
    }
}

function onCopyCellsToFinal(item, event)
{
    var field=item.parentMenu.cellField;
    var store=NRG.OnlineScoring.GridDiff.getStore();
    var count=store.getTotalCount();

    store.suspendEvents(true);

    //Loop through all the records and copy values from the {field} column
    //to the 'Final' column
    for (var i=0;i<count;++i)
    {
        var record=store.getAt(i);
        record.set('final',record.get(field));
    }

    store.resumeEvents();

}

function onSubjectsLoaded(store, records, options)
{
    var grid=Ext.getCmp('panelSubjects');
    grid.setTitle('Subjects ('+store.getTotalCount()+')','');
}

function gridDiffUpdateTitle(grid)
{
    var store=grid.getStore();
    //Compute number of different rows
    var countRecords=store.getTotalCount();
    var prefix="";
    var countDiff=0;
    var iconCls='x-icon-diff';

    if (grid.locked==true)
        iconCls='x-icon-locked';
    else
    //Prepend a star in case there are modifications
    if ((store.getModifiedRecords().length) && (grid.locked!=1))
        iconCls="x-icon-edited";

    //Count the number of rows that have diff>0
    for (var i=0;i<countRecords;++i)
        if (store.getAt(i).get('diff')>0)
            ++countDiff;

    if (countDiff)
        grid.setTitle(prefix+grid.subject+' ('+countDiff+'/'+countRecords+')',iconCls);
    else
        grid.setTitle(prefix+grid.subject+' ('+countRecords+')',iconCls);

}

function diffRecord(record)
{
    var initialValue="";
    var foundFirst=false;
    var match=0;
    var val=record.get('final');
    var all_empty=true;

    //Skip records that have a final value
    if ((val!=null) && (val.toString().length))
        return match;

    for (var i=0;i<record.fields.length;++i)
    {
        var field=record.fields.item(i).name;
        var cellColumn=field.indexOf('cell');

        console.log("Field=",field,"cellColumn=",cellColumn);

        //Don't perform comparisons for non-<cell> columns
        if (cellColumn<0)
            continue;

        var value=record.get(field);

        if (typeof(value)=="undefined")
            continue;
        console.log("Looking at value: ",value);
        //to lower case
        value=value.toString().toLowerCase();

        //Skip empty values (only happens when the form is empty)
        if (!value.length)
            continue;

        all_empty=false;

        //Store the value of the first encountered <cell> column into initialValue
        if (!foundFirst)
        {
            initialValue=value;
            foundFirst=true;
        }
        else
        {
            //Compare values (case insensitive)
            if (value!=initialValue)
                match=1;
        }
    }

    if (all_empty)
        match=2;

   return match;
}

function markSubjectAsLocked(label)
{
    console.log('Locking subject '+label);
    var grid=NRG.OnlineScoring.GridSubjects;
    var store=grid.getStore();

    var result=store.findExact('subjectLabel',label);

    if (result<0)
        return;

    var record=store.getAt(result);
    record.set('locked',1);

    console.log('Locked subject '+label);
}