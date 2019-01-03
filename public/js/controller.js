(function() {
	$('#title').html(COMMON.title);

	var speakerList = $('#speakerSelect');
	$.each(COMMON.speaker, (index, speaker) => {
		speakerList.append($('<option />').val(speaker.id)
			.text(speaker.name));
	});
	COMMON.getCurrentSpeaker((currentSpeaker) => {
		console.log(currentSpeaker);
		speakerList.val(currentSpeaker.speakerId);
	});
	speakerList.change(() => {
		var speakerId = speakerList.val();
		COMMON.changeSpeaker(speakerId);
	});
	
})();