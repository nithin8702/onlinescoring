Ext.namespace('Ext.ux','Ext.ux.form');

/**
 * @class Ext.ux.DatePickerPlus
 * @extends Ext.DatePicker
 * @constructor
  * @param {Object} config The config object
 */
Ext.ux.DatePickerPlusPlus = Ext.extend(Ext.ux.DatePickerPlus, {

    datesCertain:[],
    datesUnsure:[],
    timestampsCertain:[],
    timestampsUnsure:[],
    disablePageKeyWarp:true,

    reset:function()
    {
        this.datesCertain=[];
        this.datesUnsure=[];
        this.timestampsCertain=[];
        this.timestampsUnsure=[];
        var el=this.getEl();

        if (typeof(el)!="undefined")
            el.select("a").each(function(obj){
                if (typeof(obj.dom['parentNode'])!="undefined")
                    obj.dom.parentNode['clicked']=undefined;
                
                obj.removeClass(['x-date-selected','x-date-pp-click1','x-date-pp-click2']);
            });
    },

    handleDateClick:function(e,t)
    {
        //Ext.ux.DatePickerPlusPlus.superclass.handleDateClick.apply(this,arguments);
        var tp = Ext.get(t.parentNode);
        var el = Ext.get(t);

        //Skip disabled cells
        if (tp.hasClass('x-date-disabled') || tp.hasClass('x-date-prevday') ||
            tp.hasClass('x-date-nextday'))
            return;

        if (typeof(tp.dom.clicked)=="undefined")
            tp.dom.clicked=1;
        else
            tp.dom.clicked++;

        tp.removeClass(['x-date-selected']);

        switch (tp.dom.clicked%3)
        {
            case 0: console.log("Unmarking date: ",t.dateValue);
                    this.unmarkDate(el,t.dateValue);
                    break;
            case 1: console.log("Adding certain date: ",t.dateValue);
                    this.markCertainDate(el,t.dateValue);
                    break;
            case 2: console.log("Adding unsure date: ",t.dateValue);
                    this.markUnsureDate(el,t.dateValue);
                    break;
        }

        this.getEl().select(".x-date-nextday a").removeClass(['x-date-selected','x-date-pp-click1','x-date-pp-click2']);
        this.getEl().select(".x-date-prevday a").removeClass(['x-date-selected','x-date-pp-click1','x-date-pp-click2']);
    },

    handleWeekClick:function(e,t)
    {
        //disable week
    },

    unmarkDate:function(el, dateValue)
    {
        el.removeClass(['x-date-pp-click1','x-date-pp-click2']);
        var date_text=(new Date(dateValue)).format(this.format)
        this.datesCertain.remove(date_text);
        this.datesUnsure.remove(date_text);
        this.timestampsCertain.remove(dateValue);
        this.timestampsUnsure.remove(dateValue);
        console.log("Certain: ",this.timestampsCertain);
        console.log("Unsure: ",this.timestampsUnsure);
        this.fireEvent("unmarkDate", this, el, date_text);
    },

    markCertainDate:function(el,dateValue)
    {
        el.removeClass('x-date-pp-click2');
        el.addClass(['x-date-pp-click1']);
        var date_text=(new Date(dateValue)).format(this.format)
        this.datesUnsure.remove(date_text);
        this.datesCertain.push(date_text);
        this.timestampsUnsure.remove(dateValue);
        this.timestampsCertain.push(dateValue);
        console.log("Certain: ",this.timestampsCertain);
        console.log("Unsure: ",this.timestampsUnsure);
        this.fireEvent("markCertainDate", this, el, date_text);
    },

    markUnsureDate:function(el,dateValue)
    {
        el.removeClass('x-date-pp-click1');
        el.addClass(['x-date-pp-click2']);
        var date_text=(new Date(dateValue)).format(this.format)
        this.datesCertain.remove(date_text);
        this.datesUnsure.push(date_text);
        this.timestampsCertain.remove(dateValue);
        this.timestampsUnsure.push(dateValue);
        console.log("Certain: ",this.timestampsCertain);
        console.log("Unsure: ",this.timestampsUnsure);
        this.fireEvent("markUnsureDate", this, el, date_text);
    },

    initComponent:function()
    {
        Ext.ux.DatePickerPlusPlus.superclass.initComponent.apply(this,arguments);
        this.addEvents(
            /**
             * @event markCertainDate
             * Fires after a date was marked as Certain
             * @param {DatePickerPlusPlus} this
             * @param {Ext.Element} el The UI element that was clicked
             * @param {String} date The date that was selected
             */
            'markCertainDate',
            /**
             * @event markUnsureDate
             * Fires after a date was marked as Unsure
             * @param {DatePickerPlusPlus} this
             * @param {Ext.Element} el The UI element that was clicked
             * @param {String} date The date that was selected
             */
            'markUnsureDate',
            /**
             * @event unmarkDate
             * Fires after a date was unmarked (and removed from datesCertain and datesUnsure)
             * @param {DatePickerPlusPlus} this
             * @param {Ext.Element} el The UI element that was clicked
             * @param {String} date The date that was unmarked
             */
            'unmarkDate'
        );
    },

    update:function(date, forceRefresh ,masked)
    {
        console.log('Updating calendar: ',date,forceRefresh,masked);
        Ext.ux.DatePickerPlusPlus.superclass.update.apply(this,arguments);

        var cells,textEls,days,firstOfMonth,startingPos,prevStart,d,pm;
        var today = new Date().clearTime().getTime();
        
        for(var x=0,xk=this.noOfMonth;x<xk;++x)
        {
            cells = this.cellsArray[x].elements;
            textEls = this.textNodesArray[x];
            days = date.getDaysInMonth();
            firstOfMonth = date.getFirstDateOfMonth();
            startingPos = firstOfMonth.getDay()-this.startDay;

            if(startingPos <= this.startDay)
                startingPos += 7;

            days += startingPos;

            pm = date.add("mo", -1);
            prevStart = pm.getDaysInMonth()-startingPos;

            days += startingPos;

            d = new Date(pm.getFullYear(), pm.getMonth(), prevStart).clearTime();

            var i=0;

            for(; i < startingPos; ++i)
            {
                d.setDate(d.getDate()+1);
                this.setCellClass(this, cells[i],textEls[i],d);
            }

            for(; i < days; ++i)
            {
                d.setDate(d.getDate()+1);
                this.setCellClass(this, cells[i],textEls[i],d);
            }

            date = date.add('mo',1);
        }
        this.getEl().select(".x-date-nextday a").removeClass(['x-date-selected','x-date-pp-click1','x-date-pp-click2']);
        this.getEl().select(".x-date-prevday a").removeClass(['x-date-selected','x-date-pp-click1','x-date-pp-click2']);
    },

    setCellClass:function(cal,cell,textnode,d)
    {
        var eCell = Ext.get(cell);
        var eTextNode = Ext.get(textnode);
        var t = d.getTime();

        if (!eCell)
            return;
        var anchors=eCell.child("a");
        if (!anchors)
            return;

        anchors.removeClass(['x-date-selected','x-date-pp-click1','x-date-pp-click2']);

        if (this.timestampsCertain.indexOf(t)!=-1)
            anchors.addClass('x-date-pp-click1');
        else
           if (this.timestampsUnsure.indexOf(t)!=-1)
               anchors.addClass('x-date-pp-click2');

    }
});

Ext.reg('datepickerplusplus', Ext.ux.DatePickerPlusPlus);