var jqDocOutManager = {
	docAssignAndPublishKeycode: function () {
		$('.contentDivCreate').bind('keyup', function(event){                    
		    if(event.keyCode == 119) {//F8
		    	$('#'+ zk.Widget.$('$btnSaveAndCopy').uuid).click();
		    } else if(event.keyCode == 118) {//F7
		    	$('#'+ zk.Widget.$('$btnSaveAndClose').uuid).click();
		    } else if(event.keyCode == 117) {//F6                        
		    	$('#'+ zk.Widget.$('$btnSave').uuid).click();
		    }
		});
	}
};
