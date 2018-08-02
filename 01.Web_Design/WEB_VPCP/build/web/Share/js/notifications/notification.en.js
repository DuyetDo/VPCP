/* global zk, moment, group, zAu */

var notificationManage = {
    _htmlNotificationList: '',

    fillNotificationListPrev: function () {
        if ($('#notificationList').length > 0) {
            $('#notificationList').html(notificationManage._htmlNotificationList);
        }
    }
};

var notificationGroup = function (objectId, objectType, currentUserId, classView) {
    var pefix = classView;
    if (pefix === null || pefix === undefined) {
        pefix = '';
    }
    var projectNamePattern = /(.*)index.zul/;
    var matchedResult = projectNamePattern.exec(window.location.pathname);
    if (matchedResult.length === 0) {
        return;
    }
    this.projectName = matchedResult[1];
    this.loadMoreRootNotificationURL = window.location.origin
            + this.projectName + "rest/notification/loadMoreRootNotifications";
    this.loadMoreSubNotificationURL = window.location.origin + this.projectName
            + "rest/notification/loadMoreSubNotifications";
    this.sendNotificationURL = window.location.origin + this.projectName
            + "rest/notification/sendNotification";
    this.loadReceiversURL = window.location.origin + this.projectName
            + "rest/notification/loadReceivers";
    this.loadAttachsURL = window.location.origin + this.projectName
            + 'rest/attachs/list-ajax';
    this.viewAttachURL = window.location.origin + this.projectName
            + 'FileViewerUrl.do';

    this.toIndex = null;
    this.fromIndex = null;
    this.$rootNotificationList = null;
    this.$viewMoreNotificationsRow = null;
    this.objectId = objectId;
    this.objectType = objectType;
    this.currentUserId = currentUserId;
    this.wdNotificationSide = zk.Widget.$("$wdNotificationSide");
    this.zkAttachBox = this.wdNotificationSide.getChildAt(0).getChildAt(0);

    this.$rootNotificationList = $(pefix + "#notificationList");
    this.$rootCommentRow = this.createCommentBox(currentUserId);
    this.$rootNotificationList.append(this.$rootCommentRow);

    var groupboxWidget = zk.Widget.$("$grbxNotificationSide");
    var $groupContentDiv = $(pefix + "#" + groupboxWidget.uuid + "-cave");
    var $groupHeaderDiv = $(pefix + '#' + groupboxWidget.uuid + '-header');
    var $td = $(pefix.trim() + '.documentViewTable').children('tbody').children('tr').children(
            'td');
    this.notificationContainer = $(pefix + "#notificationContainer");

    var heightNotify = $('.main-content-inner ').height();
    if (heightNotify === null || heightNotify === undefined || heightNotify < 100) {
        heightNotify = 450;
    }
    heightNotify = heightNotify - 50;
    while (heightNotify % 10 !== 0) {
        heightNotify = heightNotify - 1;
    }
    this.notificationContainer.height(heightNotify);
    var self = this;
    new ResizeSensor($td, function (el) {
        $groupContentDiv.height(heightNotify);
        self.notificationContainer.height(heightNotify);
    });

    this.disableForm = false;

    this.procesType = {
        main: 0,
        cooperate: 1,
        receiveToKnow: 2,
        opinion: 3,
        proclaim: 6
    };

    // set language for momentjs
    moment.locale("en");
};

notificationGroup.prototype = {
    resizeNotificationContainer: function () {
        var groupboxWidget = zk.Widget.$("$grbxNotificationSide");
        var $groupContentDiv = $("#" + groupboxWidget.uuid + "-cave");
        this.notificationContainer = $("#notificationContainer");
        this.notificationContainer.height($groupContentDiv.height() - 2);
    },

    loadMoreRootNotifications: function (objectId, objectType) {
        var self = this;
        if (!self.disableForm) {
            self.disableForm = true;
            $.ajax({
                url: this.loadMoreRootNotificationURL + '?objectId='
                        + this.objectId + "&objectType=" + this.objectType
                        + '&fromIndex=' + this.fromIndex,
                type: 'POST',
                success: function (result) {
                    self.drawRootNotifications(result.list, result.fromIndex,
                            result.toIndex);
                    self.disableForm = false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self.disableForm = false;
                },
                timeout: 3000
            });
        }
    },

    drawRootNotifications: function (rootNotifications, fromIndex, toIndex, appendToHead, theFirstDraw) {
        if (fromIndex < this.fromIndex || this.fromIndex === null) {
            this.fromIndex = fromIndex;
        }
        if (toIndex > this.toIndex || this.toIndex === null) {
            this.toIndex = toIndex;
        }
        var length = rootNotifications.length;

        if (!this.$viewMoreNotificationsRow) {
            this.$rootNotificationList.append(this.createViewMoreNotifications()).change().show();
        }
        this.refreshViewMoreNotifications();

        if (appendToHead) {
            for (var i = 0; i < length; i++) {
                this.createNotification(rootNotifications[i]).insertAfter(this.$rootNotificationList.find(">:first-child")).show("slow");
                var $subNotificationList = this.createSubNotificationList(rootNotifications[i]);
                if ($subNotificationList) {
                    $subNotificationList.insertBefore(this.$viewMoreNotificationsRow);
                }
            }
        } else {
            for (var i = 0; i < length; i++) {
                this.createNotification(rootNotifications[i]).insertBefore(this.$viewMoreNotificationsRow).show("slow");
                var $subNotificationList = this.createSubNotificationList(rootNotifications[i]);
                if ($subNotificationList) {
                    $subNotificationList.insertBefore(this.$viewMoreNotificationsRow);
                }
            }
        }
        if (theFirstDraw === undefined || theFirstDraw === null || theFirstDraw.toString() === 'false') {
            group.zkAttachBox.detach();
            group.createAttachBox(group.$rootCommentRow);
        }
    },

    loadMoreSubNotifications: function (parentId, $subNotificationList) {
        var self = this;
        if (!self.disableForm) {
            self.disableForm = true;
            $.ajax({
                url: this.loadMoreSubNotificationURL + '?notifyId=' + parentId,
                type: 'POST',
                success: function (subNotifications) {
                    self.drawSubNotifications(parentId, subNotifications, $subNotificationList);
                    self.disableForm = false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self.disableForm = false;
                }
            });
        }
    },
    drawSubNotifications: function (parentId, subNotifications,
            $subNotificationList) {
        var length = subNotifications ? subNotifications.length : 0;
        if (!$subNotificationList) {
            $subNotificationList = $(
                    "#notification_" + parentId + " + .UFIReplyList").first();
        }

        var $parentNotificationElement = $("#notification_" + parentId);
        var $replyList = $parentNotificationElement.next();
        var $addCommentElement = $replyList.find(".UFIAddComment");

        if ($addCommentElement.length === 0) {
            for (var i = 0; i < length; i++) {
                this.createNotification(subNotifications[i]).appendTo(
                        $subNotificationList).show("slow");
            }
        } else {
            for (var i = 0; i < length; i++) {
                this.createNotification(subNotifications[i]).insertBefore(
                        $addCommentElement[0]).show("slow");
            }
        }

        // append hide/show row
        if ($replyList.find('.UFIReplySocialSentenceRow').length === 0) {
            $subNotificationList.prepend(this.createViewMoreReplies(parentId,
                    $subNotificationList));
        }

    },
    createCommentBox: function (currentUserId, notification) {
        var $rootDiv = $("<div>", {
            class: "UFIRow UFIComponent UFIAddComment UFIComment display"
        });

        // avatar
        var $avatar = this.createAvatar(currentUserId);
        // textarea
        var $textbox = this.createInputBox(notification);

        $rootDiv.append($avatar);
        $rootDiv.append($textbox);
        return $rootDiv;
    },
    createNotification: function (notification) {
        var opinionClass = "";
        if (notification.type) {
            if (notification.type === 3) {
                opinionClass = "UFICommentOpinion";
            }
        }
        var $rootDiv = $("<div>", {
            id: "notification_" + notification.notifyId,
            class: "UFIRow UFIComment display UFIComponent " + opinionClass,
            parentId: notification.parentId,
            css: {
                'display': 'none'
            }
        });

        // avatar
        var $avatar = this.createAvatar(notification.sendUserId);
        // comment body
        var $commentBody = this.createCommentContent(notification);

        $rootDiv.append($avatar);
        $rootDiv.append($commentBody);
        return $rootDiv;
    },
    createSubNotificationList: function (notification, emptyReplies) {
        if (notification.numberOfChildren || emptyReplies) {
            var $subNotificationList = $("<div>", {
                class: "UFIReplyList"
            });
            if (!emptyReplies) {
                var $viewMoreReplies = this.createViewMoreReplies(
                        notification.notifyId, $subNotificationList);
                $subNotificationList.append($viewMoreReplies);
            }
            return $subNotificationList;
        } else {
            return null;
        }
    },
    createAvatar: function (currentUserId) {
        var $avatarDiv = $("<div>", {
            class: "lfloat"
        });

        var $a = $("<a>", {
            class: "UFIImageBlockImage",
            href: "#"
        });

        var $img = $("<img>", {
            class: "img UFIActorImage",
            src: this.projectName + "Share/avatar/" + currentUserId
        });
        $img.onerror = this.imgError($img);

        $img.appendTo($a);
        $a.appendTo($avatarDiv);
        return $avatarDiv;
    },
    imgError: function (image) {
        image.onerror = "";
        // image.src = this.projectName + "Share/img/default-avatar.png";
        image.attr('src', this.projectName + "Share/img/default-avatar.png");
        return true;
    },
    createCommentContent: function (notification) {
        //var $contentBlockDiv = $('<div style="max-width: 250px;">', {
        var $contentBlockDiv = $('<div>', {
            class: "UFICommentContentBlock"
        });
        var $contentDiv = $("<div>", {
            class: "UFICommentContent"
        });
        $contentBlockDiv.append($contentDiv);

        // user name
        var $actorNameSpan = $("<span>", {
            html: notification.sendUserName
        });
        var $actorNameA = $("<a>", {
            class: "UFICommentActorName"
        });
        var $blankSpan = $("<span>");
        $actorNameA.append($actorNameSpan);
        $blankSpan.append($actorNameA);
        $contentDiv.append($blankSpan);

        // comment body
        var $commentBodySpan = $("<span>", {
            class: "UFICommentBody",
            html: notification.content ? notification.content : "&nbsp;"
        });
        $contentDiv.append($commentBodySpan);

        // comment actions
        var $commentActionsDiv = $("<div>", {
            class: "UFICommentActions"
        });

        var rex = /(processId:\d+)/g;
        var numberOfReceivers = notification.receiver.match(rex) ? notification.receiver
                .match(rex).length
                : 0;
        var numberUser = notification.receiver.match(/(deptId:null)/g) ? notification.receiver
                .match(/(deptId:null)/g).length
                : 0;
        var self = this;
        if (numberUser === 0) {
            var visibleReceiverInfo = !notification.parentId
                    && notification.receiver
                    && notification.receiver.match(rex);
            if (visibleReceiverInfo) {
                var $numberOfReceiverA = $("<a>", {
                    html: numberOfReceivers + ' receiver' //' người nhận',
                });

                var rowParent = $numberOfReceiverA
                        .parents('.UFICommentOpinion');
                var isNumberOfReceiverOpinion = false;
                if (rowParent.length > 0) {
                    isNumberOfReceiverOpinion = true;
                }
                $numberOfReceiverA.hover(function (event) {
                    var $receiverList = $(this).siblings(
                            'div.receiverContainer');
                    if ($receiverList.length) {
                        $receiverList.css('visibility', 'visible');
                    } else {
                        $.ajax({
                            url: group.loadReceiversURL,
                            type: 'POST',
                            data: "notifyId=" + notification.notifyId,
                            success: function (result) {
                                var $receiverList = group.createReceiverList(
                                        result, isNumberOfReceiverOpinion);
                                var pos = $numberOfReceiverA.position();
                                var width = $numberOfReceiverA.outerWidth();
                                // show the menu directly over the placeholder
                                $receiverList.css({
                                    position: "absolute",
                                    top: pos.top + "px",
                                    left: (pos.left + width) + "px"
                                }).show();
                                $numberOfReceiverA.addClass('isLoad');
                                $numberOfReceiverA.parent().append(
                                        $receiverList);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                            },
                            timeout: 3000
                        });
                    }
                }, function () {
                    // group.$container.detach();
                    var $receiverList = $commentActionsDiv
                            .children('div.receiverContainer');
                    $receiverList.css('visibility', 'hidden');
                });
            }
        }
        var $replyAction = $("<a>", {
            html: "Answer"//"Trả lời"
        });
        $replyAction.on('click', function () {
            var parentId;
            if (typeof notification !== 'undefined') {
                if (typeof notification.parentId === 'undefined'
                        || notification.parentId === null) {
                    parentId = notification.notifyId;
                } else {
                    parentId = notification.parentId;
                }
            }
            var $replyList = group.checkExistsSubNotifications(parentId);
            if ($replyList) {
                var $inputContainer = $replyList.find('.UFIInputContainer');
                if ($inputContainer.length > 0) {
                    var innerHtml = "@" + notification.sendUserName;
                    $inputContainer.find('.reply-to-badge').html(innerHtml);
                    $inputContainer.find('textarea').css('text-indent',
                            innerHtml.length * 6.7);
                    $inputContainer.find('textarea').focus();
                } else {
                    // group.showHideSubNotifications(parentId);
                    $replyList.append(self.createCommentBox(this.currentUserId,
                            notification));
                }
                return;
            } else {
                group.drawSubNotificationsWithOnlyTextbox(notification);
            }
            $replyList = group.checkExistsSubNotifications(parentId);
            group.showHideSubNotifications(parentId);
            $replyList.append(self.createCommentBox(this.currentUserId,
                    notification));
        });

        var $timestampSpan = $("<span>", {
            class: "timestamp"
        });
        var $timestampAbbr = $("<abbr>", {
            html: moment(notification.sendTime, "YYYY-MM-DD'T'HH:mm:ss'7'")
                    .fromNow()
        });

        $timestampSpan.append($timestampAbbr);
        $commentActionsDiv.append($numberOfReceiverA);
        $commentActionsDiv.append($("<span>", {
            html: "&nbsp;&nbsp;&nbsp;&nbsp;"
        }));
        $commentActionsDiv.append($replyAction);
        $commentActionsDiv.append($("<span>", {
            html: "&nbsp;&nbsp;&nbsp;&nbsp;"
        }));
        $commentActionsDiv.append($timestampSpan);
        $contentDiv.append($commentActionsDiv);

        if (notification.numberOfAttachs) {
            var $loadAttachsLink = $('<a>', {
                html: 'Attached file'//'File đính kèm'
            });
            $loadAttachsLink.on('click', function () {
                $.ajax({
                    url: group.loadAttachsURL,
                    type: 'POST',
                    success: function (result) {
                        group.createAttachs($loadAttachsLink, result);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    },
                    data: 'objectId=' + notification.notifyId
                            + '&objectType=8',
                    timeout: 3000
                });
            });
            $contentDiv.append($loadAttachsLink);
        }

        return $contentBlockDiv;
    },
    createAttachs: function ($loadAttachsLink, data) {
        for (var i = 0; i < data.length; i++) {
            var $attachLink = $('<a>', {
                html: data[i].attachName,
                href: group.viewAttachURL + '?attachId=' + data[i].attachId
            });
            $attachLink.insertAfter($loadAttachsLink);
        }
        $loadAttachsLink.detach();
    },
    createInputBox: function (notification) {
        var $rootDiv = $("<div>", {
            class: "UFIImageBlockContent"
        });
        var $inputContainer = $("<div>", {
            class: "UFIInputContainer"
        });
        var $textarea = $("<textarea>", {
            // class : "autoExpand",
            'rows': 2
            //'placeholder': "Nhập nội dung và nhấn phím Enter để gữi"
            // 'data-min-rows' : 3
        });
        $textarea.attr("placeholder", "Import content and press enter button to send").placeholder();

        var self = this;
        var parentId, sendUserId, sendRoleId, sendDeptId;
        if (typeof notification !== 'undefined') {
            if (typeof notification.parentId === 'undefined'
                    || notification.parentId === null) {
                parentId = notification.notifyId;
            } else {
                parentId = notification.parentId;
            }
            sendUserId = notification.sendUserId;
            sendRoleId = notification.sendRoleId;
            sendDeptId = notification.sendDeptId;
        }
        self.disableForm = true;
        $textarea.on("keypress", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                if ($textarea.val()) {
                    var toIndex = null;
                    if (parentId) {
                        var $parentNotificationElement = $("#notification_"
                                + parentId);
                        var $replyElement = $parentNotificationElement.next();
                        var array = $replyElement
                                .find(".UFIRow .UFICommentContent");
                        toIndex = array.length;
                    } else {
                        toIndex = self.toIndex;
                    }
                    self.sendComment(parentId, $textarea.val(), toIndex,
                            sendUserId, sendRoleId, sendDeptId);
                    $textarea.val('');
                }
            }
        });
        $textarea.focus(function () {
            group.zkAttachBox.detach();
            group.zkAttachBox.setVisible(true);
            group.createAttachBox($rootDiv.parent());
        });
        $inputContainer.append($textarea);
        if (typeof notification !== 'undefined') {
            var innerHtml = "@" + notification.sendUserName;
            var $sendUser = $("<span>", {
                class: "reply-to-badge",
                html: "@" + notification.sendUserName
            });
            $sendUser.insertBefore($textarea);
            $textarea.css('text-indent', innerHtml.length * 6.7);
            $textarea.focus();
        }
        $rootDiv.append($inputContainer);
        return $rootDiv;
    },
    createAttachBox: function ($UFIRow) {
        var $rootDiv = $("<div>", {
            class: "attachbox"
        });
        $rootDiv.insertAfter($UFIRow);
        this.zkAttachBox.replaceHTML($rootDiv);
        return $rootDiv;
    },
    sendComment: function (parentId, content, toIndex, sendUserId, sendRoleId,
            sendDeptId) {
        var data = {
            fromIndex: toIndex,
            parentId: parentId,
            content: content,
            receiverUserId: sendUserId,
            receiverRoleId: sendRoleId,
            receiverDeptId: sendDeptId
        };
        zAu.send(new zk.Event(group.wdNotificationSide, "onSendComment", data));
    },
    createViewMoreReplies: function (parentId, $subNotificationList) {
        var $viewMoreReplies = $(
                "<div>",
                {
                    class: "UFIRow UFIReplySocialSentenceRow UFIFirstComponent UFILastComponent"
                });
        var $link = $("<a>", {
            class: "UFIShareLink"
        });
        var self = this;
        $link.on("click", function () {
            group.showHideSubNotifications(parentId);
        });
        $viewMoreReplies.append($link);

        var $pagerIconWrapper = $("<div>", {
            class: "UFIImageBlockImage lfloat"
        });
        var $pagerIcon = $("<i>", {
            class: "UFIPagerIcon"
        });
        $pagerIconWrapper.append($pagerIcon);
        $link.append($pagerIconWrapper);

        var $textWrapper = $("<div>", {
            class: "UFIImageBlockContent"
        });
        var $text = $(
                "<span>",
                {
                    class: "UFIReplySocialSentenceLinkText UFIReplySocialSentenceVerified",
                    html: $subNotificationList.find('.UFIRow.UFIComment').length > 0 ? 'Hiden comment'
                            : 'Show comment'
                });
        $textWrapper.append($text);
        $link.append($textWrapper);

        return $viewMoreReplies;
    },
    createViewMoreNotifications: function () {
        this.$viewMoreNotificationsRow = $("<div>", {
            class: "UFIRow UFIPagerRow UFIComponent UFILastCommentComponent"
        });
        var $rfloatDiv = $("<div>", {
            class: "rfloat"
        });
        var $pagerCount = $("<span>", {
            class: "UFIPagerCount",
            html: (this.toIndex - this.fromIndex) + " / " + this.toIndex
        });
        $rfloatDiv.append($pagerCount);
        this.$viewMoreNotificationsRow.append($rfloatDiv);

        var $blankDiv = $("<div>");
        var $viewMoreLink = $("<a>", {
            class: "UFIPagerLink"
        });
        var self = this;
        $viewMoreLink.on("click", function () {
            self.loadMoreRootNotifications(self.objectId, self.objectType);
        });
        var $textLink = $("<span>", {
            html: "Show more comments"
        });
        $viewMoreLink.append($textLink);
        $blankDiv.append($viewMoreLink);
        this.$viewMoreNotificationsRow.append($blankDiv);
        return this.$viewMoreNotificationsRow;
    },
    refreshViewMoreNotifications: function () {
        if (this.fromIndex !== 0) {
            $(".UFIPagerLink>span").first().html('Show more comments');
        } else {
            $(".UFIPagerLink").off('click');
            $(".UFIPagerLink").hide();
        }
        $(".UFIPagerCount").first().html((this.toIndex - this.fromIndex) + " / " + this.toIndex).change().show();
    },
    createReceiverList: function (data, isOpinion) {
        var $receiverContainer = $("<div>", {
            class: "receiverContainer"
        });
        $receiverContainer.css("zIndex", 10);
        var $ul = $("<ul>", {
            class: "receiverContent"
        });
        $receiverContainer.append($ul);

        var length = data.receivers.length;
        for (var i = 0; i < length; i++) {
            var name = data.receivers[i].receiveUser ? data.receivers[i].receiveUser
                    : data.receivers[i].receiveGroup;
            var $li = $("<li>", {
                html: name
            });
            if (!isOpinion) {
                var $divLeft = $("<div>", {
                    class: 'liLeft'
                });
                if (data.receivers[i].processType === group.procesType.main) {
                    $divLeft.addClass('li-main');
                } else if (data.receivers[i].processType === group.procesType.cooperate) {
                    $divLeft.addClass('li-cooperate');
                } else if (data.receivers[i].processType === group.procesType.receiveToKnow) {
                    $divLeft.addClass('li-receiveToKnow');
                }
                $li.append($divLeft);
            }
            $ul.append($li);
        }
        if (data.numberOfRestReceivers) {
            var $li = $("<li>", {
                html: ' and ' + data.numberOfRestReceivers + ' more person'
            });
            $ul.append($li);
        }
        return $receiverContainer;
    },
    // reply function
    replyNotification: function (notification) {
        var parentId = notification.parentId ? notification.parentId
                : notification.notifyId;
        if (group.checkExistsSubNotifications(parentId)) {
            // group.showHideSubNotifications(parentId);
        } else {
            group.drawSubNotificationsWithOnlyTextbox(notification);
        }
    },
    checkExistsSubNotifications: function (parentNotificationId) {
        var $notificationRow = $('#notification_' + parentNotificationId);
        var $nextElement = $notificationRow.next();
        var classList = $nextElement.attr('class').split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
            if (classList[i] === 'UFIReplyList') {
                return $($nextElement[i]);
            }
        }
        return null;
    },
    
    focusOnSubTextbox: function (parentNotificationId) {
        $('#notification_' + parentNotificationId + ' + .UFIReplyList textarea')
                .first().focus();
    },
    // TODO: co the thay the function nay cho function xu ly su kien khi click
    // vao viewMoreReplies
    showHideSubNotifications: function (parentNotificationId) {
        $subNotificationList = $(
                "#notification_" + parentNotificationId + " + .UFIReplyList")
                .first();
        if ($subNotificationList.children('.UFIRow.UFIComment').length > 0) {
            if ($subNotificationList.children('.UFIRow.UFIComment').is(
                    ":visible")) {
                $subNotificationList.children('.UFIRow.UFIComment')
                        .hide("slow");
                $subNotificationList
                        .find("span.UFIReplySocialSentenceLinkText").text(
                        "Show comment");
            } else {
                $subNotificationList.children('.UFIRow.UFIComment')
                        .show("slow");
                $subNotificationList
                        .find("span.UFIReplySocialSentenceLinkText").text(
                        "Hiden comment");
            }
        } else {
            group.loadMoreSubNotifications(parentNotificationId,
                    $subNotificationList);
            $subNotificationList.find("span.UFIReplySocialSentenceLinkText")
                    .text("Hiden comment");
        }
    },
    drawSubNotificationsWithOnlyTextbox: function (notification) {
        var $subNotificationList = group.createSubNotificationList(
                notification, true);
        var $parentNotification = group.$rootNotificationList
                .find('#notification_' + notification.notifyId);
        group.drawSubNotifications(notification.notifyId, null,
                $subNotificationList);
        $subNotificationList.insertAfter($parentNotification);
    }
};