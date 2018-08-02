/* 
 * Copyright 2014 Viettel ICT.
 * Do not use this source code if you don't have permission
 * @author ducla6<at>viettel.com.vn
 */

function eGovChat(options){
    this.options = options;
    $("body").append("<div id='dchat_container'></div>");
    $("#dchat_container").append("<div id='dchat_title'><div id='dchat_title_content'></div>"
            +"<div id='setting_button'></div>" 
            +  "</div>"
            + "<div id='dchat_tree'></div>");
    $("#dchat_title_content").html(this.options.title);
    $("body").append("<div id='chat_region'></div>");
    $("body").append("<div id='hidden_friend_region'></div>");
    if (options.position === "bright") {
        $("#dchat_container").addClass("dchat_bright");
        $("#chat_region").addClass("dchat_bright");
        $("#hidden_friend_region").addClass("dchat_bright");
    } else if (this.options.position === "bleft") {
        $("#dchat_container").addClass("dchat_bleft");
        $("#chat_region").addClass("dchat_bleft");
        $("#hidden_friend_region").addClass("dchat_bleft");
    } else if (this.options.position === "tright") {
        $("#dchat_container").addClass("dchat_tright");
        $("#chat_region").addClass("dchat_tright");
        $("#chat_region").css("margin-left", "220px");
        $("#chat_region").css("margin-right", "");
        $("#hidden_friend_region").addClass("dchat_tright");
        $("#hidden_friend_region").css("margin-left", "1025px");
        $("#hidden_friend_region").css("margin-right", "");
    } else {
        $("#dchat_container").addClass("dchat_tleft");
        $("#chat_region").addClass("dchat_tleft");
        $("#chat_region").css("margin-left", "220px");
        $("#chat_region").css("margin-right", "");
        $("#hidden_friend_region").addClass("dchat_tleft");
        $("#hidden_friend_region").css("margin-left", "1025px");
        $("#hidden_friend_region").css("margin-right", "");
    }
    $("#chat_region").addClass("hidden_class");
    $("#hidden_friend_region").addClass("hidden_class");

    $("#dchat_container").css("height", "500px");
    $("#dchat_tree").css("height", "440px");
    $("#dchat_title_content").bind("click", function() {
        if ($("#dchat_container").height() === 500) {
            $("#dchat_container").css("height", "30px");
            $("#dchat_tree").css("height", "0px");
            $("#dchat_tree").css("display", "none");
        } else {
            $("#dchat_container").css("height", "500px");
            $("#dchat_tree").css("height", "440px");
            $("#dchat_tree").css("display", "");
        }
    });
    eGovChat.account = this.options.account;
    this.mainMenu(false);
};


eGovChat.prototype.options = {};
eGovChat.prototype.addNewFriend = {};
eGovChat.prototype.increaseNumber = 0;//use for making unique id or class
eGovChat.prototype.hiddenFriendsList = [];//list of hidden friends
eGovChat.prototype.count = 0;//global variable
eGovChat.friends = [];
eGovChat.prototype.resource = "ducla";
eGovChat.prototype.searchData = [];//du lieu de thuc hien autocomplete
eGovChat.prototype.friendList = [];//[{id,text}]

eGovChat.prototype.msgArchive = [];// Luu tru noi dung chat cua cac cua so bi an. Cau truc bao gom: [{jid: abc, message: []},...]


//static varialbes
eGovChat.account;
eGovChat.jid;

eGovChat.invitations_number = 0;
eGovChat.invitations = [];//Luu danh sach cac ban be dang muon them minh la ban

eGovChat.deleteFriend = ""; //Luu jid cua ban be muon xoa, se tu dong bi xoa trong sau khi xoa thanh cong
eGovChat.gGroups = []; // Danh sach cac group hien co


//Lay ra thi remove ra khoi list, neu  list rong thi query tiep
// Neu dong cua so chat thi histories tu dong duoc xoa
eGovChat.histories = []; // Luu moc thoi gian de lay lich su tin nhan, lay tu OfflineMessageList
eGovChat.lastHistory = ""; // Luu lai moc thoi gian lay lich su gan nhat
eGovChat.activeId = ""; //Dang active cua so nao? Phuc vu cho viec lay lich su tin nhan
// Luu cac history khi chuyen qua lai giua cac cua so chat [{id,lasthistory,histories}]
eGovChat.historiesCache= [];


eGovChat.prototype.loginForm = function(data){
    var that = this;
    $("#dchat_tree").append("<div id='dchat_login_button'>Login</div>");
//    $("#dchat_login_button").click(function(){
//        var connection = new SOAPRequest({container: that});
//        var soap = {};
//        soap.ChatGetSessionRequest = {
//            from: that.options.account,
//            rid: ++rid,
//            wait: 30,//fix for polling request, we will set it after geting the getsession response
//            hold: 1,
//            requests: 2
//        };
//        connection.chatGetSessionRequest(soap);
//        $("#dchat_login_button").remove();
//    });
    var connection = new SOAPRequest({container: that});
        var soap = {};
        soap.ChatGetSessionRequest = {
            from: that.options.account,
            rid: ++rid,
            wait: 30,//fix for polling request, we will set it after geting the getsession response
            hold: 1,
            requests: 2
        };
        connection.chatGetSessionRequest(soap);
        $("#dchat_login_button").remove();
};



eGovChat.prototype.facebookStyle = function(data){
    var that = this;
    // Now we login successful
    $("#dchat_title").append("<div id='setting_button'></div>");
    $.contextMenu({
        selector: "#setting_button",
        items: {
            "Add": {
                name: "Add new friend...",
                callback: function(key, opt){
                    $("<div><div style='overflow:hidden;'>" 
                            + "<div style='float:left;height:25px;line-height:25px;'>Nick:</div>"
                            + "<div style='float:right;' id='dchat_add_friend_input_nick'><input type='text' placeholder='user@domain.com'></div>"
                            + "</div>"
                            + "<div style='overflow:hidden;padding-top:3px;'>"
                            + "<div style='float:left;height:25px;line-height:25px;'>Name:</div>"
                            + "<div style='float:right;' id='dchat_add_friend_input_name'><input type='text' placeholder='john lenon'></div>"
                            + "</div></div>").dialog({
                        buttons: [
                            {
                                text: "Ok",
                                click: function(){
                                    var nick = $("#dchat_add_friend_input_nick input").val();
                                    that.addNewFriend.nick = nick;
                                    var name = $("#dchat_add_friend_input_name input").val();
                                    that.addNewFriend.name = name;
                                    that.addNewFriendFb(that.addNewFriend);
                                    $(this).dialog("destroy");
                                }
                            },
                            {
                                text: "Cancel",
                                click: function(){
                                    $(this).dialog("close");
                                }
                            }
                        ],
                        title: "Add new friend",
                        dialogClass: "dchat_add_new_friend no-close"
                    });
                }
            },
            "Group": {
                name: "Create group...",
                callback: function(key, opts){
                    $("<div style='overflow:hidden;'><div id='dchat_group_added_members'></div><div id='dchat_group_members' contenteditable='true'>abc</div></div>").dialog({
                        buttons: [
                            {
                                text: "Ok",
                                click: function(){
                                    // Create window chat with isGroup = true
                                    // And we save list of member of this group
                                    var friendDivs = $("#dchat_group_added_members").children();
                                    var groupMembers = [];
                                    for(var i = 0; i < friendDivs.length; i++){
                                        groupMembers.push($(friendDivs[i]).text());
                                    }
                                    that.increaseNumber++;
                                    var clazz = "group_" + that.increaseNumber;
                                    that.groups[clazz] = groupMembers;
                                    var friend = {
                                        text: clazz,
                                        id: clazz
                                    };
                                    that._createWindowChat(friend, that.options, true, clazz);
                                    $(this).dialog("destroy");
                                }
                            },
                            {
                                text: "Cancel",
                                click: function(){
                                    $(this).dialog("destroy");
                                }
                            }
                        ],
                        title: "Add group members",
                        dialogClass: "dchat_add_group_member_dlg no-close"
                    });
                    $("#dchat_group_members").keyup(function(event){
                        if(event.which === 59 || event.which === 13){
                            var friend = $("#dchat_group_members").text();
                            if(friend.length > 1){
                                if(event.which !== 13){
                                    friend = friend.substring(0, friend.length - 1);
                                }
                                $("#dchat_group_added_members").append("<div class='dchat_gmember' id='" + friend + "'>" + friend + "</div>");
                                $(".dchat_gmember").off();
                                $("#dchat_group_added_members .dchat_gmember").bind("click", function(){
                                    $(this).remove();
                                });
                            }
                            $("#dchat_group_members").text("");
                        }
                    });
                }
            },
            "logout": {
                name: "Logout",
                callback: function(){
                    $("#dchat_tree").empty();
                    $("#dchat_search_bar").remove();
                    that.loginForm();
                }
            }
        },
        trigger: "left",
        className: "setting_menu",
        width: 400,
        height: 300
    });
    // destroy tree and rerender
    for(var i = 0; i < data.length; i++){
       $("#dchat_tree").append("<div id='friend' name='" + data[i].nick + "'><div id='friend_no_avatar'></div><div id='friend_name'>" + data[i].name + "</div><div id='friend_status'></div></div>"); 
    }

    // add handler for items
    $("#dchat_tree #friend").on("click", function(){
        var friend = {};
        friend.id = $(this).attr("name");
        friend.text = $("div[name=" + friend.id + "] #friend_name").text();
        var children = $("#chat_region").children();
        var notExist = true;
        for(var i = 0; i < children.length; i++){
            var clazz = $(children[i]).attr("class");
            if(friend.id === clazz){
                notExist = false;
            }
        }
        if(notExist){
            that._createWindowChat(friend, that.options, false);
        }
    });
    $("#hidden_friend_region").bind("click", function(){
        if($("#notification_container").length === 0){
            $("#hidden_friend_region").append("<div id='notification_container'><div id='notification_title'>Notifications</div><div id='notification_body'></div></div>");
            for(var i = 0; i < that.hiddenFriendsList.length; i++){
                $("#notification_body").append("<div id='friend_item' class='" + that.hiddenFriendsList[i].id + "'>" + that.hiddenFriendsList[i].text + "</div>");
            }
            for(var i = 0; i < that.hiddenFriendsList.length; i++){
                var index = i;
                $("." + that.hiddenFriendsList[i].id).bind("click", function(){
                    var chatWindows = $("#chat_region").children("#chat_window");
                    chatWindows[2].remove();
                    that.dchat.count--;
                    that._createWindowChat(that.hiddenFriendsList[index], that.options, false);
                    that.hiddenFriendsList.splice(index, 1);
                });
            }
        }else{
            $("#notification_container").remove();
            $("#friend_item").unbind();
        }
    });
    this._searchBar();
};

eGovChat.prototype._searchBar = function(){
    $("#dchat_container").append("<div id='dchat_search_bar'><input type='text' placeholder='Search...'></div>");
    $("#dchat_search_bar input").keyup(function(event){
        var keyword = $(this).val();
        var children = $("#dchat_tree").children();
        for(var i = 0; i < children.length; i++){
            var nick = $(children[i]).attr("name");
            if(nick.indexOf(keyword) < 0){
                $(children[i]).addClass("dchat_tree_hide_friend");
            }else{
                $(children[i]).removeClass("dchat_tree_hide_friend");
            }
        }
    });
};

/**
* Open a new chat window (one-to-one)
* @param {json} friend
* @param {json} options options
* @param {boolean} isGroup Is this a group chat?
* @param {string} optionalClass
* @param {object} parent the parent
* @returns {none}
*/
eGovChat.prototype._createWindowChat = function(friend, options, 
    isGroup, optionalClass, parent){
    var isCreateHidden = false;
    var that = typeof parent !== "undefined" ? parent : this;
//    console.log(friend);
    var id = friend.id;
    var title = friend.text;
    // Kiem tra xem ban nay da mo cua so chat chua?
    var children = $("#chat_region").children();
    var isExist = false;
    for(var i = 0; i < children.length; i++){
       if($(children[i]).attr("class") === id) {
           isExist = true;
       }
    }
    if(!isExist){
        if(this.count >= 0 && this.count < 3){
            this.count++;
            var clazz = $("#chat_region").attr("class");
            if(clazz.indexOf("hidden_class") !== -1){
                $("#chat_region").removeClass("hidden_class");
            }
            $("#chat_region").css("height", "300px");
            $("#chat_region").append("<div id='chat_window' class='" 
                    + id + (typeof optionalClass === "undefined" ? "" : " " + optionalClass)
                    + "'><div id='chat_window_title'><div id='chat_window_title_content'></div>"
                    + "<div id='camera_button'></div>"
                    + "<div id='option_button'></div>" 
                    + "<div id='close_button'></div>"
                    + "</div><div id='chat_content'></div>"
                    + "<div id='chat_input'></div></div>");
            $("." + id + " #chat_window_title_content").html(title);
            $("." + id + " #chat_window_title_content").bind("click", function(){
                if ($("." + id).height() !== 30) {
                    $("." + id).css("height", "30px");
                    $("." + id).css("width", "150px");
                    $("." + id + " #chat_content").css("display", "none");
                    $("." + id + " #chat_input").css("display", "none");
                    $("." + id  + " #chat_window_title_content").addClass("chat_window_title_minimize");
                    $("." + id  + " #chat_window_title_content").html(title.substring(0, 7) + "...");
                    if(that.options.position === "bright" || that.options.position === "bleft"){
                        $("." + id).css("margin-top", "270px");
                    }else{
                        $("." + id).css("margin-top", "0px");
                    }
                } else {
                    $("." + id).css("height", "300px");
                    $("." + id).css("width", "250px");
                    $("." + id + " #chat_content").css("display", "");
                    $("." + id + " #chat_input").css("display", "");
                    $("." + id  + " #chat_window_title_content").html(title);
                    $("." + id  + " #chat_window_title_content").removeClass("chat_window_title_minimize");
                    if(that.options.position === "bright" || that.options.position === "bleft"){
                        $("." + id).css("margin-top", "0px");
                    }
                }

            });
            
            // Sự kiện cho các nút bấm trên cửa sổ chat
            
            $("." + id + " #close_button").bind("click", function(){
                $("." + id).remove();                
                that.count--;
                if(that.hiddenFriendsList.length > 0){
                    var hfriend = that.hiddenFriendsList[that.hiddenFriendsList.length - 1];
                    that.hiddenFriendsList.splice(that.hiddenFriendsList.length - 1, 1);
                    that._createWindowChat(hfriend, options, false);
                }
                if(that.count < 3){
                    that._hideHiddenFriend();
                }
                if(that.count <= 0){
                    $("#chat_region").css("height", "0px");
                }
                // xoa cache lich su chat di
                for(var i = 0; i < eGovChat.historiesCache.length; i++){
                    if(eGovChat.historiesCache[i].id === id){
                        eGovChat.historiesCache.splice(i, 1);
                        break;
                    }
                }
            });
            
            $("." + id + " #camera_button").bind("click", function(){
                var conference = new Conference(id, title);
            });


            // option menu
            if(!isGroup){
                $.contextMenu({
                    selector: "." + id + " #option_button",
                    items: {
                        "Add": {name: "Gửi tập tin..."},
                        "Group": {name: "Chặn bạn bè"},
                        "History": {
                            name: "Xem lịch sử...",
                            callback: function(key, opts){
                                // xem lịch sử tin nhắn
                                // time: the values of these attributes MUST be UTC and adhere to the DateTime format specified in XEP-0082
                                var haveHistory = true;
                                if(eGovChat.historiesCache.length !== 0){
                                    for(var i = 0; i < eGovChat.historiesCache.length - 1; i++){
                                        if(eGovChat.historiesCache[i].id === id){
                                            eGovChat.lastHistory = eGovChat.historiesCache[i].lastHistory;
                                            eGovChat.histories = eGovChat.historiesCache[i].histories;
                                            eGovChat.activeId = eGovChat.historiesCache[i].id;
                                            haveHistory = false;
                                            break;
                                        }
                                    }
                                }
                                if(haveHistory){
                                    eGovChat.lastHistory = "";
                                    eGovChat.histories.length = 0;
                                    eGovChat.activeId = id;
                                    eGovChat.historiesCache.push({
                                        id: eGovChat.activeId,
                                        lastHistory: eGovChat.lastHistory,
                                        histories: eGovChat.histories
                                    });
                                }
                                console.log(eGovChat.historiesCache);
                                console.log(eGovChat.histories);
                                console.log(eGovChat.lastHistory);
                                if(eGovChat.histories.length === 0){
                                    var soap = {};
                                    if(eGovChat.lastHistory === ""){
                                        soap.ChatGetOfflineMessageListRequest = {
                                            rid: ++rid,
                                            sid: sid,
                                            fjid: id + "@ducla",
                                            max: 10
                                        };
                                    }else{
                                        soap.ChatGetOfflineMessageListRequest = {
                                            rid: ++rid,
                                            sid: sid,
                                            fjid: id + "@ducla",
                                            max: 10,
                                            start: eGovChat.lastHistory
        //                                    end: eGovChat.convertToUTCTime(new Date().getTime())
                                        };
                                    }
                                    var connection = new SOAPRequest({container: that});
                                    connection.sendRequest(soap, true, false);
                                }else{
                                    // lay moc thoi gian muon nhat, da duoc sap xep tu phia server
                                    var start = eGovChat.histories[eGovChat.histories.length - 1];
                                    eGovChat.histories.splice(eGovChat.histories.length - 1, 1);
                                    console.log(eGovChat.histories);
                                    var soap = {};
                                    soap.ChatGetOfflineMessageRequest = {
                                        rid: ++rid,
                                        sid: sid,
                                        fjid: id + "@ducla",
                                        max: 100,
                                        start: start
    //                                    end: eGovChat.convertToUTCTime(new Date().getTime())
                                    };
                                    var connection = new SOAPRequest({container: that});
                                    connection.sendRequest(soap, true, false);
                                }
                            }
                        }
                    },
                    trigger: "left",
                    className: "option_menu"
                });
            }else{
                $.contextMenu({
                    selector: "." + id + " #option_button",
                    items: {
                        "Add": {
                            name: "Thêm bạn bè...",
                            callback: function(key, opts){

                            }
                        },
                        "Group": {
                            name: "See members...",
                            callback: function(key, opts){
                                var id = $($(this)[0].parentNode).text();
                                var members = that.groups[id];
                                var html = [];
                                html.push("<div>");
                                for(var i = 0; i < members.length; i++){
                                    html.push("<div>");
                                    html.push(members[i]);
                                    html.push("</div>");
                                }
                                html.push("</div>");
                                $(html.join("")).dialog({
                                    title: id + "'s members",
                                    buttons: [{
                                        text: "Close",
                                        click: function(){
                                            $(this).dialog("destroy");
                                        }
                                    }],
                                    dialogClass: "dchat_see_group_member_dlg no-close"
                                });
                            }
                        }
                    },
                    trigger: "left",
                    className: "option_menu"
                });
            }
            $("." + id + " #chat_input").append("<div style='float:left; width=100%;'><textarea placeholder='type text here...' style='resize: none; width: 125%; height: 100%; border-right: 2px solid gray; margin-top: -1px;color: black;'/></div>");
            // emoticon button
            $("." + id + " #chat_input").append("<div id='dchat_emoticon_button'></div>");
        }else{
            //display hidden friends region
            this._createHiddenFriend(friend);
            this.msgArchive.push({
                jid: id + this.resource,
                message: []
            });
            isCreateHidden = true;
        }
        $("." + id + " #chat_input").keyup(function(event){
            if(event.which === 13){
                //when user presses enter key
                var msg = $("." + id + " #chat_input textarea").val();
                if(msg.length > 1){
                    msg = Emoticon.translateToEmo(msg);
                    that.addMsg(msg, id, true);
                }
                $("." + id + " #chat_input textarea").val("");
                // Goi request gui message
                var data = {};
                data.to = id + "@" +that.resource + "/xmpp" ;
                data.type = "chat";
                data.content = msg;
                var connection = new SOAPRequest({container: that});
                connection.cancelPoll();
                connection.SendMessageRequest(data);
            }
        });
        $("." + id + " #chat_input #dchat_emoticon_button").click(function(){
            var emoticon = new Emoticon();
            emoticon.show(this, that, id);
        });
    }
};


eGovChat.prototype._createHiddenFriend = function(friend){
    var clazz = $("#hidden_friend_region").attr("class");
    if(clazz.indexOf("hidden_class") !== -1){
        $("#hidden_friend_region").removeClass("hidden_class");
    }
    this.hiddenFriendsList.push(friend);
};

eGovChat.prototype.addMsg = function(msg, id, isFrom){
    if(isFrom){
        $("." + id + " #chat_content").append("<div id='msg_to' class='bubble'>" + msg + "</div>").fadeIn("slow");
        //$("." + id + " #chat_content").append("<div id='msg_from' class='bubble bubble--alt'>" + msg + "</div>").fadeIn("slow");
    }else{
        $("." + id + " #chat_content").append("<div id='msg_from' class='bubble bubble--alt'>" + msg + "</div>").fadeIn("slow");
    }
    $("." + id + " #chat_content").animate({
        scrollTop: $("." + id + " #chat_content")[0].scrollHeight
    }, 1000);
};

eGovChat.prototype.drawFriendList = function(data){
    this.mainMenu(true);
    var that = this;
    // Search for groups
    var groups = [];
    if(typeof data.length !== "undefined"){
        for(var i = 0; i < data.length; i++){
            if(typeof data[i].group === "undefined"){
                data[i].group = "No group";
            }
            if(groups.length === 0){
                groups.push(data[i].group);
            }else{
                var hasItem = 0;
                for(var j = 0; j < groups.length; j++){
                    if(groups[j] === data[i].group){
                        hasItem = 1;
                        break;
                    }
                }
                if(hasItem === 0){
                    groups.push(data[i].group);
                }
            }
        }
    }else{
        if(typeof data.group === "undefined"){
            data.group = "No group";
        }
        if(groups.length === 0){
            groups.push(data.group);
        }else{
            var hasItem = 0;
            for(var j = 0; j < groups.length; j++){
                if(groups[j] === data.group){
                    hasItem = 1;
                    break;
                }
            }
            if(hasItem === 0){
                groups.push(data.group);
            }
        }
    }
    eGovChat.gGroups = groups;
    //create friend groups
    var fgroups = [];
    for(var i = 0; i < groups.length; i++){
        var group = {};
        group.name = groups[i];
        var fs = [];
        group.friends = fs;
        fgroups.push(group);
    }
    for(var i = 0; i < fgroups.length; i++){
        var fs = fgroups[i].friends;
        if(typeof data.length !== "undefined"){
            for(var j = 0; j < data.length; j++){
                if(data[j].group === fgroups[i].name){
                    var friend = {};
                    var index = data[j].jid.indexOf("@");
                    if(index !== -1){
                        friend.jid = data[j].jid.substring(0, index);
                    }else{
                        friend.jid = data[j].jid;
                    }
                    friend.name = typeof data[j].name !== "undefined" ? data[j].name : friend.jid;
                    fs.push(friend);
                    this.friendList.push(friend);
                    this.searchData.push(friend.jid);
                    eGovChat.friends.push({
                        nick: friend.jid,
                        name: friend.name
                    });
                }
            }
        }else{
            if(data.group === fgroups[i].name){
                var friend = {};
                var index = data.jid.indexOf("@");
                friend.jid = data.jid.substring(0, index);
                friend.name = data.name;
                fs.push(friend);
                this.friendList.push(friend);
                this.searchData.push(friend.jid);
                eGovChat.friends.push({
                    nick: friend.jid,
                    name: friend.name
                });
            }
        }
        fgroups[i].friends = fs;
    }
//    console.log(fgroups);
    //========the end=========
    //now we create tree's data
    var dtrees = [];
    for(var i = 0; i < fgroups.length; i++){
        var dtree = {};
        dtree.text = fgroups[i].name;
        dtree.id = fgroups[i].name + "_id_group";
        dtree.icon = "dchat_group";
        var dchildren = [];
        for(var j = 0; j < fgroups[i].friends.length; j++){
            dchildren.push({
                text: fgroups[i].friends[j].name === "" ? fgroups[i].friends[j].jid : fgroups[i].friends[j].name,
                id: fgroups[i].friends[j].jid,
                icon: "avatar" //o day thuc ra jstree se them mot class vao moi node --> co the su dung de them status icon
            });
        }
        dtree.children = dchildren;
        dtrees.push(dtree);
    }
      
    
    var that = this;
    $("#dchat_tree").jstree(
        {
            "core": {
                "data": dtrees,
                "check_callback": true
            },
            "plugins" : [
                "contextmenu", "types", "wholerow"
            ],
            "contextmenu": {
                "items": {
                    "delete": {
                        "label": "Xóa bạn bè",
                        "action": function(node){
                            var friendids = $("#dchat_tree").jstree("get_selected", true);
                            // Không xử lý với trường hợp xóa group
                            if(friendids[0].id.indexOf("id_group") === -1){
                                $("#dchat_tree").jstree("delete_node", friendids[0]);
                                eGovChat.deleteFriend = friendids[0].id + "@ducla";
                                //Gui request xoa ban be ra khoi list
                                var connection = new SOAPRequest({container: that});
                                connection.deleteFriendRequest(friendids[0].id + "@ducla");
                            }
                        }
                    }
                }
            }
        }
    );
    $("#dchat_tree").bind("select_node.jstree", function(event, data){
        //Chi xu ly neu dang bam nut chuot trai
        if(data.event.button === 1 || data.event.button === 0){
            var friendid = $("#dchat_tree").jstree("get_selected");
            if(friendid[0].indexOf("id_group") === -1){
                // do not create chat window if it's a group?
                var friend = $("#dchat_tree").jstree("get_json", friendid, 
                {
                    "no_state": true, "no_id": false, "no_children": true, "no_data": true
                }, 
                false);
                that._createWindowChat(friend, that.options);
            }
        }
    });
    
    // Hien thi thanh tim kiem
    $("#dchat_container").append("<div id='dchat_search_bar'><input type='text' placeholder='Search...'></div>");
    $("#dchat_search_bar input").autocomplete({
        source: that.searchData,
        select: function(event, ui){
            // cho nay se mo cua so chat moi
            var account = ui.item.value;
            
            // phai tim ra duoc id va ten cua ban
            var friend = {};
            friend.id = account;
            // Tim kiem displayname ung voi jid
            var name = "unknow";
            for(var i = 0; i< that.friendList.length; i++){
                if(that.friendList[i].jid === friend.id){
                    name = that.friendList[i].name !== "" ? that.friendList[i].name : that.friendList[i].jid;
                    break;
                }
            }
            friend.text = name;
            that._createWindowChat(friend, that.options);
        },
        position: {my: "right bottom", at: "right bottom"}
    });
    
    
    $("#hidden_friend_region").bind("click", function(){
        if($("#notification_container").length === 0){
            $("#hidden_friend_region").append("<div id='notification_container'><div id='notification_title'>Notifications</div><div id='notification_body'></div></div>");
            for(var i = 0; i < that.hiddenFriendsList.length; i++){
                $("#notification_body").append("<div id='friend_item' class='" + that.hiddenFriendsList[i].id + "'>" + that.hiddenFriendsList[i].text + "</div>");
            }
            for(var i = 0; i < that.hiddenFriendsList.length; i++){
                var index = i;
                $("." + that.hiddenFriendsList[i].id).bind("click", function(){
                    var chatWindows = $("#chat_region").children("#chat_window");
                    //Cat noi dung cua so hien tai vao trong hiddenfriend
                    var id = $(chatWindows[2]).attr("class");
                    var displayname = $(chatWindows[2]).find("#chat_window_title_content").text();
                    var friend = {
                       id: id,
                       text: displayname
                    };
                    chatWindows[2].remove();
                    that.count--;
                    that._createWindowChat(that.hiddenFriendsList[index], that.options, false);
                    that.hiddenFriendsList.splice(index, 1);
                    that.hiddenFriendsList.push(friend);
                });
            }
        }else{
            $("#notification_container").remove();
            $("#friend_item").unbind();
        }
    });
    //eGovChat.displayNumberInCycle("#dchat_title", "9+");
};

eGovChat.prototype._hideHiddenFriend = function(){
    $("#hidden_friend_region").addClass("hidden_class");
};

/**
 * Ham nay se quyet dinh viec hien thi cua so chat nhu the nao khi co message moi
 * Nguyen tac:
 * - B1: Tim xem cua so chat day da co chua, neu co roi thi hien thi, neu chua co thi chuyen sang B2
 * - B2: kiem tra xem so luong cua so da dat toi da chua, neu chua thi tao cua so chat moi, neu roi thi chuyen sang B3
 * - B3: kiem tra xem ban nay co dang an khong, neu khong thi dua vao cua so an, neu roi thi cung dua vao cua so an
 * Luu y: neu ban dang an thi noi dung chat se duoc cache tam vao bo nho de cho hien thi
 * @param {type} friendName ten hien thi cua ban be
 * @param {type} nick nickname hay jid cua ban be
 * @param {type} content noi dung can hien thi
 * @returns {undefined}
 */
eGovChat.prototype.displayWindow = function(friendName, nick, content){
    var cloneNick = nick;
    var index = nick.indexOf("@");
    nick = nick.substring(0, index);
    var children = $("#chat_region").children();
    for(var i = 0 ; i < children.length; i++){
        if($(children[i]).attr("class") === nick){
            // Cong noi dung vao cua so dang hien
            this.addMsg(content, nick, false);
            return;
        }
    }
    if(children.length < 3){
        // can hien thi cua so moi
        var friend = {};
        friend.id = nick;
        friend.text = friendName;
        var isCreateHidden = this._createWindowChat(friend, this.options, false);
        if(!isCreateHidden){
            this.addMsg(content, nick, false);
        }else{
            for(var i = 0; i < this.msgArchive.length; i++){
                if(cloneNick === this.msgArchive[i].jid){
                    var msgs = this.msgArchive[i].message;
                    msgs.push(content);
                    this.msgArchive[i].message = msgs;
                    break;
                }
            }
        }
        return;
    }else{
        // truong hop co hidden, luu noi dung vao bo nho va dua ban vao danh sach an.
        for(var i = 0; i < this.msgArchive.length; i++){
            if(cloneNick === this.msgArchive[i].jid){
                var msgs = this.msgArchive[i].message;
                msgs.push(content);
                this.msgArchive[i].message = msgs;
                break;
            }
        }
        
    }
};

/**
 * Hien thi lai man hinh login neu session bi het han
 * @returns {undefined}
 */
eGovChat.prototype.displayLogin = function(){
    var that =- this;
    $("#dchat_tree").remove();
    $("#dchat_tree").append("<div id='dchat_login_button'>Login</div>");
    $("#dchat_login_button").click(function(){
        var connection = new SOAPRequest({container: that});
        var soap = {};
        soap.ChatGetSessionRequest = {
            from: that.options.account,
            rid: ++rid,
            wait: 0,//fix for polling request, we will set it after geting the getsession response
            hold: 1,
            requests: 2
        };
        connection.chatGetSessionRequest(soap);
        $("#dchat_login_button").remove();
    });
};

/**
 * Kiem soat menu chinh cua phan chat
 * @param {boolean} isLogin xac dinh tai khoan da duoc login chua
 * @returns {undefined}
 */
eGovChat.prototype.mainMenu = function(isLogin){
    var that = this;
    $("#setting_button").unbind();
    if(isLogin){
        $("#setting_button").bind("click", function() {
            $.contextMenu( 'destroy', "#setting_button" );
            $.contextMenu({
                selector: "#setting_button",
                items: {
                    "Add": {
                        name: "Add friend...",
                        callback: function(key, opts){
                            // tao cua so them ban be cho nguoi dung
                            var html = [];
                            html.push("<div>");
                                html.push("<div id='jid_container' style='overflow:hidden;'>");
                                    html.push("<div style='float:left;'>Tên tài khoản:</div>");
                                    html.push("<div style='float:right;'><input type='textbox' id='jid'></div>");
                                html.push("</div>");

                                html.push("<div id='nickname_container' style='overflow:hidden;'>");
                                    html.push("<div style='float:left;'>Tên bạn bè:</div>");  
                                    html.push("<div style='float:right;'><input type='textbox' id='nickname'></div>");
                                html.push("</div>");

                                html.push("<div id='group_container' style='overflow:hidden;'>");
                                    html.push("<div style='float:left;'>Tên nhóm:</div>");
                                    //dalmate - doi thanh dropbox, chi cho phep chon tu nhom co san
                                    // Neu muon tao nhom thi chon tu menu chinh cua ung dung
                                    html.push("<div style='float:right;'>");
                                        html.push("<select id='group'>");
                                        for(var i = 0; i < eGovChat.gGroups.length; i++){
                                            html.push("<option value=" + i + ">" + eGovChat.gGroups[i] + "</option>");
                                        }
                                        html.push("</select>");
                                    html.push("</div>");
                                html.push("</div>");
                            
                            html.push("</div>");
                            $(html.join("")).dialog({
                                title: "Thêm bạn mới",
                                buttons: [
                                    {
                                        text: "Thêm",
                                        click: function(){
                                            var jid = $(".dchat_add_friend_dlg #jid_container #jid").val();
//                                            console.log(jid);
                                            if(jid.indexOf("@") === -1){
                                                jid = jid + "@ducla";
                                            }
                                            
                                            var nickname = $(".dchat_add_friend_dlg #nickname_container #nickname").val();
                                            var index = $(".dchat_add_friend_dlg #group_container #group :selected").val();
                                            var group = eGovChat.gGroups[index];
                                            var connection = new SOAPRequest({container: that});
                                            connection.addFriendRequest(jid, nickname, group);
                                            $(this).dialog("destroy");
                                        }
                                    },
                                    {
                                        text: "Đóng lại",
                                        click: function(){
                                            $(this).dialog("destroy");
                                        }
                                    }
                            ],
                            dialogClass: "dchat_add_friend_dlg no-close"
                            });
                        }
                    },
                    "newFriend": {
                        name: "Invitation...",
                        callback: function(key, opts){
                            // Tạo cửa sổ để chấp nhận hoặc từ chối bạn bè
                            var html = [];
                            html.push("<div class='invitation_content' style='max-height: 200px !important; overflow:auto;'>");
                                for(var i = 0; i < eGovChat.invitations_number; i++){
                                    var index = eGovChat.invitations[i] .indexOf("@");
                                    var id = eGovChat.invitations[i] .substring(0, index);
                                    html.push("<div id='friend' name='" 
                                        + id 
                                        + "'><div id='friend_no_avatar'></div><div id='friend_name'>" 
                                        + eGovChat.invitations[i] 
                                        + "</div><div id='control_button'>" 
                                        + "<div class='accept_button' id='" + id + "'><a class='button' href='#'>Đồng ý</a></div>"
                                        + "<div class='decline_button' id='" + id + "'><a class='button' href='#'>Từ chối</a></div>"
                                        + "</div></div>"); 
                                 }
                            html.push("</div>");
                            $(html.join("")).dialog({
                                title: "Lời mời",
                                buttons: [
                                    {
                                        text: "Đóng",
                                        click: function(){
                                            eGovChat.displayNumberInCycle("#dchat_title", eGovChat.invitations_number);
                                            $(this).dialog("destroy");
                                        }
                                    }
                                ],
                                dialogClass: "dchat_invitation_dlg no-close"
                            });
                            $(".accept_button").bind("click", function(){
                                var id = $(this).attr("id");
                                $('[name="' + id + '"]').fadeOut("slow", $('[name="' + id + '"]').remove());
                                var index = -1;
                                for(var i = 0; i < eGovChat.invitations_number; i++){
                                    var jid = id + "@ducla";
                                    if(jid === eGovChat.invitations[i]){
                                        index = i;
                                        break;
                                    }
                                }
                                if(index !== -1){
                                    eGovChat.invitations_number--;
                                    eGovChat.invitations.splice(index, 1);
                                }
                                var connection = new SOAPRequest({container: that});
                                connection.replyFriendRequest(id + "@ducla", id + "@ducla", "", "subscribed");
                            });
                            $(".decline_button").bind("click", function(){
                                var id = $(this).attr("id");
                                $('[name="' + id + '"]').fadeOut("slow", $('[name="' + id + '"]').remove());
                                var index = -1;
                                for(var i = 0; i < eGovChat.invitations_number; i++){
                                    var jid = id + "@ducla";
                                    if(jid === eGovChat.invitations[i]){
                                        index = i;
                                        break;
                                    }
                                }
                                if(index !== -1){
                                    eGovChat.invitations_number--;
                                    eGovChat.invitations.splice(index, 1);
                                }
                                var connection = new SOAPRequest({container: that});
                                connection.replyFriendRequest(id + "@ducla", id + "@ducla", "", "unsubscribed");
                            });
                        }
                    }
                },
                trigger: "left",
                className: "setting_menu"
            });
        });
    }else{
        $("#setting_button").bind("click", function() {
            $.contextMenu( 'destroy', "#setting_button" );
            $.contextMenu({
                selector: "#setting_button",
                items: {
                    "login": {
                        name: "Login",
                        callback: function(key, opts){
                           // Hiển thị cửa sổ thêm bạn bè
                           // Lưu ý sau khi xử lý xong thì phải giảm số lượng cho phần notification
                        }
                    }
                },
                trigger: "left",
                className: "setting_menu"
            });
        });
    }
};

/**
 * Hiển thị một hình tròn, có nội dung là số trên các div
 * Mục đích là để hiển thị số lượng notification cho hệ thống
 * @param {id} parent id của thẻ div cần hiển thị
 * @param {int} number số cần hiển thị
 * @returns {undefined}
 */
eGovChat.displayNumberInCycle = function(parent, number){
    if(number > 0){
        var numberInput = "";
        if(number > 9){
            numberInput = "9+";
        }else{
            numberInput = number;
        }
        // Loại bỏ các thẻ này trước khi thêm
        $(parent + " .circle").remove();
        // Thêm lại thẻ này để refresh nội dung
        var html = [];
        html.push("<div class='circle'>");
        html.push(numberInput);
        html.push("</div>");
        $(parent).append(html.join(""));
    }else{
        $(parent + " .circle").remove();
    }
};

/**
 * Chuyen tu milisecond sang dang thoi gian UTC theo chuan XEP-0082
 * @param {long} time millisencond value
 * @returns {undefined}
 */
eGovChat.convertToUTCTime = function(time){
    var date = new Date(time);
    var month = (date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1);
    var d = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
    var hour = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    var minute = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    var second = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds();
    var milli = date.getUTCMilliseconds() < 10 ? "0" + date.getUTCMilliseconds() : date.getUTCMilliseconds();
    return date.getUTCFullYear() + "-" + month + "-" + d + "T" + hour + ":" + minute + ":" + second + "." + milli + "Z";
};