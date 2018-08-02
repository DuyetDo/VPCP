var VitxPieChart = {
	showViewPieChart: function() {
		var myVarTimeOut = setTimeout(function(){
			$.resize.throttleWindow = false;
			var placeholder = $('#piechart-placeholder');
			var data = VitxPieChart.createDataDocIn();
			VitxPieChart.drawPieChart(placeholder, data);
			placeholder.data('chart', data);
			placeholder.data('draw', VitxPieChart.drawPieChart);
			var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
			var previousPoint = null;
			// Show tooltip when hover plot
			placeholder.on('plothover', function (event, pos, item) {
				if(item) {
					if (previousPoint != item.seriesIndex) {
						previousPoint = item.seriesIndex;
						var tip = item.series['label'] + " : " + Math.round(item.series['percent'],2) +'%';
						$tooltip.show().children(0).text(tip);
					}
					$tooltip.css({top:pos.pageY + 10, left:pos.pageX + 10});
				} else {
					$tooltip.hide();
					previousPoint = null;
				}
			});
			clearTimeout(myVarTimeOut);
		}, 1250);
	},
	createDataDocIn: function() {
		//Van ban cho xu ly
		var choXuLy = {};
		choXuLy.label = "Chờ xử lý";//"Pending";
		var cxlNumber = $('#waitingProcessDocIn').html().trim();
		if (cxlNumber != null && cxlNumber != undefined && !isNaN(cxlNumber)) {
			choXuLy.data = Number(cxlNumber);
		} else {
			choXuLy.data = 0;
		}
		choXuLy.color = "#68BC31";
		//Van ban dang xu ly
		var dangXuLy = {};
		dangXuLy.label = "Đang xử lý";//"Processing";//"Đang xử lý";
		var dxlNumber = $('#processingDocIn').html().trim();
		if (dxlNumber != null && dxlNumber != undefined && !isNaN(dxlNumber)) {
			dangXuLy.data = Number(dxlNumber);
		} else {
			dangXuLy.data = 0;
		}
		dangXuLy.color = "#2091CF";
		var qhcht = {};
		qhcht.label = "Đã xử lý";//"Out of date and unfinished";//"Quá hạn chưa hoàn thành";
		var qhchtNumber = $('#expiredDocIn').html().trim();
		if (qhchtNumber != null && qhchtNumber != undefined && !isNaN(qhchtNumber)) {
			qhcht.data = Number(qhchtNumber);
		} else {
			qhcht.data = 0;
		}
		qhcht.color = "#AF4E96";
		var data = [choXuLy, dangXuLy, qhcht];
		return data;
	},
	createDataDocOut: function() {
		//Van ban cho xu ly
		var choXuLy = {};
		choXuLy.label = "Chờ xử lý";//"Pending";//"Chờ xử lý";
		var cxlNumber = $('#waitingProcessDocOut').html().trim();
		if (cxlNumber != null && cxlNumber != undefined && !isNaN(cxlNumber)) {
			choXuLy.data = Number(cxlNumber);
		} else {
			choXuLy.data = 0;
		}
		choXuLy.color = "#68BC31";
		//Van ban dang xu ly
		var dangXuLy = {};
		dangXuLy.label ="Dự thảo";//"Draft";//"Dự thảo";
		var dxlNumber = $('#lbDocOutInWeek').html().trim();
		if (dxlNumber != null && dxlNumber != undefined && !isNaN(dxlNumber)) {
			dangXuLy.data = Number(dxlNumber);
		} else {
			dangXuLy.data = 0;
		}
		dangXuLy.color = "#FF3366";
		var qhcht = {};
		qhcht.label = "Ban hành";//"Publish";//"Ban hành";
		var qhchtNumber = $('#lbDocOutPublish').html().trim();
		if (qhchtNumber != null && qhchtNumber != undefined && !isNaN(qhchtNumber)) {
			qhcht.data = Number(qhchtNumber);
		} else {
			qhcht.data = 0;
		}
		qhcht.color = "#CC33FF";
		var data = [choXuLy, dangXuLy, qhcht];
		return data;
	},
	drawPieChart: function(placeholder, data, position) {
		$.plot(placeholder, data, {
			series: {
				pie: {
					show: true,
					tilt:0.8,
					highlight: {
						opacity: 0.25
					},
					stroke: {
						color: '#fff',
						width: 2
					},
					startAngle: 2
				}
			},
			legend: {
				show: true,
				position: position || "ne", 
				labelBoxBorderColor: null,
				margin:[-30,15]
			}
			,
			grid: {
				hoverable: true,
				clickable: true
			}
		 })
	},
	selectPiechart: function(txt, flag) {
		if (txt == undefined && txt == null) {
			return;
		}
		if (flag == undefined || flag == null) {
			flag = 0;
		}
		$('.btn-hunglm16-piechart').each(function() {
		  $(this).removeClass('btn-primary');
		});
		$(txt).addClass('btn-primary');
		
		if (flag > 0) {
			//Xu ly khoi tao PieChart
			VitxPieChart.showPieChartByFlag (flag);
		}
	},
	showPieChartByFlag: function (flag) {
		if (flag == undefined || flag == null) {
			return;
		}
		$('#widgetMainPiechartHome').html('<div id="piechart-placeholder" style="width:90%; min-height:150px;"></div>').change().show();
		$.resize.throttleWindow = false;
		var placeholder = $('#piechart-placeholder');
		var data = [];
		if (flag == 1) {
			//Van ban den
			data = VitxPieChart.createDataDocIn();
		} else if (flag == 2) {
			//Van ban di
			data = VitxPieChart.createDataDocOut();
		} 
		VitxPieChart.drawPieChart(placeholder, data);
		placeholder.data('chart', data);
		placeholder.data('draw', VitxPieChart.drawPieChart);
		
		var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
		var previousPoint = null;
		// Show tooltip when hover plot
		placeholder.on('plothover', function (event, pos, item) {
			if(item) {
				if (previousPoint != item.seriesIndex) {
					previousPoint = item.seriesIndex;
					var tip = item.series['label'] + " : " + Math.round(item.series['percent'],2)+'%';
					$tooltip.show().children(0).text(tip);
				}
				$tooltip.css({top:pos.pageY + 10, left:pos.pageX + 10});
			} else {
				$tooltip.hide();
				previousPoint = null;
			}
		});
	}
}

