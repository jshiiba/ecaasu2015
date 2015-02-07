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
	// 	var self = this;
	// 	var tab-one 	= WorkshopsView.tab-one;
	// 	var tab-two 	= WorkshopsView.tab-two;
	// 	var tab-three 	= WorkshopsView.tab-three;
	// 	$('#workshops-tab-one').on('click', function() {
	// 		console.log('workshop tab 1 clicked!!');
	// 		$('#workshops-tab-content').html(tab-one);
	// 	});

	// 	$('#workshops-tab-two').on('click', function() {
	// 		console.log('workshop tab 2 clicked!!');
	// 		$('#workshops-tab-content').html(tab-two);
	// 		self.loadEvents();
	// 	});

	// 	$('#workshops-tab-three').on('click', function() {
	// 		console.log('workshop tab 3 clicked!!');
	// 		console.log($("#workshops-tab-three-page").html());
	// 		$('#workshops-tab-content').html(tab-three);
	// 	});
	}

	this.initialize();
}

WorkshopsView.tab-one 		= Handlebars.compile($("#test2").html());
WorkshopsView.template 		= Handlebars.compile($("#workshop-tmpl").html());
WorkshopsView.liTemplate 	= Handlebars.compile($("#workshop-event-tmpl").html());
