var ScheduleView = function(database) {

	this.initialize = function() {
		StatusBar.backgroundColorByHexString('#32d200');
		var self = this;
		this.el = $('<div/>');
		this.db = database;
	};

	this.render = function() {
		this.el.html(ScheduleView.template());
        return this;
	};

	this.loadDateEvents = function(date) {
		var li = "";
		this.db.findByDate(date, function(events) {
			$.each(events, function(index, evt) {
				var mapUrl;
				if (device.platform == 'iOS') {
					var tempUrl = "maps://?q="+evt.location.lat+","+evt.location.long;
					mapUrl = {"mapUrl": tempUrl};
				} else if (device.platform == 'Android') {
					var tempUrl = "geo:"+evt.location.lat+","+evt.location.long;
					mapUrl = {"mapUrl": tempUrl};
				} else {
					console.error("Not correct Phone Platform, must be iOS or Android!");
				}
				evt.mapUrl = mapUrl;
				li += ScheduleView.liTemplate(evt);
			});
			$('.event-list').html(li);
		});
	};

	this.registerEvents = function() {
		var self = this;
		$('#schedule-tab-one').on('click', function() {
			$('#schedule-tab-content').html(ScheduleView.tab_one());
			self.loadDateEvents("2015-2-20");
			$('#schedule-tab-one').addClass('active');
			$('#schedule-tab-two').removeClass('active');
			$('#schedule-tab-three').removeClass('active');
		});

		$('#schedule-tab-two').on('click', function() {
			$('#schedule-tab-content').html(ScheduleView.tab_two());
			self.loadDateEvents("2015-2-21");
			$('#schedule-tab-one').removeClass('active');
			$('#schedule-tab-two').addClass('active');
			$('#schedule-tab-three').removeClass('active');
		});

		$('#schedule-tab-three').on('click', function() {
			$('#schedule-tab-content').html(ScheduleView.tab_three());
			self.loadDateEvents("2015-2-22");
			$('#schedule-tab-one').removeClass('active');
			$('#schedule-tab-two').removeClass('active');
			$('#schedule-tab-three').addClass('active');
		});

		$('#schedule-tab-content').html(ScheduleView.tab_one());
		self.loadDateEvents("2015-2-20");
		$('#schedule-tab-one').addClass('active');
	}


	this.initialize();
}

ScheduleView.template 		= Handlebars.compile($("#schedule-tmpl").html());
ScheduleView.liTemplate 	= Handlebars.compile($('#schedule-event-tmpl').html());
ScheduleView.tab_one 		= Handlebars.compile($("#schedule-tab-one-page").html());
ScheduleView.tab_two 		= Handlebars.compile($("#schedule-tab-two-page").html());
ScheduleView.tab_three 		= Handlebars.compile($("#schedule-tab-three-page").html());

