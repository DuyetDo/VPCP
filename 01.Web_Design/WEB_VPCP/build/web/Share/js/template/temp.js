/**
 * Phuctm2
 * 
 * @type type
 */
"use strict";
var voTemp = function() {

};
voTemp.prototype = {
	docSubmitNumberTextbox : null,
	specialTypePattern : "((,\\s*)|(^\\s*))specialType((\\s*,)|(\\s*$))",
	shortDeptNameWidget : null,
	spanMaskId : "vt_voTemp_",
	domMaskId : "vt_domTemp_",
	WIDGET_ID : "voffice_widget_",
	mySignature : "",
	listMaskTemp : [
	/**
	 * MaskTemp element = {tempName, type, maxlength}
	 */
	],
	listDomNode : [
	/**
	 * Dom has prepare by listMaskTemp
	 */
	],
	listWidget : [],
	/*
	 * init zk widget, no need to init zk component; widgetData is array of
	 * array
	 */
	initWidget : function(widgetData) {
		var logChanges = [];
		if (widgetData != null) {
			for (var i = 0; i < widgetData.length; i++) {
				logChanges.push.apply(logChanges, widgetData[i]);
			}
		}

		var listMaskTemp = this.listMaskTemp;
		var widget;
		var widgetId;
		var widgetIndex;
		this.listWidget.length = 0;
		for (var i = 0; i < listMaskTemp.length; i++) {
			var maskTemp = listMaskTemp[i];
			tableWrap(this.spanMaskId + maskTemp.maskName,
					maskTemp.widthPercent);
			var domSpanElement = document.getElementById(this.spanMaskId
					+ maskTemp.maskName);
			// create child in span
			if (domSpanElement != null) {
				domSpanElement.innerHTML = '<div id="innerDiv_'
						+ maskTemp.maskName + '">';
				var replaceDom = document.getElementById("innerDiv_"
						+ maskTemp.maskName);
				widgetId = this.WIDGET_ID + maskTemp.maskName;
				widgetIndex = this.indexOfWidget(logChanges, widgetId);
				if (widgetIndex >= 0) {
					logChanges.slice(widgetIndex, 1);
					widget = this.createWidgetFromClass(
							logChanges[widgetIndex], maskTemp);
				} else {
					widget = this.createWidgetFromTemplate(maskTemp);
				}

				if (widget != null) {
					this.listWidget.push(widget);
					widget.replaceHTML(replaceDom);
					widget.maskTemp = maskTemp;

					this.prepareCommentOption(widget);
					this.prepareStyleForDom(widget._node, maskTemp);
					this.listDomNode.push(widget._node);

					// regist onclick
					if (widget.className === "zul.wgt.Button") {
						if (widget.maskTemp.dataType === "button") {
							widget.domListen_(widget._node, "onclick",
									function() {
										if (tempView.isExistedSignature()) {
											tempView.submitWidgetInfo(
													signSubmitDoc, this);
										}
									});
						} else if (widget.maskTemp.dataType === "buttonCA") {
							widget.domListen_(widget._node, "onclick",
									function() {
										if (tempView.isExistedSignature()) {
											var param = {
												'targetId' : this.id
											};
											zAu.send(new zk.Event(zk.Widget
													.$("$wdDocSubmitCrud"),
													"onClickSignBtn", {
														'' : param
													}));
										}
									});
						}
					}
				} else {
					console.log("Do not create widget " + maskTemp.maskName);
				}

			} else {
				console.log(" dom element not found : id = " + this.spanMaskId
						+ maskTemp.maskName);
			}
		}
		this.prepareDataPopupContentCmts();
	},
	prepareCommentOption : function(widget) {
		var dataType = widget.maskTemp.dataType;
		if (dataType === "string" || dataType === "listString"
				|| dataType === "date" || dataType === "docSubmitNumber"
				|| dataType === "select") {
			var node = widget._node;
			// create dom element of masktemp comment
			var cmtPopup = this.createPopupCmtPopup(widget);
			node.parentNode.insertBefore(cmtPopup, node.parentNode.firstChild);
			var cmtOption = this.createPopupCmtOptionView(widget);
			node.parentNode.insertBefore(cmtOption, node.parentNode.firstChild);
			var cmtCreate = this.createPopupCmtOptionCreate(widget);
			node.parentNode.insertBefore(cmtCreate, node.parentNode.firstChild);
			var cmtPopupCreate = this.createPopupCmtCreate(widget);
			node.parentNode.insertBefore(cmtPopupCreate,
					node.parentNode.firstChild);

			// prepare all comment of thit masktemp
			this.preparePopupContentCmts(widget);
			cmtOption.onclick = function() {
				$('#' + cmtPopup.id).slideToggle("fast");
			}
			cmtCreate.onclick = function(isClearContent) {
				$('#' + cmtPopupCreate.id).slideToggle("fast");
				if (isClearContent) {
					$('#' + cmtPopupCreate.id)[0].childNodes[1].value = "";
				}
			}
			cmtPopup.onmouseover = function() {
				cmtPopup.style.opacity = 1;
			}
			cmtPopup.onmouseout = function() {
				cmtPopup.style.opacity = 0.6;
			}
			cmtPopupCreate.onmouseover = function() {
				cmtPopupCreate.style.opacity = 1;
			}
			cmtPopupCreate.onmouseout = function() {
				cmtPopupCreate.style.opacity = 0.6;
			}
		}
	},
	createPopupCmtOptionCreate : function(widget) {
		var cmtCreate = document.createElement("DIV");
		cmtCreate.id = "cmtOptionCreate_" + widget.id;
		cmtCreate.className = "tempOptionCommentCreate";
		return cmtCreate;
	},
	createPopupCmtOptionView : function(widget) {
		var cmtOption = document.createElement("DIV");
		cmtOption.id = "cmtOption_" + widget.id;
		cmtOption.className = "tempOptionComment";
		return cmtOption;
	},
	createPopupCmtCreate : function(widget) {
		var divCmtCreate = document.createElement("DIV");
		var divCmtCreateId = "divCmtCreate_" + widget.id;
		divCmtCreate.id = divCmtCreateId;
		divCmtCreate.className = "tempDivCmtCreate";
		divCmtCreate.style.top = "-130px";
		divCmtCreate.style.right = "-235px";
		divCmtCreate.style.display = "none";

		// textarea contents
		var contents = document.createElement("TEXTAREA");
		// save button
		var aSave = document.createElement("BUTTON");
		aSave.innerHTML = "Lưu";

		divCmtCreate.innerHTML = "<div class='tempDivTitleCmtCreate'>Thêm mới ghi chú<div>";
		divCmtCreate.appendChild(contents);
		divCmtCreate.appendChild(aSave);

		aSave.onclick = function() {
			var dataComment = {
				maskTempId : widget.maskTemp.maskTempId,
				content : contents.value
			};
			zAu.send(new zk.Event(zk.Widget.$("$wdDocSubmitCrud"),
					"onCommentMaskTemp", {
						'' : dataComment
					}));
		}
		return divCmtCreate;
	},
	callbackSaveBtnOnclick : function(newComment) {
		this.tempComments.push(newComment);
		for (var i = 0; i < this.listWidget.length; i++) {
			if (newComment.maskTempId == this.listWidget[i].maskTemp.maskTempId) {
				var cmtOptionCreate = document
						.getElementById("cmtOptionCreate_"
								+ this.listWidget[i].id);
				cmtOptionCreate.onclick(true);
				break;
			}
		}
		this.prepareDataPopupContentCmts();
	},
	createPopupCmtPopup : function(widget) {
		var cmtPopup = document.createElement("DIV");
		cmtPopup.id = "cmtPopup_" + widget.id;
		cmtPopup.className = "tempPopupComment";
		cmtPopup.style.top = "-25px";
		cmtPopup.style.right = "-235px";
		cmtPopup.style.display = "none";
		return cmtPopup;
	},
	preparePopupContentCmts : function(widget) {
		var divCmtId = "divCmt_" + widget.id;
		var divCmtInputId = "divAction_" + widget.id;
		var divCmt = document.createElement("DIV");
		var divActionCmt = document.createElement("DIV");
		divCmt.id = divCmtId;
		divCmt.className = "tempDivCmt";
		divActionCmt.id = divCmtInputId;

		var parentDiv = document.getElementById("cmtPopup_" + widget.id);
		if (parentDiv) {
			parentDiv.appendChild(divCmt);
			parentDiv.appendChild(divActionCmt);
		}

		divCmt.innerHTML = '<div class="tempDivTitleCmt"><a>Ý kiến</a></div>'
				+ '<div class="tempDivListCmt" id="tempDivListCmt_'
				+ widget.id
				+ '"><div class="tempDivLisCmtEmpty">Chưa có ý kiến nào</div></div>';
	},
	prepareDataPopupContentCmts : function() {
		if (this.tempComments && this.tempComments.length > 0) {
			for (var j = 0; j < this.listWidget.length; j++) {
				var reload = true;
				for (var i = 0; i < this.tempComments.length; i++) {
					if (this.listWidget[j].maskTemp.maskTempId === this.tempComments[i].maskTempId) {
						var tempDivListCmt = document
								.getElementById("tempDivListCmt_"
										+ this.listWidget[j].id);
						var newContent = '<div class="tempDivLisCmtEntity">'
								+ this.tempComments[i].contents + '</div>';
						if (reload
								|| tempDivListCmt.firstChild.className === "tempDivLisCmtEmpty") {
							tempDivListCmt.innerHTML = newContent;
							reload = false;
						} else {
							tempDivListCmt.innerHTML += newContent;
						}
					}
				}
			}
		}
	},
	/**
	 * hoangnv28
	 */
	getTextboxWidget : function(id, value) {
		return new zul.inp.Textbox({
			id : id,
			value : value,
			multiline : true,
			rows : 1
		});
	},
	getButtonWidget : function(id, label, visible) {
		return new zul.wgt.Button({
			id : id,
			label : label,
			visible : visible
		});
	},
	getLabelWidget : function(id, value) {
		return new zul.wgt.Label({
			id : id,
			value : value
		});
	},
	getListboxWidget : function(id, model) {
		return new zul.sel.Listbox({
			id : id
		});
	},
	getDateboxWidget : function(id, value) {
		return new zul.db.Datebox({
			id : id,
			value : value
		});
	},
	getImageWidget : function(id, src) {
		return new zul.wgt.Image({
			id : id,
			src : src,
			width : "248"
		});
	},
	createWidgetFromTemplate : function(maskTemp) {
		if (zk.Widget.$("$" + this.WIDGET_ID + maskTemp.maskName) != null) {
			delete zk.Widget.$("$" + this.WIDGET_ID + maskTemp.maskName);
		}
		var widget;
		if (maskTemp.isEnable) {
			switch (maskTemp.dataType) {
			case "string":
			case "listString":
				widget = this.getTextboxWidget(this.WIDGET_ID
						+ maskTemp.maskName, maskTemp.value);
				break;
			case "date":
				widget = this.getDateboxWidget(this.WIDGET_ID
						+ maskTemp.maskName, maskTemp.value);
				break;
			case "button":
			case "buttonCA":
				widget = this.getButtonWidget(this.WIDGET_ID
						+ maskTemp.maskName, maskTemp.value);
				break;
			case "select":
				widget = this.getListboxWidget(this.WIDGET_ID
						+ maskTemp.maskName, maskTemp.value);
				break;
			case "label":
				widget = this.getLabelWidget(
						this.WIDGET_ID + maskTemp.maskName, maskTemp.value);
				break;
			}
		} else if (maskTemp.dataType !== "button"
				&& maskTemp.dataType !== "buttonCA") {
			widget = this.getLabelWidget(this.WIDGET_ID + maskTemp.maskName,
					maskTemp.value);
		} else {
			widget = this
					.getLabelWidget(this.WIDGET_ID + maskTemp.maskName, "");
		}
		if (widget) {
			widget.enable = maskTemp.isEnable;
			widget.specialType = maskTemp.specialType;

			if (maskTemp.specialType) {
				if (maskTemp.isEnable
						&& this.isWidgetSpecialType("docSubmitNumber",
								maskTemp.specialType)) {
					this.docSubmitNumberTextbox = widget;
				}
				if (maskTemp.isEnable
						&& this.isWidgetSpecialType("shortDeptName",
								maskTemp.specialType)) {
					this.shortDeptNameWidget = widget;
				}
			}
		}

		return widget;
	},
	isWidgetSpecialType : function(specialType, source) {
		var regex = new RegExp(this.specialTypePattern.replace("specialType",
				specialType));
		var result = source.match(regex);
		if (result) {
			return true;
		} else {
			return false;
		}
	},
	createWidgetFromClass : function(widgetInfo, maskTemp) {
		if (zk.Widget.$("$" + widgetInfo.id) != null) {
			delete zk.Widget.$("$" + widgetInfo.id);
		}
		var widget;
		if (maskTemp.isEnable) {
			switch (widgetInfo.className) {
			case "zul.inp.Textbox":
				widget = this.getTextboxWidget(widgetInfo.id, widgetInfo.value);
				break;
			case "zul.wgt.Button":
				var valueLabel = widgetInfo.value;
				if (valueLabel == null) {
					valueLabel = maskTemp.value;
				}
				widget = this.getButtonWidget(widgetInfo.id, valueLabel, false);

				break;
			case "zul.wgt.Label":
				widget = this.getLabelWidget(widgetInfo.id, widgetInfo.value);
				break;
			case "zul.sel.Listbox":
				widget = this.getListboxWidget(widgetInfo.id, widgetInfo.value);
				break;
			case "zul.db.Datebox":
				widget = this.getDateboxWidget(widgetInfo.id, widgetInfo.value);
				break;
			case "zul.wgt.Image":
				widget = this.getImageWidget(widgetInfo.id, widgetInfo.value);
				break;
			}
		} else if (widgetInfo.className === "zul.wgt.Image") {
			widget = this.getImageWidget(widgetInfo.id, widgetInfo.value);
		} else if (widgetInfo.className !== "zul.wgt.Button") {
			widget = this.getLabelWidget(widgetInfo.id, widgetInfo.value);
		}

		if (widget) {
			widget.widgetInfo = widgetInfo;
			widget.enable = maskTemp.isEnable;
			widget.specialType = maskTemp.specialType;
		}
		return widget;
	},
	indexOfWidget : function(widgetArray, widgetId) {
		for (var i = 0; i < widgetArray.length; i++) {
			if (widgetArray[i].id == widgetId) {
				return i;
			}
		}
		return -1;
	},
	getWidgetValue : function(widget) {
		var value;
		if (widget != null) {
			switch (widget.className) {
			case "zul.inp.Textbox":
			case "zul.wgt.Label":
			case "zul.db.Datebox":
				value = widget._value;
				break;
			case "zul.wgt.Button":
				break;
			case "zul.sel.Listbox":
				break;
			}
		}
		return value;
	},
	validateDocSubmit : function(validateFunction, saveFunction) {
		if (this.docSubmitNumberTextbox != null) {
			// Neu phai cap so, validate so phieu trinh truoc
			validateFunction(this.docSubmitNumberTextbox.getValue());
		} else {
			// Neu khong, luu noi dung phieu trinh luon
			this.submitWidgetInfo(saveFunction);
		}
	},
	submitWidgetInfo : function(callback, target) {
		if (!confirm("Bạn có muốn ký?")) {
			return;
		}
		var widgetData = {
			content : [],
			logChanges : []
		}
		var widget;
		if (this.listWidget != null) {
			for (var i = 0; i < this.listWidget.length; i++) {
				widget = this.listWidget[i];
				var data = {};
				if (widget.className === "zul.wgt.Button" && target != null
						&& target.className === "zul.wgt.Button") {
					data.id = widget.id;
					data.className = "zul.wgt.Image";
					if (this.mySignature != null
							&& this.mySignature.toString().trim() !== ""
							&& imageExists("/voffice/Share/signature/"
									+ this.mySignature)) {
						if (widget.maskTemp.dataType === "button") {
							data.value = "/voffice/Share/signature/"
									+ this.mySignature;
						} else if (widget.maskTemp.dataType === "button") {
							data.value = "/voffice/Share/signature/"
									+ this.mySignature;
						}
					} else {
						alert("Thông tin cá nhân thiếu chữ ký!");
						return;
					}
				} else if (widget.enable) {
					data.id = widget.id;
					data.className = widget.className;
					data.value = this.getWidgetValue(this.listWidget[i]);
				}
				widgetData.logChanges.push(data);
				if (widget.specialType != null
						&& widget.specialType.search(this.specialTypePattern
								.search("specialType", "content"))) {
					var widgetValue = this.getWidgetValue(widget);
					if (widgetValue) {
						widgetData.content.push(widgetValue);
					}
				}
			}
		}
		if (callback != null && typeof callback === "function") {
			callback(widgetData);
		}
		return widgetData;
	},
	prepareStyleForWidget : function(_widget) {
		this.prepareStyleForDom(_widget._node);
	},
	prepareStyleForDom : function(_dom, maskTemp) {
		if (_dom != null) {
			var parentNode = _dom.parentNode;
			var looplimited = 7;
			var loop = 0;
			while (loop < looplimited) {
				if (parentNode != null
						&& parentNode.nodeName.toLowerCase() === "b") {
					_dom.style.fontWeight = "bold";
				} else if (parentNode == null
						|| parentNode.nodeName.toLowerCase() === "p") {
					break;
				}
				parentNode = parentNode.parentNode;
				loop++;
			}
			setInheritFontStyle(_dom);
			if (_dom.nodeName.toLowerCase() === "input"
					|| _dom.nodeName.toLowerCase() === "textarea") {
				_dom.style.background = "#e1e1e1 none repeat scroll 0 0";
				_dom.style.border = "none";
				_dom.style.resize = "none";
				_dom.style.marginTop = "-2px";
				_dom.onfocus = function() {
					var _mt = getMaskTempByDom(this)
					if (_mt != null && _mt.value != null) {
						onfocusTempTextbox(this, _mt.value);
					}
				}
				_dom.onblur = function() {
					var _mt = getMaskTempByDom(this)
					if (_mt != null && _mt.value != null) {
						onblurTempTextbox(this, _mt.value);
					}
				}
			}

			if (_dom.nodeName.toLowerCase() === "textarea") {
				autosize(_dom);
			}

			if (maskTemp != null) {
				if (maskTemp.widthPercent != null) {
					_dom.style.width = maskTemp.widthPercent + "%";

					if (maskTemp.maxWidthPercent != null) {
						// width of td tag
						_dom.style.maxWidth = Math
								.round(maskTemp.maxWidthPercent
										* _dom.parentNode.clientWidth / 100)
								+ "px";
					}
				}

				if (maskTemp.maxWidthPercent != null) {
					// width of tr tag
					_dom.style.maxWidth = Math.round(maskTemp.maxWidthPercent
							* parentNode.clientWidth / 100)
							+ "px";
				}
			}
		}
	},
	getMaskTempByName : function(mtName) {
		var result = null;
		if (mtName != null) {
			for (var i = 0; i < this.listMaskTemp.length; i++) {
				if (this.listMaskTemp[i].maskName === mtName) {
					result = this.listMaskTemp[i];
					break;
				}
			}
		}
		return result;
	},
	showWidgetByNextNode : function(nextNodeId) {
		if (nextNodeId) {
			for (var i = 0; i < this.listWidget.length; i++) {
				if (this.listWidget[i].className === "zul.wgt.Button") {
					if (this.listWidget[i].maskTemp.nextNodeId == nextNodeId) {
						this.listWidget[i].setVisible(true);
					} else {
						this.listWidget[i].setVisible(false);
					}
				}
			}
		}
	},
	isExistedSignature : function() {
		if (this.mySignature != null
				&& this.mySignature.toString().trim() !== ""
				&& imageExists("/voffice/Share/signature/" + this.mySignature)) {
			return true;
		} else {
			alert("Thông tin cá nhân thiếu chữ ký!");
			return false;
		}
	},
	setBookNumber : function(bookNumber, saveFunction) {
		console.log("setBookNumber: " + bookNumber);
		if (this.docSubmitNumberTextbox != null) {
			this.docSubmitNumberTextbox.setValue(bookNumber);
		}
	},
	setShortDeptName : function(shortDeptName) {
		console.log("setShortDeptName: " + shortDeptName);
		if (this.shortDeptNameWidget != null) {
			this.shortDeptNameWidget.setValue(shortDeptName);
		}
	}
};

var getMaskTempByDom = function(_dom) {
	if (tempView != null) {
		var indexDomTemp = tempView.listDomNode.indexOf(_dom);
		if (indexDomTemp >= 0) {
			return tempView.listMaskTemp[indexDomTemp];
		}
	}
	return null;
}

var getZkWidgetMask = function(maskName) {
	// var widgetDataType = zk.Widget.$("$maskDataType_" + maskName);
	var widgetValue = zk.Widget.$("$maskValue_" + maskName);
	var widgetMaxLength = zk.Widget.$("$maskMaxLength_" + maskName);
	var result = {
		// widgetDataType : widgetDataType,
		widgetValue : widgetValue,
		widgetMaxLength : widgetMaxLength
	}
	return result;
}

var onchangeMask = function(_maskName) {
	// var zkWidgetMask = getZkWidgetMask(_maskName);
	// var _tempSpan = document.getElementById(voTemp.prototype.spanMaskId
	// + _maskName);
	// if (_tempSpan != null && zkWidgetMask != null) {
	// var dataMask = {
	// dataType : zkWidgetMask.widgetDataType.getValue(),
	// maskName : _maskName,
	// value : zkWidgetMask.widgetValue.getValue()
	// }
	// _tempSpan.innerHTML = voTemp.prototype.getDomHtml(dataMask);
	// } else {
	// console.debug("not found widget of " + _maskName);
	// }
}

var onchangeDataTypeMask = function(zulDom) {
	var _maskName = zulDom.getId().replace("$maskDataType_", "");
	onchangeMask(_maskName);
}

var onchangeValueMask = function(zulDom) {
	var _maskName = zulDom.getId().replace("maskValue_", "");
	onchangeMask(_maskName);
}

var onchangeMaxlengthMask = function(zulDom) {
	var _maskName = zulDom.getId().replace("maskMaxLength_", "");
	onchangeMask(_maskName);
}

var setInheritFontStyle = function(objDom) {
	objDom.style.fontSize = "inherit";
	objDom.style.fontWeight = "inherit";
	objDom.style.fontFamily = "inherit";
}

var onfocusTempTextbox = function(objDom, defaultValue) {
	if (objDom.value === defaultValue) {
		objDom.value = "";
	}
}

var onblurTempTextbox = function(objDom, defaultValue) {
	if (objDom.value.trim() === "") {
		objDom.value = defaultValue;
	}
}

function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function tableWrap(_domId, widthPercent) {
	var _dom = document.getElementById(_domId);
	if (_dom != null) {
		var _parent = _dom.parentNode
		if (_parent != null && _parent.nodeName !== "td") {
			var childnodes = _parent.childNodes;
			var _html = "<table id='" + _domId + "_TableId'><tr>";
			for (var i = 0; i < childnodes.length; i++) {
				_html += "<td>";
				if (childnodes[i].nodeName === "#text") {
					_html += childnodes[i].nodeValue;
				} else {
					_html += childnodes[i].outerHTML;
				}
				_html += "</td>";
			}
			_html += "</tr></table>";
			_parent.innerHTML = _html;

			// set style width label and not change
			var labelWidth = $("#" + _domId + "_LabelId").width();
			// set table width is full
			if (widthPercent != null) {
				$("#" + _domId + "_TableId").css("width", "100%");
			}

			// var tableWidth = $("#" + _domId + "_TableId").width();
			// var inputWidth = tableWidth - labelWidth;
			$("#" + _domId + "_LabelId").css("width", labelWidth);
			// $("#" + _domId + "_InputId").css("width", inputWidth);
		}
	}
}

function imageExists(image_url) {
	var http = new XMLHttpRequest();

	http.open('HEAD', image_url, false);
	http.send();

	return http.status != 404;

}

// load areaResize
$.getScript("Share/js/template/areaResize.js", function() {
});


