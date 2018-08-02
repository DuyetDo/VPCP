/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var toolBar = new Object();
toolBar.selection = null;
toolBar.widget = null;

addDay = function (date, day) {
    var time = date.getTime();
    time = time + day * 24 * 60 * 60 * 1000;
    var newDate = new Date();
    newDate.setTime(time);
    return newDate;
};

addToolbar = function (imgUrl, title, action) {
	if (action != undefined && action != null && action.trim() === 'onOpenCreate') {
		$('#btnOnOpenCreate').show();
	} else {
		var img = document.createElement("img");
		img.setAttribute("src", imgUrl);
		img.setAttribute("class", "img-cal");
		img.setAttribute("title", title);
		img.setAttribute("action", action);
		img.setAttribute("onclick", "sendAction('" + action + "')");
		var bar = document.getElementById("toolBar");
		var itemExist = jq(bar).find("img[action='" + action + "']");
		if (itemExist.length == 0) {
			jq(bar).append(img);
		}
	}
};

addButtonToToolbar = function (id, label, action) {
    if (document.getElementById(id) == null) {
        var button = document.createElement("button");
        button.innerHTML = label;
        button.setAttribute("id", id);
        button.setAttribute("class", "DTTT_button btn btn-white btn-info button-height-28px fontsize13");
        button.setAttribute("style","color: #478fca;margin-right: 5px;border-color: #8fbcd9;height: 28px;");
        button.setAttribute("onclick", "sendAction('" + action + "');");
        var bar = document.getElementById("toolBar");
        bar.appendChild(button);
    }
};

addButtonToToolbarId = function (toolbarId, id, label, action) {
    if (document.getElementById(id) == null) {
        var button = document.createElement("button");
        button.innerHTML = label;
        button.setAttribute("id", id);
        button.setAttribute("class", "DTTT_button btn btn-white btn-info button-height-28px fontsize13");
        button.setAttribute("style","color: #478fca;margin-right: 5px;border-color: #8fbcd9;height: 28px;");
        button.setAttribute("onclick", "sendAction('" + action + "');");
        var bar = document.getElementById(toolbarId);
        bar.appendChild(button);
    }
};

addButtonToToolbarNew = function (id, label, action, icon) {
    if (document.getElementById(id) == null) {
        var button = document.createElement("button");
        button.innerHTML = label;
        button.setAttribute("id", id);
        button.setAttribute("class", "btnExport DTTT_button btn btn-white btn-info button-height-28px fontsize13");
        /*button.setAttribute("iconSclass", "fa "+ icon +" bigger-110");*/
        button.setAttribute("style","color: #478fca;border-color: #8fbcd9;height: 28px;");
        button.setAttribute("onclick", "sendAction('" + action + "');");
        var bar = document.getElementById("toolBar");
        bar.appendChild(button);
    }
};

addPrintToolbar = function () {
    var img = document.createElement("img");
    img.setAttribute("src", "Share/img/icon/print.gif");
    img.setAttribute("title", "In ấn");
    img.setAttribute("class", "img-cal");
    img.setAttribute("onclick", "printPage();");
    var bar = document.getElementById("toolBar");
    bar.appendChild(img);

}

printPage = function () {
    document.getElementById("topDiv").style.display = "none";
    document.getElementById("toolBar").style.display = "none";
    window.print();
    document.getElementById("topDiv").style.display = "";
    document.getElementById("toolBar").style.display = "";
}

toolBarCheckSearch = function (event) {
    if (event.keyCode === 13) {
        toolBarSearch();
    }
};

sendAction = function (action) {
    var wgt = zk.Widget.$("$" + toolBar.widget);
    zAu.send(new zk.Event(wgt, action, null));
};


toolBarSearch = function () {
    if (toolBar.widget !== null) {
        var text = document.getElementById("searchFullText").value;
        var data = {
            'searchText': text
        };
        if ($('#lbxYearBySearch').length > 0) {
        	//Xu ly 
        	var arrStyle = $('[id^="workingTime"]');
        	var length = arrStyle.length;
        	if (arrStyle.length > 0) {
				for (var i = 0; i < length; i++) {
					$(arrStyle[i]).prop("style", "");
				}
        	}
        	data.year = $('#lbxYearBySearch').val();
        }
        var wgt = zk.Widget.$("$" + toolBar.widget);
        zAu.send(new zk.Event(wgt, 'onSearchFullText', {'': data}));
    }
};

onOpenCreate = function () {
    if (toolBar.widget !== null) {
        var wgt = zk.Widget.$("$" + toolBar.widget);
        zAu.send(new zk.Event(wgt, 'onOpenCreate'));
    }
};

changeWorkingDay = function (type) {
    try {
        if (toolBar.selection !== null) {
            if (document.getElementById("workingTime" + toolBar.selection) !== null)
                document.getElementById("workingTime" + toolBar.selection)
                        .setAttribute("style", "");
        }
        toolBar.selection = type;
        var obj = document.getElementById("workingTime" + toolBar.selection);
        if (obj !== null)
            obj.setAttribute("style", "background-color:lightcoral");
    } catch (en) {
        console.log(en);
    }

    var fromDate = new Date();
    var toDate = new Date();
    var year = fromDate.getFullYear();
    var month = fromDate.getMonth();
    var day = fromDate.getDay();

    if ($('#lbxYearBySearch').length > 0) {
    	$('#lbxYearBySearch').prop('selectedIndex', 0);
    }
    
    switch (type) {
        case 0:
            break;
        case 1:
            break;
        case 2: // HOM QUA
            fromDate = addDay(new Date(), -1);
            toDate = addDay(new Date(), -1);
            break;
        case 3: // TUAN NAY
            fromDate = addDay(new Date(), -1 * day);
            toDate = addDay(new Date(), 6 - day);
            break;
        case 4: // TUAN TRUOC
            fromDate = addDay(new Date(), -1 * (day + 7));
            toDate = addDay(new Date(), -1 - day);
            break;
        case 5: // THANG NAY
            fromDate = new Date(year, month, 1, 0, 0, 0, 0);
            month = month + 1;
            if (month === 12) {
                month = 0;
                year = year + 1;
            }
            toDate = new Date(year, month, 1, 0, 0, 0, 0);
            toDate = addDay(toDate, -1);
            break;
        case 6: // THANG TRUOC
            toDate = new Date(year, month, 1, 0, 0, 0, 0);
            month = month - 1;
            if (month < 0) {
                month = 11;
                year = year - 1;
            }
            fromDate = new Date(year, month, 1, 0, 0, 0, 0);
            toDate = addDay(toDate, -1);
            break;
        case 7: // NAM NAY
            toDate = new Date(year, 11, 31, 0, 0, 0, 0);
            fromDate = new Date(year, 0, 1, 0, 0, 0, 0);
            break;
        case 8: // NAM TRUOC
            toDate = new Date(year - 1, 11, 31, 0, 0, 0, 0);
            fromDate = new Date(year - 1, 0, 1, 0, 0, 0, 0);
            break;
        default:
            fromDate = addDay(new Date(), -1 * day);
            toDate = addDay(new Date(), 6 - day);
            break;

    }
    var text = document.getElementById("searchFullText").value;
    var data = {
        'searchText': text,
        'fromDate': fromDate.getTime(),
        'toDate': toDate.getTime()
    };

    if (toolBar.widget !== null) {
        var wgt = zk.Widget.$("$" + toolBar.widget);
        if (wgt != null) {
            zAu.send(new zk.Event(wgt, 'onChangeTime', {'': data}, {'': {
                    'toServer': true
                }}));
        } else {
            console.log("toolbar.js: can't find widget");
        }

    }

};
