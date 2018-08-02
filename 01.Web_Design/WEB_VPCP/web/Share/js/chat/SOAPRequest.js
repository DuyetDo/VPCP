/* 
 * Make SOAP request
 */


//NOTE: them chuc nang tu dong tai lai du lieu sau khi them, sua hoac xoa du lieu.
/**
 * 
 * @param (json) params 
 *  {
 *      container: container
 *      child: child - doi tuong nhan ket qua, neu co ngoai le so voi binh thuong
 *      action: thao tac them khi nhan duoc ket qua cua request
 *  }
 * @param {type} obj description
 * @returns {null} no return, only return if error
 */
function SOAPRequest(params, obj){
    this.request = null;
    this.container = params.container;
    this.child = params.child;
    this.action = params.action;
    this.url = location.protocol +"//" + window.location.host + "/voffice/ChatDispatch";
    if(window.XMLHttpRequest){
        this.request = new XMLHttpRequest();
    }else{
        try{
            this.request = new ActiveXObject("MSXML2.XMLHTTP3.0");
        }catch(ex){
            return null;
        }
    }
};

SOAPRequest.prototype.constructor = SOAPRequest;

SOAPRequest.prototype.container;
SOAPRequest.prototype.child;
SOAPRequest.prototype.requestName;
SOAPRequest.prototype.action;
SOAPRequest.prototype.protocol;
SOAPRequest.prototype.hostname;
SOAPRequest.prototype.port;
SOAPRequest.prototype.poll;



SOAPRequest.prototype.getHost = function(){
    this.protocol = location.protocol;
    this.hostname = location.hostname;
    this.port = location.port ? ":" + location.port : "";
    return this.protocol + "//" + this.hostname;
};


SOAPRequest.prototype.setRequestName = function(requestName){
    this.requestName = requestName;
};

/**
 * Send SOAP request
 * @param {type} json   json data
 * @param {type} async sync or async
 * @param {boolean} needReload Co can phai goi ham reload du lieu hay khong
 * @returns {@pro;responseText@this.request}
 */
SOAPRequest.prototype.sendRequest = function(json, async, needReload){
    var parent = this.container;
    var self = this;
    var reload = typeof needReload !== "undefined" ? needReload : false;
//    console.log(self.requestName);
    this.request.onreadystatechange = function(){
        var response = this;
        self.responseHandler(response);
    };
    this.request.open("POST", this.url, async);
    this.request.send(JSON.stringify(json));
};

/**
 * Xu ly tat ca cac response tra ve khac
 * @argument {String} response response from server
 * @returns {undefined}
 */
SOAPRequest.prototype.responseHandler = function(response){
    if(response.readyState === 4){
        if(response.status === 200){
            var response = JSON.parse(response.responseText);
            if(typeof response.ChatBindResourceResponse !== "undefined"){
                //Lay roster luon
                eGovChat.jid = response.ChatBindResourceResponse.body.iq.bind.jid;
                var soap = {};
                soap.ChatGetRosterRequest = {
                    rid: ++rid,
                    sid: sid,
                    jid: eGovChat.jid
                };
                this.sendRequest(soap, true, false);
            }else if(typeof response.ChatGetRosterResponse !== "undefined"){
                // ve danh sach ban be len trang
                var items = response.ChatGetRosterResponse.body.iq.query.item;
                this.container.drawFriendList(items);
                // Thiet lap poll request cho he thong
                var soap = {};
                soap.ChatGetRosterStatusRequest = {
                    rid: ++rid,
                    sid: sid
                };
                this.sendRequest(soap, true, false);
            }else if(typeof response.ChatPollResponse !== "undefined"){
                this.poll = undefined;
                var body = response.ChatPollResponse.body;
                if(typeof body["stream:error"] !== "undefined"){
                    // Loai bo moi request do phien lam viec hien tai da het hieu luc
                    // Quay tro lai man hinh dang nhap tinh nang chat
                    if(typeof body["stream:error"]["conflict"] !== "undefined"){
                        this.container.displayLogin();
                    }
                }else{
                    if(typeof body.message !== "undefined"){
                        this._messageProcess(body);
                    }
                    if(typeof body.presence !== "undefined"){
                        this._presenceProcess(body.presence);
                    }
                    this.schedulePoll();
                }
            }else if(typeof response.ChatSendMessageResponse !== "undefined"){
                // Xu ly noi dung chat
                var body = response.ChatSendMessageResponse.body;
                this._messageProcess(body);
            }else if(typeof response.ChatGetRosterStatusResponse !== "undefined"){
                // Nen goi poll bat dau tu vi tri nay
                this.schedulePoll();
            }else if(typeof response.ChatPresenceManageResponse !== "undefined"){
                if(typeof response.ChatPresenceManageResponse.body.iq !== "undefined"){
                    var item = response.ChatPresenceManageResponse.body.iq.query.item;
                    var name = SOAPRequest.nickname;
                    SOAPRequest.nickname = "";
                    var jid = item.jid;
                    var group = item.group;
                    var index = jid.indexOf("@");
                    jid = jid.substring(0, index);
                    // Cho nay phai lam mot request de dat ten cho jid nua
                    if(SOAPRequest.group === ""){
                        var data = {
                            "text": name !== "" ? name : jid,
                            "id": jid,
                            "icon": "avatar"
                        };
                        // Thêm vào cây bạn bè
                        $("#dchat_tree").jstree("create_node", "#" + group + "_id_group", data);
                        var connection = new SOAPRequest({container: this.container});
                        name = name !== "" ? name : jid;
                        connection.moveToGroup(item.jid, name);
                    }else{
                        // Neu chuyen luon ban be vao group thi phai gui them mot request nua
                        var connection = new SOAPRequest({container: this.container});
                        name = name !== "" ? name : jid;
                        connection.moveToGroup(item.jid, name);
                    }
                }
            }else if(typeof response.ChatRosterActionsResponse !== "undefined"){
                //Neu response tra ve chua phai la thong bao da remove thanh cong thi phai gui request them lan nua
                if(typeof response.ChatRosterActionsResponse.body.iq === "undefined"){
                    // Cho nay phai la gui lai request nay mot lan nua, ko chi la request remove
                    var connection = new SOAPRequest({container: this.container});
                    if(SOAPRequest.rosteraction === "deleteFriendRequest"){
                        connection.deleteFriendRequest(eGovChat.deleteFriend);
                    }
                }else{
                    // neu day la request chuyen roster giua cac nhom thi ve lai cay
                    SOAPRequest.rosteraction = "";
                    var iq = response.ChatRosterActionsResponse.body.iq;
                    if(typeof iq.length !== "undefined"){
                        for(var i = 0; i < iq.length; i++){
                            var subscription = iq[i].query.item.subscription;
                            var dgroup = iq[i].query.item.group;
                            var jid = iq[i].query.item.jid;
                            var index = jid.indexOf("@");
                            jid = jid.substring(0, index);
                            var name = iq[i].query.item.name;
//                            var id = jid.substring(0, index);
//                            console.log(id);
//                            var node = $("#dchat_tree").jstree("get_node", id);
//                            console.log(node);
                            if(subscription === "none" && typeof dgroup !== "undefined"){
                                // chuyen roster vao group moi
//                                $("#dchat_tree").jstree("move_node", node, parent);
                                var data = {
                                    "text": name ? name : jid,
                                    "id": jid,
                                    "icon": "avatar"
                                };
                                // Thêm vào cây bạn bè
                                $("#dchat_tree").jstree("create_node", "#" + dgroup + "_id_group", data);
                            }
                        }
                    }else{
                        var subscription = iq.query.item.subscription;
                        var dgroup = iq.query.item.group;
                        var jid = iq.query.item.jid;
                        var index = jid.indexOf("@");
                        var jid = jid.substring(0, index);
                        var name = iq.query.item.name;
//                        var id = jid.substring(0, index);
//                        console.log(id);
//                        var node = $("#dchat_tree").jstree("get_node", id);
//                        console.log(name);
                        if(subscription === "none" && typeof dgroup !== "undefined"){
                            // chuyen roster vao group moi
                            var data = {
                                "text": name ? name : jid,
                                "id": jid,
                                "icon": "avatar"
                            };
                            // Thêm vào cây bạn bè
                            $("#dchat_tree").jstree("create_node", "#" + dgroup + "_id_group", data);
                        }
                    }
                    eGovChat.deleteFriend = "";
                }
            }else if(typeof response.ChatGetOfflineMessageResponse !== "undefined"){
                var chat = response.ChatGetOfflineMessageResponse.body.iq.chat;
                this._offlineMessage(chat);
            }else if(typeof response.ChatGetOfflineMessageListResponse !== "undefined"){
                if(typeof response.ChatGetOfflineMessageListResponse.body.iq !== "undefined"){
                    var chats = response.ChatGetOfflineMessageListResponse.body.iq.list.chat;
                    eGovChat.histories.length = 0;//clear cache
                    if(chats.lenght !== 0){
                        for(var i = 0; i < chats.length; i++){
                            eGovChat.histories.push(chats[i].start);
                        }
                        //Gui luon request lay tin nhan offline dau tien
                        var start = eGovChat.histories[eGovChat.histories.length - 1];
                        eGovChat.lastHistory = start;
                        eGovChat.histories.splice(eGovChat.histories.length - 1, 1);
                        for(var i = 0; i < eGovChat.historiesCache.length; i++){
                            console.log(eGovChat.historiesCache[i].id + ":" + eGovChat.activeId);
                            if(eGovChat.historiesCache[i].id === eGovChat.activeId){
                                eGovChat.historiesCache[i].histories = eGovChat.histories;
                                eGovChat.historiesCache[i].lastHistory = eGovChat.lastHistory;
                                break;
                            }
                        }
                        var soap = {};
                        soap.ChatGetOfflineMessageRequest = {
                            rid: ++rid,
                            sid: sid,
                            fjid: eGovChat.activeId + "@ducla",
                            max: 100,
                            start: start
                        };
                        this.sendRequest(soap, true, false);
                    }
                }
            }
        }
    }
};

SOAPRequest.prototype._messageProcess = function(body){
    if(typeof body.message !== "undefined"){
        if(typeof body.message.length !== "undefined"){
            for(var i = 0; i < body.message.length; i++){
                var msg = body.message[i];
                var from = msg.from;
                var index = from.indexOf("/");
                from = index !== -1 ? from.substring(0, index) : from;
                if(index !== -1){
                    var ct = body.message[i].body;
                    if(typeof ct !== "undefined"){
                        //tim displayname cua ban chat, neu khong co thi lay nickname
                        var fn = from;
                        for(var j = 0; j < eGovChat.friends.length; j++){
                            if(from === eGovChat.friends[j].nick){
                                fn = eGovChat.friends[j].name !== "" ? eGovChat.friends[j].name : from;
                                break;
                            }
                        }
                        this.container.displayWindow(fn, from, ct);
                    }
                }
            }
        }else{
            var msg = body.message;
            var from = msg.from;
            var index = from.indexOf("/");
            from = index !== -1 ? from.substring(0, index) : from;
            if(index !== -1){
                var ct = body.message.body;
                if(typeof ct !== "undefined"){
                    //tim displayname cua ban chat, neu khong co thi lay nickname
                    var fn = from;
                    for(var i = 0; i < eGovChat.friends.length; i++){
                        if(from === eGovChat.friends[i].nick){
                            fn = eGovChat.friends[i].name !== "" ? eGovChat.friends[i].name : from;
                            break;
                        }
                    }
                    this.container.displayWindow(fn, from, ct);
                }
            }
        }
    }
    this.schedulePoll();
};


/**
 * Lap lich gui poll request
 * @returns {undefined}
 */
SOAPRequest.prototype.schedulePoll = function(){
    if(typeof this.poll === "undefined"){
        this.poll = AjxTimedAction.scheduleAction(new AjxTimedAction(this, this.PollRequest), 10000);
    }
};

/**
 * Huy lich gui poll request
 * @returns {undefined}
 */
SOAPRequest.prototype.cancelPoll = function(){
    AjxTimedAction.cancelAction(this.poll);
};

/**
 * Poll request, which is called each 5s if the client does not make any call
 * @returns {undefined}
 */
SOAPRequest.prototype.PollRequest = function(){
    var soap = {};
    soap.ChatPollRequest = {
        rid: ++rid,
        sid: sid
    };
    this.sendRequest(soap, true, false);
};

/**
 * Send message
 * @param {json} data {rid, sid, to, type, content}
 * @returns {undefined}
 */
SOAPRequest.prototype.SendMessageRequest = function(data){
    var soap = {};
    soap.ChatSendMessageRequest = {
        rid: ++rid,
        sid: sid,
        to: data.to,
        type: data.type,
        content: data.content
    };
    this.sendRequest(soap, true, false);
};



SOAPRequest.prototype.GetInfoRequest = function(json){
    var parent = this;
    this.request.onreadystatechange = function(){
        var response = this;
        parent.getInfoHandler(response);
    };
    this._sendRequest(json);
};

SOAPRequest.prototype.getInfoHandler = function(response){
    if(response.readyState === 4){
        if(response.status === 200){
            var response = JSON.parse(response.responseText);
            if(typeof response.GetInfoResponse.account !== "undefined"){
                account = response.GetInfoResponse.account;
            }else{
                // Quay nguoc lai trang dang nhap
                
            }
        }
    }
};

SOAPRequest.prototype.chatGetSessionRequest = function(json){
    var parent = this;
    this.request.onreadystatechange = function(){
        var response = this;
        parent.chatGetSessionResponse(response);
    };
    this._sendRequest(json);
};

SOAPRequest.prototype.chatGetSessionResponse = function(response){
   if(response.readyState ===4){
       if(response.status === 200){
           var response = JSON.parse(response.responseText);
           if(typeof response.ChatGetSessionResponse.body.sid !== "undefined"){
               sid = response.ChatGetSessionResponse.body.sid;
               // Make sure sid is a string
               if(typeof sid === "number"){
                   sid = sid.toString();
               }
               // so we begin login chat service
               var soap = {};
               soap.ChatLoginRequest = {
                    sid: sid,
                    rid: ++rid,
                    account: {
                        username: eGovChat.account + "@ducla"
                    }
                };
                this.chatLoginRequest(soap);
           }else{
               
           }
       }
   } 
};


SOAPRequest.prototype._sendRequest = function(json){
    this.request.open("POST", this.url, true);
    this.request.send(JSON.stringify(json));
};

/**
 * Only use for login page
 * @param {type} json
 * @returns {undefined}
 */
SOAPRequest.prototype.sendLoginRequest = function(json){
    var parent = this;
    this.request.onreadystatechange = function(){
        //this is this.request variable
        var request = this;
        parent.loginRequestHandler(request);
    };
    this._sendRequest(json);
};

/**
 * Chi ap dung cho trang login
 * @param {json} response du lieu tra ve tu may chu
 * @returns {undefined}
 */
SOAPRequest.prototype.loginRequestHandler = function(response){
    if(response.readyState === 4){
        $("body").css({"cursor": "default"});
        if(response.status === 200){
            var response = JSON.parse(response.responseText);
            if(typeof response.AuthenticateResponse !== "undefined"){
                var success = response.AuthenticateResponse.success;
                // Chuyen tiep vao trang chinh
                if(success === "true"){
                    this.redirectPage("/main.jsp");
                }
            }else{
                // Thong bao sai username, mat khau hoac khong du quyen
                if(soap.haveException()){
                    soap.getExceptionCode();
                    var reason = soap.getExceptionReason();
                    $(".error").text(reason);
                }else{
                    $(".error").text("Unknown Error");
                    // Unknown Error :(
                }
            }
        }
    }else{
        $("body").css({"cursor": "waiting"});
    }
};

// Chat services area

SOAPRequest.prototype.chatLoginRequest = function(json){
    var parent = this;
    this.request.onreadystatechange = function(){
        var response = this;
        parent.chatLoginResponse(response);
    };
    this._sendRequest(json);
};


SOAPRequest.prototype.chatLoginResponse = function(response){
    if(response.readyState === 4){
        if(response.status === 200){
          var response = JSON.parse(response.responseText);
          if(typeof response.ChatLoginResponse.body.success !== "undefined"){
              //successfully login
              var soap = {};
              soap.ChatBindResourceRequest = {
                  rid: ++rid,
                  sid: sid
              };
              this.sendRequest(soap, true, false);
          }
        }
    }
};

SOAPRequest.group;// Group de chuyen roster, se bi xoa ngay sau khi gui request
SOAPRequest.nickname;// Ten cua roster, se bi xoa ngay sau khi gui request

SOAPRequest.prototype.addFriendRequest = function(jid, name, group){
    var soap = {};
    var friend = {
        jid: jid,
        nickname: name,
        group: group !== "" ? group : ""
    };
    
    SOAPRequest.group = group !== "" ? group : "";
    SOAPRequest.nickname = name !== "" ? name : "";
    //WTF? SOAPRequest.name lại là tên của object này
    soap.ChatPresenceManageRequest = {
        rid: ++rid,
        sid: sid,
        to: jid,//Fixme
        action: "subscribe"
    };
    this.sendRequest(soap, true, false);
};

SOAPRequest.rosteraction;// Luu request roster gan nhat, se bi xoa bo sau khi thuc hien xong

/**
 * Xóa bạn bè khỏi danh sách
 * @param {string} jid jid của bạn bè cần xóa
 * @returns {unknow}
 */
SOAPRequest.prototype.deleteFriendRequest = function(jid){
    var soap = {};
    soap.ChatRosterActionsRequest = {
        rid: ++rid,
        sid: sid,
        type: "set",
        action: "remove",
        friend: [
            {
                jid: jid,
                subscription: "remove"
            }
        ]
    };
    SOAPRequest.rosteraction = "deleteFriendRequest";
    this.sendRequest(soap, true, false);
};

SOAPRequest.prototype.moveToGroup = function(jid, name){
    var soap = {};
    soap.ChatRosterActionsRequest = {
        rid: ++rid,
        sid: sid,
        type: "set",
        friend: [
            {
                jid: jid,
                nickname: name,
                group: SOAPRequest.group
            }
        ]
    };
    SOAPRequest.rosteraction = "moveToGroup";
    this.sendRequest(soap, true, false);
};


SOAPRequest.prototype.replyFriendRequest = function(jid, name, group, action){
    var soap = {};
    soap.ChatPresenceManageRequest = {
        rid: ++rid,
        sid: sid,
        to: jid,
        action: action
    };
    this.sendRequest(soap, true, false);
};

/**
 * Xu ly cho cac presence response
 * @param {json} presence presence object (json format)
 * @returns {undefined}
 */
SOAPRequest.prototype._presenceProcess = function(presence){
    if(presence.length !== "undefined"){
        //Truong hop presence tra ve la mot mang
        for(var i = 0; i < presence.length; i++){
            if(presence[i].type === "subscribe"){
                var friend = presence[i].from;
                var isExist = false;
                for(var j = 0; j < eGovChat.invitation_number; j++){
                    if(eGovChat.invitation[j] === friend){
                        isExist = true;
                        break;
                    }
                }
                if(!isExist){
                    eGovChat.invitations.push(friend);
                    eGovChat.invitations_number++;
                    eGovChat.displayNumberInCycle("#dchat_title", eGovChat.invitations_number);
                }
            }
        }
    }else{
        // Truong hop presence tra ve khong phai la mot mang
        if(presence.type === "subscribe"){
            var friend = presence.from;
            var isExist = false;
            for(var j = 0; j < eGovChat.invitation_number; j++){
                if(eGovChat.invitation[j] === friend){
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                eGovChat.invitations.push(friend);
                eGovChat.invitations_number++;
                eGovChat.displayNumberInCycle("#dchat_title", eGovChat.invitations_number);
            }
        }
    }
};

/**
 * Xu ly noi dung tin nhan offline:
 * - Phan biet tin gui den/di
 * - Sap xep thu tu cho tin nhan
 * @param {json} chat offline contents
 * @returns {undefined}
 */
SOAPRequest.prototype._offlineMessage = function(chat){
    var offline = []; //[{body,sec,from}]
    if(typeof chat.from !== "undefined"){
        var from = chat.from;
        if(typeof from.length !== "undefined"){
            for(var i = from.length -1; i > 0; i--){
                offline.push({
                    body: from[i].body,
                    sec: from[i].secs,
                    from: false
                });
            }
        }else{
            offline.push({
                body: from.body,
                sec: from.secs,
                from: false
            });
        }
    }
    if(typeof chat.to !== "undefined"){
        var to = chat.to;
        if(typeof to.length !== "undefined"){
            for(var i = to.length - 1; i > 0; i--){
                offline.push({
                    body: to[i].body,
                    sec: to[i].secs,
                    from: true
                });
            }
        }else{
            offline.push({
                body: to.body,
                sec: to.secs,
                from: true
            });
        }
    }
    // Sap xep lai thu tu cac tin nhan dua theo sec
    for(var i = 0; i < offline.length - 1; i++){
        for(var j = offline.length - 1; j > i; j--){
            if(offline[j].sec < offline[j - 1].sec){
                var tmpoffline = offline[j];
                offline[j] = offline[j - 1];
                offline[j - 1] = tmpoffline;
            }
        }
    }
    // Hien thi noi dung len cua so
    var content = $("#chat_region ." + eGovChat.activeId + " #chat_content");
    for(var i = 0; i < offline.length; i++){
        if(offline[i].from){
            content.prepend("<div id='msg_to' class='bubble'>" + offline[i].body + "</div>");
        }else{
            content.prepend("<div id='msg_from' class='bubble bubble--alt'>" + offline[i].body + "</div>");
        }
    }
};