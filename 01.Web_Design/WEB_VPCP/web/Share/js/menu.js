/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var menu = new Object();

$(document).ready(function () {
    $(document).on("keydown", handleKeyDown);
});

handleKeyDown = function (e) {
    // Bat su kien an nut refresh
    if ((e.which || e.keyCode) == 116) {
        sendCountRequest();
    }
};
getClassIconMenuChildrenEx = function (menuType, url) {
    if (menuType == undefined || menuType == null) {
        menuType = -1;
    }
    if (url == undefined || url == null) {
        url = '';
    }
    if (menuType < 0) {
        if (url.contains('/printReport.zul') || url.contains('/reportBook.zul')) {
            menuType = 108;
        } else if (url.contains('/docInStatisticReport.zul') || url.contains('/report.zul')) {
            menuType = 107;
        } else if (url.contains('/app.zul')) {
            menuType = 201;
        } else if (url.contains('/userMan.zul')) {
            menuType = 202;
        } else if (url.contains('/roleManage.zul')) {
            menuType = 203;
        } else if (url.contains('/dept.zul')) {
            menuType = 204;
        } else if (url.contains('/flowManager.zul')) {
            menuType = 205;
        } else if (url.contains('/authority/authorityManage.zul')) {
            menuType = 206;
        } else if (url.contains('/outsideOffice/index.zul')) {
            menuType = 207;
        } else if (url.contains('/category/catManage.zul')) {
            menuType = 208;
        } else if (url.contains('/resource/resourceManager.zul')) {
            menuType = 209;
        } else if (url.contains('/books/bookManage.zul')) {
            menuType = 210;
        } else if (url.contains('/holiday/holidayManage.zul')) {
            menuType = 211;
        } else if (url.contains('/template/templateMan.zul')) {
            menuType = 212;
        } else if (url.contains('/position/positionView.zul')) {
            menuType = 213;
        } else if (url.contains('/toolbox/listTool.zul')) {
            menuType = 214;
        } else if (url.contains('/log/logMan.zul')) {
            menuType = 215;
        }
    }
    var classIcon = "menu-icon fa fa-list-alt";
    switch (menuType) {
        case 215://Quan ly Log
            classIcon = "menu-icon fa  fa-database";
            break;
        case 214:
            classIcon = "menu-icon fa fa-gears";
            break;
        case 213://Quan ly chuc vu
            classIcon = "menu-icon fa fa-male";
            break;
        case 212://Quan ly bieu mau
            classIcon = "menu-icon fa fa-file-text-o";
            break;
        case 211://Quan ly ngay nghi
            classIcon = "menu-icon fa fa-calendar-o";
            break;
        case 210://So van ban
            classIcon = "menu-icon fa fa-book";
            break;
        case 209://Quan ly tai nguyen
            classIcon = "menu-icon fa fa-recycle";
            break;
        case 208://Quan ly danh muc
            classIcon = "menu-icon fa fa-list-ul";
            break;
        case 207://Quan ly don vi ngoai
            classIcon = "menu-icon fa fa-building-o";
            break;
        case 206://Uy quyen
            classIcon = "menu-icon fa fa-hand-o-right";
            break;
        case 205://Quan ly luong
            classIcon = "menu-icon fa fa-retweet";
            break;
        case 204://Don vi
            classIcon = "menu-icon fa fa-bank";
            break;
        case 203://Vai tro
            classIcon = "menu-icon fa fa-users";
            break;
        case 202://Nguoi dung
            classIcon = "menu-icon fa fa-user";
            break;
        case 201://Ung dung
            classIcon = "menu-icon fa fa-cubes";
            break;
        case 108://Bao cao in so
            classIcon = "menu-icon fa fa-book";
            break;
        case 107://Bao cao thong ke
            classIcon = "menu-icon fa fa-bar-chart-o";
            break;
        case 25://Văn bản đi – văn bản đã hủy
            classIcon = "menu-icon fa fa-trash-o";
            break;
        case 20://Văn bản đi – VB trình ban hành
            classIcon = "menu-icon fa fa-briefcase";
            break;
        case 71:
            classIcon = "menu-icon fa fa-check-square-o";
            break;
        case 70:
            classIcon = "menu-icon fa fa-spinner";
            break;
        case 67:
            classIcon = "menu-icon fa fa-tags";
            break;
        case 66:
            classIcon = "menu-icon fa fa-sort-amount-desc";
            break;
        case 65:
            classIcon = "menu-icon fa fa-sort-amount-asc";
            break;
        case 64:
            classIcon = "menu-icon fa fa-certificate";
            break;
        case 63:
            classIcon = "menu-icon fa fa-pencil-square-o";
            break;
        case 62:
            classIcon = "menu-icon fa fa-tasks";
            break;
        case 61:
            classIcon = "menu-icon fa fa-sign-out";
            break;
        case 17:
            classIcon = "menu-icon fa fa-search";
            break;
        case 14://Du thao
            classIcon = "menu-icon fa fa-pencil-square-o";
            break;
        case 13://Tra cuu van ban
            classIcon = "menu-icon fa fa-search";
            break;
        case 12://Ban hanh
            classIcon = "menu-icon fa fa-paper-plane-o";
            break;
        case 11://Tiep nhan van ban
            classIcon = "menu-icon fa fa-inbox";
            break;
        case 10:
            classIcon = "menu-icon fa fa-print";
            break;
        case 9:
            classIcon = "menu-icon fa fa-book";
            break;
        case 8://Van ban den da cho y kien
            classIcon = "menu-icon fa fa-comments";
            break;
        case 7:
            classIcon = "menu-icon fa fa-comments-o";
            break;
        case 6://Da ban hanh
            classIcon = "menu-icon fa fa-paper-plane-o";
            break;
        case 5://Da xu ly
            classIcon = "menu-icon fa fa-reply-all";
            break;
        case 4://Nhan de biet
            classIcon = "menu-icon fa fa-tags";
            break;
        case 3://Da xu ly
            classIcon = "menu-icon fa fa-check-square-o";
            break;
        case 2://Dang xu ly
            classIcon = "menu-icon fa fa-spinner";
            break;
        case 1://Cho xu ly
            classIcon = "menu-icon fa fa-clock-o";
            break;
        case 0:
            classIcon = "menu-icon fa fa-calendar";
            break;
    }
    return classIcon;
};

getClassIconMenuChildren = function (menuType) {
    if (menuType == undefined || menuType == null) {
        menuType = 0;
    }
    var classIcon = "menu-icon fa fa-list-alt";
    switch (menuType) {
        case 13://Tra cuu van ban
            classIcon = "menu-icon fa fa-search";
            break;
        case 11://Tiep nhan van ban
            classIcon = "menu-icon fa fa-folder-open";
            break;
        case 3://Da xu ly
            classIcon = "menu-icon fa fa-pencil-square-o";
            break;
        case 2://Dang xu ly
            classIcon = "menu-icon fa fa-refresh";
            break;
        case 1://Cho xu ly
            classIcon = "menu-icon fa fa-clock-o";
            break;
        case 0://Bao cao
            classIcon = "menu-icon fa fa-bar-chart-o";
            break;
    }
    return classIcon;
};

getImageURLOfFunction = function (url) {
    var urlImg = "Share/img/menu/file_list_to_do.png";
    switch (url) {
        case "/Pages/admin/application/app.zul":
            urlImg = "Share/img/menu/application.png";
            break;
        case "/Pages/admin/user/userMan.zul":
            urlImg = "Share/img/menu/userManager.png";
            break;
        case "/Pages/admin/role/roleManage.zul":
            urlImg = "Share/img/menu/roleManager.png";
            break;
        case "/Pages/admin/department/dept.zul":
            urlImg = "Share/img/menu/deptManager.png";
            break;
        case "/Pages/admin/flow/flowManager.zul":
            urlImg = "Share/img/menu/flowManager.png";
            break;
        case "/Pages/admin/outsideOffice/index.zul":
            urlImg = "Share/img/menu/outsideOffice.png";
            break;
        case "/Pages/admin/category/catManage.zul":
            urlImg = "Share/img/menu/categoryManager.png";
            break;
        case "/Pages/document/template/templateMan.zul":
            urlImg = "Share/img/menu/templateManager.png";
            break;
        case "/Pages/document/docIn/docInAll.zul?menuType=0":
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=1&roleType=2":
        case "/Pages/document/docIn/docInList.zul?menuType=1":
            urlImg = "Share/img/menu/waitingDoc.png";
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=2":
            urlImg = "Share/img/menu/processingDoc.png";
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=3":
            urlImg = "Share/img/menu/processedDoc.png";
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=5":
            urlImg = "Share/img/menu/retrieveDoc.png";
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=4":
            urlImg = "Share/img/menu/receiveToKnow.png";
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=7":
            urlImg = "Share/img/menu/waitingOpinion.png";
            break;
        case "/Pages/document/docIn/docInList.zul?menuType=8":
            urlImg = "Share/img/menu/gaveOpinion.png";
            break;
        case "/Pages/document/docIn/reportBook.zul":
            urlImg = "Share/img/menu/report.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul":
            urlImg = "Share/img/menu/draftDoc.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul?menuType=1":
            urlImg = "Share/img/menu/waitingDoc.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul?menuType=3":
            urlImg = "Share/img/menu/processedDoc.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul?menuType=12":
            urlImg = "Share/img/menu/processedDoc.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul?menuType=5":
            urlImg = "Share/img/menu/retrieveDoc.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul?menuType=7":
            urlImg = "Share/img/menu/receiveToKnow.png";
            break;
        case "/Pages/document/docOut/docDraftMan.zul?menuType=8":
            urlImg = "Share/img/menu/gaveOpinion.png";
            break;
    }
    return urlImg;
};

// phuctm2:
highlightSelectedMenu = function (menuId) {
    try {
        var currentMenu = localStorage.menuId;
        var menu;
        if (currentMenu != null) {
            menu = document.getElementById("img" + currentMenu);
            if (menu != null && menu.style.display != "none") {
                menu.setAttribute("class", "");
            }
        }
        localStorage.menuId = menuId;
        var selectMenu = document.getElementById("img" + menuId);
        selectMenu.setAttribute("class", "selected");
    } catch (ex) {
        console.log(ex);
    }
};

// hoangnv28
unhighlightSelectedMenu = function () {
    try {
        var currentMenuId = localStorage.menuId;
        if (currentMenuId != null) {
            menuComponent = document.getElementById("img" + currentMenuId);
            if (menuComponent != null && menuComponent.style.display != "none") {
                menuComponent.setAttribute("class", "");
            }
            localStorage.menuId = null;
        }
    } catch (ex) {
        console.log(ex);
    }
};

getMenuByUrl = function (url, exactly) {
    var lstMenu = page.token.lstMenu;
    var i, j, mainMenu, subMenu;
    if (lstMenu != null && lstMenu.length > 0) {
        for (i = 0; i < lstMenu.length; i++) {
            mainMenu = lstMenu[i];
            if (mainMenu.lstMenu != null && mainMenu.lstMenu) {
                for (j = 0; j < mainMenu.lstMenu.length; j++) {
                    subMenu = mainMenu.lstMenu[j];
                    if (exactly && subMenu.menuUrl === url) {
                        return subMenu;
                    } else if (!exactly && subMenu.menuUrl.indexOf(url) > -1) {
                        return subMenu;
                    }
                }
            }
        }
    }
};

gotoMenuByUrl = function (url) {
    var menu = getMenuByUrl(url);
    if (menu != null) {
        gotoMenu(menu.menuId, menu.menuUrl)
    }
}

// phuctm2: strVnForm is dd/MM/yyyy
function convertStrVnFormToDate(strVnForm) {
    if (strVnForm != null) {
        try {
            var strTemp = new Date(parseInt(strVnForm.substring(6, 10)),
                    parseInt(strVnForm.substring(3, 5)) - 1, parseInt(strVnForm
                    .substring(0, 2)), 0, 0, 0, 0);
            return eval(strTemp);
        } catch (ex) {
        }
    }
    return null;
}

function getFirstTimeOfDate(thisDay) {
    try {
        thisDay.setHours(0);
        thisDay.setMinutes(0);
        thisDay.setSeconds(0);
        thisDay.setMilliseconds(0);
        return thisDay;
    } catch (ex) {

    }
    return null;
}

// phuctm2: onBlurDBx
function onBlurDBx(thisBDx) {
    // console.debug(document.getElementById(thisBDx.uuid + '-real').value);
    var temp = convertStrVnFormToDate(document.getElementById(thisBDx.uuid
            + '-real').value);
    thisBDx.setValue(temp);
    var today = getFirstTimeOfDate(new Date());
    today.addDays(1);
    if (thisBDx._constraint.indexOf("no future") > -1
            && temp.getTime() > today.getTime()) {
        // console.debug(1);
    } else {
        thisBDx.fireOnChange();
    }
}

// phuctm2: Note focusMenuByUrl is called in server
focusMenuByUrl = function (url) {
    var menu = getMenuByUrl(url);
    if (menu != null) {
        highlightSelectedMenu(menu.menuId)
    }
}

gotoMenuUrl = function (url) {
    var menu = getMenuByUrl(url);
    if (menu != null) {
        gotoMenu(menu.menuId, menu.menuUrl)
    }
}

gotoMenu = function (menuId, url) {
    highlightSelectedMenu(menuId);

    var wgt = zk.Widget.$("mainContent");
    data = {
        url: url
    };
    page.token.lstMenuHistory.push(url);
    page.token.lstMenuHistoryId.push(menuId);
    var tabid = $('#menuUL li.selected').attr('name');
    page.token.lstMenuHistoryTabId.push(tabid.substring(2));
    zAu.send(new zk.Event(wgt, 'onLoadPage', url));
};

/**
 * @author hunglm16
 */
gotoMenuV2 = function (menuId, url, idActive) {
    //Xoa du lieu man hing content
    $('.main-content.bg-white').html('').change();
    //Bo tat cac cac active
    var arrActive = $('.active.open.hover');
    for (var i = 0, size = arrActive.length; i < size; i++) {
        $(arrActive[0]).removeClass("active open hover");
    }
    if (idActive != undefined && idActive != null && $('#' + idActive).length > 0) {
        //Them active cho su kien click
        $('#' + idActive).addClass("active open hover").change();
    }
    var wgt = zk.Widget.$("mainContent");
    data = {
        url: url
    };
    page.token.lstMenuHistory.push(url);
    page.token.lstMenuHistoryId.push(menuId);
    //var tabid = $('#menuUL li.selected').attr('name');
    //page.token.lstMenuHistoryTabId.push(tabid.substring(2));
    zAu.send(new zk.Event(wgt, 'onLoadPage', url));
};

// phuctm2
prepareDisplaySelectTab = function (tabOrder, tabName) {
    //
    // hide menu of previous tab
    //
    try {
        var hideItem = localStorage.lastTabOrder;
        if (hideItem != null && hideItem != tabOrder) {
            var hideTab = document.getElementsByName("li" + hideItem);
            hideTab[0].setAttribute("class", "");
            var hideItems = document.getElementsByName("group" + hideItem);
            var i = 0;
            for (i = 0; i < hideItems.length; i++) {
                hideItems[i].setAttribute("style", "display:none");
            }
        }
    } catch (e) {
        console.log("when selectab have error : " + e);
    }
    //
    // display menu of tab
    //
    var items = document.getElementsByName("group" + tabOrder);
    if (items == null || items.length == 0) {
        tabOrder = "0";
        items = document.getElementsByName("group" + tabOrder);
    }
    var i = 0;
    for (i = 0; i < items.length; i++) {
        items[i].setAttribute("style", "display:''");
    }
    var displayTab = document.getElementsByName("li" + tabOrder);
    displayTab[0].setAttribute("class", "selected");
    localStorage.lastTabOrder = tabOrder;
    localStorage.lastTabName = tabName;
}

selectTab = function (tabOrder, tabName, menuId, url) {
    prepareDisplaySelectTab(tabOrder, tabName)
    if (menuId != null) {
        gotoMenu(menuId, url);
    }
    // sendCountRequest(tabName);
};

sendCountRequest = function (tabName) {
    var url;
    if (tabName == null) {
        tabName = localStorage.lastTabName;
    }
    var projectNamePattern = /\/.*?\//;
    var matchedResult = projectNamePattern.exec(window.location.pathname);
    if (matchedResult.length == 0) {
        return;
    }
    var projectName = matchedResult[0];
    switch (tabName) {
        case "Văn bản đến":
            url = window.location.origin + projectName + "countMenu?objectType=1";
            break;
        case "Văn bản đi":
            url = window.location.origin + projectName + "countMenu?objectType=2";
            break;
        case "Phiếu trình":
            url = window.location.origin + projectName + "countMenu?objectType=7";
            break;
        case "Hồ sơ công việc":
            url = window.location.origin + projectName + "countMenu?objectType=30";
            break;
        default:
            url = null;
            break;
    }
    if (tabName != null && url != null) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                displayMenuCountValue(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus);
                // console.log(errorThrown);
            }
        });
    }
};

// hoangnv28: hien thi so luong van ban tren moi menu
displayMenuCountValue = function (countValues, objectType) {
    if (countValues != null) {
        var numberOfDocSpan;
        for (var i = 0; i < countValues.length; i++) {
            var idCountTopChidren = "#idCountTopChidren" + countValues[i].menuId;
            if ($(idCountTopChidren).length > 0) {
                if (Number(countValues[i].count) == 0) {
                    $(idCountTopChidren).html('').change();
                } else {
                    $(idCountTopChidren).html(countValues[i].count).change();
                }
            }
            /**
             * Dem cua cac me nu giao dien cu
             * @author hunglm16
             * @since 18/08/1988
             *
             numberOfDocSpan = document.getElementById("span" + countValues[i].menuId);
             if (numberOfDocSpan != null) {
             if (countValues[i].count == '0') {
             numberOfDocSpan.innerHTML = '';
             } else {
             numberOfDocSpan.innerHTML = countValues[i].count;
             }
             }
             */
        }

        switch (objectType) {
            case 1:
                setNumberOfDocInHome(countValues);
                break;
            case 2:
                setNumberOfDocOutHome(countValues);
                break;
            case 35:
                setNumberOfTaskInHome(countValues);
                break;
        }


    }
};

setNumberOfDocOutHome = function (values) {
    var chkWaitingProcessDocOut = false;
    var chkDocOutInWeek = false;
    var chkDocOutPublish = false;
    for (var i = 0; i < values.length; i++) {
        switch (values[i].menuType) {
            case 1:
                var waitingProcessDocOut = document
                        .getElementById('waitingProcessDocOut');
                if (waitingProcessDocOut != null) {
                    waitingProcessDocOut.innerHTML = values[i].count;
                }
                chkWaitingProcessDocOut = true;
                break;
            case 6:
                var lbDocOutPublish = document.getElementById('lbDocOutPublish');
                if (lbDocOutPublish != null) {
                    lbDocOutPublish.innerHTML = values[i].count;
                }
                chkDocOutPublish = true;
                break;
            case 12:
                var lbDocOutPublish = document.getElementById('lbDocOutPublish');
                if (lbDocOutPublish != null) {
                    lbDocOutPublish.innerHTML = values[i].count;
                }
                chkDocOutPublish = true;
                break;
            case 14:
                var lbDocOutInWeek = document.getElementById('lbDocOutInWeek');
                if (lbDocOutInWeek != null) {
                    var divParent = lbDocOutInWeek.parentElement;
                    divParent.style.display = '';
                    lbDocOutInWeek.innerHTML = values[i].count;
                }
                chkDocOutInWeek = true;
                break;
        }
    }

    if (!chkWaitingProcessDocOut) {
        var linkWaitingProcessDocOut = document.getElementById('linkWaitingProcessDocOut');
        if (linkWaitingProcessDocOut != null) {
            linkWaitingProcessDocOut.setAttribute("onclick", "javascript:void(0);");
        }
    }

    if (!chkDocOutInWeek) {
        var linkDocOutInWeek = document.getElementById('linkDocOutInWeek');
        if (linkDocOutInWeek != null) {
            linkDocOutInWeek.setAttribute("onclick", "javascript:void(0);");
        }
    }

    if (!chkDocOutPublish) {
        var linkDocOutPublish = document.getElementById('linkDocOutPublish');
        if (linkDocOutPublish != null) {
            linkDocOutPublish.setAttribute("onclick", "javascript:void(0);");
        }
    }

};

setNumberOfDocInHome = function (values) {
    var chkWaitingProcessDocIn = false;
    var chkProcessingDocIn = false;
    var chkExpiredDocIn = false;
    for (var i = 0; i < values.length; i++) {
        switch (values[i].menuType) {
            case 1:
                var waitingProcessDocIn = document.getElementById('waitingProcessDocIn');
                if (waitingProcessDocIn != null) {
                    waitingProcessDocIn.innerHTML = values[i].count;
                }
                chkWaitingProcessDocIn = true;
                break;
            case 2:
                var processingDocIn = document.getElementById('processingDocIn');
                if (processingDocIn != null) {
                    processingDocIn.innerHTML = values[i].count;
                }
                chkProcessingDocIn = true;
                break;
            case 3:
                var processingDocIn = document.getElementById('expiredDocIn');
                if (processingDocIn != null) {
                    processingDocIn.innerHTML = values[i].count;
                }
                chkExpiredDocIn = true;
                break;
        }
    }

    if (!chkWaitingProcessDocIn) {
        var linkWaitingProcessDocIn = document.getElementById('linkWaitingProcessDocIn');
        if (linkWaitingProcessDocIn != null) {
            linkWaitingProcessDocIn.setAttribute("onclick", "javascript:void(0);");
        }
    }

    if (!chkProcessingDocIn) {
        var linkProcessingDocIn = document.getElementById('linkProcessingDocIn');
        if (linkProcessingDocIn != null) {
            linkProcessingDocIn.setAttribute("onclick", "javascript:void(0);");
        }
    }

    if (!chkExpiredDocIn) {
        var linkExpiredDocIn = document.getElementById('linkExpiredDocIn');
        if (linkExpiredDocIn != null) {
            linkExpiredDocIn.setAttribute("onclick", "javascript:void(0);");
        }
    }
};

setNumberOfFilesInHome = function (values) {
    for (var i = 0; i < values.length; i++) {
        switch (values[i].menuType) {
            case 1:
                var spanNumberFileNew = $("#spanNumberOfFileNew");
                if (spanNumberFileNew != null) {
                    spanNumberFileNew.html(values[i].count);
                }
                break;
            case 2:
                var spanNumberFileProcessing = $("#spanNumberOfFileProcessing");
                if (spanNumberFileProcessing != null) {
                    spanNumberFileProcessing.html(values[i].count);
                }
                break;
            case 3:
                var spanNumberFileProcessed = $("#spanNumberOfFileProcessed");
                if (spanNumberFileProcessed != null) {
                    spanNumberFileProcessed.html(values[i].count);
                }
                break;
        }
    }
};

setNumberOfDocSubmitInHome = function (values) {
    for (var i = 0; i < values.length; i++) {
        switch (values[i].menuType) {
            case 1:
                var spanNumberOfDocSubmitNew = $("#spanNumberOfDocSubmitNew");
                if (spanNumberOfDocSubmitNew != null) {
                    spanNumberOfDocSubmitNew.html(values[i].count);
                }
                break;
            case 3:
                var spanNumberOfDocSubmitProcessed = $("#spanNumberOfDocSubmitProcessed");
                if (spanNumberOfDocSubmitProcessed != null) {
                    spanNumberOfDocSubmitProcessed.html(values[i].count);
                }
                break;
        }
    }
}

menu.drawOfficeMenu = function (tabId, contentId, menus) {
    // var isEnglish = gvLocateVaule == "en";
    var headerTab = document.getElementById(tabId);
    var contentMenu = document.getElementById(contentId);
    var i = 0;
    var countMenu = 0;
    var defaultMenuId = menus.lstMenu[0].menuId;
    var defaultMenuName = menus.lstMenu[0].menuName;
    var defaultMenuUrl = menus.lstMenu[0].menuUrl;
    var defaul
    for (i = 0; i < menus.lstMenu.length; i++) {
        try {
            var item = menus.lstMenu[i];
            if (!item)
                continue;
            var tabItem = document.createElement("li");
            tabItem.innerHTML = item.menuName;
            // if (isEnglish) {
            // tabItem.innerHTML = item.menuNameEn;
            // }
            tabItem.setAttribute("name", "li" + i);
            var menuUrl = "";
            var menuId = null;
            headerTab.appendChild(tabItem);
            var j = 0;
            for (j = 0; j < item.lstMenu.length; j++) {
                var groupItem = item.lstMenu[j];
                var divGroup = document.createElement("div");
                divGroup.setAttribute("class", "group");
                divGroup.setAttribute("name", "group" + i);
                divGroup.setAttribute("id", "menu" + groupItem.menuId);
                divGroup.setAttribute("style", "display:none");
                if (groupItem.lstMenu == null || groupItem.lstMenu.length <= 1) {
                    var url = getImageURLOfFunction(groupItem.menuUrl);
                    var img = document.createElement("img");
                    img.setAttribute("id", "img" + groupItem.menuId);
                    img.setAttribute("src", url);
                    divGroup.appendChild(img);
                    divGroup.setAttribute("onclick", "gotoMenu("
                            + groupItem.menuId + ",'" + groupItem.menuUrl
                            + "');");
                    if (menuUrl === "") {
                        menuUrl = groupItem.menuUrl;
                        menuId = groupItem.menuId;
                    }
                } else {
                    var h = 0;
                    for (h = 0; h < groupItem.lstMenu.length; h++) {
                        var divItem = document.createElement("div");
                        divItem.setAttribute("class", "item");
                        var url = getImageURLOfFunction(groupItem.lstMenu[h].menuUrl);
                        var img = document.createElement("img");
                        img.setAttribute("src", url);
                        img.setAttribute("id", "img" + groupItem.menuId);
                        divItem.appendChild(img);
                        var br = document.createElement("br");
                        divItem.appendChild(br);
                        var divTitle = document.createElement("div");
                        divTitle.innerHTML = groupItem.lstMenu[h].menuName;
                        // if (isEnglish) {
                        // divTitle.innerHTML = groupItem.lstMenu[h].menuNameEn;
                        // }
                        divItem.appendChild(divTitle);
                        divItem.setAttribute("onclick", "gotoMenu("
                                + groupItem.menuId + ",'" + groupItem.menuUrl
                                + "');");
                        divGroup.appendChild(divItem);
                        if (menuUrl === "") {
                            menuUrl = groupItem.menuUrl;
                            menuId = groupItem.menuId;
                        }
                    }
                }
                var bottomTitle = document.createElement("div");
                if (groupItem.lstMenu != null && groupItem.lstMenu.length > 1) {
                    bottomTitle.setAttribute("class", "title");
                } else {
                    bottomTitle.setAttribute("class", "function");
                }

                var countSpan = document.createElement("span");
                countSpan.setAttribute("id", "span" + groupItem.menuId);
                divGroup.appendChild(countSpan);

                var title = groupItem.menuName;
                // if (isEnglish) {
                // title = groupItem.menuNameEn;
                // }
                bottomTitle.innerHTML = title;
                divGroup.appendChild(bottomTitle);
                contentMenu.appendChild(divGroup);
            }
            tabItem.setAttribute("onclick", "selectTab(" + i + ",'"
                    + item.menuName + "'," + menuId + ",'" + menuUrl + "')");
            countMenu = countMenu + 1;
        } catch (e) {
        }
    }

    var tabOrder = localStorage.lastTabOrder;
    var tabName = localStorage.lastTabName;
    if (item != null) {
        selectTab(tabOrder, tabName);
    } else {
        selectTab('0', defaultMenuName, defaultMenuId, defaultMenuUrl);
    }
};

createNotifys = function () {

    gvLocateVaule == "en";
    var lstNotify = page.lstNotify;
    var home = $("#homeContentDiv");
    if (home == null || home == undefined) {
        return;
    }
    $("#homeContentDiv").html('').change();
    var html = '';
    if (typeof lstNotify === 'undefined' || lstNotify == null || lstNotify.length == 0) {
        /**Xu ly cho giao dien moi
         *
         * @author hunglm16
         * @since 17/08/2016
         */
        html = '<div class="itemdiv dialogdiv"><div class="user"><img src="/Share/img/default-avatar.png"></img></div><div class="body"><div class="text orange">Hiện tại không có thông báo nào</div></div></div>';
        $("#homeContentDiv").html(html).change();
        //An xem tiep
        $('.input-group').hide();


        /** Xu ly cho giao dien cu
         var notifyDiv = document.createElement("div");
         notifyDiv.innerHTML = "Không có thông báo nào";
         if (isEnglish) {
         notifyDiv.innerHTML = "No notification";
         }
         notifyDiv.setAttribute(
         "style",
         "border:1px solid gray; background-color: rgb(167, 190, 196); margin-bottom:5px; text-align:center; padding:10px; height:50px;color:white");
         home.appendChild(notifyDiv);
         document.getElementById("btnNext").style.display = "none";
         -->luu vet**/
        return;
    }
    $('.input-group').show();//@hunglm16 hien thi nut xem tiep

    /***document.getElementById("btnNext").style.display = ""; --> Luu vet*/
    for (var i = 0; i < lstNotify.length; i++) {
        notify = lstNotify[i];
        html = html + '<div class="itemdiv dialogdiv">';
        html = html + '<div class="user">';
        html = html + '<img src="Share/app2/assets/avatars/user.jpg" alt=""></img>';
        html = html + '</div> ';
        html = html + '<div class="body">';
        html = html + '<div class="time"> ';
        html = html + '<i class="ace-icon fa fa-clock-o"></i>';
        if (notify.sendTime != null && notify.sendTime != undefined) {
            html = html + '<span class="orange">' + $.format.date(new Date(notify.sendTime), 'dd/MM/yyyy HH:mm') + '</span> ';
        } else {
            html = html + '<span class="orange"></span> ';
        }
        html = html + '</div>';
        html = html + '<div class="name"> ';
        if (notify.sendUserName != null && notify.sendUserName != undefined) {
            html = html + '<span class="label label-info arrowed arrowed-in-right" style="font-weight: 700; color: white;">' + notify.sendUserName + '</span>';
        } else {
            html = html + '<span class="label label-info arrowed arrowed-in-right" style="font-weight: 700; color: white;"></span>';
        }
        html = html + '</div>';
        if (notify.content != null && notify.content != undefined) {
            html = html + '<div class="text">' + VitxUtils.XSSEncode(notify.content) + '</div>';
        } else {
            html = html + '<div class="text">Chuyển xử lý</div>';
        }
        html = html + '<div class="tools">';

        if (notify.objectType == undefined || notify.objectType == null) {
            html = html + '<a class="btn btn-minier btn-info" href="#">';
        } else if (notify.objectType != 20) {
            html = html + '<a class="btn btn-minier btn-info" onclick="viewNotify(' + notify.documentId + ',' + notify.objectType + ',' + notify.sendUserId + ',' + notify.notifyId + ',' + '\'' + notify.receiver + '\');" style="cursor: pointer;">';
        } else {
            html = html + '<a class="btn btn-minier btn-info" onclick="viewNotify(' + notify.documentId + ',' + notify.objectType + ',' + notify.sendUserId + ',' + notify.notifyId + ',' + '\'' + notify.receiver + '\');" style="cursor: pointer;">';
        }
        html = html + '<i class="icon-only ace-icon fa fa-share"></i></a>';
        html = html + '</div>';
        html = html + '</div>';
        html = html + '</div>';

        /*** Xu ly cho giao dien cu
         var notify = lstNotify[i];
         var notifyDiv = document.createElement("div");
         var signDiv = document.createElement("div");
         signDiv.setAttribute("class", "signOfNotifyItem");
         var color = "rgb(167, 190, 196)";
         if (notify.objectType === 1 || notify.objectType === 300) {
         //
         // Van ban den
         //
         color = "rgb(115, 195, 126)";
         } else if (notify.objectType === 2 || notify.objectType === 600) {
         //
         // Van ban du thao
         //
         color = "rgb(116, 116, 116)";
         } else if (notify.objectType === 30) {
         //
         // Ho so
         //
         color = "rgb(230, 142, 138)";
         } else if (notify.objectType === 9) {
         //
         // Lich
         //
         color = "rgb(83, 143, 215)";
         } else if (notify.objectType === 20) {
         color = "#ff8f3f";
         }
         if (notify.objectType !== 20) {
         signDiv.setAttribute("style", "background-color:" + color);
         notifyDiv.appendChild(signDiv);
         } else {
         signDiv.setAttribute("style", "background-color:" + color);
         notifyDiv.appendChild(signDiv);
         }
         notifyDiv.setAttribute("class", "notifyItem");
         var img = document.createElement("img");
         if (notify.objectType !== 20) {
         img.setAttribute("src", "Share/avatar/" + notify.sendUserId);
         img
         .setAttribute("onError",
         "this.onerror=null;this.src='Share/img/default-avatar.png';");
         } else {
         img.setAttribute("src", "Share/img/default-avatar.png");
         }
         img.setAttribute("width", "60px");
         img.setAttribute("height", "60px");
         img.setAttribute("style", "float:left;");
         notifyDiv.appendChild(img);
         var titleDiv = document.createElement("div");
         var datemlsc = Date.parse(notify.sendTime);
         var date = new Date(datemlsc);
         var dateStr = date.getHours() + "h" + date.getMinutes() + " ngày "
         + date.getDate() + "/" + (date.getMonth() + 1) + "/"
         + date.getFullYear();
         var strVn = " gửi cho bạn vào lúc ";
         if (isEnglish) {
         strVn = " send to you at ";
         dateStr = date.getHours() + "h" + date.getMinutes() + " - "
         + date.getDate() + "/" + (date.getMonth() + 1) + "/"
         + date.getFullYear();
         }
         var title = notify.sendUserName + strVn + dateStr;
         titleDiv.setAttribute("class", "titleItems");
         titleDiv.innerHTML = escapeHtml_(title);
         var contentDiv = document.createElement("div");
         contentDiv.setAttribute("class", "contentItems");
         var content;
         if (notify.objectType !== 20) {
         content = escapeHtml_(notify.content);
         content = content.replace(/\n/g, "<br/>");
         } else {
         content = (isEnglish ? "Notify: " : "Thông báo: ") + notify.title
         + "<br/>";
         if (notify.endTime !== null && notify.endTime !== undefined) {
         var datemlsc = Date.parse(notify.endTime);
         var date = new Date(datemlsc);
         content = content
         + (isEnglish ? "Expired date:" : "Hạn thông báo: ")
         + date.getDate() + "/" + (date.getMonth() + 1) + "/"
         + date.getFullYear();
         }
         
         }
         contentDiv.innerHTML = content;
         notifyDiv.appendChild(titleDiv);
         notifyDiv.appendChild(contentDiv);
         
         if (notify.objectType !== 20) {
         notifyDiv.setAttribute("onclick", "viewNotify(" + notify.documentId
         + "," + notify.objectType + "," + notify.sendUserId + ","
         + notify.notifyId + "," + "\"" + notify.receiver + "\");");
         home.appendChild(notifyDiv);
         } else {
         notifyDiv.setAttribute("onclick", "viewNotifyAlert("
         + notify.notifyId + "," + notify.objectType + ");");
         home.appendChild(notifyDiv);
         }
         -> Luu vet **/
    }
    $("#homeContentDiv").html(html.trim()).change();

    viewNotify = function (objectId, objectType, sendUserId, notifyId, receiver) {
        var param = {
            'documentId': objectId,
            'objectType': objectType,
            'sendUserId': sendUserId,
            'notifyId': notifyId,
            'receiver': receiver == 'undefined' ? '' : receiver
        };
        var wgt = zk.Widget.$("$homeWnd");
        zAu.send(new zk.Event(wgt, 'onOpenView', {
            '': param
        }));

    };
    viewNotifyAlert = function (notifyId, objectType) {
        var param = {
            'notifyId': notifyId,
            'objectType': objectType
        };
        var wgt = zk.Widget.$("$homeWnd");
        zAu.send(new zk.Event(wgt, 'onOpenViewAlert', {
            '': param
        }));

    };
};

/**
 * Phuctm2 scroll to div
 * 
 * @param {type}
 *            divId
 * @returns {Boolean}
 */
function scrollToDiv(divId) {
    var container = $('div');
    var scrollTo = $('#' + divId);
    container.scrollTop(scrollTo.offset().top - container.offset().top
            + container.scrollTop());
}

// quangvv4: nut back
function getMenuHistory() {
    var menuHistory = page.token.lstMenuHistory;
    if (menuHistory.length > 1) {
        return menuHistory[menuHistory.length - 2];
    } else if (menuHistory.length == 1) {
        return menuHistory[0];
    }
    return null;
}
function getMenuHistoryId() {
    var menuHistoryId = page.token.lstMenuHistoryId;
    if (menuHistoryId.length > 1) {
        return menuHistoryId[menuHistoryId.length - 2];
    } else if (menuHistoryId.length == 1) {
        return menuHistoryId[0];
    }
    return null;
}

function getMenuHistoryTabId() {
    var menuHistoryTabId = page.token.lstMenuHistoryTabId;
    if (menuHistoryTabId.length > 1) {
        return menuHistoryTabId[menuHistoryTabId.length - 2];
    } else if (menuHistoryTabId.length == 1) {
        return menuHistoryTabId[0];
    }
    return null;
}

function gotoMenuHistory(menuId, url, tabId) {
    prepareDisplaySelectTab(tabId, "quang");
    highlightSelectedMenu(menuId);
    var wgt = zk.Widget.$("mainContent");
    data = {
        url: url
    };
    if (page.token.lstMenuHistory.length > 1) {
        page.token.lstMenuHistory.pop(page.token.lstMenuHistory.length - 2);
        page.token.lstMenuHistoryId.pop(page.token.lstMenuHistoryId.length - 2);
        page.token.lstMenuHistoryTabId
                .pop(page.token.lstMenuHistoryTabId.length - 2);
    } else if (page.token.lstMenuHistory.length == 1) {
        page.token.lstMenuHistory.pop(0);
        page.token.lstMenuHistoryId.pop(0);
        page.token.lstMenuHistoryTabId.pop(0);
    }

    zAu.send(new zk.Event(wgt, 'onLoadPage', url));
}
;

/**
 * Xu ly cho nut quay lai
 * @author hunglm16
 * @since 19/08/2016
 */
var windowDocInViewJs = {
    onClose: function () {
        var param = {};
        //Xu ly Ajax len server
        var wgt = zk.Widget.$('$windowDocInView');
        zAu.send(new zk.Event(wgt, 'onClose', {'': param}));
    }
};

createNotifications = function () {

    var isEnglish = gvLocateVaule == "en";
    var lstNotify = page.lstNotify;
    var root = $("#divNotifications");
    var home = $("#homeContentNotifyDiv");
    if (root == null || root == undefined || home == null || home == undefined) {
        return;
    }
    root.css('display', 'block');
    $("#homeContentNotifyDiv").html('').change();
    var html = '';
    if (typeof lstNotify === 'undefined' || lstNotify == null || lstNotify.length == 0) {
        /**Xu ly cho giao dien moi
         *
         * @author hunglm16
         * @since 17/08/2016
         */
        html = '<div class="itemdiv dialogdiv"><div class="user"><img src="/Share/img/default-avatar.png"></img></div><div class="body"><div class="text orange">Hiện tại không có thông báo nào</div></div></div>';
        $("#homeContentNotifyDiv").html(html).change();
        return;
    }
    for (var i = 0; i < lstNotify.length; i++) {
        notify = lstNotify[i];
        html = html + '<div class="itemdiv dialogdiv">';
        html = html + '<div class="user">';
        html = html + '<img src="Share/app2/assets/avatars/user.jpg" alt=""></img>';
        html = html + '</div> ';
        html = html + '<div class="body">';
        html = html + '<div class="time"> ';
        html = html + '<i class="ace-icon fa fa-clock-o"></i>';
        if (notify.sendTime != null && notify.sendTime != undefined) {
            html = html + '<span class="orange">' + $.format.date(new Date(notify.sendTime), 'dd/MM/yyyy HH:mm') + '</span> ';
        } else {
            html = html + '<span class="orange"></span> ';
        }
        html = html + '</div>';
        html = html + '<div class="name"> ';
        if (notify.sendUserName != null && notify.sendUserName != undefined) {
            html = html + '<span class="label label-info arrowed arrowed-in-right" style="font-weight: 700; color: white;">' + notify.sendUserName + '</span>';
        } else {
            html = html + '<span class="label label-info arrowed arrowed-in-right" style="font-weight: 700; color: white;"></span>';
        }
        html = html + '</div>';
        if (notify.content != null && notify.content != undefined) {
            html = html + '<div class="text">' + notify.content + '</div>';
        } else {
            html = html + '<div class="text"></div>';
        }
        html = html + '</div>';
        html = html + '</div>';
    }
    $("#homeContentNotifyDiv").html(html.trim()).change();

    viewNotify = function (objectId, objectType, sendUserId, notifyId, receiver) {
        var param = {
            'documentId': objectId,
            'objectType': objectType,
            'sendUserId': sendUserId,
            'notifyId': notifyId,
            'receiver': receiver == 'undefined' ? '' : receiver
        };
        var wgt = zk.Widget.$("$homeWnd");
        zAu.send(new zk.Event(wgt, 'onOpenView', {
            '': param
        }));

    };
};