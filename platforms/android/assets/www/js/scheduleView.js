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
	}

	this.initialize();
}

ScheduleView.template = Handlebars.compile($("#schedule-tmpl").html());
ScheduleView.liTemplate = Handlebars.compile($('#schedule-event-tmpl').html());

