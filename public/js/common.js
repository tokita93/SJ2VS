var COMMON = COMMON || {};

(function(global) {
    var _ = COMMON;
    var config = {};
    // common interval msec
    _.interval = 1000;

    _.getUrl = function() {
		return location.protocol + "//" + location.host;
	}
    var init = function() {
        $.ajax({
            type: "GET",
            url:_.getUrl() + "/api/config",
            async:false,
            success: function(data) {
                config = data;
            }
        });
    };

    init();

    _.title = config.title;
    _.category = config.category;
    _.speaker = config.speaker;
    _.getCategoryIds = function () {
        return config.category.map(element => {
            return element.id;
        });
    }
    _.getCategoryIndex = function(categoryId) {
        var index = -1;
        $.each(config.category, (i, value) => {
            if (value.id === categoryId) {
                index = i;
                return false;
            }
        });
        return index;
    }
    _.getCategoryNames = function () {
        return config.category.map(element => {
            return element.name;
        });
    }
    _.getSpeaker = function (spekerId) {
        return config.speaker.find(speaker => {
            return speaker.id === spekerId;
        });
    }

    _.getCurrentSpeaker = function(callback) {
        $.get(_.getUrl() + "/data/current.json",callback);
    }

    _.vote = function(speakerId, name, categoryId) {
        $.post(_.getUrl() + "/api/reaction", {
            "speakerId" : speakerId,
            "name" : name,
            "categoryId" : categoryId
        });
    }

    _.changeSpeaker = function(speakerId) {
        $.post(_.getUrl() + "/api/speaker", {
            "speakerId" : speakerId
        });
    }
})(this);
