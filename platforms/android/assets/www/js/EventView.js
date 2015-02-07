var EventView = function(eventDetail, view) {
	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.eventDetail = eventDetail;

		if (view === "workshops") {
			this.template = Handlebars.compile($("#workshop-event-details-tmpl").html());
		} else {
			this.template = Handlebars.compile($("#schedule-event-details-tmpl").html());
		}
	};

	this.render = function() {
		this.el.html(this.template(this.eventDetail));
		return this;
	};

	this.initialize();
}
