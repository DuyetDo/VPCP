 /*
 * Copyright 2015 Viettel ICT. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
VTUtilJS = (function($) {
	/**
	 * Thu vien JS dung chung dong goi de thuc hien cac xu ly thuong su dung
	 * Duoc ke thua va phat trien dua tren cac Utils JS hien co trong Soure
	 * 
	 * @author hunglm16
	 * @since 08-09-2015
	 * @description cap nhat cho DMS CORE
	 * */
	var result = {
		_TF_A_Z : _TF_A_Z,
		_TF_NUMBER : _TF_NUMBER,
		_TF_NUMBER_DOT : _TF_NUMBER_DOT,
		_TF_NUMBER_COMMA : _TF_NUMBER_COMMA,
		_TF_NUMBER_SIGN : _TF_NUMBER_SIGN,
		_TF_NUMBER_CONVFACT : _TF_NUMBER_CONVFACT,
		_CTRL_PRESS: false,
		_SHIFT_PRESS: false,
		/**
		 * VTUtilJS.bindFormatOnTextfield(obj, formatType)
		 * ham dung de bind obj chi duoc nhap theo dinh dang minh khai bao
		 * trong formatType
		 * obj : id cua element
		 * formatType : VTUtilJS._TF_A_Z, VTUtilJS._TF_NUMBER, VTUtilJS._TF_NUMBER_DOT, VTUtilJS._TF_NUMBER_COMMA, VTUtilJS._TF_NUMBER_SIGN, VTUtilJS._TF_NUMBER_CONVFACT
		 */
		bindFormatOnTextfield : bindFormatOnTextfield,
		/**
		 * VTUtilJS.returnMoneyValue(value)
		 * ham dung de lay gia tri currency 10,000 => 10000
		 */
		returnMoneyValue : returnMoneyValue,
		/**
		 * VTUtilJS.applyDateTimePicker(selector)
		 * ham de apply date picker cho element selector
		 */
		applyDateTimePicker : applyDateTimePicker,
		/**
		 * VTUtilJS.isNullOrEmpty(value)
		 * ham de check value la null or undefined or ''
		 */
		isNullOrEmpty : isNullOrEmpty,
		/**
		 * tra ve ngay thang nam hien tai voi dinh danh dd/mm/yyyy
		 */
		getCurrentDate : getCurrentDate,
		/**
		 * format number
		 * VTUtilJS.formatCurrency(4242342) -> 4,242,342
		 */
		formatCurrency : formatCurrency,
		/**
		 * ap dung chi nhap currency cho inputId
		 * VTUtilJS.formatCurrencyFor(inputId)
		 */
		formatCurrencyFor : formatCurrencyFor,
		
		XSSEncode : XSSEncode,
		/**
		 * VTUtilJS.implode([1, 3, 5, 6, 'a', 'b'], ',')
		 * vi du tren  tra ve string '1, 3, 5, 6, a, b'
		 */
		implode : implode,
		/**
		 * show message error/success VTUtilJS.showMessageBanner(isError, msg)
		 */
		showMessageBanner : showMessageBanner,
		/**
		 * VTUtilJS.getFormData(formId)
		 * tra ve data form truoc khi submit
		 */
		getFormData : getFormData,
		/**
		 * VTUtilJS.getSimpleObject(obj)
		 */
		getSimpleObject : getSimpleObject,
		/**
		 * VTUtilJS.getFormHtml(formId, url, callback)
		 */
		getFormHtml : getFormHtml,
		getFormJson : getFormJson,
		postFormHtml : postFormHtml,
		postFormJson : postFormJson,
		/**
		 * callBack ham callback sau khi import
		 * objectId id form
		 * inputByObjectId id input file
		 * 
		 * VTUtilJS.importExcelUtils(callBack, objectId, inputByObjectId)
		 */
		importExcelUtils : importExcelUtils
	};
	var _TF_A_Z = 1;//kieu text
	var _TF_NUMBER = 2;//kieu integer
	var _TF_NUMBER_DOT = 3;//kieu float
	var _TF_NUMBER_COMMA = 4;//kieu so co dau ,
	var _TF_NUMBER_SIGN = 5;//kieu so co dau +-
	var _TF_NUMBER_CONVFACT = 7;//kieu convfact 23/3, /3, 0/3
	var keyCodes = {
		ENTER: 13, 
		BACK_SPACE: 8, 
		DELETE: 46, 
		TAB: 9, 
		F5: 116, 
		ESCAPE: 27, 
		CTRL:17, 
		SHIFT:16, 
		HOME:36, 
		END:35, 
		ARROW_LEFT:37, 
		ARROW_RIGHT:39, 
		ARROW_UP:38, 
		ARROW_DOWN:40
	};
	
	function fromKeyCode(n) {
		if( 47<=n && n<=90 ) return unescape('%'+(n).toString(16));
		if( 96<=n && n<=105) return 'NUM '+(n-96);
		if(112<=n && n<=135) return 'F'+(n-111);
		if(n==3)  return 'Cancel';
		if(n==6)  return 'Help';
		if(n==8)  return 'Backspace';
		if(n==9)  return 'Tab';
		if(n==12) return 'NUM 5';
		if(n==13) return 'Enter';
		if(n==16) return 'Shift';
		if(n==17) return 'Ctrl';
		if(n==18) return 'Alt';
		if(n==19) return 'Pause|Break';
		if(n==20) return 'CapsLock';
		if(n==27) return 'Esc';
		if(n==32) return 'Space';
		if(n==33) return 'PageUp';
		if(n==34) return 'PageDown';
		if(n==35) return 'End';
		if(n==36) return 'Home';
		if(n==37) return 'Left Arrow';
		if(n==38) return 'Up Arrow';
		if(n==39) return 'Right Arrow';
		if(n==40) return 'Down Arrow';
		if(n==42) return '*';
		if(n==43) return '+';
		if(n==44) return 'PrntScrn';
		if(n==45) return 'Insert';
		if(n==46) return 'Delete';
		if(n==91) return 'WIN Start';
		if(n==92) return 'WIN Start Right';
		if(n==93) return 'WIN Menu';
		if(n==106) return '*';
		if(n==107) return '+';
		if(n==108) return 'Separator';
		if(n==109) return '-';
		if(n==110) return '.';
		if(n==111) return '/';
		if(n==144) return 'NumLock';
		if(n==145) return 'ScrollLock';
		if(n==173) return 'Media Mute On|Off';
		if(n==174) return 'Media Volume Down';
		if(n==175) return 'Media Volume Up';
		if(n==176) return 'Media >>';
		if(n==177) return 'Media <<';
		if(n==178) return 'Media Stop';
		if(n==179) return 'Media Pause|Resume';
		if(n==182) return 'WIN My Computer';
		if(n==183) return 'WIN Calculator';
		if(n==186) return '; :';
		if(n==187) return '= +';
		if(n==188) return ', <';
		if(n==189) return '- _';
		if(n==190) return '. >';
		if(n==191) return '/ ?';
		if(n==192) return '\` ~';
		if(n==219) return '[ {';
		if(n==220) return '\\ |';
		if(n==221) return '] }';
		if(n==222) return '\' "';
		if(n==224) return 'META|Command';
		if(n==229) return 'WIN IME';
		if(n==255) return 'Device-specific';
		return null;
	};
	
	function bindFormatOnTextfield(obj, formatType){
		var reg = /[^0-9]/;
		var regAll = /[^0-9]/g;
		switch (formatType) {
		case _TF_A_Z:
			reg = /[^A-Z]/;
			regAll = /[^A-Za-z]/g; 
			break;
		case _TF_NUMBER_DOT:
			reg = /[^0-9.]/;
			regAll = /[^0-9.]/g; 
			break;
		case _TF_NUMBER:
			reg = /[^0-9]/;
			regAll = /[^0-9]/g; 
			break;
		case _TF_NUMBER_COMMA:
			reg = /[^0-9,]/;
			regAll = /[^0-9,]/g; 
			break;
		case _TF_NUMBER_SIGN:
			reg = /[^0-9-]/;
			regAll = /[^0-9-]/g; 
			break;
		case _TF_NUMBER_CONVFACT:
			reg = /[^0-9\/]/;
			regAll = /[^0-9\/]/g; 
			break;
		default:
			break;
		}
		if(typeof obj === 'string') {
			obj = $('#'+obj);
		}
		obj.live('keyup', function(e){
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			if(code == keyCodes.CTRL){
				VTUtilJS._CTRL_PRESS = false;
			}
			if(code == keyCodes.SHIFT) {
				VTUtilJS._SHIFT_PRESS = false;
			}
		});
		obj.live('keydown', function(e){
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = fromKeyCode(code).split(' ')[0];			
			if ((code >=96 && code <= 105) || (code>=48 && code<=57) || code==null || code==0 || code== keyCodes.BACK_SPACE || 
					code == keyCodes.TAB || code==keyCodes.ENTER || code==keyCodes.ESCAPE || code == keyCodes.DELETE ||
					(VTUtilJS._SHIFT_PRESS && code == keyCodes.HOME) || code == keyCodes.SHIFT || code == keyCodes.HOME || code == keyCodes.END ||
					code==keyCodes.CTRL || code == keyCodes.ARROW_LEFT || code == keyCodes.ARROW_RIGHT || code == keyCodes.ARROW_UP || code == keyCodes.ARROW_DOWN ||
					(VTUtilJS._CTRL_PRESS && (character  == 'v' || character  == 'V'))){
				if(code == keyCodes.CTRL){
					VTUtilJS._CTRL_PRESS = true;
				}
				if(code == keyCodes.SHIFT) {
					VTUtilJS._SHIFT_PRESS = true;
				}
				return true;
			} else if (reg.test(character) || (VTUtilJS._SHIFT_PRESS && !/[^0-9]/.test(character))) {
				return false;
			}else{
				return true;
			}
		});
		obj.live('paste', function(){			
			var tmAZ = setTimeout(function(){
				obj.val(obj.val().replace(regAll,''));
				clearTimeout(tmAZ);
			},200);
		});
	};
	
	function returnMoneyValue(valMoney) {
		var _valMoney = valMoney + '';
		var value = _valMoney.split(',').join('');
		var i = 0;
		for (i = 0; i < value.length - 1; i++) {
			// Nếu tất cả từ 0 -> length-2
			if (value[i] != '0') {
				break;
			}
		}
		return value.substring(i, value.length);
	};
	
	function formatCurrency(num) {
		if(num == undefined || num == null) {
			return '';
		}
		num = num.toString().split('.');
		var ints = num[0].split('').reverse();
		for (var out=[],len=ints.length,i=0; i < len; i++) {
			if (i > 0 && (i % 3) === 0){
				out.push(',');	
			}
			out.push(ints[i]);
		}
		out = out.reverse() && out.join('');
		if (num.length === 2) out += '.' + num[1];
		if(out[0] == '-'){
			out = out.replace(',','');
		}
		return out;
	};
	
	function formatCurrencyInterger(value) {
		if(value < 0) {
			var valuetmp = Math.abs(value);
			var valuetest = '-'+ formatCurrency(valuetmp);
			return valuetest;
		}
		else {
			return formatCurrency(value);
		}
	};
	function formatCurrencyNegativeToInteger(value) {
		if(value < 0) {
			var valuetmp = Math.abs(value);
			var valuetest = formatCurrency(valuetmp);
			return valuetest;
		}
		else {
			return formatCurrency(value);
		}
	};
	
	function formatCurrencyFor(idInput) {
		if(typeof idInput === 'string') {
			idInput = $('#'+idInput);
		}
		if(!idInput.hasClass('vinput-money')) {
			idInput.addClass('vinput-money');
		}
		idInput.bind('keyup', function(e) {
			var valMoneyInput = idInput.val();
			valMoneyInput = returnMoneyValue(valMoneyInput);
			if(isNaN(valMoneyInput) || valMoneyInput == "" || valMoneyInput == '') {
				return false;
			}
			var _valMoneyInput = formatCurrency(valMoneyInput);
			idInput.val(_valMoneyInput);
		});
		idInput.bind('paste', function(){
		    var tm = setTimeout(function(){
		    	var valMoneyInput = idInput.val();
		        valMoneyInput = returnMoneyValue(valMoneyInput);
		        if(isNaN(valMoneyInput) || valMoneyInput == "" || valMoneyInput == '') {
		        	return false;
		        }
		        var _valMoneyInput = formatCurrency(valMoneyInput);
		        idInput.val(_valMoneyInput); 
		        	clearTimeout(tm);
		    },200);
		});
	};
	
	function maskDate(selector){
		if(typeof selector === 'string') {
			selector = $('#'+selector);
		}
		selector.mask("99/99/9999");
	};
	function maskMonth(selector){
		if(typeof selector === 'string') {
			selector = $('#'+selector);
		}
		selector.mask("99/9999");
	};
	
	function applyDateTimePicker(selector) {
		if(typeof selector === 'string') {
			selector = $('#'+selector);
		}
		
		var opts = {};
		try {
			var dataOptions = selector.attr('data-options');
			if(dataOptions != null && dataOptions != '') {
				var __opts = JSON.stringify(eval("({" + dataOptions + "})"));
				opts = JSON.parse(__opts);
			}
		} catch (e) {
			
		}
		var dateFormat = opts.dateFormat;
		var hideYear = opts.hideYear;
		var memuMonthShow = opts.memuMonthShow;
		var menuYearShow = opts.menuYearShow;
		var yearRangeFlag = opts.yearRangeFlag;
		var showFocus = opts.showFocus;
		var timeShow = opts.timeShow;
		var yearRangeFuture = opts.yearRangeFuture;
		var monthYearShow = opts.monthYearShow;
		var onlyMonthCurrent = opts.onlyMonthCurrent;
		
		var format = "dd/mm/yy";
		if (dateFormat != undefined && dateFormat != null) {
			format = dateFormat;		
		}
		if(monthYearShow != undefined && monthYearShow != null){
			maskMonth(selector);
		}else{
			maskDate(selector);
		}
		var menuMonth = false;
		if (memuMonthShow != undefined && memuMonthShow != null) {
			menuMonth = memuMonthShow;
		}
		var menuYear = false;
		if (menuYearShow != undefined && menuYearShow != null) {
			menuYear = menuYearShow;
		}
		var minDate = null;
		var maxDate = null;
		if (hideYear != undefined && hideYear != null && hideYear == true) {
			minDate = new Date(2012, 0, 1);
			maxDate = new Date(2012, 11, 31);
		}
		var yearRange = null;
		if (yearRangeFlag != null && yearRangeFlag != undefined) {
			var now = new Date();
			var t = now.getFullYear();
			var f = t -100;
			if(yearRangeFuture != null && yearRangeFuture != undefined){
				t = t + 100;
				yearRange = f+":"+t;
			} else{
				yearRange = f+":"+t;
			}
		}
		var showOn = 'button';
		if (showFocus != undefined && showFocus != null && showFocus == true) {
			showOn = 'focus';
		}
		if (!timeShow)
		{
			selector.datepicker(
				{
					monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
					monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
					dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
					showOn: showOn,
					dateFormat: format,
					buttonImage: '/Share/img/icon_calendar.jpg',
					//doi lai '/Share/img/icon_calendar.jpg' khi dua len ROOT
					buttonImageOnly: true,
					changeMonth: menuMonth,
					changeYear: menuYear,
					minDate: minDate,
					maxDate: maxDate,
					buttonText: '',
					useThisTheme: 'start',
					yearRange: yearRange,
					create: function(event, ui) {
					},
					onClose: function(dateText, inst) {
					},
					beforeShow: function(input, inst) {
						setTimeout(function() {
							$('.ui-datepicker-month').css('width', '60%');
							$('#ui-datepicker-div').css('z-index', 1000000);
						}, 1);
						if ((hideYear != null && hideYear == true)||(onlyMonthCurrent != null && onlyMonthCurrent == true)) {
							setTimeout(function() {
								$('.ui-datepicker-next').hide();
								$('.ui-datepicker-prev').hide();
								$('.ui-datepicker-year').hide();
							}, 1);
						}
					},
					onChangeMonthYear: function(year, month, inst) {
						setTimeout(function() {
							$('.ui-datepicker-month').css('width', '60%');
						}, 1);
						if ((hideYear != null && hideYear == true)||(onlyMonthCurrent != null && onlyMonthCurrent == true)) {
							setTimeout(function() {
								$('.ui-datepicker-next').hide();
								$('.ui-datepicker-prev').hide();
								$('.ui-datepicker-year').hide();
							}, 1);
						}
					}
				}
			);
		}
	};
	
	$(document).ready(function(){
		$('.vinput-number').each(function() {
			bindFormatOnTextfield($(this), _TF_NUMBER);
		});
		
		$('.vinput-number-comma').each(function() {
			bindFormatOnTextfield($(this), _TF_NUMBER_COMMA);
		});
		
		$('.vinput-number-dot').each(function() {
			bindFormatOnTextfield($(this), _TF_NUMBER_DOT);
		});
		
		$('.vinput-number-sign').each(function() {
			bindFormatOnTextfield($(this), _TF_NUMBER_SIGN);
		});
		
		$('.vinput-number-convfact').each(function() {
			bindFormatOnTextfield($(this), _TF_NUMBER_CONVFACT);
		});
		
		$('.vinput-money').each(function() {
			bindFormatOnTextfield($(this), _TF_NUMBER_COMMA);
			formatCurrencyFor($(this));
		});
		
		$('.vinput-date').each(function() {
			if($(this).attr('disabled') != 'disabled') {
				applyDateTimePicker($(this));
			}
		});
		
		$('.MySelectBoxClass').each(function() {
			$(this).customStyle();
		});
		
		var originalVal = $.fn.val;
		$.fn.val = function(value) {
			if(value != null && value != undefined) {
				return originalVal.call(this, value); 
			} else {
			    if(this.hasClass('vinput-money')) {
			    	return VTUtilJS.returnMoneyValue(originalVal.call(this));
			    } else {
			    	return originalVal.call(this);		    	
			    }
			}
		};
	});
	
	function isNullOrEmpty(value){
		if(value!=undefined && value!=null && !isNaN(value)){
			value = new String(value);
		}
		if(value == undefined || value == null || value == 'null' || value=='' || value.length == 0){
			return true;
		}
		return false;
	};
	
	function getCurrentDate() {
		var now = new Date();
		var cYear = now.getFullYear();
		var cMonth = now.getMonth() + 1;
		var cDate = now.getDate();
		var currentDate = cDate+'/'+cMonth+'/'+cYear;
		return currentDate;
	};
	
	function XSSEncode(s,en){
		if(!isNullOrEmpty(s)){
			s = s.toString();
			en = en || true;
			// do we convert to numerical or html entity?
			s = s.replace(/&/g,"&amp;");
			if(en){
				s = s.replace(/'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/"/g,"&quot;");
				s = s.replace(/</g,"&lt;");
				s = s.replace(/>/g,"&gt;");
			}else{
				s = s.replace(/'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/"/g,"&#34;");
				s = s.replace(/</g,"&#60;");
				s = s.replace(/>/g,"&#62;");
			}
			return s;
		}else{
			return "";
		}
	};
	
	function implode(arr, sep) {
		if(isNullOrEmpty(sep)) {
			sep = ';';
		}
		if(arr == null || arr == undefined || !Array.isArray(arr) || arr.length == 0) {
			return '';
		} else {
			if(arr.length == 1) {
				var result = arr[0];
				return result;
			} else {
				var result = arr[0];
				for(var i = 1; i < arr.length; i++) {
					result += sep+arr[i];
				}
				return result;
			}
		}
	};
	
	function showMessageBanner(isError, msg) {
		if(isError) {
			$('#successMsg').html('').hide();
			$('#errorMsg').html(msg).show();
		} else if(!isError) {
			$('#successMsg').html(msg).show();
			$('#errorMsg').html('').hide();
			setTimeout(function() {
				$('#successMsg').html('').hide();
				$('#errorMsg').html('').hide();
			}, 3000);
		}
	};
	
	function convertToSimpleObject(out, obj, prefix) {
		var _VAR_NAME = "_varname";
	    if (obj instanceof Array) {
	        for (var index=0; index < obj.length; index++) {
	            var item = obj[index];
	            var tmpPrefix = prefix + "[" + index + "]";
	            if (item instanceof Array || item instanceof Object){
	                arguments.callee(out, item, tmpPrefix);
	            } else if (item != undefined && item != null) {
	                out[tmpPrefix] = item;
	            }
	        }
	    } else if (obj instanceof Object){
	        for(var propName in obj){
				if (propName.toString() !== _VAR_NAME){
					var tmpPrefix;
					if (prefix && prefix.length > 0) {
						tmpPrefix = prefix + "." + propName;
					} else {
						tmpPrefix = propName;
					}
					var item = obj[propName];
					if (item instanceof Array || item instanceof Object){
						arguments.callee(out, item, tmpPrefix);
					} else if (item != undefined && item != null) {
						out[tmpPrefix] = item;
					}
				}
	        }
	    }
	};
	
	function getSimpleObject(data) {
		var out = {};
		convertToSimpleObject(out, data, "");
		return out;
	};
	
	function getFormData(formId, errMsgId) {
		var listInput = $('#'+formId +' input');
		var listOption = $('#'+formId +' select');
		var listTextArea = $('#'+formId +' textarea');
		var params = new Object();
		var msg = '';
		for(var i = 0; i < listInput.length; i++) {
			var elm = listInput[i];
			if(!isNullOrEmpty($(elm).attr('call-back'))) {
				var __listCallback = $(elm).attr('call-back');
				var listCallback = __listCallback.split(';');
				for(var j = 0; j < listCallback.length; j++) {
					try {
						var strMsgError = eval(listCallback[j]);
						if(!isNullOrEmpty(strMsgError)) {
							if (errMsgId) {
								$("#" + errMsgId).html(strMsgError).show();
								return null;
							}
							showMessageBanner(true, strMsgError);
							return null;
						}
					} catch (e) {
						msg = 'Lỗi. Liên hệ với quản trị để biết thêm thông tin';
						if (errMsgId) {
							$("#" + errMsgId).html(msg).show();
							return null;
						}
						showMessageBanner(true, msg);
						return null;
					}
				}
			}
			
			if($(elm).parent().attr('id') == ($(elm).attr('id') +'-wrapper')) {
				/*kendo-ui*/
				var kendo = $(elm).data("kendoMultiSelect");
			}
			
			var objId = $(elm).attr('id');
			if(!isNullOrEmpty(objId)) {
				var objVal = $(elm).val();
				if($(elm).attr('type') == 'checkbox' && $(elm).prop("checked")) {
					params[objId] = true;
				} else if($(elm).attr('type') == 'checkbox' && !$(elm).prop("checked")) {
					params[objId] = false;
				} else if($(elm).hasClass('vinput-money')){
					params[objId] = VTUtilJS.returnMoneyValue(objVal);
				} else {
					params[objId] = objVal;
				}
			}
		}
		for(var i = 0; i < listOption.length; i++) {
			var elm = listOption[i];
			if(!isNullOrEmpty($(elm).attr('call-back'))) {
				var __listCallback = $(elm).attr('call-back');
				var listCallback = __listCallback.split(';');
				for(var j = 0; j < listCallback.length; j++) {
					try {
						var strMsgError = eval(listCallback[j]);
						if(!isNullOrEmpty(strMsgError)) {
							showMessageBanner(true, strMsgError);
							return null;
						}
					} catch (e) {
						msg = 'Lỗi. Liên hệ với quản trị để biết thêm thông tin';
						showMessageBanner(true, msg);
						return null;
					}
				}
			}
			
			var objId = $(elm).attr('id');
			if(!isNullOrEmpty(objId)) {
				var objVal = $(elm).val();
				if(objVal != null && $.isArray(objVal)) {
					if($(elm).attr('') == 'multiple') {
						params[objId] = objVal;
					} else {
						params[objId] = objVal[0];
					}
				} else {
					params[objId] = objVal;
				}
			}
		}
		
		for(var i = 0; i < listTextArea.length; i++) {
			var elm = listTextArea[i];
			if(!isNullOrEmpty($(elm).attr('call-back'))) {
				var __listCallback = $(elm).attr('call-back');
				var listCallback = __listCallback.split(';');
				for(var j = 0; j < listCallback.length; j++) {
					try {
						var strMsgError = eval(listCallback[j]);
						if(!isNullOrEmpty(strMsgError)) {
							showMessageBanner(true, strMsgError);
							return null;
						}
					} catch (e) {
						msg = 'Lỗi. Liên hệ với quản trị để biết thêm thông tin';
						showMessageBanner(true, msg);
						return null;
					}
				}
			}
			var objId = $(elm).attr('id');
			if(!isNullOrEmpty(objId)) {
				var objVal = $(elm).val();
				params[objId] = objVal;
			}
		}
		
		return params;
	};
	
	function getFormHtml(formId, url, callback) {
		if(formId == null) {
			return;
		}
		$('#divOverlay').show();
		var params = null;
		if(typeof formId === 'string') {
			params = getFormData(formId);
		} else {
			params = formId;
		}
		if(params != null) {
			params = $.param(params, true);
			$.ajax({
				type : "GET",
				url : url,
				data :params,
				dataType : "html",
				success : function(data) {				
					$('#divOverlay').hide();
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					$('#divOverlay').hide();
					window.location.href = '/home';
				}
			});
		}
	};
	
	function getFormJson(formId, url, callback) {
		if(formId == null) {
			return;
		}
		$('#divOverlay').show();
		var params = null;
		if(typeof formId === 'string') {
			params = getFormData(formId);
		} else {
			params = formId;
		}
		if(params != null) {
			params = $.param(params, true);
			$.ajax({
				type : "GET",
				url : url,
				data :params,
				dataType : "json",
				success : function(data) {				
					$('#divOverlay').hide();
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					$('#divOverlay').hide();
					window.location.href = '/home';
				}
			});
		}
	};
	
	function postFormHtml(formId, url, callback) {
		if(formId == null) {
			return;
		}
		$('#divOverlay').show();
		var params = null;
		if(typeof formId === 'string') {
			params = getFormData(formId);
		} else {
			params = formId;
		}
		if(params != null) {
			params = $.param(params, true);
			$.ajax({
				type : "POST",
				url : url,
				data :params,
				dataType : "html",
				success : function(data) {				
					$('#divOverlay').hide();
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					$('#divOverlay').hide();
					window.location.href = '/home';
				}
			});
		}
	};
	
	function postFormJson(formId, url, callback, errMsgId) {
		if (formId == null) {
			return;
		}
		// $('#divOverlay').show();
		var params = null;
		if (typeof formId === 'string') {
			params = getFormData(formId, errMsgId);
		} else {
			params = formId;
		}

		if (params != null) {
			$('#divOverlay').show();
			params.token = VTUtilJS.getToken();
			params = $.param(params, true);
			$.ajax({
				type: "POST",
				url: url,
				data: params,
				dataType: "json",
				success: function(data) {
					VTUtilJS.updateTokenForJSON(data);
					$('#divOverlay').hide();
					if (callback != null && callback != undefined) {
						callback.call(this,data);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$('#divOverlay').hide();
					window.location.href = '/home';
				}
			});
		}
	};
	
	function previewImportExcelFileUtils(fileObj, formId, inputText){
		var inputId = 'fakefilepc';
		if(inputText != null || inputText != undefined){
			inputId = inputText;
		}
		var fileTypes=["xls","xslx"];
		if (fileObj.value != '') {
			if (!/(\.xls|\.xlsx)$/i.test(fileObj.value)) {
				showMessageBanner(true, msgErr_excel_file_invalid_type);
				fileObj.value = '';
				fileObj.focus();
				document.getElementById(inputId).value ='';			
				return false;
			} else {
				$('.ErrorMsgStyle').html('').hide();
				var src = '';
				if ($.browser.msie){
				    var path = encodeURI(what.value);
				    path = path.replace("C:%5Cfakepath%5C","");
				    var path = decodeURI(path);
				    $('#'+inputId.trim()).val(path);
				}else{
					$('#'+inputId.trim()).val(fileObj.value);
				}	
			}
		}else{
			showMessageBanner(true, 'Không tìm thấy tập tin Excel');
			return false;
		}
		return true;
	};
	
	function beforeImportExcel(){
		var idDiv = _inputTextFileExcel;
		if(idDiv==undefined || idDiv==null){
			idDiv = "excelFile";
		}
		if(!previewImportExcelFileUtils(document.getElementById(idDiv), _formIdFileExcel,_inputText)){
			return false;
		}
		showLoadingIcon();
	};

	function afterImportExcel(responseText, statusText, xhr, $form){//ProductLevelCatalog
		hideLoadingIcon();
		var data = {};
		var mes = "";
		if (statusText == 'success') {
		    	$("#responseDiv").html(responseText);
		    	
		    	var newToken = $('#responseDiv #newToken').val();
		    	if (newToken != null && newToken != undefined && newToken != '') {
		    		$('#token').val(newToken);
		    		if ($("#tokenImport").length > 0) {
		    			$('#tokenImport').val(newToken);
		    		}
		    		if ($('#importTokenVal').length > 0) {
					$('#importTokenVal').val(newToken);
				}
		    	}
	    		if ($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0) {
	    			data.message = $('#errorExcelMsg').html();
	    			data.flag = true;
		    		$('#fakefilepc').val('');		
		    		_importCallback.call(this, data);
		    		return ;
		    	} else {
		    		var totalRow = parseInt($('#totalRow').html().trim());
		    		var numFail = parseInt($('#numFail').html().trim());
		    		var fileNameFail = $('#fileNameFail').html();
		    		
		    		if (!numFail) {
		    			numFail = 0;
		    		}
		    		mes = format(msgErr_result_import_excel, (totalRow - numFail), numFail);
		    		if (numFail > 0) {
		    			mes += ' <a href="'+ fileNameFail +'">Xem chi tiết lỗi</a>';
		    		} else {
		    			mes = '<span style="color:#0587BB;">' + mes + '</span>';
		    		}
		    		if (_importCallback != undefined && _importCallback != null) {
		    			data.message = mes;
		    			data.flag = true;
		    			data.fileNameFail = fileNameFail;
		    			_importCallback.call(this, data);
		    		}
		    	}
		    	$('#fakefilepc').val('');
			$('#excelFile').val('');
		}
	};
	var _importCallback = null;
	var _inputTextFileExcel = null;
	var _formIdFileExcel = null;
	var _inputText = null;
	function importExcelUtils(callBack, objectId, inputByObjectId, isViewId, errExcelMsg, params){
 		if (isViewId != undefined && isViewId != null) {
 			$('#'+isViewId).val(0);
 		}
 		if (callBack != undefined && callBack != null) {
 			_importCallback = callBack;
 		}
 		if (errExcelMsg == undefined || errExcelMsg == null || errExcelMsg.trim().length == 0) {
 			_errExcelMsg = 'errExcelMsg';
 		} else {
 			_errExcelMsg = errExcelMsg;
 		}
 		var excelURI = $('#'+inputByObjectId).val();
 		if (excelURI == undefined || excelURI == null || excelURI.trim().length == 0) {
 			// showMessageBanner(true, 'Vui lòng chọn tập tin Excel');
 			if ($("#"+_errExcelMsg).length > 0) {
 				$("#"+_errExcelMsg).html("Vui lòng chọn tập tin Excel").show();
 			} else {
 				showMessageBanner(true, 'Vui lòng chọn tập tin Excel');
 			}
 			return false;
 		} else {
 			_inputTextFileExcel = inputByObjectId;
 		}
 		
 		if (objectId==undefined || objectId==null || objectId.trim().length == 0) {
 			//showMessageBanner(true, 'Không tìm thấy form dữ liệu chứa File Excel');
 			if ($("#"+_errExcelMsg).length > 0) {
 				$("#"+_errExcelMsg).html("Không tìm thấy form dữ liệu chứa File Excel").show();
 			} else {
 				showMessageBanner(true, 'Không tìm thấy form dữ liệu chứa File Excel');
 			}
 			return false;
 		} else {
 			_formIdFileExcel = objectId;
 		}
 		$.messager.confirm('Xác nhận', 'Bạn có muốn nhập file excel không?', function(r) {  
			if (r) {
				if (params == undefined || params == null) {
					params = new Object();
				}
				if ($('#excelType').length > 0) {
					params.excelType = $('#excelType').val();
				}
				if ($('#proType').length > 0) {
					params.proType = $('#proType').val();
				}
				params.token = $("#token").val().trim();
				var options = { 
					beforeSubmit: beforeImportExcel,
			 		success:      afterImportExcel, 
			 		type: "POST",
			 		dataType: 'html',
			 		data:(params)
			 	};
				$('#'+objectId).ajaxForm(options);
		 		$('#'+objectId).submit();
		 		return false;
			} else {
				$('#'+inputByObjectId).val("");
				$("#fakefilepc").val("");
		 		return false;
			}
		});	
 		return false;
 		
 	};
	
	return result;
})($);

VTValidateUtils = (function($) {
	var result = {
		/**
		 * VTValidateVTUtilJS.getMessageCheckCurrentDate(toDateId, toDateName)
		 */
		getMessageCheckCurrentDate : getMessageCheckCurrentDate, 
		/**
		 * VTValidateVTUtilJS.getMessageOfInvaildInteger(objectId, objectName) 
		 */
		getMessageOfInvaildInteger : getMessageOfInvaildInteger,
		/**
		 * VTValidateVTUtilJS.getMessageOfRequireCheck(objectId, objectName, isSelectBox, checkMaxLengh)
		 */
		getMessageOfRequireCheck : getMessageOfRequireCheck,
		/**
		 * VTValidateVTUtilJS.getMessageOfInvaildInteger(objectId, objectName)
		 */
		getMessageOfInvaildInteger : getMessageOfInvaildInteger,
		/**
		 * VTValidateVTUtilJS.getMessageOfInvalidFormatDate(objectId, objectName)
		 */
		getMessageOfInvalidFormatDate : getMessageOfInvalidFormatDate,
		/**
		 * VTValidateVTUtilJS.getMessageOfEmptyDate(objectId, objectName)
		 */
		getMessageOfEmptyDate : getMessageOfEmptyDate,
		/**
		 * VTValidateVTUtilJS.getMessageCheckToDate(fromDateId, fromDateName, toDateId, toDateName)
		 */
		getMessageCheckToDate : getMessageCheckToDate,
		/**
		 * VTValidateVTUtilJS.getMessageOfSpecialCharactersValidate(objectId, objectName,type)
		 */
		getMessageOfSpecialCharactersValidate : getMessageOfSpecialCharactersValidate,
		/**
		 * VTValidateVTUtilJS.getMessageOfNegativeNumberCheck(objectId, objectName)
		 */
		getMessageOfNegativeNumberCheck : getMessageOfNegativeNumberCheck
	};
	var dates = {
	    convert:function(d) {
	        // Converts the date in d to a date-object. The input can be:
	        // a date object: returned without modification
	        // an array : Interpreted as [year,month,day]. NOTE: month is 0-11.
	        // a number : Interpreted as number of milliseconds
	        // since 1 Jan 1970 (a timestamp)
	        // a string : Any format supported by the javascript engine, like
	        // "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
	        // an object : Interpreted as an object with year, month and date
	        // attributes. **NOTE** month is 0-11.
	        return (
	            d.constructor === Date ? d :
	            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
	            d.constructor === Number ? new Date(d) :
	            d.constructor === String ? new Date(d) :
	            typeof d === "object" ? new Date(d.year,d.month,d.date) :
	            NaN
	        );
	    },
	    compare:function(a,b) {
	        // Compare two dates (could be of any type supported by the convert
	        // function above) and returns:
	        // -1 : if a < b
	        // 0 : if a = b
	        // 1 : if a > b
	        // NaN : if a or b is an illegal date
	        // NOTE: The code inside isFinite does an assignment (=).
	        return (
	            isFinite(a=this.convert(a).valueOf()) &&
	            isFinite(b=this.convert(b).valueOf()) ?
	            (a>b)-(a<b) :
	            NaN
	        );
	    },
	    inRange:function(d,start,end) {
	        // Checks if date in d is between dates in start and end.
	        // Returns a boolean or NaN:
	        // true : if d is between start and end (inclusive)
	        // false : if d is before start or after end
	        // NaN : if one or more of the dates is illegal.
	        // NOTE: The code inside isFinite does an assignment (=).
	       return (
	            isFinite(d=this.convert(d).valueOf()) &&
	            isFinite(start=this.convert(start).valueOf()) &&
	            isFinite(end=this.convert(end).valueOf()) ?
	            start <= d && d <= end :
	            NaN
	        );
	    },
	    addDays:function(n){
	    	var curdate = new Date();
	    	var time = curdate.getTime();
	        var changedDate = new Date(time + (n * 24 * 60 * 60 * 1000));
	        curdate.setTime(changedDate.getTime());	        
	        return $.datepicker.formatDate('dd/mm/yy', curdate);
	    }
	};
	function isDate(txtDate, separator) {
	    var aoDate,           // needed for creating array and object
	        ms,               // date in milliseconds
	        month, day, year; // (integer) month, day and year
	    // if separator is not defined then set '/'
	    if (separator == undefined) {
	        separator = '/';
	    }
	    // split input date to month, day and year
	    aoDate = txtDate.split(separator);
	    // array length should be exactly 3 (no more no less)
	    if (aoDate.length !== 3) {
	        return false;
	    }
	    // define month, day and year from array (expected format is m/d/yyyy)
	    // subtraction will cast variables to integer implicitly
	    day = aoDate[0] - 0; // because months in JS start from 0
	    month = aoDate[1] - 1;
	    year = aoDate[2] - 0;
	    // test year range
	    if (year < 1000 || year > 3000) {
	        return false;
	    }
	    // convert input date to milliseconds
	    ms = (new Date(year, month, day)).getTime();
	    // initialize Date() object from milliseconds (reuse aoDate variable)
	    aoDate = new Date();
	    aoDate.setTime(ms);
	    // compare input date and parts from Date() object
	    // if difference exists then input date is not valid
	    if (aoDate.getFullYear() !== year ||
	        aoDate.getMonth() !== month ||
	        aoDate.getDate() !== day) {
	        return false;
	    }
	    // date is OK, return true
	    return true;
	};
	function compareDate(startDate, endDate){
		if(startDate.length == 0 || endDate.length == 0){
			return true;			
		}
		var arrStartDate = startDate.split('/');
		var arrEndDate = endDate.split('/');
		var startDateObj = dates.convert(arrStartDate[1] + '/' + arrStartDate[0] + '/' + arrStartDate[2]);
		var endDateObj = dates.convert(arrEndDate[1] + '/' + arrEndDate[0] + '/' + arrEndDate[2]);
		if(dates.compare(startDateObj,endDateObj) > 0){
			return false;
		}
		return true;
	};
	function getMessageOfInvaildInteger(objectId, objectName){
		var strString = $('#' + objectId).val().trim();
		strString = strString.replace(/,/g, '');
		strString = strString.trim();
		var strValidChars = "0123456789";		
		var blnResult = true;		
		for (var i = 0; i < strString.length && blnResult == true; i++)		      {
		      var strChar = strString.charAt(i);
		      if (strValidChars.indexOf(strChar) == -1){
		         blnResult = false;
		       }
		}
		if(!blnResult){
			return objectName + ' chỉ chứa các giá trị số nguyên.';
		}else{
			return '';
		}		
	};
	function getMessageOfNegativeNumberCheck(objectId, objectName){
		if($('#' + objectId).val().trim() != '' && $('#' + objectId).val().trim().length > 0){
			if($('#' + objectId).val().replace(/,/g,'') <= 0){
				$('#' + objectId).focus();
				return objectName + ' phải lớn hơn 0';
			}
		}
		return '';
	};
	function getMessageOfSpecialCharactersValidate(objectId, objectName,type){
		var selector = $('#' + objectId);
		var value = '';
		if(selector.hasClass('easyui-combobox')){
			value = $('#' + objectId).combobox('getValue').trim();
		}else{
			value = $('#' + objectId).val().trim();
		}	
		if(type == null || type == undefined){
			type = VTUtilJS._NAME;
		}
		var errMsg = '';
		if(value.length > 0){
			switch (type) {
			case VTUtilJS._CODE:
				if(!/^[0-9a-zA-Z-_.,]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_code,objectName);
				}
				break;
			case VTUtilJS._NAME:
				if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|(|)|^|`]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_name,objectName);
				}
				break;
			case VTUtilJS._ADDRESS:
				if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_address,objectName);
				}
				break;
			case VTUtilJS._PAYROLL:
				value = value.substring(3);
				if(!/^[0-9a-zA-Z]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_payroll,objectName);
				}
				break;
			case VTUtilJS._TF_NUMBER_COMMA:
				if(!/^[0-9a-zA-Z_]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_tf_id_number,objectName);
				}
				break;
			case VTUtilJS._NAME_CUSTYPE:
				if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|^|`]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_name,objectName);
				}
				break;
			default:
				break;
			}
		}	
		if(errMsg.length !=0){
			$('#' + objectId).focus();
		}
		return errMsg;
	};
	function getMessageOfRequireCheck(objectId, objectName, isSelectBox, checkMaxLengh) {
		if($('#' + objectId).val()==null || (!isSelectBox && $('#' + objectId).val().trim() == '__/__/____')){
			$('#' + objectId).val('');
		}
		if(isSelectBox != undefined && isSelectBox && $('#' + objectId).hasClass('easyui-combobox') && $('#' + objectId).combobox('getValue').trim().length == 0) {
			$('#' + objectId).next().attr('id',objectId+'easyuicomboxId');
			$('#'+objectId+'easyuicomboxId input.combo-text').focus();
			return format(msgErr_required_field,objectName);
		} else if((isSelectBox!= undefined && isSelectBox && parseInt($('#' + objectId).val().trim()) < 0) || ((isSelectBox== undefined || !isSelectBox) && $('#' + objectId).val().trim().length == 0)){
			$('#' + objectId).focus();
			if(!isSelectBox){
				return format(msgErr_required_field,objectName);
			}else{
				return format(msgErr_required_choose_format,objectName);
			}
			
		}
		if(checkMaxLengh==undefined || checkMaxLengh==null){
			var maxlength = $('#' + objectId).attr('maxlength');
			if(maxlength!= undefined && maxlength!= null && maxlength.length > 0){
				if($('#' + objectId).val().trim().length > maxlength){
					$('#' + objectId).focus();
					return format(msgErr_invalid_maxlength,objectName,maxlength);
				}
			}
		}		
		return '';
	};
	function getMessageOfInvaildInteger(objectId, objectName){
		var strString = $('#' + objectId).val().trim();
		strString = strString.replace(/,/g, '');
		strString = strString.trim();
		var strValidChars = "0123456789";		
		var blnResult = true;		
		for (var i = 0; i < strString.length && blnResult == true; i++)		      {
		      var strChar = strString.charAt(i);
		      if (strValidChars.indexOf(strChar) == -1){
		         blnResult = false;
		       }
		}
		if(!blnResult){
			return objectName + ' chỉ chứa các giá trị số nguyên.';
		}else{
			return '';
		}		
	};
	function getMessageOfInvalidFormatDate(objectId, objectName){
		if($('#' + objectId).val().trim() == '__/__/____'){
			$('#' + objectId).val('');
			return '';
		}
		if($('#' + objectId).val().trim().length > 0 && !isDate($('#' + objectId).val().trim(), '/')){
			$('#' + objectId).focus();			
			return format(msgErr_invalid_format_date,objectName);
		}
		return '';
	};
	function getMessageOfEmptyDate(objectId, objectName){
		if($('#' + objectId).val().trim().length == 0 ){
			$('#' + objectId).focus();			
			return format(msgErr_empty_date,objectName);
		}
		return '';
	};
	function getMessageCheckToDate(fromDateId, fromDateName, toDateId, toDateName) {
		if(!compareDate($('#'+fromDateId).val(), $('#'+toDateId).val())) {
			return fromDateName + ' không được vượt quá ' + toDateName;
		}
		return '';
	};
	function getMessageCheckCurrentDate(toDateId, toDateName) {
		var toDateVal = $('#'+toDateId).val();
		var toDate = new Date(toDateVal.split('/')[2], Number(toDateVal.split('/')[1]) - 1, toDateVal.split('/')[0]);
		var nowDate = new Date();
		var currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
		if(dates.compare(toDate, currentDate)==-1) {
			return toDateName + ' phải lớn hơn ngày hiện tại';
		}
		return '';
	};
	return result;
})($);

function previewImportExcelFile(fileObj,formId,inputText, errorMsgId){
	var inputId = 'fakefilepc';
	if(inputText != null || inputText != undefined){
		inputId = inputText;
	}
	var errExcelMsg = 'errExcelMsg';
	if(errorMsgId != null || errorMsgId != undefined) {
		errExcelMsg = errorMsgId;
	}
	var fileTypes = ["xls", "xlsx", "xlsm"];
	if (fileObj.value != '') {
		if (!/(\.xls|\.xlsx|\.xlsm)$/i.test(fileObj.value)) {
			$('#'+errExcelMsg).html(msgErr_excel_file_invalid_type).show();
			fileObj.value = '';
			fileObj.focus();
			document.getElementById(inputId).value ='';			
			return false;
		} else {
			$('#'+errExcelMsg).html('').hide();
			var src = '';
			if ($.browser.msie){
			    var path = encodeURI(what.value);
			    path = path.replace("C:%5Cfakepath%5C","");
			    var path = decodeURI(path);
			    document.getElementById(inputId).value = path;
			}else{
				document.getElementById(inputId).value = fileObj.value;
			}	
		}
	}else{
		$('#'+errExcelMsg).html('Vui lòng chọn file Excel').show();		
		return false;
	}
	return true;
}

/**
 * map data structure
 * @param {array} initData init data for map, array of object(key, value).
 *                         Example: [{key: k1, value: v1}, {key: k2, value: v2}]
 */
function Map(initData) {
    this.keyArray = (function(initData){
	    /*
	     * initialize data
	     */
	    try {
		    if (initData !== null && initData !== undefined && initData instanceof Array) {
		    	var key = "key", value = "value";
		    	var initKeyArray = new Array();
		    	initData.forEach(function(item) {
		    		if (item[key] !== undefined && item[key] !== null) {
		    			initKeyArray.push(item[key]);
		    		}
		    	});
		    	return initKeyArray;
		    }
		    return new Array();
	    } catch (e) {
	    	return new Array();
	    }    	
    })(initData); // Keys

    this.valArray = (function(initData){
	    /*
	     * initialize data
	     */
	    try {
		    if (initData !== null && initData !== undefined && initData instanceof Array) {
		    	var key = "key", value = "value";
		    	var initValArray = new Array();
		    	initData.forEach(function(item) {
		    		if (item[value] !== undefined && item[value] !== null) {
		    			initValArray.push(item[value]);
		    		}
		    	});
		    	return initValArray;
		    }
		    return new Array();
	    } catch (e) {
	    	return new Array();
	    }    	
    })(initData);; // Values
    
    this.put = put;
    this.get = get;
    this.size = size;  
    this.clear = clear;
    this.keySet = keySet;
    this.valSet = valSet;
    this.showMe = showMe;   // returns a string with all keys and values in map.
    this.findIt = findIt;
    this.remove = remove;	
    this.findIt4Val = findIt4Val;
	function put(key, val) {
    	var elementIndex = this.findIt(key);
	    if(elementIndex == (-1)) {
	        this.keyArray.push(key);
	        this.valArray.push(val);
	    } else {
	        this.valArray[elementIndex] = val;
	    }
	}
	function get(key) {
	    var result = null;
	    var elementIndex = this.findIt(key);
	    if (elementIndex != (-1)) {
	        result = this.valArray[elementIndex];
	    }
	    return result;
	}	
	function remove(key) {
	    var result = null;
	    var elementIndex = this.findIt(key);
	    if(elementIndex != (-1)) {
	        // this.keyArray = this.keyArray.myRemoveAt(elementIndex);
	    	this.keyArray.splice(elementIndex,1);
	        // this.valArray = this.valArray.myRemoveAt(elementIndex);
	    	this.valArray.splice(elementIndex,1);
	    }  
	    return ;
	}
	function size() {
	    return (this.keyArray.length);
	}
	function clear() {
        this.keyArray = new Array();
		this.valArray = new Array();
	}
	function keySet() {
	    return (this.keyArray);
	}
	function valSet() {
	    return (this.valArray);
	}
	function showMe() {
	    var result = "";
	    for( var i = 0; i < this.keyArray.length; i++ ) {
	        result += "Key: " + this.keyArray[ i ] + "\tValues: " + this.valArray[ i ] + "\n";
	    }
	    return result;
	}
	function findIt(key) {
	    var result = (-1);
	    for(var i = 0; i < this.keyArray.length; i++) {
	        if(this.keyArray[ i ] == key) {
	            result = i;
	            break;
	        }
	    }
	    return result;
	}
	function findIt4Val(val){
		var result = (-1);
	    for(var i = 0; i < this.valArray.length; i++) {
	        if(this.valArray[ i ] == val) {
	            result = i;
	            break;
	        }
	    }
	    return result; 
	}
}
VCommonJS = (function($) {
	var mapId = null;
	var ENTER = 13;
	
	var isNullOrEmpty = function(value) {
		if(value == null || value == undefined || value == '') {
			return true;
		} else {
			return false;
		}
	};
	/**
	VCommonJS.showDialogList({
		    url : '/commons/search-shop-show-list',
		    onShow : function() {
		    	console.log('OK');
		    },
		    columns : [[
		        {field:'shopCode', title:'Mã NPP', align:'left', width: 110, sortable:false, resizable:false},
		        {field:'shopName', title:'Tên NPP', align:'left', width: 150, sortable:false, resizable:false},
		        {field:'address', title:'Địa chỉ', align:'left', width: 170, sortable:false, resizable:false},
		        {field:'choose', title:'', align:'center', width:40, sortable:false, resizable:false, formatter:function(value,row,index) {
		            return '<a href="javascript:void(0)" onclick="javascript:alert('OK');">chọn</a>';         
		        }}
		    ]]
		});
	 * 
	 */
	var showDialogList = function(opts) {
		var inputs = [];
		if(opts.inputs!=undefined && opts.inputs !=null){
			inputs =  opts.inputs;
		}
		var url = opts.url;
		var data = opts.data;
		var searchCallback = opts.searchCallback;
		var columns = opts.columns;
		var dialogInfo = opts.dialogInfo;
		var params = opts.params;
		var callbackOnShow = opts.onShow;
		$('#common-dialog-showlist-textbox').remove();
		var html = '<div id="common-dialog-showlist-textbox" class="easyui-dialog" data-options="closed:true, modal:true">';
		html += '<div class="PopupContentMid">';
		html += '<div class="SearchInSection SProduct1Form" style="border: none;">';
		html += '<div class="GridSection" id="common-dialog-grid-container">';
		html += '<table id="common-dialog-grid-search"></table>';
		html += '</div>';
		html += '<div class="BtnCenterSection">';
		html += '<button class="BtnGeneralStyle BtnGeneralMStyle" onclick="$(\'#common-dialog-showlist-textbox\').dialog(\'close\');">Đóng</button>';
		if (opts.chooseall != undefined && opts.chooseall !=null && opts.chooseall) {
			html += '<button class="BtnGeneralStyle BtnGeneralMStyle" id="common-dialog-button-choose" onclick="$(\'#common-dialog-showlist-textbox\').dialog(\'close\');">Chọn</button>';
		}
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		
		$('body').append(html).change();
		
		$('#common-dialog-showlist-textbox').dialog({
			title: (dialogInfo != null && dialogInfo != undefined && dialogInfo.title != null && dialogInfo.title != undefined) ? dialogInfo.title : 'Thông tin tìm kiếm',
			width: (dialogInfo != null && dialogInfo != undefined && dialogInfo.width != null && dialogInfo.width != undefined) ? dialogInfo.width : 600, 
			height: (dialogInfo != null && dialogInfo != undefined && dialogInfo.height != null && dialogInfo.height != undefined) ? dialogInfo.width : 'auto',
			closed: false,
			cache: false,
			modal: true,
			onOpen: function() {
				if(inputs!=undefined && inputs!=null && inputs.length > 0){
					$('#'+inputs[0].id).focus(); // vuongmq focus input dau tien
					for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type != null && inputs[i].type != undefined && inputs[i].type == 'date') {
							VTUtilJS.applyDateTimePicker($('#common-dialog-showlist-textbox #'+inputs[i].id));
						}
					}
				}
				
				if(callbackOnShow != null && callbackOnShow != undefined) {
					callbackOnShow.call(this);
				}
				
				$('#common-dialog-showlist-textbox #common-dialog-button-search').unbind('click');
				$('#common-dialog-showlist-textbox #common-dialog-button-search').bind('click', function() {
					if(searchCallback != null && searchCallback != undefined) {
						searchCallback.call(this);
					} else {
						$('#common-dialog-grid-search').datagrid('reload');
					}
				});
				if(!VTUtilJS.isNullOrEmpty(url)) {
					$('#common-dialog-grid-search').datagrid({
						url : url,
						autoRowHeight : true,
						rownumbers : true,
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						pageSize:10,
						scrollbarSize : 0,
						singleSelect:true,
						pageNumber:1,
						queryParams:{
							page:1
						},
						onBeforeLoad: function(param) {
							if(searchCallback == null || searchCallback == undefined) {
								if(params != null && params != undefined) {
									var keys = Object.keys(params);
									for(var i = 0; i < keys.length; i++) {
										param[keys[i]] = params[keys[i]];
									}
								}
								for(var i = 0; i < inputs.length; i++) {
									param[inputs[i].id] = $('#common-dialog-showlist-textbox #'+inputs[i].id).val().trim();
								}
								param = $.param(param, true);
							}
						},
						fitColumns:true,
						width : ($('#common-dialog-showlist-textbox').width() - 40),
						columns:columns,
						onLoadSuccess :function(){
							$('#common-dialog-showlist-textbox .datagrid-header-rownumber').html('STT');
							var dHeight = $('#common-dialog-showlist-textbox').height();
							var wHeight = $(window).height();
							var ptop = (wHeight - dHeight) / 2 > 180 ? (wHeight - dHeight) / 2 - 180 : (wHeight - dHeight) / 2;
							$('#common-dialog-showlist-textbox').dialog('move', {top : ptop});
						}
					});
					
				} else if(!VTUtilJS.isNullOrEmpty(data)) {
					 (function($){
						 function pagerFilter(data){
						 if ($.isArray(data)){ // is array
							 data = {
								 total: data.length,
								 rows: data
							 };
						 }
						 var dg = $(this);
						 var state = dg.data('datagrid');
						 var opts = dg.datagrid('options');
						 if (!state.allRows){
						 state.allRows = (data.rows);
						 }
						 var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
						 var end = start + parseInt(opts.pageSize);
							 data.rows = $.extend(true,[],state.allRows.slice(start, end));
							 return data;
						 };
						  
						 var loadDataMethod = $.fn.datagrid.methods.loadData;
						 $.extend($.fn.datagrid.methods, {
						 clientPaging: function(jq){
						 return jq.each(function(){
						 var dg = $(this);
						 var state = dg.data('datagrid');
						 var opts = state.options;
						 opts.loadFilter = pagerFilter;
						 var onBeforeLoad = opts.onBeforeLoad;
						 opts.onBeforeLoad = function(param){
							 state.allRows = null;
							 return onBeforeLoad.call(this, param);
						 };
						 dg.datagrid('getPager').pagination({
							 onSelectPage:function(pageNum, pageSize){
								 opts.pageNumber = pageNum;
								 opts.pageSize = pageSize;
								 $(this).pagination('refresh',{
									 pageNumber:pageNum,
									 pageSize:pageSize
								 });
							 dg.datagrid('loadData',state.allRows);
						 }
						 });
							 $(this).datagrid('loadData', state.data);
							 if (opts.url){
							 $(this).datagrid('reload');
							 }
							 });
							 },
							 loadData: function(jq, data){
								 jq.each(function(){
									 $(this).data('datagrid').allRows = null;
								 });
								 return loadDataMethod.call($.fn.datagrid.methods, jq, data);
							 },
							 getAllRows: function(jq){
								 return jq.data('datagrid').allRows;
							 }
						 });
						 })(jQuery);
					$('#common-dialog-grid-search').datagrid({
						data : data,
						autoRowHeight : true,
						rownumbers : true,
						checkOnSelect :true,
						pagination:true,
						rowNum : (dialogInfo != null && dialogInfo != undefined && dialogInfo.rowNum != null && dialogInfo.rowNum != undefined) ? dialogInfo.rowNum : 10,
						pageSize: (dialogInfo != null && dialogInfo != undefined && dialogInfo.pageSize != null && dialogInfo.pageSize != undefined) ? dialogInfo.pageSize : 10,
						pageList: [(dialogInfo != null && dialogInfo != undefined && dialogInfo.pageList != null && dialogInfo.pageList != undefined) ? dialogInfo.pageList : 10],
						scrollbarSize : 0,
						singleSelect:true,
						pageNumber:1,
						queryParams:{
							page:1
						},
						onBeforeLoad: function(param) {
							if(searchCallback == null || searchCallback == undefined) {
								if(params != null && params != undefined) {
									var keys = Object.keys(params);
									for(var i = 0; i < keys.length; i++) {
										param[keys[i]] = params[keys[i]];
									}
								}
								for(var i = 0; i < inputs.length; i++) {
									param[inputs[i].id] = $('#common-dialog-showlist-textbox #'+inputs[i].id).val().trim();
								}
								param = $.param(param, true);
							}
						},
						fitColumns:true,
						width : ($('#common-dialog-showlist-textbox').width() - 40),
						columns:columns,
						onLoadSuccess :function(){
							$('#common-dialog-showlist-textbox .datagrid-header-rownumber').html('STT');
							var dHeight = $('#common-dialog-showlist-textbox').height();
							var wHeight = $(window).height();
							var ptop = (wHeight - dHeight) / 2 > 180 ? (wHeight - dHeight) / 2 - 180 : (wHeight - dHeight) / 2;
							$('#common-dialog-showlist-textbox').dialog('move', {top : ptop});
						}
					}).datagrid('clientPaging');
				}
			},
			onClose: function() {
				$('#common-dialog-showlist-textbox').remove(); 
			}
		});
	};
	
	/**
		VCommonJS.showDialogSearch2({
		    inputs : [
		        {id:'code', maxlength:50, label:'Mã NPP'},
		        {id:'name', maxlength:250, label:'Tên NPP'},
		        {id:'address', maxlength:250, label:'Địa chỉ', width:410}
		    ],
		    url : '/commons/search-shop-show-list',
		    onShow : function() {
		    	console.log('OK');
		    },
		    columns : [[
		        {field:'shopCode', title:'Mã NPP', align:'left', width: 110, sortable:false, resizable:false},
		        {field:'shopName', title:'Tên NPP', align:'left', width: 150, sortable:false, resizable:false},
		        {field:'address', title:'Địa chỉ', align:'left', width: 170, sortable:false, resizable:false},
		        {field:'choose', title:'', align:'center', width:40, sortable:false, resizable:false, formatter:function(value,row,index) {
		            return '<a href="javascript:void(0)" onclick="javascript:alert('OK');">chọn</a>';         
		        }}
		    ]]
		});
	 * 
	 */
	 /** vuongmq; 27/04/2015; cap nhat cong so Number(i +1); cho tabindex*/
	var showDialogSearch2 = function(opts) {
		var inputs = opts.inputs;
		var url = opts.url;
		var searchCallback = opts.searchCallback;
		var columns = opts.columns;
		var dialogInfo = opts.dialogInfo;
		var params = opts.params;
		var callbackOnShow = opts.onShow;
		var isCenter = opts.isCenter;
		$('#common-dialog-search-2-textbox').remove();
		var html = '<div id="common-dialog-search-2-textbox" class="easyui-dialog" data-options="closed:true, modal:true">';
		html += '<div class="PopupContentMid">';
		html += '<div class="GeneralForm Search1Form" >';
		for(var i = 0; i < inputs.length; i++) {
			html += '<label id="label-'+inputs[i].id+'" class="LabelStyle Label1Style" style=" width: 100px;">'+inputs[i].label+'</label>';
			html += '<input id="'+inputs[i].id+'" maxlength="'+(isNullOrEmpty(inputs[i].maxlength) ? 250 : inputs[i].maxlength)+'" tabindex="'+Number(i+1)+'" type="text" style="width: '+(isNullOrEmpty(inputs[i].width) ? 145 : inputs[i].width)+'px;" value="'+(isNullOrEmpty(inputs[i].value) ? "" : inputs[i].value)+'" class="InputTextStyle InputText1Style"/>';
			if((i+1) % 2 ==0) {
				html += '<div class="Clear"></div>';
			}
		}
		html += '<div class="Clear"></div>'; 
		html += '<div class="BtnCenterSection">';
		html += '<button class="BtnGeneralStyle BtnGeneralMStyle" id="common-dialog-button-search">Tìm kiếm</button>';
		html += '</div>';
		html += '<div class="Clear"></div>';
		html += '<div class="GridSection" id="common-dialog-grid-container">';
		html += '<table id="common-dialog-grid-search"></table>';
		html += '</div>';
		html += '<div class="BtnCenterSection">';
		html += '<button class="BtnGeneralStyle BtnGeneralMStyle" onclick="$(\'#common-dialog-search-2-textbox\').dialog(\'close\');">Đóng</button>';
		if (opts.chooseall != undefined && opts.chooseall !=null && opts.chooseall) {
			html += '<button class="BtnGeneralStyle BtnGeneralMStyle" id="common-dialog-button-choose" onclick="$(\'#common-dialog-search-2-textbox\').dialog(\'close\');">Chọn</button>';
		}
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		
		$('body').append(html).change();
		
		$('#common-dialog-search-2-textbox').dialog({
			title: (dialogInfo != null && dialogInfo != undefined && dialogInfo.title != null && dialogInfo.title != undefined) ? dialogInfo.title : 'Thông tin tìm kiếm',
			width: (dialogInfo != null && dialogInfo != undefined && dialogInfo.width != null && dialogInfo.width != undefined) ? dialogInfo.width : 600, 
			height: (dialogInfo != null && dialogInfo != undefined && dialogInfo.height != null && dialogInfo.height != undefined) ? dialogInfo.width : 'auto',
			closed: false,
			cache: false,
			modal: true,
			onOpen: function() {
				// vuongmq focus input dau tien
				if (inputs.length > 0) {
					$("#"+inputs[0].id).focus();
				}
				//$('#'+inputs[0].id).focus(); // vuongmq focus input dau tien
				if(callbackOnShow != null && callbackOnShow != undefined) {
					callbackOnShow.call(this);
				}
				for(var i = 0; i < inputs.length; i++) {
					if(inputs[i].type != null && inputs[i].type != undefined && inputs[i].type == 'date') {
						VTUtilJS.applyDateTimePicker($('#common-dialog-search-2-textbox #'+inputs[i].id));
					}
				}
				
				$('#common-dialog-search-2-textbox #common-dialog-button-search').unbind('click');
				$('#common-dialog-search-2-textbox #common-dialog-button-search').bind('click', function() {
					if(searchCallback != null && searchCallback != undefined) {
						searchCallback.call(this);
					} else {
						$('#common-dialog-grid-search').datagrid('load');
					}
				});
				$('#common-dialog-search-2-textbox input').unbind('keyup');
				$('#common-dialog-search-2-textbox input').bind('keyup', function(e) {	
					if(e.keyCode == ENTER) {
						$('#common-dialog-search-2-textbox #common-dialog-button-search').click();
					}
				});
				$('#common-dialog-grid-search').datagrid({
					url : url,
					autoRowHeight : true,
					rownumbers : true,
					checkOnSelect :true,
					pagination:true,
					rowNum : 10,
					pageSize:10,
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					queryParams:{
						page:1
					},
					onBeforeLoad: function(param) {
						if(searchCallback == null || searchCallback == undefined) {
							if(params != null && params != undefined) {
								var keys = Object.keys(params);
								for(var i = 0; i < keys.length; i++) {
									param[keys[i]] = params[keys[i]];
								}
							}
							for(var i = 0; i < inputs.length; i++) {
								param[inputs[i].id] = $('#common-dialog-search-2-textbox #'+inputs[i].id).val().trim();
							}
							param = $.param(param, true);
						}
					},
					fitColumns:true,
					width : ($('#common-dialog-search-2-textbox').width() - 40),
					columns:columns,
					onLoadSuccess :function(){
						$('#common-dialog-search-2-textbox .datagrid-header-rownumber').html('STT');
						if(isCenter == undefined || isCenter == false || isCenter == null) {
							var dHeight = $('#common-dialog-search-2-textbox').height();
							var wHeight = $(window).height();
							var ptop = (wHeight - dHeight) / 2 > 180 ? (wHeight - dHeight) / 2 - 180 : (wHeight - dHeight) / 2;
							$('#common-dialog-search-2-textbox').dialog('move', {top : ptop});
					}
					}
				});
				
			},
			onClose: function() {
				$('#common-dialog-search-2-textbox').remove(); 
			}
		});
	};
  	
	/**
	 * 
		VCommonJS.showDialogSearch2WithCheckbox({
		    inputs : [
		        {id:'code', maxlength:50, label:'Mã NPP'},
		        {id:'name', maxlength:250, label:'Tên NPP'},
		        {id:'address', maxlength:250, label:'Địa chỉ', width:410}
		    ],
		    chooseCallback : function(listObj) {
		        console.log(listObj);
		    },
		    onShow : function() {
		    	console.log('OK');
		    },
		    url : '/commons/search-shop-show-list',
		    columns : [[
		        {field:'shopCode', title:'Mã NPP', align:'left', width: 110, sortable:false, resizable:false},
		        {field:'shopName', title:'Tên NPP', align:'left', width: 150, sortable:false, resizable:false},
		        {field:'address', title:'Địa chỉ', align:'left', width: 170, sortable:false, resizable:false},
		        {field:'cb', checkbox:true, align:'center', width:80,sortable : false,resizable : false},
		    ]]
		});
	 * 
	 */
	 /** vuongmq; 27/04/2015; cap nhat cong so Number(i +1); cho tabindex*/
	var showDialogSearch2WithCheckbox = function(opts) {
		var inputs = opts.inputs;
		var url = opts.url;
		var searchCallback = opts.searchCallback;
		var chooseCallback = opts.chooseCallback;
		var columns = opts.columns;
		var dialogInfo = opts.dialogInfo;
		var params = opts.params;
		var callbackOnShow = opts.onShow;
		var isCenter = opts.isCenter;
		var title = opts.title;
		var pKeyMap = opts.pKeyMap;
		$('#common-dialog-search-2-textbox').remove();
		var html = '<div id="common-dialog-search-2-textbox" class="easyui-dialog" data-options="closed:true, modal:true">';
		html += '<div class="PopupContentMid">';
		html += '<div class="GeneralForm Search1Form" >';
		for(var i = 0; i < inputs.length; i++) {
			html += '<label id="label-'+inputs[i].id+'" class="LabelStyle Label1Style" style=" width: 100px;">'+inputs[i].label+'</label>';
			html += '<input id="'+inputs[i].id+'" maxlength="'+(isNullOrEmpty(inputs[i].maxlength) ? 250 : inputs[i].maxlength)+'" tabindex="'+Number(i+1)+'" type="text" style="width: '+(isNullOrEmpty(inputs[i].width) ? 145 : inputs[i].width)+'px;" value="'+(isNullOrEmpty(inputs[i].value) ? "" : inputs[i].value)+'" class="InputTextStyle InputText1Style"/>';
			if((i+1) % 2 ==0) {
				html += '<div class="Clear"></div>';
			}
		}
		html += '<div class="Clear"></div>'; 
		html += '<div class="BtnCenterSection">';
		html += '<button class="BtnGeneralStyle BtnGeneralMStyle" id="common-dialog-button-search">Tìm kiếm</button>';
		html += '</div>';
		html += '<div class="Clear"></div>';
		html += '<p id="errMsgInfo" class="ErrorMsgStyle" style="display: none;"></p>';
		html += '<div class="GridSection" id="common-dialog-grid-container">';
		html += '<h2 class="Title2Style">Danh sách kết quả tìm kiếm</h2>';//Datpv4 thêm Danh sach tim kiem
		html += '<table id="common-dialog-grid-search"></table>';
		html += '</div>';
		html += '<div class="BtnCenterSection">';
		html += '<button id="common-dialog-button-save" class="BtnGeneralStyle">Chọn</button>';
		html += '<button class="BtnGeneralStyle BtnGeneralMStyle" onclick="$(\'#common-dialog-search-2-textbox\').dialog(\'close\');">Đóng</button>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		
		$('body').append(html);
		if(title==undefined){
			title = 'Thông tin tìm kiếm';
		}
		$('#common-dialog-search-2-textbox').dialog({
			title: (dialogInfo != null && dialogInfo != undefined && dialogInfo.title != null && dialogInfo.title != undefined) ? dialogInfo.title : title,
			width: (dialogInfo != null && dialogInfo != undefined && dialogInfo.width != null && dialogInfo.width != undefined) ? dialogInfo.width : 600, 
			height: (dialogInfo != null && dialogInfo != undefined && dialogInfo.height != null && dialogInfo.height != undefined) ? dialogInfo.width : 'auto',
			closed: false,
			cache: false,
			modal: true,
			onOpen: function() {
				if (inputs.length > 0) {
					$("#"+inputs[0].id).focus();
				}
				if(callbackOnShow != null && callbackOnShow != undefined) {
					callbackOnShow.call(this);
				}
				for(var i = 0; i < inputs.length; i++) {
					if(inputs[i].type != null && inputs[i].type != undefined && inputs[i].type == 'date') {
						VTUtilJS.applyDateTimePicker($('#common-dialog-search-2-textbox #'+inputs[i].id));
					}
				}
				
				$('#common-dialog-search-2-textbox #common-dialog-button-search').unbind('click');
				$('#common-dialog-search-2-textbox #common-dialog-button-search').bind('click', function() {
					if(searchCallback != null && searchCallback != undefined) {
						searchCallback.call(this);
					} else {
						$('#common-dialog-grid-search').datagrid('reload');
					}
				});
				$('#common-dialog-search-2-textbox input').unbind('keyup');
				$('#common-dialog-search-2-textbox input').bind('keyup', function(e) {	
					if(e.keyCode == ENTER) {
						$('#common-dialog-search-2-textbox #common-dialog-button-search').click();
					}
				});
				$('#common-dialog-search-2-textbox #common-dialog-button-save').unbind('click');
				$('#common-dialog-search-2-textbox #common-dialog-button-save').bind('click', function() {
					if(chooseCallback != null && chooseCallback != undefined) {
						chooseCallback.call(this, mapId.valArray);
					}
				});
				mapId = new Map();
				$('#common-dialog-grid-search').datagrid({
					url : url,
					//method : 'GET',
					autoRowHeight : true,
					rownumbers : true,
					checkOnSelect :true,
					pagination:true,
					rowNum : 10,
					pageSize : 10,
					scrollbarSize : 0,
					pageNumber:1,
					queryParams : {
						page:1
					},
					onBeforeLoad : function(param) {
						if(opts.param != null && opts.param != undefined) {
							for(var propt in opts.param){
								param[propt] = opts.param[propt];
							}
						}
						if(searchCallback == null || searchCallback == undefined) {
							if(params != null && params != undefined) {
								var keys = Object.keys(params);
								for(var i = 0; i < keys.length; i++) {
									param[keys[i]] = params[keys[i]];
								}
							}
							for(var i = 0; i < inputs.length; i++) {
								param[inputs[i].id] = $('#common-dialog-search-2-textbox #'+inputs[i].id).val().trim();
							}
							param = $.param(param, true);
						}
					},
					fitColumns:true,
					width : ($('#common-dialog-search-2-textbox').width() - 40),
					columns:columns,
					onCheck:function(idx,row){
						var __keys = Object.keys(row);
						var idName = 'id';
						if (pKeyMap != undefined && pKeyMap != null && pKeyMap.trim().length > 0) {
							idName = pKeyMap; 
						}
						idName = idName.toLowerCase();
						for(var i = 0; i < __keys.length; i++) {
							if(__keys[i].toLowerCase().indexOf(idName) != -1) {
								idName = __keys[i];
								break;
							}
						}
						mapId.put(row[idName], row);
					},
					onUncheck:function(idx,row){
						var __keys = Object.keys(row);
						var idName = 'id';
						if (pKeyMap != undefined && pKeyMap != null && pKeyMap.trim().length > 0) {
							idName = pKeyMap; 
						}
						idName = idName.toLowerCase();
						for(var i = 0; i < __keys.length; i++) {
							if(__keys[i].toLowerCase().indexOf(idName) != -1) {
								idName = __keys[i];
								break;
							}
						}
						mapId.remove(row[idName]);
					},
					onCheckAll:function(rows){
						if(rows.length == 0) {
							 return;
						}
						var __keys = Object.keys(rows[0]);
						var idName = 'id';
						if (pKeyMap != undefined && pKeyMap != null && pKeyMap.trim().length > 0) {
							idName = pKeyMap; 
						}
						idName = idName.toLowerCase();
						for(var i = 0; i < __keys.length; i++) {
							if(__keys[i].toLowerCase().indexOf(idName) != -1) {
								idName = __keys[i];
								break;
							}
						}
						for(var i = 0; i < rows.length; i++) {
							var row = rows[i];
							mapId.put(row[idName], row);
						}
					},
					onUncheckAll:function(rows){
						if(rows.length == 0) {
							 return;
						}
						var __keys = Object.keys(rows[0]);
						var idName = 'id';
						if (pKeyMap != undefined && pKeyMap != null && pKeyMap.trim().length > 0) {
							idName = pKeyMap; 
						}
						idName = idName.toLowerCase();
						for(var i = 0; i < __keys.length; i++) {
							if(__keys[i].toLowerCase().indexOf(idName) != -1) {
								idName = __keys[i];
								break;
							}
						}
						for(var i = 0; i < rows.length; i++) {
							var row = rows[i];
							mapId.remove(row[idName]);
						}
					},
					onLoadSuccess :function(data){
						if(($.isArray(data) && data.length != 0) || (data.rows != null && data.rows != undefined && $.isArray(data.rows) && data.rows.length != 0)) {
							var __keys = (data.rows == null || data.rows == undefined) ? Object.keys(data[0]) : Object.keys(data.rows[0]);
							var rows = (data.rows == null || data.rows == undefined) ? data : data.rows;
							var idName = 'id';
							if (pKeyMap != undefined && pKeyMap != null && pKeyMap.trim().length > 0) {
								idName = pKeyMap; 
							}
							idName = idName.toLowerCase();
							for(var i = 0; i < __keys.length; i++) {
								if(__keys[i].toLowerCase().indexOf(idName) != -1) {
									idName = __keys[i];
									break;
								}
							}
							var isCheckAll=true;
							for(var i = 0; i < rows.length; i++) {
								if(mapId.get(rows[i][idName])) {
									$('#common-dialog-grid-search').datagrid('checkRow', i);
								} else {
									 isCheckAll = false;
								}
							}
							if(isCheckAll) {
								$('#common-dialog-search-2-textbox .datagrid-header-row input[type=checkbox]').attr('checked', 'checked');
							} else {
								$('#common-dialog-search-2-textbox .datagrid-header-row input[type=checkbox]').attr('checked', false);
							}
						}
						
						$('#common-dialog-search-2-textbox .datagrid-header-rownumber').html('STT');
						if(isCenter == undefined || isCenter == false || isCenter == null) {
							var dHeight = $('#common-dialog-search-2-textbox').height();
							var wHeight = $(window).height();
							var ptop = (wHeight - dHeight) / 2 > 180 ? (wHeight - dHeight) / 2 - 180 : (wHeight - dHeight) / 2;
							$('#common-dialog-search-2-textbox').dialog('move', {top : ptop});
						}
					}
				});
			},
			onClose: function() {
				$('#common-dialog-search-2-textbox').remove(); 
			}
		});
	};
	
	/*
	 	VCommonJS.showDialogSearchTree({
		    inputs : [
		        {id:'code', maxlength:50, label:'Mã SP'},
		        {id:'name', maxlength:250, label:'Tên SP'}
		    ],
		    url : 'http://localhost:8080/rest/catalog/group-po/tree/2.json',
		    chooseCallback : function(node) {
		        console.log(node);
		    },
		    onShow : function() {
		    	console.log('OK');
		    },
		    searchCallback : null,
		    dialogInfo : null,
		    params : {
    		    id : 214
		    }
		});
	 * inputs : field dùng để định nghĩa các input search. nếu fieldColumns ko dc định nghĩa thì grid sẽ hiển thị dựa trên field này.
	 * dữ liệu đẩy lên server cũng có những field này.
	 * url : url để request đến server
	 * chooseCallback : callback khi chọn item
	 * searchCallback : nếu có hàm này thì sẽ gọi hàm này để search. nếu ko thì sẽ reload lại datagrid dựa trên những input field
	 * dialogInfo : một số thông tin thêm ví dụ như dialogInfo.title hay dialogInfo.width hay dialogInfo.height
	 * 
	 */
	var showDialogSearchTree  = function(opts) {
		var inputs = opts.inputs;
		var url = opts.url;
		var chooseCallback = opts.chooseCallback;
		var searchCallback = opts.searchCallback;
		var dialogInfo = opts.dialogInfo;
		var params = opts.params;
		var callbackOnShow = opts.onShow;
		var html = '<div id="common-dialog-search-tree" class="easyui-dialog">';
		html += '<div class="PopupContentMid2">';
		html += '<div class="GeneralForm Search1Form">';
		//html += '<h2 class="Title2Style">Thông tin tìm kiếm<img style="display:none;" id="loadingDialog" src="/resources/scripts/plugins/jquery-easyui-1.3.2/themes/default/images/loading.gif"></h2>';
		for(var i = 0; i < inputs.length; i++) {
			html += '<label id="label-'+inputs[i].id+'" class="LabelStyle Label1Style" style=" width: 100px;">'+inputs[i].label+'</label>';
			html += '<input id="'+inputs[i].id+'" maxlength="'+(isNullOrEmpty(inputs[i].maxlength) ? 250 : inputs[i].maxlength)+'" tabindex="'+i+1+'" type="text" style="width: '+(isNullOrEmpty(inputs[i].width) ? 145 : inputs[i].width)+'px;" value="'+(isNullOrEmpty(inputs[i].value) ? "" : inputs[i].value)+'" class="InputTextStyle InputText1Style"/>';
			if((i+1) % 2 ==0) {
				html += '<div class="Clear"></div>';
			}
		}
		html += '<div class="Clear"></div>';
		html += '<div class="BtnCenterSection">';
		html += '<button id="common-dialog-button-search" class="BtnGeneralStyle">Tìm kiếm</button>';
		html += '</div>';
		html += '<div class="Clear"></div>';
		html += '</div>';
		html += '<div class="GeneralForm Search1Form">';
		html += '<h2 class="Title2Style Title2MTStyle">Kết quả tìm kiếm</h2>';
		html += '<div  style="max-height:250px;overflow:auto;">';
		html += '<div class="ReportTreeSection" >';
		html += '<ul id="common-dialog-tree"></ul>';
		html += '</div>';
		html += '</div>';
		html += '<div class="Clear"></div>';
		html += '<div class="BtnCenterSection">';
		html += '<button class="BtnGeneralStyle" onclick="$(\'#common-dialog-search-tree\').dialog(\'close\');">Đóng</button>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		
		$('body').append(html);
		
		$('#common-dialog-search-tree').dialog({
			title: (dialogInfo != null && dialogInfo != undefined && dialogInfo.title != null && dialogInfo.title != undefined) ? dialogInfo.title : 'Thông tin tìm kiếm',
			width: (dialogInfo != null && dialogInfo != undefined && dialogInfo.width != null && dialogInfo.width != undefined) ? dialogInfo.width : 600, 
			height: (dialogInfo != null && dialogInfo != undefined && dialogInfo.height != null && dialogInfo.height != undefined) ? dialogInfo.height : 'auto',
			closed: false,  
			cache: false,
			modal: true,
			position: 'middle',
			center: true, 
			onOpen: function(){
				if(callbackOnShow != null && callbackOnShow != undefined) {
					callbackOnShow.call(this);
				}
				for(var i = 0; i < inputs.length; i++) {
					if(inputs[i].type != null && inputs[i].type != undefined && inputs[i].type == 'date') {
						VTUtilJS.applyDateTimePicker($('#common-dialog-search-tree #'+inputs[i].id));
					}
				}
				
				$('#common-dialog-search-tree #common-dialog-button-search').unbind('click');
				$('#common-dialog-search-tree #common-dialog-button-search').bind('click', function() {
				if(searchCallback != null && searchCallback != undefined) {
						searchCallback.call(this);
					} else {
						$('#common-dialog-tree').tree('reload');
					}
				});
				$('#common-dialog-tree').tree({
	        		url : url,
	        		method : 'GET',
	        		animate: true,
	        		onBeforeLoad:function(node,param){
	        			if(searchCallback == null || searchCallback == undefined) {
	        				if(params != null && params != undefined) {
								 var keys = Object.keys(params);
								 for(var i = 0; i < keys.length; i++) {
									 param[keys[i]] = params[keys[i]];
								 }
		        			}
							for(var i = 0; i < inputs.length; i++) {
								param[inputs[i].id] = $('#common-dialog-search-tree #'+inputs[i].id).val().trim();
							}
							param = $.param(param, true);
	        			}
	        		},
	        		onSelect:function(node) {
	        			if(chooseCallback != null && chooseCallback != undefined) {
	        				chooseCallback.call(this, node);
	        			}
	        		},
	        		onLoadSuccess:function(node,data){
	        			
	        		}
	        	});
	        },
	        onClose : function(){
	        	VCommonJS.chooseCallback = null;
				$('#common-dialog-search-tree').remove();
	        }
		});
	};
	
	var listNodeChoose = null;
	/*
	 	VCommonJS.showDialogSearchTreeWithCheckbox({
		    inputs : [
		        {id:'code', maxlength:50, label:'Mã SP'},
		        {id:'name', maxlength:250, label:'Tên SP'}
		    ],
		    url : 'http://localhost:8080/rest/catalog/group-po/tree/2.json',
		    chooseCallback : function(node) {
		        console.log(node);
		    },
		    onShow : function() {
		    	console.log('OK');
		    },
		    searchCallback : null,
		    dialogInfo : null,
		    params : {
    		    id : 214
		    }
		});	
	
	 * inputs : inputs dùng để định nghĩa các input search. nếu fieldColumns ko dc định nghĩa thì grid sẽ hiển thị dựa trên field này.
	 * dữ liệu đẩy lên server cũng có những field này.
	 * url : url để request đến server
	 * chooseCallback : callback khi chọn item
	 * searchCallback : nếu có hàm này thì sẽ gọi hàm này để search. nếu ko thì sẽ reload lại datagrid dựa trên những input field
	 * dialogInfo : một số thông tin thêm ví dụ như dialogInfo.title hay dialogInfo.width hay dialogInfo.height
	 * 
	 */
	var showDialogSearchTreeWithCheckbox  = function(opts) {
		var inputs = opts.inputs;
		var url = opts.url;
		var chooseCallback = opts.chooseCallback;
		var searchCallback = opts.searchCallback;
		var dialogInfo = opts.dialogInfo;
		var params = opts.params;
		var callbackOnShow = opts.onShow;
		var html = '<div id="common-dialog-search-tree" class="easyui-dialog">';
		html += '<div class="PopupContentMid2">';
		html += '<div class="GeneralForm Search1Form">';
		//html += '<h2 class="Title2Style">Thông tin tìm kiếm<img style="display:none;" id="loadingDialog" src="/resources/scripts/plugins/jquery-easyui-1.3.2/themes/default/images/loading.gif"></h2>';
		for(var i = 0; i < inputs.length; i++) {
			html += '<label id="label-'+inputs[i].id+'" class="LabelStyle Label1Style" style=" width: 100px;">'+inputs[i].label+'</label>';
			html += '<input id="'+inputs[i].id+'" maxlength="'+(isNullOrEmpty(inputs[i].maxlength) ? 250 : inputs[i].maxlength)+'" tabindex="'+i+1+'" type="text" style="width: '+(isNullOrEmpty(inputs[i].width) ? 145 : inputs[i].width)+'px;" value="'+(isNullOrEmpty(inputs[i].value) ? "" : inputs[i].value)+'" class="InputTextStyle InputText1Style"/>';
			if((i+1) % 2 ==0) {
				html += '<div class="Clear"></div>';
			}
		}
		html += '<div class="Clear"></div>';
		html += '<div class="BtnCenterSection">';
		html += '<button id="common-dialog-button-search" class="BtnGeneralStyle">Tìm kiếm</button>';
		html += '</div>';
		html += '<div class="Clear"></div>';
		html += '</div>';
		html += '<div class="GeneralForm Search1Form">';
		html += '<h2 class="Title2Style Title2MTStyle">Kết quả tìm kiếm</h2>';
		html += '<div  style="max-height:250px;overflow:auto;">';
		html += '<div class="ReportTreeSection" >';
		html += '<ul id="common-dialog-tree"></ul>';
		html += '</div>';
		html += '</div>';
		html += '<div class="Clear"></div>';
		html += '<div class="BtnCenterSection">';
		html += '<button id ="common-dialog-button-choose" class="BtnGeneralStyle BtnGeneralMStyle">Chọn</button>';
		html += '<button class="BtnGeneralStyle BtnGeneralMStyle" onclick="$(\'#common-dialog-search-tree\').dialog(\'close\');">Đóng</button>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		
		$('body').append(html);
		
		$('#common-dialog-search-tree').dialog({
			title: (dialogInfo != null && dialogInfo != undefined && dialogInfo.title != null && dialogInfo.title != undefined) ? dialogInfo.title : 'Thông tin tìm kiếm',
			width: (dialogInfo != null && dialogInfo != undefined && dialogInfo.width != null && dialogInfo.width != undefined) ? dialogInfo.width : 600, 
			height: (dialogInfo != null && dialogInfo != undefined && dialogInfo.height != null && dialogInfo.height != undefined) ? dialogInfo.height : 'auto',
			closed: false,  
			cache: false,
			modal: true,
			position: 'middle',
			center: true, 
			onOpen: function(){
				if(callbackOnShow != null && callbackOnShow != undefined) {
					callbackOnShow.call(this);
				}
				for(var i = 0; i < inputs.length; i++) {
					if(inputs[i].type != null && inputs[i].type != undefined && inputs[i].type == 'date') {
						VTUtilJS.applyDateTimePicker($('#common-dialog-search-tree #'+inputs[i].id));
					}
				}
				
				$('#common-dialog-search-tree #common-dialog-button-search').unbind('click');
				$('#common-dialog-search-tree #common-dialog-button-search').bind('click', function() {
					if(searchCallback != null && searchCallback != undefined) {
						searchCallback.call(this);
					} else {
						$('#common-dialog-tree').tree('reload');
					}
				});
				$('#common-dialog-search-tree #common-dialog-button-choose').unbind('click');
				$('#common-dialog-search-tree #common-dialog-button-choose').bind('click', function() {
					if(chooseCallback != null && chooseCallback != undefined) {
						chooseCallback.call(this, listNodeChoose);
					}
					$('#common-dialog-search-tree').dialog('close');
				});
				listNodeChoose = new Map();
				$('#common-dialog-tree').tree({
	        		url : url,
	        		method : 'GET',
	        		animate: true,
	        		checkbox : true,
	        		cascadeCheck : true,
	        		onBeforeLoad:function(node,param){
	        			if(searchCallback == null || searchCallback == undefined) {
	        				if(params != null && params != undefined) {
								 var keys = Object.keys(params);
								 for(var i = 0; i < keys.length; i++) {
									 param[keys[i]] = params[keys[i]];
								 }
		        			}
							for(var i = 0; i < inputs.length; i++) {
								param[inputs[i].id] = $('#common-dialog-search-tree #'+inputs[i].id).val().trim();
							}
							param = $.param(param, true);
	        			}
	        		},
	        		onCheck : function(node, checked) {
        				var __keys = Object.keys(node);
						var idName = 'id';
						for(var i = 0; i < __keys.length; i++) {
							if(__keys[i].toLowerCase().indexOf('id') != -1) {
								idName = __keys[i];
								break;
							}
						}
						if(checked) {
							//listNodeChoose.put(node[idName], node);
							var nodes = $('#common-dialog-search-tree #common-dialog-tree').tree('getChecked');
							for(var i = 0; i < nodes.length; i++) {
								var n = nodes[i];
								listNodeChoose.put(n[idName], n);
							}
						} else {
							//listNodeChoose.remove(node[idName]);
							var nodes = $('#common-dialog-search-tree #common-dialog-tree').tree('getChecked', 'unchecked');
							for(var i = 0; i < nodes.length; i++) {
								var n = nodes[i];
								listNodeChoose.remove(n[idName]);
							}
						}
	        		},
	        		onLoadSuccess:function(node,data){
	        			var arr  = listNodeChoose.keyArray;
	                	if(arr.length > 0){
	                		for(var i = 0;i < arr.length; i++){
	                			var n = $('#common-dialog-tree').tree('find', arr[i]);
	                			if(n != null){
	                				$('#common-dialog-tree').tree('check',n.target);
	                			}
	                		}
	                	}
	        		}
	        	});
	        },
	        onClose : function(){
	        	VCommonJS.chooseCallback = null;
				$('#common-dialog-search-tree').remove();
	        }
		});
	};
	
	return {
		showDialogSearchTree : showDialogSearchTree,
		showDialogSearchTreeWithCheckbox : showDialogSearchTreeWithCheckbox,
		showDialogSearch2 : showDialogSearch2,
		showDialogSearch2WithCheckbox : showDialogSearch2WithCheckbox,
		showDialogList: showDialogList
	};
})($);