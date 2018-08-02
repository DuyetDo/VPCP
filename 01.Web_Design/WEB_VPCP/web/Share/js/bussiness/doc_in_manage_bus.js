function initFirtByDocInSearch () {
	if ($('.css-full-search-groupbox').length > 0) {
		$('.css-full-search-groupbox').bind('keyup',function(event){
			if(event.keyCode == keyCodes.ENTER){
				$(zk.Widget.$("$btnSearch")._node).click(); 
			}
		});
	}
	if ($('#searchFullText').length > 0) {
		$('#searchFullText').bind('keyup', function(event) {
			if(event.keyCode == keyCodes.ENTER){
				toolBarSearch();
			}
		});
	}
	$('.vinput-number').each(function() {
	  VTUtilJS.bindFormatOnTextfield($(this), VTUtilJS._TF_NUMBER);
	});
}

function selectedIndexLbxYearBySearch (index) {
	var indexSl = 0;
	if (!isNaN(isNaN(Number(index)))) {
		indexSl = Number(index);
	}
	if ($('#lbxYearBySearch').length > 0) {
		$('#lbxYearBySearch').prop('selectedIndex', indexSl);
	}	
}


/**
 * Xu ly hien thi cho cac doi tuong chua class css-visible-for-onchange-obj
 * 
 * @author hunglm16
 * @param flag
 * @returns
 * @since 18/05/2016
 */
function cssVisibleForOnchangeObj (flag) {
	if (flag == undefined || flag == false || !flag) {
		$('.css-visible-for-onchange-obj').hide();
	} else {
		$('.css-visible-for-onchange-obj').show();
		$('.css-visible-for-onchange-obj').prop('style', '');
	}
}

/**
* Xu ly an hien sau su kien onChange cua txtDocCode 
* 
* @author hunglm16
*/
function hideSaveTbxDocCodeCallBack (flag) {
	$('.hideSaveTbxDocCode').hide();
	if (flag == undefined || flag == false || isNaN(flag) || Number(flag) <= 0) {
		return;
	}
	if (Number(flag) == 1) {
		//Xu ly nghiep vu onSave
		$('.hideSaveTbxDocCode').show();
	} 
};
/**
* Chac chan rang khong con messagebox thong bao nua
* 
* @author hunglm16
*/
function removeMessageboxWindowCallBack () {
	$('.z-window-modal').remove();
	$('.z-messagebox-window').remove();
	$('.z-modal-mask').remove();
}

function yearBySearchToolbarDocumnetChange () {
	var text = $(zk.Widget.$("$tbxFullSearch")._node).val();
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
    var wgt = zk.Widget.$("$mainWnd");
    zAu.send(new zk.Event(wgt, 'onYearBySearchToolbarDocumnetChange', {'': data}));
}

/**
 * Them gia tri cho combobox Nam tim kiem nhanh
 * 
 * @author hunglm16
 * @param data
 * 
 */
function lbxYearBySearchModelCallback (data) {
	if (data != null && data != undefined && data.length > 0) {
		var lbxYearBySearch = $('#lbxYearBySearch');
		if (lbxYearBySearch != null && lbxYearBySearch != undefined) {
    		for (var i = 0, size = data.length; i < size; i++) {
    			$(lbxYearBySearch).append('<option value="'+data[i]+'">'+data[i]+'</option>');
    		}
		}
	} else {
		$('#divLbxYearBySearch').hide();
	}
	//Xu ly su kien Enter
	
}