var ScheduleView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
	};

	this.render = function() {
		this.el.html(ScheduleView.template());
        return this;
	};

	this.loadEvents = function() {
		var li = "";
		$.each(this.db.events, function(index, evt) {
			li += ScheduleView.liTemplate(evt);
		});
		$('.event-list').html(li);
	};

	this.registerScheduleEvents = function() {
		var self = this;
		$('#schedule-tab-one').on('click', function() {
			console.log('schedule tab 1 clicked!!');
			$('#schedule-tab-content').html(ScheduleView.tab_one());
		});

		$('#schedule-tab-two').on('click', function() {
			console.log('schedule tab 2 clicked!!');
			$('#schedule-tab-content').html(ScheduleView.tab_two());
			self.loadEvents();
		});

		$('#schedule-tab-three').on('click', function() {
			console.log('schedule tab 3 clicked!!');
			$('#schedule-tab-content').html(ScheduleView.tab_three());
		});
	}


	this.initialize();
}

ScheduleView.template 		= Handlebars.compile($("#schedule-tmpl").html());
ScheduleView.liTemplate 	= Handlebars.compile($('#schedule-event-tmpl').html());
ScheduleView.tab_one 		= Handlebars.compile($("#schedule-tab-one-page").html());
ScheduleView.tab_two 		= Handlebars.compile($("#schedule-tab-two-page").html());
ScheduleView.tab_three 		= Handlebars.compile($("#schedule-tab-three-page").html());

