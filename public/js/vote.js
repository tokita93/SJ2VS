(function() {
	$('#title').html(COMMON.title);
	$.each(COMMON.category, function(index, category) {
		$('#category' + index).attr('data-id', category.id);
		$('#categoryLabel' + index).html(category.name);
		$('#categoryDesc' + index).html(category.detail);
	});

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
		
		nameEnabled = $("#name").val().length > 0;
	}
	
	$("#name").change(checkName);
	$("#name").keyup(checkName);
	$("#name").keydown(checkName);
	
	var onclick = function(e) {
		var animation = animes[Math.floor(Math.random() * animes.length)];
		var button = $(this);
		var categoryId = button.attr('data-id');
		var name = $("#name").val();
		
		button.prop("disabled", true);
		button.addClass("animated");
		button.addClass(animation);
		
		try { 
			COMMON.vote(speakerId, name, categoryId);
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
	
	var getCurrentSpeaker = function() {
		COMMON.getCurrentSpeaker(function(data) {
			console.log(data);
			speakerId = data.speakerId;
			var speaker = COMMON.getSpeaker(speakerId);
			var speakerName = speaker.name;
			var title = speaker.title;
			var speakerEnabled = speakerId != "";
			if (!speakerEnabled) {
				speakerName = "---";
				title = "---";
			} 
			$(".button").prop("disabled", !nameEnabled || !speakerEnabled);
			$("#speaker").text(speakerName);
			$("#speakerTitle").text(title);
		});
	}
	getCurrentSpeaker();
	setInterval(getCurrentSpeaker, COMMON.interval);


	
})();