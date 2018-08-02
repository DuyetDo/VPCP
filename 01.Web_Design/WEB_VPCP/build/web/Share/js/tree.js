/**
 * hoangnv28
 */
// item da duoc chon truoc khi xay ra su kien onSelect moi
var oldSelectedItems = null;

/**
 * ham lua chon item tree
 * 
 * @param tree
 * @param flag,
 *            1: lua chon 1 item
 */
function onSelectTree(tree, flag) {
	// items duoc chon tai thoi diem hien tai
	var currentSelectedItems = tree.getSelectedItems();
	var newSelectedItems; // item vua duoc chon
	var deselectedItems; // item vua duoc huy chon
	if (oldSelectedItems != null && oldSelectedItems.length > 0) {
		deselectedItems = oldSelectedItems.slice(0);
		removeAll(deselectedItems, currentSelectedItems);
		newSelectedItems = currentSelectedItems.slice(0);
		removeAll(newSelectedItems, oldSelectedItems);
	} else {
		newSelectedItems = currentSelectedItems.slice(0);
	}
	if (flag == undefined || flag != 1) {
		// Deselect item cung deselect tat ca item con chau (neu co)
		if (deselectedItems != undefined && deselectedItems != null
				&& deselectedItems.length > 0) {
			for (var i = 0; i < deselectedItems.length; i++) {
				doSelectDeselectAll(deselectedItems[i], false, flag);
			}
		}

		// selectItem thi cung select tat ca item con chau (neu co)
		if (newSelectedItems.length > 0) {
			for (var i = 0; i < newSelectedItems.length; i++) {
				doSelectDeselectAll(newSelectedItems[i], true, flag);
			}
		}
	}

	oldSelectedItems = tree.getSelectedItems();
}

function removeAll(sourceArr, removedArr) {
	var index;
	for (var i = 0; i < removedArr.length; i++) {
		index = sourceArr.indexOf(removedArr[i]);
		if (index > -1) {
			sourceArr.splice(index, 1);
		}
	}
}

function doSelectDeselectAll(treeitem, selected, flag) {
	if (treeitem != null) {
		if (!treeitem.isDisabled()) {
			treeitem.setSelected(selected);
			treeitem.fire("onSelect");
		}
		if (flag == undefined || flag != 1) {
			var treechildren = treeitem.treechildren;
			if (treechildren != null) {
				var items = treechildren.getItems();
				for (var i = 0; i < items.length; i++) {
					doSelectDeselectAll(items[i], selected);
				}
			}
		}
	}
}

/**
 * quangvv4: chỉ chọn 1 item
 * 
 * @param tree
 */
function onSelectTreeOne(tree) {
	// items duoc chon tai thoi diem hien tai
	var currentSelectedItems = tree.getSelectedItems();
	var newSelectedItems; // item vua duoc chon
	var deselectedItems; // item vua duoc huy chon
	if (oldSelectedItems != null && oldSelectedItems.length > 0) {
		deselectedItems = oldSelectedItems.slice(0);
		removeAll(deselectedItems, currentSelectedItems);
		newSelectedItems = currentSelectedItems.slice(0);
		removeAll(newSelectedItems, oldSelectedItems);
	} else {
		newSelectedItems = currentSelectedItems.slice(0);
	}
	oldSelectedItems = tree.getSelectedItems();
}