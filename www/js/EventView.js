var EventView = function(eventDetail) {
	this.initialize = function() {
		this.eventDetail = eventDetail;
	};

	this.render = function() {
		$('#body-content').html(EventView.template(this.eventDetail));
	};

	this.initialize();
}

EventView.template = Handlebars.compile($("#event-details-tmpl").html());