var WorkshopsView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
	};

	this.render = function() {
		this.el.html(WorkshopsView.template());
        return this;
	};

	this.loadEvents = function() {
		var li = "";
		$.each(this.db.events, function(index, evt) {
			li += WorkshopsView.liTemplate(evt);
		});
		$('.event-list').html(li);
	};

	this.registerWorkshopEvents = function() {
		var self = this;
		$('#workshops-tab-one').on('click', function() {
			console.log('workshop tab 1 clicked!!');
			$('#workshops-tab-content').html(WorkshopsView.tab_one());
		});

		$('#workshops-tab-two').on('click', function() {
			console.log('workshop tab 2 clicked!!');
			$('#workshops-tab-content').html(WorkshopsView.tab_two());
			self.loadEvents();
		});

		$('#workshops-tab-three').on('click', function() {
			console.log('workshop tab 3 clicked!!');
			$('#workshops-tab-content').html(WorkshopsView.tab_three());
		});
	}

	this.initialize();
}

WorkshopsView.tab_one 		= Handlebars.compile($("#workshops-tab-one-page").html());
WorkshopsView.tab_two 		= Handlebars.compile($("#workshops-tab-two-page").html());
WorkshopsView.tab_three 	= Handlebars.compile($("#workshops-tab-three-page").html());
WorkshopsView.template 		= Handlebars.compile($("#workshop-tmpl").html());
WorkshopsView.liTemplate 	= Handlebars.compile($("#workshop-event-tmpl").html());
