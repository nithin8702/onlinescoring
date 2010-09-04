Ext.ns('NRG.OnlineScoring');
Ext.ns('NRG.OnlineScoring.Cache');
NRG.OnlineScoring.Cache.SubjectData=Array();

//Make sure the paging toolbar loads the data from the server when the Refresh
//button is clicked
Ext.override(Ext.PagingToolbar, {
    doRefresh: function(){
        delete this.store.lastParams;
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
                {
                    text:'Copy all to <b>Final</b>',
                    icon:'images/icons/copyAll2Final.png',
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
                {name:'dateUpdated',  type:'string'}
            ],
    listeners:  {
                    load:onSubjectsLoaded
                }
 });

//A simple paging grid that displays all subjects in a paged view
var gridSubjects=   {
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
                                        header:'Subject',
                                        dataIndex:'subjectLabel',
                                        width:75,
                                        sortable:true
                                    },
                                    {
                                        header:'#',
                                        dataIndex:'countEntries',
                                        width:25,
                                        sortable:true
                                    },
                                    {
                                        header:'Updated on',
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
                                                    width:245
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
                    };

var tbarDiffGrid=   {
                        xtype:'toolbar',
                        items:  [
                                    {
                                        id:'btnSaveDiff',
                                        xtype:'button',
                                        text:'Save',
                                        icon:'images/icons/save.png',
                                        handler:onSaveDiff
                                    },
                                    {
                                        xtype:'tbseparator'
                                    },
                                    {
                                        id:'btnCancelDiff',
                                        xtype:'button',
                                        text:'Discard',
                                        icon:'images/icons/reset.png',
                                        handler:onCancelDiff,
                                        disabled:true
                                    }
                                ]
                    };

//The grid on the right of the page that displays the information
var gridDiff=   {
                    id:'gridDiff',
                    xtype:'editorgrid',
                    title:'PG43VH',
                    iconCls:'',
                    headerAsText:true,
                    stripeRows:true,
                    border:true,
                    hidden:true,
                    loadMask:true,
                    colModel:new Ext.grid.ColumnModel({
                                columns:[]
                            }),
                    store:new Ext.data.ArrayStore(),
                    tbar: tbarDiffGrid,
                    listeners:  {
                                    reconfigure: onGridDiffReconfigured,
                                    celldblclick: onCellDoubleClicked,
                                    cellcontextmenu: onCellContextMenu
                                },
                    sm:new Ext.grid.CellSelectionModel()
                }

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
                                        gridDiff
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
                            minSize:260,
                            width:260,
                            items:  [
                                        gridSubjects
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
    var grid=Ext.getCmp('gridDiff');
    if (!grid.isVisible())
        grid.show();
    grid.setTitle(subjectLabel);
    grid.subject=subjectLabel;

    //Disable the Save button
    Ext.getCmp('btnSaveDiff').disable();
    Ext.getCmp('btnCancelDiff').disable();


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
    Ext.getCmp('gridDiff').reconfigure(store, columns);
}

function onGetSubjectDataFailed(req)
{
    var grid=Ext.getCmp('gridDiff');
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
}

function onGridDiffReconfigured(grid, store, colmodel)
{
    //Hide the loadmask
    if (typeof(grid.loadMask)=="object")
        grid.loadMask.hide();
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

/* Saves the XML diff data to the server */
function onSaveDiff(button)
{
    button.disable();
    Ext.getCmp('btnCancelDiff').disable();
    var grid=Ext.getCmp('gridDiff');
    var xml=getFinalDiffXML(grid);

    //Show loadmask
    if (typeof(grid.loadMask))
        grid.loadMask.show();

    //Save the data to the server
    Ext.Ajax.request({
        url:'ajax/savefinalform.php',
        method:'POST',
        params: {
                    label:grid.subject,
                    data:xml
                },

        success:onSaveDiffSuccess,
        failure:onSaveDiffFailed
    })
}

/* @callback */
function onSaveDiffSuccess(response, options)
{
    var result=Ext.decode(response.responseText);
    var grid=Ext.getCmp('gridDiff');

    if (typeof(grid.loadMask)=="object")
        grid.loadMask.hide();

    if (result.success==1)
    {
        grid.edited=false;
        grid.setTitle(grid.subject);
        grid.getStore().commitChanges();
        //Remove the cached entry. This will force the app to refresh this subejct's
        //data the next time the user clicks on it
        NRG.OnlineScoring.Cache.SubjectData[result.subject]=null;

        var gridSubjects=Ext.getCmp('gridSubjects');
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
    var grid=Ext.getCmp('gridDiff');

    //Enable the Save button
    Ext.getCmp('btnSaveDiff').enable();
    Ext.getCmp('btnCancelDiff').enable();

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
    var diffgrid=Ext.getCmp('gridDiff');
    Ext.getCmp('gridSubjects').nextSelection=record;

    if (diffgrid.edited)
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
        console.log('saving...');
        onSaveDiff(Ext.getCmp('btnSaveDiff'));
    }
    else
        focusNextSubject();
}

function focusNextSubject()
{
        //Mark the grid as not edited
        Ext.getCmp('gridDiff').edited=false;
        //Otherwise, force a new selection
        var gridSubjects=Ext.getCmp('gridSubjects');
        var subject=gridSubjects.nextSelection.get('subjectLabel');

        //Highlight the next subject row
        gridSubjects.getSelectionModel().selectRecords(Array(gridSubjects.nextSelection));
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

        //Decode all fields
        for (var j=0;j<fieldCount;++j)
        {
            var field=record.fields.item(j).name;
            var value=record.data[field];
            record.data[field]=decodeURIComponent(value);
        }
    }
}

function onDiffValuesUpdated(store, record, operation)
{
    if (operation==Ext.data.Record.EDIT)
    {
        //Enable save and cancel buttons
        Ext.getCmp('btnSaveDiff').enable();
        Ext.getCmp('btnCancelDiff').enable();
        
        var grid=Ext.getCmp('gridDiff');
        grid.edited=true;
        grid.setTitle('* '+grid.subject);
    }
}

function onCancelDiff(button)
{
    var grid=Ext.getCmp('gridDiff');

    grid.edited=false;
    grid.getStore().rejectChanges();
    grid.setTitle(grid.subject);
    Ext.getCmp('btnSaveDiff').disable();
    Ext.getCmp('btnCancelDiff').disable();
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
    var field=getFieldNameAt(columnIndex,grid);
    var value=getCellValueAt(rowIndex,field,grid);
    var record=grid.getStore().getAt(rowIndex);
    
    if (field=='final')
        return;
    
    if (field=='field')
        return;
    
    if (field.match(/^cell/))
    {
        //Update custom config property
        var menu=Ext.getCmp('cxmenuDiffCellCol');
        menu.cellRecord=record;
        menu.cellField=field;

        //Make sure the display length of the value is reasonable
        if (value.length>15)
            value=value.substring(0,15)+'...';

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

function onCopyCellsToFinal(item, event)
{
    var field=item.parentMenu.cellField;
    var store=Ext.getCmp('gridDiff').getStore();
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
    grid.setTitle('Subjects ('+store.getTotalCount()+')');
}