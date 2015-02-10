var SpeakersView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
	};

	this.render = function() {
		this.el.html(SpeakersView.template());
        return this;
	};

	this.loadSpeakerEvents = function(time) {
		var li = "";
		var events = this.db.performers;

		$.each(events, function(index, evt) {
			if (evt.time == time) {
				li += SpeakersView.liTemplate(evt);
			}
		});
		$('.event-list').html(li);
	};

	this.registerSpeakerEvents = function() {
		var self = this;
		$('#speakers-tab-one').on('click', function() {
			$('#speakers-tab-content').html(SpeakersView.tab_one());
			self.loadSpeakerEvents("opening");
		});

		$('#speakers-tab-two').on('click', function() {
			$('#speakers-tab-content').html(SpeakersView.tab_two());
			self.loadSpeakerEvents("closing");
		});

		// Load first tab
		$('#speakers-tab-content').html(SpeakersView.tab_one());
		self.loadSpeakerEvents("opening");
	}

	this.initialize();
}

SpeakersView.tab_one 		= Handlebars.compile($("#speakers-tab-one-page").html());
SpeakersView.tab_two 		= Handlebars.compile($("#speakers-tab-two-page").html());
SpeakersView.tab_three 		= Handlebars.compile($("#speakers-tab-three-page").html());
SpeakersView.template 		= Handlebars.compile($("#speakers-tmpl").html());
SpeakersView.liTemplate 	= Handlebars.compile($("#speakers-event-tmpl").html());
