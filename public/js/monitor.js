(function() {
	var getUrl = function() {
		return location.protocol + "//" + location.host;
	}
	var title = "";
	var categoryNames = [];
	var categoryIds = {};
	var speakers = {};
	var init = function() {
		$.get(getUrl() + "/api/config", function(data) {
			title = data.title;
			$.each(data.category, function(index, category) {
				categoryNames.push(category.name);
				categoryIds[category.id] = index;
			});
			$.each(data.speaker, function(index, speaker) {
				speakers[speaker.id] = speaker;
			});
		});
	};
	init();

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
      label: title,
      labels:categoryNames,
      
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
	$.get(getUrl() + "/api/monitor", function(data) {
			// REMIND vote.jsと重複
			speakerId = data.speakerId;
			var speaker = speakers[speakerId];
			var speakerName = speaker.name;
			var title = speaker.title;
			var speakerEnabled = speakerId != "";
			if (!speakerEnabled) {
				speakerName = "---";
				title = "---";
			} 
			$(".button").prop("disabled", !nameEnabled || !speakerEnabled);
			$("#speaker").text(speakerName);
			$("#title").text(title);

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
						var index = categoryIds[value];
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
								myChart.data.datasets[0].data[index] = count;
								myChart.update();
							}
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
	setInterval(getData, 1000);
	
})();