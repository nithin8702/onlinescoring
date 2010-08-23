Ext.ns('NRG.OnlineScoring');

var storeSubjects=new Ext.ux.data.PagingJsonStore({
    autoLoad:{
                params: {
                            start:0,
                            limit:20
                        }
             },
    autoDestroy:true,
    storeId:'storeSubjects',
    url:'ajax/subjects.php',
    root:'subjects',
    totalProperty:'total',
    idProperty:'subjectLabel',
    fields: [
                'subjectLabel',
                {name:'countEntries', type:'int'},
                {name:'dateUpdated',  type:'string'}
            ]
 });

var gridSubjects=   {
                        xtype:'grid',
                        store:storeSubjects,
                        stripeRows:true,
                        border:true,
                        columns:[
                                    new Ext.ux.grid.PagingRowNumberer(),
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
                                                            singleSelect:true
                                                          })
                    };

var ui= {
            xtype:'panel',
            frame:true,
            layout:'border',
            items:  [
                        {
                            region:'center',
                            html:'&nbsp;In progress',
                            bodyStyle:'background-color:white'
                        },
                        {
                            region:"west",
                            title:'Subjects',
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