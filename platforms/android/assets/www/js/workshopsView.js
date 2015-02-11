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
			$('#workshops-tab-one').addClass('active');
			$('#workshops-tab-two').removeClass('active');
			$('#workshops-tab-three').removeClass('active');
		});

		$('#workshops-tab-two').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_two());
			self.loadDateEvents("2015-2-21");
			$('#workshops-tab-one').removeClass('active');
			$('#workshops-tab-two').addClass('active');
			$('#workshops-tab-three').removeClass('active');
		});

		$('#workshops-tab-three').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_three());
			self.loadDateEvents("2015-2-22");
			$('#workshops-tab-one').removeClass('active');
			$('#workshops-tab-two').removeClass('active');
			$('#workshops-tab-three').addClass('active');
		});

		// Load first tab
		$('#workshops-tab-content').html(WorkshopsView.tab_one());
		self.loadDateEvents("2015-2-20");
		$('#workshops-tab-one').addClass('active');
	}

	this.initialize();
}

WorkshopsView.tab_one 		= Handlebars.compile($("#workshops-tab-one-page").html());
WorkshopsView.tab_two 		= Handlebars.compile($("#workshops-tab-two-page").html());
WorkshopsView.tab_three 	= Handlebars.compile($("#workshops-tab-three-page").html());
WorkshopsView.template 		= Handlebars.compile($("#workshop-tmpl").html());
WorkshopsView.liTemplate 	= Handlebars.compile($("#workshop-event-tmpl").html());
