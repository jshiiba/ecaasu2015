var WorkshopsView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
		StatusBar.backgroundColorByHexString('#cc3399');
	};

	this.render = function() {
		this.el.html(WorkshopsView.template());
        return this;
	};

	this.loadDateEvents = function(series_id) {
		var li = "";
		this.db.findWorkshopsBySeries(series_id, function(events) {
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
				li += WorkshopsView.liTemplate(evt);
			});
			$('.event-list').html(li);
		});
	};

	this.registerEvents = function() {
		var self = this;
		$('#workshops-tab-one').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_one());
			self.loadDateEvents("1");
			$('#workshops-tab-one').addClass('active');
			$('#workshops-tab-two').removeClass('active');
			$('#workshops-tab-three').removeClass('active');
		});

		$('#workshops-tab-two').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_two());
			self.loadDateEvents("2");
			$('#workshops-tab-one').removeClass('active');
			$('#workshops-tab-two').addClass('active');
			$('#workshops-tab-three').removeClass('active');
		});

		$('#workshops-tab-three').on('click', function() {
			$('#workshops-tab-content').html(WorkshopsView.tab_three());
			self.loadDateEvents("0");
			$('#workshops-tab-one').removeClass('active');
			$('#workshops-tab-two').removeClass('active');
			$('#workshops-tab-three').addClass('active');
		});

		// Load first tab
		$('#workshops-tab-content').html(WorkshopsView.tab_one());
		self.loadDateEvents("1");
		$('#workshops-tab-one').addClass('active');
	}

	this.initialize();
}

WorkshopsView.tab_one 		= Handlebars.compile($("#workshops-tab-one-page").html());
WorkshopsView.tab_two 		= Handlebars.compile($("#workshops-tab-two-page").html());
WorkshopsView.tab_three 	= Handlebars.compile($("#workshops-tab-three-page").html());
WorkshopsView.template 		= Handlebars.compile($("#workshop-tmpl").html());
WorkshopsView.liTemplate 	= Handlebars.compile($("#workshop-event-tmpl").html());
