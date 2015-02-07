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

	this.loadEvents = function() {
		var li = "";
		$.each(this.db.events, function(index, evt) {
			li += SpeakersView.liTemplate(evt);
		});
		$('.event-list').html(li);
	};

	this.registerSpeakerEvents = function() {
		var self = this;
		$('#speakers-tab-one').on('click', function() {
			console.log('Speaker tab 1 clicked!!');
			$('#speakers-tab-content').html(SpeakersView.tab_one());
		});

		$('#speakers-tab-two').on('click', function() {
			console.log('Speaker tab 2 clicked!!');
			$('#speakers-tab-content').html(SpeakersView.tab_two());
			self.loadEvents();
		});

		$('#speakers-tab-three').on('click', function() {
			console.log('Speaker tab 3 clicked!!');
			$('#speakers-tab-content').html(SpeakersView.tab_three());
		});
	}

	this.initialize();
}

SpeakersView.tab_one 		= Handlebars.compile($("#speakers-tab-one-page").html());
SpeakersView.tab_two 		= Handlebars.compile($("#speakers-tab-two-page").html());
SpeakersView.tab_three 		= Handlebars.compile($("#speakers-tab-three-page").html());
SpeakersView.template 		= Handlebars.compile($("#speakers-tmpl").html());
SpeakersView.liTemplate 	= Handlebars.compile($("#speakers-event-tmpl").html());
