var VitxUtils = {
	_TF_A_Z: 1,
	_TF_NUMBER: 2,
	_TF_NUMBER_DOT: 3,
	_TF_NUMBER_COMMA: 4,
	_TF_NUMBER_SIGN: 5,
	_TF_BAN_CHAR: 6,
	_TF_NUMBER_CONVFACT: 7,
	_TF_NUMBER_COMMA_AND_DOT: 8,
	_DATE_DD_MM_YYYY: 9,
	_DATE_MM_YYYY:10,
	_TF_CAR_NUMBER: 11,
	NOT_EXPORT: 0,
	EXPORT_EXCEL: 1,
	EXPORT_PDF: 2,
	EXPORT_WORD: 4,
	EXPORT_POI_EXCEL: 3,
	/**
	* Encodes the basic 4 characters used to malform HTML in XSS hacks
	* 
	* @author hunglm16
	* @since 06/04/2016
	*/
	XSSEncode : function(s, en) {
		if (!VitxUtils.isNullOrEmpty(s)) {
			s = s.toString();
		}
		if (!VitxUtils.isNullOrEmpty(s)) {
			en = en || true;
			s = s.replace(/&/g,"&amp;");
			if (en) {
				s = s.replace(/'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/"/g,"&quot;");
				s = s.replace(/</g,"&lt;");
				s = s.replace(/>/g,"&gt;");
			} else {
				s = s.replace(/'/g,'&#39;'); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/"/g,"&#34;");
				s = s.replace(/</g,"&#60;");
				s = s.replace(/>/g,"&#62;");
			}
			return s;
		} else {
			return "";
		}
	},
	
	/**
	 * Kiem tra Null hoac Rong
	 * 
	 * @author hunglm16
	 * @since 15/04/2016
	 */
	isNullOrEmpty: function (value) {
		if (value != undefined && value!= null && !isNaN(value)) {
			value = new String(value);
		}
		if (value == undefined || value == null || value == 'null' || value.trim()=='' || value.trim().length == 0) {
			return true;
		}
		return false;
	},
	
	/**
	 * Kiem tra kieu date
	 * 
	 * @author hunglm16
	 * @since 15/04/2016
	 */
	isDate: function(txtDate, separator) {
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
	}
};

var MaskManager= {
	maskDate: function(selector){
		$(selector).mask("99/99/9999");
	},
	maskMonth: function(selector){
		$(selector).mask("99/9999");
	}	
};

function applyMonthPicker(selector) {
	var date = new Date();
	var cYear = date.getFullYear();
	var options = {
	    selectedYear: cYear,
	    startYear: cYear - 3,
	    finalYear: cYear + 7,
	    openOnFocus: true,
	    monthNames: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
	    //monthNames: [jsp_common_thang_mot, jsp_common_thang_hai, jsp_common_thang_ba, jsp_common_thang_bon, jsp_common_thang_nam, jsp_common_thang_sau, jsp_common_thang_bay, jsp_common_thang_tam, jsp_common_thang_chin, jsp_common_thang_muoi, jsp_common_thang_muoimot, jsp_common_thang_muoihai]
	};
	
	var addHtml = '<a href="javascript:void(0);" class="CalendarLink"><img src="/resources/images/icon_calendar.jpg" width="15" height="16" /></a>';
	$('#'+selector).after(addHtml);
	$('#'+selector).monthpicker(options);
	$('#'+selector).monthpicker().bind('monthpicker-change-year', function (e, year) {
	});
	$('#'+selector).next().bind('click', function () {
		$('#'+selector).monthpicker('show');
	});
};

function setDateTimePicker(id, prefix, onlyMonthCurrent){
	// $('#' +id).attr('readonly','readonly');
	var prefixTmp ='';
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	if(onlyMonthCurrent) {
		applyDateTimePicker(prefixTmp+'#' + id, null, null, null, null, null, null, null, null,null,true);
	} else{
		applyDateTimePicker(prefixTmp+'#' + id);
	}
//	$(prefixTmp+'#' + id).keypress(function(event){
//		var keycode = (event.keyCode ? event.keyCode : event.which);
//		if (keycode == keyCodes.BACK_SPACE || keycode == keyCodes.DELETE) {
//			$(this).val('');
//			$(this).focus();
//		}
//	});
}

function applyDateTimePicker (selector, dateFormat, hideYear, memuMonthShow, menuYearShow, yearRangeFlag, showFocus, timeShow, yearRangeFuture, monthYearShow, onlyMonthCurrent, onSelectCallback) {
	var format = "dd/mm/yy";
	if (dateFormat != null) {
		format = dateFormat;		
	}
	if(monthYearShow != null){
		MaskManager.maskMonth(selector);
	}else{
		MaskManager.maskDate(selector);
	}
	var menuMonth = false;
	if (memuMonthShow != null) {
		menuMonth = memuMonthShow;
	}
	var menuYear = false;
	if (menuYearShow != null) {
		menuYear = menuYearShow;
	}
	var minDate = null;
	var maxDate = null;
	if (hideYear != null && hideYear == true) {
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
		}else{
			yearRange = f+":"+t;
		}
		
		
	}
	var showOn = 'button';
	if (showFocus != null && showFocus == true) {
		showOn = 'focus';
	}
	if (!timeShow)
	{
		$(selector).datepicker({
				monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
				monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
//				monthNames: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
//				monthNamesShort: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
				dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
//				dayNamesMin: [msgCN, msgThu2, msgThu3, msgThu4, msgThu5, msgThu6, msgThu7],
				showOn: showOn,
				dateFormat: format,
				buttonImage: '/Share/img/icon_calendar.jpg',
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
				},
				onSelect: function(data) {
					if (onSelectCallback != undefined && onSelectCallback != null) {
						onSelectCallback.call(this, data);
					}					
				}
			}
		);
	}
}

/**
 * Ham xu ly sau khi goi xuat bao cao
 * 
 * @author hunglm16
 * @param data
 * @since 15/04/2016
 */
function callbackExportUtils (data) {
	if (data != null && data != undefined) {
		$('#errorId').html(data).change().show();
	}
};

function callConponentPageReport (url) {
	if (url == null || url == undefined) {
		return;
	}
	var param = {
			url: url
	};
	var wgt = zk.Widget.$("$wd_report_manage");
	zAu.send(new zk.Event(wgt, 'onLoadConponentPageReport', {'':param}));
}

/**
 * Khoi tao cay bao cao
 * 
 * @author hunglm16
 * @param data
 * @since 19/04/2016
 */
function callbackCreateTreeReport (data) {
	if (data != null && data != undefined) {
		$('#tree').tree({
			data: data,
			animate: true,
			lines: true,
			formatter: function(node) {
				return VitxUtils.XSSEncode(node.text);
			},
			onBeforeLoad: function(n, p){
				
			},
			onClick: function(node){
				callConponentPageReport(node.url);
			},
			onDblClick: function(node) {
				//Hien thi page.Zul tuong ung
//				console.log(node);
				//callConponentPageReport();
			}
		});
	}
}

