var jqCalendarReport = {
    _deptId: null,
    _deptName: '',
    /**
     * Show dialog tim kiem don vi
     * 
     * @author hunglm16
     * @since 07/04/2016
     */
    onSelectDeptZk: function (id) {
        if (id == null || id == undefined) {
            return;
        }
        var param = {};
        //Xu ly Ajax len server
        var wgt = zk.Widget.$('$' + id);
        zAu.send(new zk.Event(wgt, 'onSelectDept', {'': param}));
    },

    /**
     * Tra lai ke qua sau khi chon don vi
     * 
     * @author hunglm16
     * @since 16/04/2016
     */
    callBackOnSelectDeptZk: function (dept) {
        VTUtilJS.applyDateTimePicker('fromDate');
        VTUtilJS.applyDateTimePicker('toDate');
        if (dept != null && dept != undefined) {
            jqCalendarReport._deptId = dept.id;
            jqCalendarReport._deptName = dept.name;
            $('#txtSearch').val(dept.name).change();
            if (dept.fromDateTxt != null && dept.fromDateTxt != undefined && dept.fromDateTxt.trim().length == 10) {
                $('#fromDate').val(dept.fromDateTxt.trim());
            }
            if (dept.toDateTxt != null && dept.toDateTxt != undefined && dept.toDateTxt.trim().length == 10) {
                $('#toDate').val(dept.toDateTxt.trim());
            }
        }
        $('.rptClassEvent').bind('keyup', function (event) {
            if (event.keyCode == 13) {//Enter
                $('#btnExport').click();
            }
        });
        $('.easyui-calendar').bind('keyup', function (event) {
            if (event.keyCode == 13) {//F8
                $('#btnExport').click();
            }
        });
    },

    exportCalendarForRoom: function () {
        var err = '';
        $('#errorId').html(err).change().hide();

        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        if (VitxUtils.isNullOrEmpty(fromDate)) {
            err = 'Từ ngày không được để trống';
            $('#fromDate').focus();
        }
        if (err.length == 0 && !VitxUtils.isDate(fromDate, '/')) {
            err = 'Từ ngày không tồn tại';
            $('#fromDate').focus();
        }
        if (err.length == 0 && VitxUtils.isNullOrEmpty(toDate)) {
            err = 'Đến ngày không được để trống';
            $('#toDate').focus();
        }
        if (err.length == 0 && !VitxUtils.isDate(toDate, '/')) {
            err = 'Đến ngày không tồn tại';
            $('#toDate').focus();
        }
        if (err.length > 0) {
            $('#errorId').html(err).change().show();
            return;
        }
        var param = {
            deptId: jqCalendarReport._deptId,
            deptName: jqCalendarReport._deptName,
            fromDate: fromDate,
            toDate: toDate
        };
        var wgt = zk.Widget.$("$wd_report");
        zAu.send(new zk.Event(wgt, 'onExportCalendarForRoom', {'': param}));
    },

    exportCalendarForRoomGeneral: function () {
        var err = '';
        $('#errorId').html(err).change().hide();

        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        if (VitxUtils.isNullOrEmpty(fromDate)) {
            err = 'Từ ngày không được để trống';
            $('#fromDate').focus();
        }
        if (err.length == 0 && !VitxUtils.isDate(fromDate, '/')) {
            err = 'Từ ngày không tồn tại';
            $('#fromDate').focus();
        }
        if (err.length == 0 && VitxUtils.isNullOrEmpty(toDate)) {
            err = 'Đến ngày không được để trống';
            $('#toDate').focus();
        }
        if (err.length == 0 && !VitxUtils.isDate(toDate, '/')) {
            err = 'Đến ngày không tồn tại';
            $('#toDate').focus();
        }
        if (err.length > 0) {
            $('#errorId').html(err).change().show();
            return;
        }
        var param = {
            fromDate: fromDate,
            toDate: toDate
        };
        var wgt = zk.Widget.$("$wd_report");
        zAu.send(new zk.Event(wgt, 'onExportCalendarForRoomGenaral', {'': param}));
    },

    setDateTimePickerDefaul: function () {
        setDateTimePicker('fromDate');
        setDateTimePicker('toDate');
    }
};

var jqCalendarDocView = {
    _weekIndex: null,
    _currentDate: null,
    _fromDate: null,
    _toDate: null,
    _mapDay: {
        fDate: null,
        tDate: null
    },
    _statusIndex: null,
    CalendarVO: {
        userId: null,
        fullName: '',
        posName: '',
        title: '',
        content: '',
        locationName: '',
        beginDateTxt: '',
        beginHms: '',
        endHms: '',
        lstDetail: null
    },
    /**
     * Lay so thu tu Tuan trong nam theo ngay
     * 
     * @author hunglm16
     * @since 23/03/2015
     */
    weekNo_Date: function (ngay, thang, nam) {
        var totalDays = 1;
        inc_day1 = parseInt(thang) + '/' + parseInt(ngay) + '/' + parseInt(nam)
        var now = new Date(inc_day1 + " 00:00:00");

        years = now.getYear();
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
            //Nam nhuan
            days[1] = 29
        }
        if (now.getMonth() == 0) {
            totalDays = totalDays + now.getDate();
        } else {
            var curMonth = now.getMonth();
            for (var count = 1; count <= curMonth; count++) {
                totalDays = totalDays + days[count - 1];
            }
            totalDays = totalDays + now.getDate();
        }
        var agt = navigator.userAgent.toLowerCase();
        if ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1)) {
            var firstday = new Date("01/01/" + String(now.getYear())).getDay();
        } else {
            var firstday = new Date("01/01/" + String(1900 + now.getYear())).getDay();
        }
        var diff = 7 - firstday + 1;
        var week = Math.round((totalDays + diff - firstday) / 7);
        return week - 1;
    },
    /**
     * Hien thi tu ngay den ngay trong tuan tuong ung
     * 
     * @author hunglm16
     * @since 23/03/2015
     */
    viewHeaderByFromdateToDate: function (date) {
        var mapDay = jqCalendarDocView.getFromDateToDateByWeek(date);        
        $('#lichTitle1').html('Tuần thứ <b>' + jqCalendarDocView.weekNo_Date(date.getDate(), date.getMonth() + 1, date.getFullYear()) + '</b> (từ ' + jqCalendarDocView.getDateStrddMMyyy(mapDay.fDate) + ' đến ' + jqCalendarDocView.getDateStrddMMyyy(mapDay.tDate));
        $('#lichTitle1').change();
        $('#lichTitle1').show();
    },
    /**
     * Lay kieu dinh dang chuoi cho kieu ngay
     * 
     * @author hunglm16
     * @since 23/03/2015
     */
    getDateStrddMMyyy: function (date) {
        var d = null;
        if (date == null || date == undefined) {
            date = new Date();
        }
        d = date;
        s = (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
                "/" + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                "/" + d.getFullYear();
        return s;
    },
    /**
     * Lay tu ngay dau tuan den ngay cuoi tuan
     *
     * vi du: <b>Thứ Năm, ngày 24/03/2016</b>
     * @author hunglm16
     * @since 23/03/2015
     */
    getFromDateToDateByWeek: function (curr) {
        var curr1 = null;
        if (curr == null || curr == undefined) {
            curr = new Date();
        }
        curr1 = curr;
        var first = curr1.getDate() - curr1.getDay() + 1;
        if (curr1.getDay() == 0) {
            //Chu nhat
            first = first - 7;//Ly do tuan quoc te chu nhat dung truoc thu 2
        }
        var last = first + 6;
        var mapDay = {
            fDate: new Date(new Date(curr1).setDate(first)),
            tDate: new Date(new Date(curr1).setDate(last))
        };
        return mapDay;
    },
    /**
     * Cong tru ngay
     *
     * @author hunglm16
     * @since 23/03/2015
     */
    getAddDate: function (pDate, np) {
        var curr1 = null;
        if (pDate == null || pDate == undefined || isNaN(np) || Number(np) == 0) {
            return pDate;
        }
        curr1 = pDate;
        var first = curr1.getDate() - curr1.getDay() + np + 1;
        return new Date(new Date(curr1).setDate(first));
    },
    /**
     * Hien thi ngon ngu viet nam
     * vi du: <b>Thứ Năm, ngày 24/03/2016</b>
     * @author hunglm16
     * @since 23/03/2015
     */
    showDateVN: function (dateString, ddMMyyyy) {
        var d = null;
        if (dateString != null && dateString != undefined) {
            if (ddMMyyyy) {
                dateString = dateString.substring(6, 11) + '/' + dateString.substring(3, 5) + '/' + dateString.substring(0, 2);
            }
            dateString = dateString.match(/\d{4}\/\d{2}\/\d{2}/);
            d = new Date(dateString);
        } else {
            d = new Date();
        }
        if (dateString != null && dateString != undefined) {
            d = new Date(dateString);
        } else {
            d = new Date();
        }

        var a = new Array("Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy");
        var s = "<b>" + a[d.getDay()] +
                ", ngày " + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
                "/" + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                "/" + d.getFullYear() + "</b>";
        return s;
    },
    /**
     * Xu ly su kien click cac thu trong tuan
     *
     * @author hunglm16
     * @since 23/03/2015
     */
    onClickWeekCalendar: function (tIndex) {
        if (!isNaN(tIndex)) {
            var tIndexNumber = Number(tIndex);
            if (tIndexNumber == 1) {
                //Xu ly ca tuan
                jqCalendarDocView.tIndex1();
            } else if (tIndexNumber > 1 && tIndexNumber < 9) {
                //Xu ly thu 2
                jqCalendarDocView.tIndexI(tIndexNumber);
            }
        }
    },
    /**
     * xu ly cho ca tuan
     *
     * @author hunglm16
     * @since 23/03/2016
     */
    tIndex1: function () {
        for (var i = 1; i < 9; i++) {
            $('#t' + i).removeClass("w_active");
        }
        $('#t1').addClass("w_active");
        $('.calendar-table-view').show();
    },
    /**
     * xu ly cho ca ngay
     *
     * @author hunglm16
     * @since 23/03/2016
     */
    tIndexI: function (tIndexI) {
        if (isNaN(tIndexI) || Number(tIndexI) == 0) {
            return;
        }
        for (var i = 1; i < 9; i++) {
            $('#t' + i).removeClass("w_active");
        }
        $('#t' + tIndexI).addClass("w_active");
        //Xu ly hien thi
        $('.calendar-table-view').hide();
        $('#calendar-table-view-' + tIndexI).show();
    },
    /**
     * xu ly chuyen tuan lam viec
     *
     * @author hungl16
     * @since 24/03/2016
     */
    onNextOrPrevWeekSetDate: function (isEvent) {
        if (isNaN(isEvent) || Number(isEvent) == 0) {
            return;
        }
        //Xy lay lay khoang giua tuan
        if (isEvent < 0) {
            isEvent = -1;
        } else if (isEvent > 0) {
            isEvent = 1;
        }
        if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
            jqCalendarDocView._mapDay = jqCalendarDocView.getFromDateToDateByWeek(new Date());
            jqCalendarDocView._fromDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.fDate);
            jqCalendarDocView._toDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.tDate);
            jqCalendarDocView._weekIndex = jqCalendarDocView.weekNo_Date(jqCalendarDocView._mapDay.fDate.getDate()
                    , jqCalendarDocView._mapDay.fDate.getMonth() + 1, jqCalendarDocView._mapDay.fDate.getFullYear());
            jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);
        }
        var dTemp = null;
        if (isEvent < 0) {
            dTemp = new Date(new Date(jqCalendarDocView._mapDay.fDate).setDate(jqCalendarDocView._mapDay.fDate.getDate() - jqCalendarDocView._mapDay.fDate.getDay() + isEvent));
        } else {
            dTemp = new Date(new Date(jqCalendarDocView._mapDay.tDate).setDate(jqCalendarDocView._mapDay.tDate.getDate() - jqCalendarDocView._mapDay.tDate.getDay() + isEvent));
        }
        jqCalendarDocView._mapDay = jqCalendarDocView.getFromDateToDateByWeek(dTemp);
        jqCalendarDocView._fromDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.fDate);
        jqCalendarDocView._toDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.tDate);
        jqCalendarDocView._weekIndex = jqCalendarDocView.weekNo_Date(jqCalendarDocView._mapDay.fDate.getDate()
                , jqCalendarDocView._mapDay.fDate.getMonth() + 1, jqCalendarDocView._mapDay.fDate.getFullYear());
        jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);

        jqCalendarDocView.tIndex1();
    },
    /**
     * xu ly chuyen tuan lam viec
     *
     * @author hungl16
     * @since 24/03/2016
     */
    onNextOrPrevWeek: function (isEvent) {
        if (isNaN(isEvent) || Number(isEvent) == 0) {
            return;
        }
        //Xy lay lay khoang giua tuan
        if (isEvent < 0) {
            isEvent = -1;
        } else if (isEvent > 0) {
            isEvent = 1;
        }
        if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
            jqCalendarDocView._mapDay = jqCalendarDocView.getFromDateToDateByWeek(new Date());
            jqCalendarDocView._fromDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.fDate);
            jqCalendarDocView._toDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.tDate);
            jqCalendarDocView._weekIndex = jqCalendarDocView.weekNo_Date(jqCalendarDocView._mapDay.fDate.getDate()
                    , jqCalendarDocView._mapDay.fDate.getMonth() + 1, jqCalendarDocView._mapDay.fDate.getFullYear());
            jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);
        }
        var dTemp = null;
        if (isEvent < 0) {
            dTemp = new Date(new Date(jqCalendarDocView._mapDay.fDate).setDate(jqCalendarDocView._mapDay.fDate.getDate() - jqCalendarDocView._mapDay.fDate.getDay() + isEvent));
        } else {
            dTemp = new Date(new Date(jqCalendarDocView._mapDay.tDate).setDate(jqCalendarDocView._mapDay.tDate.getDate() - jqCalendarDocView._mapDay.tDate.getDay() + isEvent));
        }
        jqCalendarDocView._mapDay = jqCalendarDocView.getFromDateToDateByWeek(dTemp);
        jqCalendarDocView._fromDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.fDate);
        jqCalendarDocView._toDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.tDate);
        jqCalendarDocView._weekIndex = jqCalendarDocView.weekNo_Date(jqCalendarDocView._mapDay.fDate.getDate()
                , jqCalendarDocView._mapDay.fDate.getMonth() + 1, jqCalendarDocView._mapDay.fDate.getFullYear());
        jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);
        //lay status calendar
        var slectBox = zk.Widget.$("$lbxStatus");
        var indexSelect = 0;
        if (slectBox != null) {
            var indexSelect = slectBox.getSelectedIndex();
            if (indexSelect == undefined || indexSelect == null || isNaN(indexSelect) || Number(indexSelect) < 0) {
                indexSelect = 0;
            }
        } else {
            indexSelect = 3;
        }

        var printSlectBox = zk.Widget.$("$lbxInOption");
        var printIndexSelect = 0;
        if (printSlectBox != null) {
            printIndexSelect = printSlectBox.getSelectedIndex();
            if (printIndexSelect == undefined || printIndexSelect == null || isNaN(printIndexSelect) || Number(printIndexSelect) < 0) {
                printIndexSelect = 0;
            }
        }


        var lbxPrintDept = zk.Widget.$("$lbxPrintDept");
        var indexPrintDept = 0;
        if (lbxPrintDept != null) {
            indexPrintDept = lbxPrintDept.getSelectedIndex();
            if (indexPrintDept == undefined || indexPrintDept == null || isNaN(indexPrintDept) || Number(indexPrintDept) < 0) {
                indexPrintDept = 0;
            }
        }
        var lbxDeptLeader = zk.Widget.$("$lbxDeptLeader");
        var indexDeptLeader = 0;
        if (lbxDeptLeader != null) {
            indexDeptLeader = lbxDeptLeader.getSelectedIndex();
            if (indexDeptLeader == undefined || indexDeptLeader == null || isNaN(indexDeptLeader) || Number(indexDeptLeader) < 0) {
                indexDeptLeader = 0;
            }
        }
        //Xu ly Ajax len server
        var param = {
            fromDate: jqCalendarDocView._fromDate,
            toDate: jqCalendarDocView._toDate,
            indexSelect: indexSelect,
            printOption: printIndexSelect,
            leaderDeptIndex: indexPrintDept,
            leaderIndex: indexDeptLeader,
            typeFilter: 'leaderFilter'
        };
        var wgt = zk.Widget.$("$wd_calendar_menu");
        zAu.send(new zk.Event(wgt, 'onSearchCalendar', {'': param}));
        jqCalendarDocView.tIndex1();
    },
    /**
     * xu ly chuyen tuan lam viec hien thi lich ca nhan da dc duyet
     *
     * @author quangvv4
     * @since 31/03/2016
     */
    onNextOrPrevWeekByPersion: function (isEvent) {
        if (isNaN(isEvent) || Number(isEvent) == 0) {
            return;
        }
        //Xy lay lay khoang giua tuan
        if (isEvent < 0) {
            isEvent = -1;
        } else if (isEvent > 0) {
            isEvent = 1;
        }
        if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
            jqCalendarDocView._mapDay = jqCalendarDocView.getFromDateToDateByWeek(new Date());
            jqCalendarDocView._fromDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.fDate);
            jqCalendarDocView._toDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.tDate);
            jqCalendarDocView._weekIndex = jqCalendarDocView.weekNo_Date(jqCalendarDocView._mapDay.fDate.getDate()
                    , jqCalendarDocView._mapDay.fDate.getMonth() + 1, jqCalendarDocView._mapDay.fDate.getFullYear());
            jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);
        }
        var dTemp = null;
        if (isEvent < 0) {
            dTemp = new Date(new Date(jqCalendarDocView._mapDay.fDate).setDate(jqCalendarDocView._mapDay.fDate.getDate() - jqCalendarDocView._mapDay.fDate.getDay() + isEvent));
        } else {
            dTemp = new Date(new Date(jqCalendarDocView._mapDay.tDate).setDate(jqCalendarDocView._mapDay.tDate.getDate() - jqCalendarDocView._mapDay.tDate.getDay() + isEvent));
        }
        jqCalendarDocView._mapDay = jqCalendarDocView.getFromDateToDateByWeek(dTemp);
        jqCalendarDocView._fromDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.fDate);
        jqCalendarDocView._toDate = jqCalendarDocView.getDateStrddMMyyy(jqCalendarDocView._mapDay.tDate);
        jqCalendarDocView._weekIndex = jqCalendarDocView.weekNo_Date(jqCalendarDocView._mapDay.fDate.getDate()
                , jqCalendarDocView._mapDay.fDate.getMonth() + 1, jqCalendarDocView._mapDay.fDate.getFullYear());
        jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);
        jqCalendarDocView.viewHeaderByFromdateToDate(jqCalendarDocView._mapDay.fDate);
        //lay status calendar
        var slectBox = zk.Widget.$("$lbxStatus");
        var indexSelect = 0;
        if (slectBox != null) {
            var indexSelect = slectBox.getSelectedIndex();
            if (indexSelect == undefined || indexSelect == null || isNaN(indexSelect) || Number(indexSelect) < 0) {
                indexSelect = 0;
            }
        } else {
            indexSelect = 3;
        }

        var lbxPrintDept = zk.Widget.$("$lbxPrintDept");
        var indexPrintDept = 0;
        if (printSlectBox != null) {
            indexPrintDept = lbxPrintDept.getSelectedIndex();
            if (indexPrintDept == undefined || indexPrintDept == null || isNaN(indexPrintDept) || Number(indexPrintDept) < 0) {
                indexPrintDept = 0;
            }
        }

        //Xu ly Ajax len server
        var param = {
            fromDate: jqCalendarDocView._fromDate,
            toDate: jqCalendarDocView._toDate,
            indexSelect: indexSelect,
            leaderDeptIndex: indexPrintDept
        };
        var wgt = zk.Widget.$("$wd_calendar_menu");

        zAu.send(new zk.Event(wgt, 'onSearchCalendar', {'': param}));
        jqCalendarDocView.tIndex1();
    },

    /**
     * Xuat bao cao lich lam viec
     * 
     * @author hunglm16
     * @since 07/04/2016
     */
    exportCalendarShowDocView: function () {
        var param = {};
        //lay status calendar
        var slectBox = zk.Widget.$("$lbxStatus");
        var indexSelect = slectBox.getSelectedIndex();
        if (indexSelect == undefined || indexSelect == null || isNaN(indexSelect) || Number(indexSelect) < 0) {
            indexSelect = 0;
        }

        var indexSelectDept = 0;
        var lbxPrintDept = zk.Widget.$("lbxPrintDept");
        if (lbxPrintDept != null) {
            indexSelectDept = lbxPrintDept.getSelectedIndex();
            if (indexSelectDept == undefined || indexSelectDept == null || isNaN(indexSelectDept) || Number(indexSelectDept) < 0) {
                indexSelectDept = 0;
            }
        }

        if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
            param = {
                fromDate: jqCalendarDocView._fromDate,
                toDate: jqCalendarDocView._toDate,
                indexSelect: indexSelect,
                leaderDeptIndex: indexSelectDept
            };
        }
        param.fExport = VitxUtils.EXPORT_EXCEL;
        param.indexSelect = indexSelect;
        //Xu ly Ajax len server
        var wgt = zk.Widget.$("$wd_calendar_menu");
        zAu.send(new zk.Event(wgt, 'onSearchCalendar', {'': param}));
    },

    /**
     * Xuat bao cao lich lam viec
     * theo mau Bo VH TT DL
     * @author quangvv4
     * @since 28/04/2017
     */
    exportCalendarShowDocView2: function () {
        var param = {};
        //lay status calendar
        var indexSelect = 3;

        var lbxPrintDept = zk.Widget.$("$lbxPrintDept");
        var indexPrintDept = 0;
        if (lbxPrintDept != null) {
            indexPrintDept = lbxPrintDept.getSelectedIndex();
            if (indexPrintDept == undefined || indexPrintDept == null || isNaN(indexPrintDept) || Number(indexPrintDept) < 0) {
                indexPrintDept = 0;
            }
        }

        //if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
        param = {
            fromDate: jqCalendarDocView._fromDate,
            toDate: jqCalendarDocView._toDate,
            indexSelect: indexSelect,
            leaderDeptIndex: indexPrintDept
        };
        //}
        param.fExport = VitxUtils.EXPORT_EXCEL;
        param.indexSelect = indexSelect;
        param.leaderDeptIndex = indexPrintDept;
        //Xu ly Ajax len server
        var wgt = zk.Widget.$("$wd_calendar_menu");
        zAu.send(new zk.Event(wgt, 'onSearchCalendar', {'': param}));
    },
    /**
     * Xuat bao cao lich lam viec ra pdf
     * theo mau Bo VH TT DL
     * @author quangvv4
     * @since 28/04/2017
     */
    exportCalendarShowDocViewFDF: function () {
        var param = {};
        //lay status calendar
        var indexSelect = 3;

        var lbxPrintDept = zk.Widget.$("$lbxPrintDept");
        var indexPrintDept = 0;
        if (lbxPrintDept != null) {
            indexPrintDept = lbxPrintDept.getSelectedIndex();
            if (indexPrintDept == undefined || indexPrintDept == null || isNaN(indexPrintDept) || Number(indexPrintDept) < 0) {
                indexPrintDept = 0;
            }
        }

        //if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
        param = {
            fromDate: jqCalendarDocView._fromDate,
            toDate: jqCalendarDocView._toDate,
            indexSelect: indexSelect,
            leaderDeptIndex: indexPrintDept
        };
        //}
        param.fExport = VitxUtils.EXPORT_PDF;
        param.indexSelect = indexSelect;
        param.leaderDeptIndex = indexPrintDept;
        //Xu ly Ajax len server
        var wgt = zk.Widget.$("$wd_calendar_menu");
        zAu.send(new zk.Event(wgt, 'onSearchCalendar', {'': param}));
    },
    /**
     * Xuat bao cao lich lam viec ra word
     * theo mau Bo VH TT DL
     * @author quangvv4
     * @since 28/04/2017
     */
    exportCalendarShowDocViewWORD: function () {
        var param = {};
        //lay status calendar
        var indexSelect = 3;

        var lbxPrintDept = zk.Widget.$("$lbxPrintDept");
        var indexPrintDept = 0;
        if (lbxPrintDept != null) {
            indexPrintDept = lbxPrintDept.getSelectedIndex();
            if (indexPrintDept == undefined || indexPrintDept == null || isNaN(indexPrintDept) || Number(indexPrintDept) < 0) {
                indexPrintDept = 0;
            }
        }

        //if (jqCalendarDocView._weekIndex == null || jqCalendarDocView._weekIndex == undefined) {
        param = {
            fromDate: jqCalendarDocView._fromDate,
            toDate: jqCalendarDocView._toDate,
            indexSelect: indexSelect,
            leaderDeptIndex: indexPrintDept
        };
        //}
        param.fExport = VitxUtils.EXPORT_WORD;
        param.indexSelect = indexSelect;
        param.leaderDeptIndex = indexPrintDept;
        //Xu ly Ajax len server
        var wgt = zk.Widget.$("$wd_calendar_menu");
        zAu.send(new zk.Event(wgt, 'onSearchCalendar', {'': param}));
    }
};

/**
 * Xu ly ket ajax tra ve
 *
 * @author hunglm16
 * @param data
 * @since 24/03/2016
 */
function callbackSearchCalendar(data) {
    if (data != null && data != undefined) {
        var htmlContent = '';
        var size = data.length;
        var cDate = jqCalendarDocView._mapDay.fDate;
        var dem = 0;
        while (dem < 7) {
            cDate = jqCalendarDocView.getAddDate(cDate, dem);
            var dText = dem + 2;
            htmlContent = htmlContent.trim() + '<table id="calendar-table-view-' + dText + '" class="table table-bordered no-margin calendar-table-view" align="center" border="0" cellspacing="0" width="100%">';
            htmlContent = htmlContent.trim() + '	<tbody>';
            var cDateTxt = jqCalendarDocView.getDateStrddMMyyy(cDate).trim();
            for (var d = 0; d < size; d++) {
                var vod = data[d];
                if (cDateTxt === vod.beginDateTxt.toString().trim()) {
                    htmlContent = htmlContent.trim() + '		<tr>';
                    htmlContent = htmlContent.trim() + '			<td colspan="10" style="padding: 0px">';
                    htmlContent = htmlContent.trim() + '				<table class="on table table-condensed table-bordered table-hover no-margin" id="blck0" align="center" border="0" cellspacing="0" width="100%">';
                    htmlContent = htmlContent.trim() + '					<tbody>';
                    htmlContent = htmlContent.trim() + '						<tr id="title0" class="titleHead">';
                    htmlContent = htmlContent.trim() + '							<td colspan="7" style="background-color: rgb(49, 134, 155); color: #222;" class="title01" align="center" height="32" valign="bottom">';
                    htmlContent = htmlContent.trim() + '								<b>' + VitxUtils.XSSEncode(vod.showDateVN) + '</b>';
                    htmlContent = htmlContent.trim() + '							</td>';
                    htmlContent = htmlContent.trim() + '						</tr>';
                    htmlContent = htmlContent.trim() + '		<tr style="background-color: #eee; color: #333; text-align:center; font-weight:bold;">';
                    htmlContent = htmlContent.trim() + '			<td align="center" width="5" style="vertical-align: middle !important;">STT</td>';
                    htmlContent = htmlContent.trim() + '			<td align="center" style="vertical-align: middle !important;" width="100">Thời gian</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Nội dung</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Chủ trì</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Chuẩn bị</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Tham gia</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Trạng thái</td>';
                    htmlContent = htmlContent.trim() + '		</tr>';
                    var lstUserCalenVO = vod.lstDetail;
                    if (lstUserCalenVO != null && lstUserCalenVO != undefined && lstUserCalenVO.length > 0) {
                        for (var u = 0, sizeu = lstUserCalenVO.length; u < sizeu; u++) {
                            var vou = lstUserCalenVO[u];
                            if (vou != null && vou != undefined) {
                                htmlContent = htmlContent.trim() + '		<tr>';
                                htmlContent = htmlContent.trim() + '			<td align="center" width="10" style="vertical-align: middle !important;">' + (u + 1) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td align="center" style="vertical-align: middle !important;" width="90">' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + ' - ' + VitxUtils.XSSEncode(vou.endHms) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="300" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.title) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="150" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.chief) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="150" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.prepare) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="300" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.participant) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="120" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.statusTxt) + '</td>';
                                htmlContent = htmlContent.trim() + '		</tr>';
                            }
                        }
                    }
                    htmlContent = htmlContent.trim() + '		<tr>';
                    htmlContent = htmlContent.trim() + '			<td colspan="7" align="center" height="32" valign="bottom"></td>';
                    htmlContent = htmlContent.trim() + '		</tr> ';

                    htmlContent = htmlContent.trim() + '					</tbody>';
                    htmlContent = htmlContent.trim() + '				</table>';
                    htmlContent = htmlContent.trim() + '			</td>';
                    htmlContent = htmlContent.trim() + '		</tr>';
                }
            }
            htmlContent = htmlContent.trim() + '	</tbody>';
            htmlContent = htmlContent.trim() + '</table>';
            dem++;
        }
        $('#div_content_week').html(htmlContent).change().show();
    }
}
;
/**
 * Xu ly ket ajax tra ve
 *
 * @author hunglm16
 * @param data
 * @since 24/03/2016
 */
function callbackSearchCalendarView1(data, sLead) {
    if (data != null && data != undefined) {
        var strLeader = sLead;
        var arrLeader = strLeader.toString().split('|');
        if (arrLeader.length > 0) {
            var htmlContent = '';
            var htmlContentDays = '';
            var htmlContentData = '';
            var size = data.length;
            var cDate = jqCalendarDocView._mapDay.fDate;
            htmlContent = htmlContent.trim() + '<table id="calendar-table-view" class="table table-bordered no-margin calendar-table-view" align="center" border="0" cellspacing="0" width="100%">';
            htmlContent = htmlContent.trim() + '	<tbody>';
            htmlContent = htmlContent.trim() + '		<tr style="background-color: #eee; color: #333; text-align:center; font-weight:bold;">';
            htmlContent = htmlContent.trim() + '			<td align="center" width="200" style="vertical-align: middle !important;">Ngày</td>';
            htmlContent = htmlContent.trim() + '			<td align="center" colspan="2" style="vertical-align: middle !important;">Nội dung công tác</td>';
            htmlContent = htmlContent.trim() + '		</tr>';
            var dem = 0;
            while (dem < 7) {
                cDate = jqCalendarDocView.getAddDate(cDate, dem);
                var dText = dem + 2;
                var cDateTxt = jqCalendarDocView.getDateStrddMMyyy(cDate).trim();
                var contentAM = '';
                var contentPM = '';
                var sDays = cDateTxt;
                if (dem == 0) {
                    sDays = "Thứ 2, ngày " + cDateTxt
                } else if (dem == 1) {
                    sDays = "Thứ 3, ngày " + cDateTxt
                } else if (dem == 2) {
                    sDays = "Thứ 4, ngày " + cDateTxt
                } else if (dem == 3) {
                    sDays = "Thứ 5, ngày " + cDateTxt
                } else if (dem == 4) {
                    sDays = "Thứ 6, ngày " + cDateTxt
                } else if (dem == 5) {
                    sDays = "Thứ 7, ngày " + cDateTxt
                } else if (dem == 6) {
                    sDays = "Chủ nhật, ngày " + cDateTxt
                }
                htmlContentData = '';
                contentAM = '';
                contentPM = '';
                for (var d = 0; d < size; d++) {
                    var vod = data[d];
                    if (cDateTxt === vod.beginDateTxt.toString().trim()) {
                        sDays = VitxUtils.XSSEncode(vod.showDateVN);
                        var lstUserCalenVO = vod.lstDetail;
                        if (lstUserCalenVO != null && lstUserCalenVO != undefined && lstUserCalenVO.length > 0) {
                            for (var u = 0, sizeu = lstUserCalenVO.length; u < sizeu; u++) {
                                var vou = lstUserCalenVO[u];
                                if (vou != null && vou != undefined) {
                                    if (vou.statusTxt == 'Đã phê duyệt' && ('|' + strLeader + '|').indexOf('|' + vou.userId + '|') >= 0) {
                                        if (vou.statusHouse == 0) {
                                            //sang
                                            contentAM = contentAM + '<b>' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + ': Đ/c ' + VitxUtils.XSSEncode(vou.fullName) + ' - </b>';
                                            var title = "";
                                            if (vou.title != undefined && vou.title.length > 0) {
                                                title = VitxUtils.XSSEncode(vou.title);
                                            }
                                            if (vou.content != undefined && vou.content.length > 0) {
                                                title = title + "- Nội dung: " + VitxUtils.XSSEncode(vou.content);
                                            }
                                            var location = "";
                                            if (vou.meetingPlace != undefined && vou.meetingPlace.length > 0) {
                                                location = location + VitxUtils.XSSEncode(vou.meetingPlace);
                                            }
                                            if (vou.location != undefined && vou.location.length > 0) {
                                                location = location + ", " + VitxUtils.XSSEncode(vou.location);
                                            }
                                            if (location.length > 0) {
                                                title = title + "- Địa điểm: " + location;
                                            }
                                            if (vou.prepare != undefined && vou.prepare.length > 0) {
                                                title = title + "- Chuẩn bị: " + VitxUtils.XSSEncode(vou.prepare);
                                            }
                                            contentAM = contentAM + title;
                                            contentAM = contentAM + '<br/>';
                                        } else {
                                            //chieu
                                            contentPM = contentPM + '<b>' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + ': Đ/c ' + VitxUtils.XSSEncode(vou.fullName) + ' - </b>';
                                            var title = "";
                                            if (vou.title != undefined && vou.title.length > 0) {
                                                title = VitxUtils.XSSEncode(vou.title);
                                            }
                                            if (vou.content != undefined && vou.content.length > 0) {
                                                title = title + "- Nội dung: " + VitxUtils.XSSEncode(vou.content);
                                            }
                                            var location = "";
                                            if (vou.meetingPlace != undefined && vou.meetingPlace.length > 0) {
                                                location = location + VitxUtils.XSSEncode(vou.meetingPlace);
                                            }
                                            if (vou.location != undefined && vou.location.length > 0) {
                                                location = location + ", " + VitxUtils.XSSEncode(vou.location);
                                            }
                                            if (location.length > 0) {
                                                title = title + "- Địa điểm: " + location;
                                            }
                                            if (vou.prepare != undefined && vou.prepare.length > 0) {
                                                title = title + "- Chuẩn bị: " + VitxUtils.XSSEncode(vou.prepare);
                                            }
                                            contentPM = contentPM + title;
                                            contentPM = contentPM + '<br/>';
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                htmlContentData = htmlContentData.trim() + '		<tr>';
                htmlContentData = htmlContentData.trim() + '			<td rowspan="2" style="vertical-align: middle !important;"><b>' + sDays + '</b></td>';
                htmlContentData = htmlContentData.trim() + '			<td width="50" align="center" style="vertical-align: middle !important;">Sáng</td>';
                htmlContentData = htmlContentData.trim() + '			<td style="vertical-align: middle !important;">' + contentAM + '</td>';
                htmlContentData = htmlContentData.trim() + '		</tr>'
                htmlContentData = htmlContentData.trim() + '		<tr>';
                htmlContentData = htmlContentData.trim() + '			<td width="50" align="center" style="vertical-align: middle !important;">Chiều</td>';
                htmlContentData = htmlContentData.trim() + '			<td style="vertical-align: middle !important;">' + contentPM + '</td>';
                htmlContentData = htmlContentData.trim() + '		</tr>'

                htmlContent = htmlContent.trim() + htmlContentData;

                dem++;
            }
            htmlContent = htmlContent.trim() + '	</tbody>';
            htmlContent = htmlContent.trim() + '</table>';
            htmlContent = htmlContent.trim() + htmlContentDays;
            $('#div_content_week').html(htmlContent).change().show();
        }
    }
}
;

function callbackSearchCalendarView2(data, sLead, sLeadName) {
    if (data != null && data != undefined) {
        var strLeader = sLead;
        var arrLeader = strLeader.toString().split('|');
        var arrLeaderName = sLeadName.toString().split('|');
        if (arrLeader.length > 0) {
            var htmlContent = '';
            var htmlContentDays = '';
            var htmlContentData = '';
            var size = data.length;
            var cDate = jqCalendarDocView._mapDay.fDate;
            htmlContent = htmlContent.trim() + '<table id="calendar-table-view" class="table table-bordered no-margin calendar-table-view" align="center" border="0" cellspacing="0" width="100%">';
            htmlContent = htmlContent.trim() + '	<tbody>';
            htmlContent = htmlContent.trim() + '		<tr style="background-color: #eee; color: #333; text-align:center; font-weight:bold;">';
            htmlContent = htmlContent.trim() + '			<td align="center" width="150" colspan="2" style="vertical-align: middle !important;">Ngày</td>';
            for (var indexL = 0; indexL < arrLeader.length; indexL++) {
                htmlContent = htmlContent.trim() + '			<td align="center" width="200" style="vertical-align: middle !important;">' + arrLeaderName[indexL] + '</td>';
            }
            htmlContent = htmlContent.trim() + '		</tr>';
            var dem = 0;
            while (dem < 7) {
                cDate = jqCalendarDocView.getAddDate(cDate, dem);
//				var dText = dem + 2;				
                var cDateTxt = jqCalendarDocView.getDateStrddMMyyy(cDate).trim();
                var contentAM = new Array(arrLeader.length);
                var contentPM = new Array(arrLeader.length);
                var sDays = cDateTxt;
                if (dem == 0) {
                    sDays = "Thứ 2, ngày " + cDateTxt
                } else if (dem == 1) {
                    sDays = "Thứ 3, ngày " + cDateTxt
                } else if (dem == 2) {
                    sDays = "Thứ 4, ngày " + cDateTxt
                } else if (dem == 3) {
                    sDays = "Thứ 5, ngày " + cDateTxt
                } else if (dem == 4) {
                    sDays = "Thứ 6, ngày " + cDateTxt
                } else if (dem == 5) {
                    sDays = "Thứ 7, ngày " + cDateTxt
                } else if (dem == 6) {
                    sDays = "Chủ nhật, ngày " + cDateTxt
                }
                htmlContentData = '';
                for (var d = 0; d < size; d++) {
                    var vod = data[d];
                    if (cDateTxt === vod.beginDateTxt.toString().trim()) {
                        sDays = VitxUtils.XSSEncode(vod.showDateVN);
                        var lstUserCalenVO = vod.lstDetail;
                        if (lstUserCalenVO != null && lstUserCalenVO != undefined && lstUserCalenVO.length > 0) {
                            for (var u = 0, sizeu = lstUserCalenVO.length; u < sizeu; u++) {
                                var vou = lstUserCalenVO[u];
                                if (vou != null && vou != undefined) {
                                    for (var indexL = 0; indexL < arrLeader.length; indexL++) {
                                        if (arrLeader[indexL] == vou.userId) {
                                            if (vou.statusTxt == 'Đã phê duyệt') {
                                                if (vou.statusHouse == 0) {
                                                    //sang
                                                    contentAM[indexL] = (contentAM[indexL] == undefined ? '' : contentAM[indexL]) + '<b>' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + ': </b>';
                                                    var title = "";
                                                    if (vou.title != undefined && vou.title.length > 0) {
                                                        title = VitxUtils.XSSEncode(vou.title);
                                                    }
                                                    if (vou.content != undefined && vou.content.length > 0) {
                                                        title = title + "- Nội dung: " + VitxUtils.XSSEncode(vou.content);
                                                    }
                                                    var location = "";
                                                    if (vou.meetingPlace != undefined && vou.meetingPlace.length > 0) {
                                                        location = location + VitxUtils.XSSEncode(vou.meetingPlace);
                                                    }
                                                    if (vou.location != undefined && vou.location.length > 0) {
                                                        location = location + ", " + VitxUtils.XSSEncode(vou.location);
                                                    }
                                                    if (location.length > 0) {
                                                        title = title + "- Địa điểm: " + location;
                                                    }
                                                    if (vou.prepare != undefined && vou.prepare.length > 0) {
                                                        title = title + "- Chuẩn bị: " + VitxUtils.XSSEncode(vou.prepare);
                                                    }
                                                    contentAM[indexL] = (contentAM[indexL] == undefined ? '' : contentAM[indexL]) + title;
                                                    contentAM[indexL] = (contentAM[indexL] == undefined ? '' : contentAM[indexL]) + '<br/>';

                                                } else {
                                                    //chieu
                                                    contentPM[indexL] = (contentPM[indexL] == undefined ? '' : contentPM[indexL]) + '<b>' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + ': </b>';
                                                    var title = "";
                                                    if (vou.title != undefined && vou.title.length > 0) {
                                                        title = VitxUtils.XSSEncode(vou.title);
                                                    }
                                                    if (vou.content != undefined && vou.content.length > 0) {
                                                        title = title + "- Nội dung: " + VitxUtils.XSSEncode(vou.content);
                                                    }
                                                    var location = "";
                                                    if (vou.meetingPlace != undefined && vou.meetingPlace.length > 0) {
                                                        location = location + VitxUtils.XSSEncode(vou.meetingPlace);
                                                    }
                                                    if (vou.location != undefined && vou.location.length > 0) {
                                                        location = location + ", " + VitxUtils.XSSEncode(vou.location);
                                                    }
                                                    if (location.length > 0) {
                                                        title = title + "- Địa điểm: " + location;
                                                    }
                                                    if (vou.prepare != undefined && vou.prepare.length > 0) {
                                                        title = title + "- Chuẩn bị: " + VitxUtils.XSSEncode(vou.prepare);
                                                    }
                                                    contentPM[indexL] = (contentPM[indexL] == undefined ? '' : contentPM[indexL]) + title;
                                                    contentPM[indexL] = (contentPM[indexL] == undefined ? '' : contentPM[indexL]) + '<br/>';
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                htmlContentData = htmlContentData.trim() + '		<tr>';
                htmlContentData = htmlContentData.trim() + '			<td width="150" rowspan="2" style="vertical-align: middle !important;"><b>' + sDays + '</b></td>';
                htmlContentData = htmlContentData.trim() + '			<td width="50" align="center" style="vertical-align: middle !important;">Sáng</td>';
                for (var indexL = 0; indexL < arrLeader.length; indexL++) {
                    htmlContentData = htmlContentData.trim() + '			<td style="vertical-align: middle !important;">' + (contentAM[indexL] == undefined ? '' : contentAM[indexL]) + '</td>';
                }
                htmlContentData = htmlContentData.trim() + '		</tr>'
                htmlContentData = htmlContentData.trim() + '		<tr>';
                htmlContentData = htmlContentData.trim() + '			<td width="50" align="center" style="vertical-align: middle !important;">Chiều</td>';
                for (var indexL = 0; indexL < arrLeader.length; indexL++) {
                    htmlContentData = htmlContentData.trim() + '			<td style="vertical-align: middle !important;">' + (contentPM[indexL] == undefined ? '' : contentPM[indexL]) + '</td>';
                }
                htmlContentData = htmlContentData.trim() + '		</tr>'

                htmlContent = htmlContent.trim() + htmlContentData;
                dem++;
            }
            htmlContent = htmlContent.trim() + '	</tbody>';
            htmlContent = htmlContent.trim() + '</table>';
            htmlContent = htmlContent.trim() + htmlContentDays;
            $('#div_content_week').html(htmlContent).change().show();
        }
    }
}
;

function callbackSearchCalendarView3(data, sLead, sLeadName) {
    if (data != null && data != undefined) {
        var htmlContent = '';
        var htmlContentDay = '';
        var size = data.length;
        var cDate = jqCalendarDocView._mapDay.fDate;
        var strLeader = sLead;
        var arrLeader = strLeader.toString().split('|');
        var arrLeaderName = sLeadName.toString().split('|');
        var dem = 0;        
        while (dem < 7) {
            cDate = jqCalendarDocView.getAddDate(cDate, dem);
            var cDateTxt = jqCalendarDocView.getDateStrddMMyyy(cDate).trim();
            var sDays = cDateTxt;
            if (dem == 0) {
                sDays = "Thứ 2, ngày " + cDateTxt
            } else if (dem == 1) {
                sDays = "Thứ 3, ngày " + cDateTxt
            } else if (dem == 2) {
                sDays = "Thứ 4, ngày " + cDateTxt
            } else if (dem == 3) {
                sDays = "Thứ 5, ngày " + cDateTxt
            } else if (dem == 4) {
                sDays = "Thứ 6, ngày " + cDateTxt
            } else if (dem == 5) {
                sDays = "Thứ 7, ngày " + cDateTxt
            } else if (dem == 6) {
                sDays = "Chủ nhật, ngày " + cDateTxt
            }
            var dataparent = 'accordion1' + dem;
            var href = 'collapse' + dem;            
            htmlContentDay = '<div class="panel panel-default">';// 1.start
            htmlContentDay += '<div class="panel-heading">';//2.start
            htmlContentDay += '<h4 class="panel-title">';
            htmlContentDay += '<a class="schedule" data-toggle="collapse" data-parent="#' + dataparent + '" href="#' + href + '">' + sDays + '</a>'
            htmlContentDay += '</h4>';
            htmlContentDay += "</div>";// 2.end
            htmlContentDay += '<div id="' + href + '" class="panel-collapse collapse in">';//3.start
            htmlContentDay += '<div class="panel-body">';

            for (var leader = 0; leader < arrLeader.length; leader++) {
                var leaderId = arrLeader[leader];
                var leaderName = arrLeaderName[leader];
                var arrCalenVO = [];
                for (var d = 0; d < size; d++) {
                    var vod = data[d];
                    if (cDateTxt === vod.beginDateTxt.toString().trim()) {
                        sDays = VitxUtils.XSSEncode(vod.showDateVN);
                        var lstUserCalenVO = vod.lstDetail;
                        if (lstUserCalenVO != null && lstUserCalenVO != undefined && lstUserCalenVO.length > 0) {
                            for (var u = 0, sizeu = lstUserCalenVO.length; u < sizeu; u++) {
                                var vou = lstUserCalenVO[u];
                                if (vou != null && vou != undefined) {
                                    if (vou.statusTxt == 'Đã phê duyệt' && vou.userId == leaderId) {
                                        arrCalenVO.push(vou);
                                    }
                                }
                            }
                        }
                    }
                }
                if (arrCalenVO.length > 0) {
                    htmlContentDay += '<h4 class="tit_lanhdao tit_week bg-primary">';
                    htmlContentDay += '<img src="Share/img/calendar/user.png" alt="" width="28px"><a class="ui-link">' + leaderName + '</a>';
                    htmlContentDay += "</h4>";
                    htmlContentDay += "<ul>";
                    for (var c = 0; c < arrCalenVO.length; c++) {
                        htmlContentDay += '<li style="">';
                        htmlContentDay += '<span class="daytime" style="text-decoration:none">' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + '</span>';
                        var title = "";
                        if (vou.title != undefined && vou.title.length > 0) {
                            title = VitxUtils.XSSEncode(vou.title);
                        }
                        if (vou.content != undefined && vou.content.length > 0) {
                            title = title + "- Nội dung: " + VitxUtils.XSSEncode(vou.content);
                        }
                        var location = "";
                        if (vou.meetingPlace != undefined && vou.meetingPlace.length > 0) {
                            location = location + VitxUtils.XSSEncode(vou.meetingPlace);
                        }
                        if (vou.location != undefined && vou.location.length > 0) {
                            location = location + ", " + VitxUtils.XSSEncode(vou.location);
                        }
                        if (location.length > 0) {
                            title = title + "- Địa điểm: " + location;
                        }
                        if (vou.prepare != undefined && vou.prepare.length > 0) {
                            title = title + "- Chuẩn bị: " + VitxUtils.XSSEncode(vou.prepare);
                        }
                        htmlContentDay += '<a type="submit" data-toggle="modal" data-target="#largeModal" href="#" class="txtnoidung ui-link" style="">' + title + '</a>';
                        htmlContentDay += '</li>';
                    }
                    htmlContentDay += "</ul>";
                }
            }
            htmlContentDay += "</div>";
            htmlContentDay += "</div>";// 3.end            
            htmlContentDay += "</div>";// 1.end            
            htmlContent = htmlContent.trim() + htmlContentDay;
            dem++;
        }        
        $('#div_content_week').html(htmlContent).change().show();
    }
};

/**
 * Xu ly ket ajax tra ve
 *
 * @author hunglm16
 * @param data
 * @since 24/03/2016
 */
function callbackSearchCalendarOfDept(data) {
    if (data != null && data != undefined) {
        var htmlContent = '';
        var size = data.length;
        var cDate = jqCalendarDocView._mapDay.fDate;
        var dem = 0;
        while (dem < 7) {
            cDate = jqCalendarDocView.getAddDate(cDate, dem);
            var dText = dem + 2;
            htmlContent = htmlContent.trim() + '<table id="calendar-table-view-' + dText + '" class="table table-bordered no-margin calendar-table-view" align="center" border="0" cellspacing="0" width="100%">';
            htmlContent = htmlContent.trim() + '	<tbody>';
            var cDateTxt = jqCalendarDocView.getDateStrddMMyyy(cDate).trim();
            for (var d = 0; d < size; d++) {
                var vod = data[d];
                if (cDateTxt === vod.beginDateTxt.toString().trim()) {
                    htmlContent = htmlContent.trim() + '		<tr>';
                    htmlContent = htmlContent.trim() + '			<td colspan="10" style="padding: 0px">';
                    htmlContent = htmlContent.trim() + '				<table class="on table table-condensed table-bordered table-hover no-margin" id="blck0" align="center" border="0" cellspacing="0" width="100%">';
                    htmlContent = htmlContent.trim() + '					<tbody>';
                    htmlContent = htmlContent.trim() + '						<tr id="title0" class="titleHead">';
                    htmlContent = htmlContent.trim() + '							<td colspan="7" style="background-color: rgb(49, 134, 155); color: #222;" class="title01" align="center" height="32" valign="bottom">';
                    htmlContent = htmlContent.trim() + '								<b>' + VitxUtils.XSSEncode(vod.showDateVN) + '</b>';
                    htmlContent = htmlContent.trim() + '							</td>';
                    htmlContent = htmlContent.trim() + '						</tr>';
                    htmlContent = htmlContent.trim() + '		<tr style="background-color: #eee; color: #333; text-align:center; font-weight:bold;">';
                    htmlContent = htmlContent.trim() + '			<td align="center" width="5" style="vertical-align: middle !important;">STT</td>';
                    htmlContent = htmlContent.trim() + '			<td align="center" style="vertical-align: middle !important;" width="100">Thời gian</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Nội dung</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Chủ trì</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Chuẩn bị</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Tham gia</td>';
                    htmlContent = htmlContent.trim() + '			<td style="vertical-align: middle !important;">Trạng thái</td>';
                    htmlContent = htmlContent.trim() + '		</tr>';
                    var lstUserCalenVO = vod.lstDetail;
                    if (lstUserCalenVO != null && lstUserCalenVO != undefined && lstUserCalenVO.length > 0) {
                        for (var u = 0, sizeu = lstUserCalenVO.length; u < sizeu; u++) {
                            var vou = lstUserCalenVO[u];
                            if (vou != null && vou != undefined) {
                                htmlContent = htmlContent.trim() + '		<tr>';
                                htmlContent = htmlContent.trim() + '			<td align="center" width="10" style="vertical-align: middle !important;">' + (u + 1) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td align="center" style="vertical-align: middle !important;" width="90">' + VitxUtils.XSSEncode(vou.beginHms.replace(":", "h")) + ' - ' + VitxUtils.XSSEncode(vou.endHms) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="300" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.title) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="150" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.chief) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="150" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.prepare) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="300" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.participant) + '</td>';
                                htmlContent = htmlContent.trim() + '			<td width="120" style="vertical-align: middle !important;">' + VitxUtils.XSSEncode(vou.statusTxt) + '</td>';
                                htmlContent = htmlContent.trim() + '		</tr>';
                            }
                        }
                    }
                    htmlContent = htmlContent.trim() + '		<tr>';
                    htmlContent = htmlContent.trim() + '			<td colspan="7" align="center" height="32" valign="bottom"></td>';
                    htmlContent = htmlContent.trim() + '		</tr> ';

                    htmlContent = htmlContent.trim() + '					</tbody>';
                    htmlContent = htmlContent.trim() + '				</table>';
                    htmlContent = htmlContent.trim() + '			</td>';
                    htmlContent = htmlContent.trim() + '		</tr>';
                }
            }
            htmlContent = htmlContent.trim() + '	</tbody>';
            htmlContent = htmlContent.trim() + '</table>';
            dem++;
        }
        $('#div_content_week').html(htmlContent).change().show();
    }
}
;