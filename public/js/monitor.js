(function() {
	$('#title').html(COMMON.title);
	var animes = ["fadeOut", "fadeOutDown", "fadeOutRight", "zoomOutDown", "zoomOutUp", "slideOutDown", "slideOutUp", "rotateOutDownRight", "rotateOutUpLeft"]
	var chartAnimations = ['bounce', 'rubberBand', 'shake', 'jello', 'tada', 'wobble',];
	$.fn.extend({
	    animateCss: function (animationName) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        this.addClass('animated ' + animationName).one(animationEnd, function() {
	            $(this).removeClass('animated ' + animationName);
	        });
	        return this;
	    }
	});
	var speakerId = "";
	var nameEnabled = true;
	
	var ctx = $("#mycanvas");
	var myChart = new Chart(ctx, {
    type: 'polarArea',
	data: {
      label: COMMON.title,
      labels: COMMON.getCategoryNames(),
      
      datasets: [{
      	data: [0, 0, 0, 0],
      	backgroundColor:["#3399FF","#FFCC33","#FF3333","#66CC66"],
      }]
    },
    options: {
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50
            }
        },
        scales: {
            yAxes: [{
            	display:false,
                ticks: {
                    beginAtZero:false
                }
            }],
            xAxes: [{
            	display:false,
                ticks: {
                    beginAtZero:false
                }
            }],
        },
        gridLines: {
        	display:false,
        	drawOnChartArea:false,
        	drawBorder:false,
        	drawTicks:false,
        },
        
        ticks: {
        	display:false
        },
        legend: {
        	display:true
        },
        animation: {
            easing :"easeInCubic"
        }
    }
});
	
var getData = function() {
	$.get(COMMON.getUrl() + "/api/monitor", function(data) {
			speakerId = data.speakerId;
			var speaker = COMMON.getSpeaker(speakerId);
			var speakerName = speaker.name;
			var title = speaker.title;
			var speakerEnabled = speakerId != "";
			if (!speakerEnabled) {
				speakerName = "---";
				title = "---";
			} 
			$("#speaker").text(speakerName);
			$("#speakerTitle").text(title);

				$(".reaction").remove();
			
				var els = data.monitor;
				if (els.length == 0) {
					myChart.data.datasets[0].data = [0,0,0,0];
					myChart.update();
				} else {
				
					ctx.removeClass("animated");
					ctx.removeClass("shake");
					var diffSum = 0;
					els.forEach(function(data) {
						var value = data.id;
						var count = data.count;
						var index = COMMON.getCategoryIndex(value);
						if (index != null) {
							var previous = myChart.data.datasets[0].data[index];
							var diff = count - previous;
							diffSum = diffSum + diff;
							if (diff > 0) {
								var text = myChart.data.labels[index];
								var color = myChart.data.datasets[0].backgroundColor[index];
								for (var i = 0; i < diff; i++) {
									var animation = animes[Math.floor(Math.random() * animes.length)];
									var textTag = $(('<div class="reaction animated">'+text+'</div>'));
									textTag.addClass(animation);
									textTag.css({"color":color})
									$("#canvas").append(textTag);
								}
							}
							myChart.data.datasets[0].data[index] = count;
							myChart.update();
						}
					});
					if (diffSum > 0) {
						var chartAnimation = chartAnimations[Math.floor(Math.random() * chartAnimations.length)];
						ctx.animateCss(chartAnimation);
					}
				}
			}
		);
	};
	getData();
	setInterval(getData, COMMON.interval);
	
})();