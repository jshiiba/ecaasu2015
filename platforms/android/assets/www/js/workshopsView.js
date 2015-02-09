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

	this.loadDateEvents = function(date) {
		var li = "";
		this.db.findByDate(date, function(events) {
			$.each(events, function(index, evt) {
				li += WorkshopsView.liTemplate(evt);
			});
			$('.event-list').html(li);
		});
	};

	this.registerWorkshopEvents = function() {
		var self = this;
		$('#workshops-tab-one').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_one());
			self.loadDateEvents("2015-2-20");
		});

		$('#workshops-tab-two').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_two());
			self.loadDateEvents("2015-2-21");
		});

		$('#workshops-tab-three').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_three());
			self.loadDateEvents("2015-2-22");
		});

		// Load first tab
		$('#workshops-tab-content').html(WorkshopsView.tab_one());
		self.loadDateEvents("2015-2-20");
	}

	this.initialize();
}

WorkshopsView.tab_one 		= Handlebars.compile($("#workshops-tab-one-page").html());
WorkshopsView.tab_two 		= Handlebars.compile($("#workshops-tab-two-page").html());
WorkshopsView.tab_three 	= Handlebars.compile($("#workshops-tab-three-page").html());
WorkshopsView.template 		= Handlebars.compile($("#workshop-tmpl").html());
WorkshopsView.liTemplate 	= Handlebars.compile($("#workshop-event-tmpl").html());
