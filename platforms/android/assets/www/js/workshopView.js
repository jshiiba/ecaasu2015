var WorkshopView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
	};

	this.render = function() {
		this.el.html(WorkshopView.template());
        return this;
	};

	this.loadEvents = function() {
		var li = "";
		$.each(this.db.events, function(index, evt) {
			li += WorkshopView.liTemplate(evt);
		});
		$('.event-list').html(li);
	};

	this.registerWorkshopEvents = function() {
		var self = this;
		$('#workshops-tab-one').on('click', function() {
			console.log('workshop tab 1 clicked!!');
			$('#workshops-tab-content').html(WorkshopView.tab-one);
		});

		$('#workshops-tab-two').on('click', function() {
			console.log('workshop tab 2 clicked!!');
			$('#workshops-tab-content').html(WorkshopView.tab-two);
			self.loadEvents();
		});

		$('#workshops-tab-three').on('click', function() {
			console.log('workshop tab 3 clicked!!');
			$('#workshops-tab-content').html(WorkshopView.tab-three);
		});
	}

	this.initialize();
}

WorkshopView.template 			= Handlebars.compile($("#workshop-tmpl").html());
WorkshopView.tab-one 			= Handlebars.compile($("#workshop-tab-one-page").html());
WorkshopView.tab-two 			= Handlebars.compile($("#workshop-tab-two-page").html());
WorkshopView.tab-three 			= Handlebars.compile($("#workshop-tab-three-page").html());
WorkshopView.liTemplate 		= Handlebars.compile($('#workshop-event-tmpl').html());

