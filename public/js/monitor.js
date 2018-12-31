

(function() {
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
      label: "SUMMER JIMAN JAM 2017",
      labels:["カイゼン！", "つながるー！", "あついっ！", "JIMAN！"],
      
      
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
                	//suggestedMin: 0,
                	//suggestedMax: 64,
                    beginAtZero:false
                }
            }],
            xAxes: [{
            	display:false,
                ticks: {
                	//suggestedMin: 50,
                	//suggestedMax: 64,
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


	var getSpeakerInfo = function() {
			$.ajax({
				url:location.protocol + "//" + location.host + "/sj2/current.xml",
				type:"GET",
				cache: false,
				dataType: "xml",
				success : function(data) {
					var speakerEl = $(data).find("speaker");
					speakerId = speakerEl.find("id").text();
					var speakerName = speakerEl.find("name").text();
					var title = speakerEl.find("title").text();
					
					var speakerEnabled = speakerId != "";
					if (!speakerEnabled) {
						speakerName = "---"
					} 
					$("#speaker").text(speakerName);
					$("#title").text(title);
					
				}
			});
	};
	getSpeakerInfo();
	setInterval(getSpeakerInfo, 1000);
	var dataIndex = {"kaizen":0, "tsunagu":1,"passion":2, "jiman":3 };
	
	var getData = function() {
		$.ajax({
			url:location.protocol + "//" + location.host + "/sj2/reaction.xml",
			type:"GET",
			cache: false,
			dataType: "xml",
			success : function(data) {
				
				$(".reaction").remove();
			
				var els = $(data).find("reaction");
				
				if (els.length == 0) {
					myChart.data.datasets[0].data = [0,0,0,0];
					myChart.update();
				} else {
				
					ctx.removeClass("animated");
					ctx.removeClass("shake");
					var diffSum = 0;
					els.each(function(reaction) {
						var value = $(this).find("value").text();
						var count = $(this).find("count").text();
						var index = dataIndex[value];
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
		});
	};
	getData();
	setInterval(getData, 1000);
	
})();