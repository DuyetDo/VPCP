var $GO = go.GraphObject.make;

var graphData;

var graphConfig = {
	angle : 0
}

// common config info
var nodeConfig = {
	width : 160,
	height : 70,
	background : null,
	stroke : "black",
	strokeWidth : 0,
	layout : "Horizontal", // Horizontal or Vertical
	isShowDeptname : true,
	avatar : {
		// image avatar
		shape : "RoundedRectangle",
		width : 60,
		height : 60,
		margin : 5,
		background : "white"
	},
	// text1
	text1 : {
		margin : 10,
		font : "bold 16px sans-serif",
		stroke : "black",
	},
	// text2
	text2 : {
		margin : 0,
		font : "bold 16px sans-serif",
		stroke : "black",
	}
};

var linkConfig = {
	routing : go.Link.Orthogonal
}

function validateStr(str) {
	var result;
	if (str != null && str.length > 0) {
		result = true;
	} else {
		result = false;
	}
	return result;
}

function validateUndefined(value) {
	var result;
	if (typeof (value) !== "undefined") {
		result = true;
	} else {
		result = false;
	}
	return result;
}

function loadLinkRouting(value) {
	var routing;
	switch (value) {
	case "Bezier":
		routing = go.Link.Bezier;
		break;
	case "Orthogonal":
		routing = go.Link.Orthogonal;
		break;
	case "AvoidsNodes":
		routing = go.Link.AvoidsNodes;
		break;
	default:
		routing = go.Link.Normal;
	}
	return routing;
}

function loadVofficeConfig(config) {
	page.config = config;
	if (config[10] /* 10: document flow graph */) {
		var docFlowCfg = config[10];
		if (validateUndefined(docFlowCfg.ANGLE)) {
			graphConfig.angle = docFlowCfg.ANGLE
		}
		if (validateUndefined(docFlowCfg.IS_SHOW_DEPTNAME)) {
			nodeConfig.isShowDeptname = docFlowCfg.IS_SHOW_DEPTNAME;
		}
		if (validateUndefined(docFlowCfg.NODE_LAYOUT)) {
			nodeConfig.layout = docFlowCfg.NODE_LAYOUT;
		}
		if (validateUndefined(docFlowCfg.NODE_BACKGROUND)) {
			nodeConfig.background = docFlowCfg.NODE_BACKGROUND;
		}
		if (validateUndefined(docFlowCfg.AVATAR_BACKGROUND)) {
			nodeConfig.avatar.background = docFlowCfg.AVATAR_BACKGROUND;
		}
		if (validateUndefined(docFlowCfg.AVATAR_MARGIN)) {
			nodeConfig.avatar.margin = docFlowCfg.AVATAR_MARGIN;
		}
		if (validateUndefined(docFlowCfg.AVATAR_SHAPE)) {
			nodeConfig.avatar.shape = docFlowCfg.AVATAR_SHAPE;
		}
		if (validateUndefined(docFlowCfg.TEXT1_STYLE)) {
			nodeConfig.text1.font = docFlowCfg.TEXT1_STYLE;
		}
		if (validateUndefined(docFlowCfg.TEXT2_STYLE)) {
			nodeConfig.text2.font = docFlowCfg.TEXT2_STYLE;
		}
		if (validateUndefined(docFlowCfg.LINK_STYLE)) {
			linkConfig.routing = loadLinkRouting(docFlowCfg.LINK_STYLE);
		}
	}
}

function initNodeTemplate(nodeCfg, defaultText, fieldBindingText,
		fieldBindingText2) {
	var node = $GO(go.Node, nodeCfg.layout, {
		background : null
	});

	var avataPanel = $GO(go.Panel, "Auto");

	var shapeStatus = $GO(go.Shape, {
		width : nodeConfig.avatar.width + nodeCfg.avatar.margin,
		height : nodeConfig.avatar.height + nodeCfg.avatar.margin,
		figure : nodeConfig.avatar.shape,
		fill : "yellow"
	}, new go.Binding("fill", "color"));

	var panelText = $GO(go.Panel, "Vertical", {/* config */});

	var userText = $GO(go.TextBlock, defaultText, {
		margin : nodeCfg.text1.margin,
		stroke : nodeCfg.text1.stroke,
		font : nodeCfg.text1.font
	}, new go.Binding("text", fieldBindingText));
	panelText.add(userText);

	if (nodeConfig.isShowDeptname) {
		var deptText = $GO(go.TextBlock, defaultText, {
			margin : nodeCfg.text2.margin,
			stroke : nodeCfg.text2.stroke,
			font : nodeCfg.text2.font
		}, new go.Binding("text", fieldBindingText2));
		panelText.add(deptText);
	}

	var icon = $GO(go.Picture, {
		margin : nodeCfg.avatar.margin,
		width : nodeCfg.avatar.width,
		height : nodeCfg.avatar.height,
		background : null
	}, new go.Binding("source"));

	avataPanel.add(shapeStatus)
	avataPanel.add(icon)
	node.add(avataPanel);
	node.add(panelText);

	return node;
}

function initLinkTemplate() {
	return $GO(go.Link, {
		routing : linkConfig.routing
	}, $GO(go.Shape, {
		stroke : "black"
	}, new go.Binding("stroke", "color")), $GO(go.Shape, {
		toArrow : "Standard",
		stroke : "black"
	}, new go.Binding("stroke", "color")));
}

/**
 * 
 * @param {String}
 *            divId = "myDiagram"
 * @returns {undefined}
 */
function initGraph(divId, nodes, links) {
	var $GO = go.GraphObject.make;
	// for conciseness in defining templates
	graphData = {};
	graphData.nodeDataArray = nodes;
	graphData.linkDataArray = links;
	myDiagram = $GO(go.Diagram, divId, {
		initialContentAlignment : go.Spot.Center,
		layout : $GO(go.TreeLayout, {
			comparer : go.LayoutVertex.smartComparer
		})
	});

	// generate a tree with the default values
	rebuildGraph();
}

function rebuildGraph() {
	// define the Node template
	myDiagram.nodeTemplate = initNodeTemplate(nodeConfig, "", "nodeName",
			"deptName");

	// define the Link template
	myDiagram.linkTemplate = initLinkTemplate();

	// create and assign a new model
	myDiagram.model = new go.GraphLinksModel(graphData.nodeDataArray,
			graphData.linkDataArray);

	// update the diagram layout customized by the various control values
	reloadLayout();
}

// Update the layout from the controls, and then perform the layout again
function reloadLayout() {
	myDiagram.startTransaction("change Layout");
	var lay = myDiagram.layout;

	lay.treeStyle = go.TreeLayout.StyleLayered;
	lay.layerStyle = go.TreeLayout.LayerIndividual;
	lay.angle = graphConfig.angle; // 0, 90, 180, 270
	lay.alignment = go.TreeLayout.AlignmentCenterChildren;
	lay.nodeSpacing = 20;
	lay.layerSpacing = 50;

	myDiagram.commitTransaction("change Layout");
}

function getRadioValue(name) {
	var radio = document.getElementsByName(name);
	for (var i = 0; i < radio.length; i++)
		if (radio[i].checked)
			return radio[i].value;
}

function setRadioValue(name, value) {
	var radio = document.getElementsByName(name);
	for (var i = 0; i < radio.length; i++) {
		if (value == radio[i].value) {
			radio[i].checked = true;
			return;
		}
	}
}

function setValueForRadioGroup(radioGroup, value) {
	var items = radioGroup.getItems();
	var item;
	for (var i = 0; i < items.length; i++) {
		item = items[i];
		if (item._value == value) {
			radioGroup.getItemAtIndex(i).setSelected(true);
		}
	}
}