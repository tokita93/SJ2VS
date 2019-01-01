(function() {
	var getUrl = function() {
		return location.protocol + "//" + location.host;
	}

	var speakers = [];
	var categories = [];
	var init = function() {
		$.get(getUrl() + "/api/config", function(data) {
			$.each(data.Category, function(index, value) {
				$('#categoryLabel' + index).html(value.name);
				$('#categoryDesc' + index).html(value.detail);
				categories.push(value.id);
			});
			speakers = data.Speakers;
		});
	};
	init();

	var animes = ["bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada", "wobble", "jello"]
	var speakerId = "";
	var nameEnabled = false;
	$(".button").prop("disabled", false);
	
	var checkName = function() {
		var currentName =  $("#name").val();
		if (currentName.length == 0) {
			$("#name-form").removeClass("has-error");
			$("#inputmsg").text("");
			nameEnabled =  false;
			return;
		}
		if (!currentName.match(/^[0-9a-zA-Zぁ-んァ-ン一-龥-@_,\.\s]+$/)) {
			$("#name-form").addClass("has-error");
			$("#inputmsg").text("使用できない文字が入力されています。");
			nameEnabled =  false;
			return;
		}
		$("#name-form").removeClass("has-error");
		$("#inputmsg").text("");
		nameEnabled =  true;
		
		nameEnabled = $("#name").val().length > 0
	}
	
	$("#name").change(checkName);
	$("#name").keyup(checkName);
	$("#name").keydown(checkName);
	
	var onclick = function(e) {
		var animation = animes[Math.floor(Math.random() * animes.length)];
		var button = $(this);
		// REVISIT:　ボタンのカテゴリのとり方を修正する
		var categoryIndex = button.attr('id').replace('category',''	);
		console.log(categoryIndex);
		var name = $("#name").val();
		
		button.prop("disabled", true);
		button.addClass("animated");
		button.addClass(animation);
		
		try { 
			$.get(getUrl() + "/api/reaction", {
				"speakerId" : speakerId,
				"name" : $("#name").val(),
				"categoryId" : categories[categoryIndex]
			});
		} catch (e) {
			console.log(e);
		}
		
		setTimeout(function() {
				button.removeClass("animated");
				button.removeClass(animation);
				button.prop("disabled", false);
			}
		, 1000);
	}
	$(".button").click(onclick);
	
	var getSpeakerInfo = function() {
		$("#speaker").text("dummy");
			// $.ajax({
			// 	url:location.protocol + "//" + location.host + "/sj2/current.xml",
			// 	type:"GET",
			// 	cache: false,
			// 	dataType: "xml",
			// 	success : function(data) {
			// 		var speakerEl = $(data).find("speaker");
			// 		speakerId = speakerEl.find("id").text();
			// 		var speakerName = speakerEl.find("name").text();
			// 		var title = speakerEl.find("title").text();
					
			// 		var speakerEnabled = speakerId != "";
			// 		if (!speakerEnabled) {
			// 			speakerName = "---"
			// 		} 
			// 		$(".button").prop("disabled", !nameEnabled || !speakerEnabled);
			// 		$("#speaker").text(speakerName);
			// 		$("#title").text(title);
					
			// 	}
			// });
	};
	getSpeakerInfo();
	setInterval(getSpeakerInfo, 1000);


	
})();