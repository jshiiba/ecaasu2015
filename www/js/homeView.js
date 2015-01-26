var HomeView = function(database) {

	this.initialize = function() {
		var self = this;
		this.db = database;
	};

	this.render = function() {
		$('#body-content').html(HomeView.template);
		this.loadEvents();
	};

	this.loadEvents = function() {
		var li = "";
		$.each(this.db.events, function(index, evt) {
			li += HomeView.liTemplate(evt);
		});
		$(".event-list").html(li);
	}

	this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tmpl").html());
HomeView.liTemplate = Handlebars.compile($('#event-tmpl').html());

var eventDB = [ 
	{"id": 1, "eventTitle": "Event 1", "location": "Harvard"},
	{"id": 2, "eventTitle": "Event 2", "location": "Harvard"},
	{"id": 3, "eventTitle": "Event 3", "location": "Harvard"},
	{"id": 4, "eventTitle": "Event 4", "location": "Harvard"},
	{"id": 5, "eventTitle": "Event 5", "location": "Harvard"},
	{"id": 6, "eventTitle": "Event 6", "location": "Harvard"},
	{"id": 7, "eventTitle": "Event 7", "location": "Harvard"},
	{"id": 8, "eventTitle": "Event 8", "location": "Harvard"},
	{"id": 9, "eventTitle": "Event 9", "location": "Harvard"}
];