var SpeakersView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
		StatusBar.backgroundColorByHexString('#00ccff');
	};

	this.render = function() {
		this.el.html(SpeakersView.template());
        return this;
	};

	this.loadSpeakerEvents = function(time) {
		var li = "";

		this.db.findSpeakersByTime(time, function(perf) {
			$.each(perf, function(index, p) {
				console.log(p.class);
				li += SpeakersView.liTemplate(p);
			});
			$('.event-list').html(li);
		});
	};

	this.registerEvents = function() {
		var self = this;
		$('#speakers-tab-one').on('click', function() {
			$('#speakers-tab-content').html(SpeakersView.tab_one());
			self.loadSpeakerEvents("opening");
			$('#speakers-tab-one').addClass('active');
			$('#speakers-tab-two').removeClass('active');
		});

		$('#speakers-tab-two').on('click', function() {
			$('#speakers-tab-content').html(SpeakersView.tab_two());
			self.loadSpeakerEvents("closing");
			$('#speakers-tab-one').removeClass('active');
			$('#speakers-tab-two').addClass('active');
		});

		// Load first tab
		$('#speakers-tab-content').html(SpeakersView.tab_one());
		self.loadSpeakerEvents("opening");
		$('#speakers-tab-one').addClass('active');
	}

	this.initialize();
}

SpeakersView.tab_one 		= Handlebars.compile($("#speakers-tab-one-page").html());
SpeakersView.tab_two 		= Handlebars.compile($("#speakers-tab-two-page").html());
SpeakersView.template 		= Handlebars.compile($("#speakers-tmpl").html());
SpeakersView.liTemplate 	= Handlebars.compile($("#speakers-event-tmpl").html());
