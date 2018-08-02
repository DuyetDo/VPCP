/* 
 * Copyright 2014 Viettel ICT.
 * Do not use this source code if you don't have permission
 */

/**
 * @link https://github.com/webrtc/samples/blob/master/src/js/adapter.js
 */

/**
 * Kiểm soát các tính năng liên quan tới conference
 * @param {string} id id của bạn bè
 * @param {string} nickname 
 * @returns {undefined}
 */
function Conference(id, nickname){    
    this._createWindow(id, nickname);
};

Conference.browserType = 0; // 1 - Firefox, 2 - Chrome, 3 - Opera, 0 - IE <-- WTH, do we need to sp IE?
Conference.prototype.video;
Conference.prototype.pc; //local peer connection
Conference.prototype.ip_dups = {};

/**
 * Mở cửa sổ conference:
 * - Cho phép bật/tắt camera và mic
 * @param {string} id
 * @param {string} nickname
 * @returns {undefined}
 */
Conference.prototype._createWindow = function(id, nickname){
    // Cần phải kiểm tra xem cửa sổ này đã tồn tại hay chưa
    var that = this;
    var html = [];
    html.push("<div>");
//        html.push("<div class='display_region'>");
            html.push("<video autoplay class='vid'></video>");
//        html.push("</div>");
        html.push("<div class='control_region'>");
            html.push("<div style='overflow:hidden;'>");
                html.push("<div class='volume_icon'></div>");
                html.push("<div class='volume_slider'></div>");
                html.push("<div class='camera_icon'><input type='image' src='./Share/css/camera.png'></div>");
            html.push("</div>");
        html.push("</div>");
    html.push("</div>");
     $(html.join("")).dialog({
         title: "Chat với " + nickname,
         minHeight: 300,
         height: 300,
         width: 330,
         dialogClass: id + "_conference_dialog",
         close: function(event, ui){
             
             that.video.pause();
             if(Conference.browserType === 1){                 
                 that.video.mozSrcObject = null;
             }else if(Conference.browserType === 2){
                 that.video.src = "";
             }else if(Conference.browserType === 3){
                 that.video.src = null;
             }
         }
     });
     $("." + id + "_conference_dialog .volume_slider").slider();
     if(!this._checkFeatures()){
         alert('Your browser does not support these features!');
     }else{
         var errorCallback = function(e) {
            console.log('Can not stream media!', e);
          };
          var browser = this.whichBrowser();
          if(browser.name === "Firefox"){
              Conference.browserType = 1;
          }else if(browser.name === "Chrome"){
              Conference.browserType = 2;
          }else if(browser.name === "Internet Explorer"){
              Conference.browserType = 3;
          }
          var localMediaStream = null;
//          window.URL = window.URL || window.webkitURL;
          this._getConfigure(function(ip){console.log(ip);});
          if(browser.name === "Firefox"){
            navigator.mozGetUserMedia({
                video: {
                    mandatory:{
                        maxWidth: 320,
                        maxHeight: 240
                    }
                },
                audio: true
            }, 
            function(stream){
               that.video = document.querySelector("." + id + "_conference_dialog .vid");
               that.video.src = window.URL.createObjectURL(stream);
               that.video.controls = true;
               localMediaStream = stream;
//               that.pc.addStream(stream);
//               that.pc.createOffer(that._gotDescriptionLocal, that._errorHandler);
            }, errorCallback);
        }else if(browser.name === "Chrome"){
            navigator.webkitGetUserMedia({
                video: {
                    mandatory:{
                        maxWidth: 320,
                        maxHeight: 240
                    }
                },
                audio: true
            }, 
            function(stream){
               that.video = document.querySelector("." + id + "_conference_dialog .vid");
               that.video.src = window.URL.createObjectURL(stream);
               that.video.controls = true;
               localMediaStream = stream;
            }, errorCallback);
        }else if(browser.name === "Internet Explorer"){
            navigator.msGetUserMedia({
                video: true,
                audio: true
            }, 
            function(stream){
               that.video = document.querySelector("." + id + "_conference_dialog .vid");
               that.video.src = window.URL.createObjectURL(stream);
               that.video.controls = true;
               localMediaStream = stream;
            }, errorCallback);
        }else{
            navigator.getUserMedia({
                video: {
                    mandatory:{
                        maxWidth: 320,
                        maxHeight: 240
                    }
                },
                audio: true
            }, 
            function(stream){
               that.video = document.querySelector("." + id + "_conference_dialog .vid");
               that.video.src = window.URL.createObjectURL(stream);
               that.video.controls = true;
               localMediaStream = stream;
            }, errorCallback);
        }
     }
};

Conference.prototype._checkFeatures = function(){
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

/**
 * Xác định phiên bản của trình duyệt
 * @returns {unresolved}
 */
Conference.prototype.whichBrowser = function(){
//    console.log(bowser);
    return bowser;
};

/**
 * Lay thong tin local
 * Chuan bi cac tham so de ket noi p2p giua 2 client voi nhau
 * 
 * @link https://github.com/diafygi/webrtc-ips
 * @param {type} callback
 * @returns {undefined}
 */
Conference.prototype._getConfigure = function(callback){
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };
    var that = this;
    if(Conference.browserType === 1){
        var servers = undefined;
        this.pc = new mozRTCPeerConnection(servers, mediaConstraints);
        this.pc.onicecandidate = function(ice){
        if(ice.candidate){
            that._handleCandidate(ice.candidate.candidate);
        }
        };
        this.pc.createDataChannel("");
        this.pc.createOffer(function(result){            
            that.pc.setLocalDescription(result, function(){}, function(){});
        }, function(){});
        setTimeout(function(){
            var lines = that.pc.localDescription.sdp.split('\n');
            console.log(lines);
            lines.forEach(function(line){
                if(line.indexOf('a=candidate:') === 0){
                    that._handleCandidate(line);
                }
            });
        }, 1000);
    }else if(Conference.browserType === 2){
        // look for more stun server? see here: https://gist.github.com/zziuni/3741933
        var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
        this.pc = new webkitRTCPeerConnection(servers, mediaConstraints);// Lưu ý phần tiền tố cho các hàm
        this.pc.onicecandidate = function(ice){
            if(ice.candidate){
                that._handleCandidate(ice.candidate.candidate);
            }
        };
        this.pc.createDataChannel("");
        this.pc.createOffer(function(result){
            that.pc.setLocalDescription(result, function(){}, function(){});
        }, function(){});
        setTimeout(function(){
            var lines = that.pc.localDescription.sdp.split('\n');
            console.log(lines);
            lines.forEach(function(line){
                if(line.indexOf('a=candidate:') === 0){
                    that._handleCandidate(line);
                }
            });
        }, 1000);
    }else if(Conference.browserType === 3){
        this.pc = new RTCPeerConnection();// Lưu ý phần tiền tố cho các hàm
        this.pc.onicecandidate = function(ice){
            if(ice.candidate){
                that._handleCandidate(ice.candidate.candidate);
            }
        };
        this.pc.createDataChannel("");
        this.pc.createOffer(function(result){
            that.pc.setLocalDescription(result, function(){}, function(){});
        }, function(){});
        setTimeout(function(){
            var lines = that.pc.localDescription.sdp.split('\n');
            console.log(lines);
            lines.forEach(function(line){
                if(line.indexOf('a=candidate:') === 0){
                    that._handleCandidate(line);
                }
            });
        }, 1000);
    }
    
};

Conference.prototype._gotDescriptionLocal = function(desc){
    console.log(desc);
};

Conference.prototype._logHandler = function(error){
    console.log(error);
};

Conference.prototype._handleCandidate = function(candidate){
    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
    var ip_addr = ip_regex.exec(candidate)[1];
    //remove_duplicates
    if(this.ip_dups[ip_addr] === undefined){
        console.log(ip_addr);
    }
    this.ip_dups[ip_addr] = true;
};
