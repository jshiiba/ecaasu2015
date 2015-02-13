var EventView = function(eventDetail, view) {
	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.eventDetail = eventDetail;
		if (view === "workshops") {
			this.template = EventView.workshop_tmpl;
			StatusBar.backgroundColorByHexString('#cc3399');
		} else if (view === "speakers") {
			this.template = EventView.speakers_tmpl;
			StatusBar.backgroundColorByHexString('#00ccff');
		} else {
			this.template = EventView.schedule_tmpl;
			StatusBar.backgroundColorByHexString('#32d200');
		}
	};

	this.render = function() {
		this.el.html(this.template(this.eventDetail));
		return this;
	};

	this.initialize();
}

EventView.workshop_tmpl = Handlebars.compile($("#workshop-event-details-tmpl").html());
EventView.schedule_tmpl = Handlebars.compile($("#schedule-event-details-tmpl").html());
EventView.speakers_tmpl = Handlebars.compile($("#speakers-event-details-tmpl").html());