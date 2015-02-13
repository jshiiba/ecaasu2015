var LocationView = function(database) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.db = database;
		StatusBar.backgroundColorByHexString('#ea1e45');
	};

	this.render = function() {
		this.el.html(LocationView.template());
		return this;
	};

	this.registerEvents = function() {
		var li = "";
		this.db.findLocations(function(events) {
			$.each(events, function(index, evt) {
				if (device.platform == 'iOS') {
					var tempUrl = "maps://?q="+evt.lat+","+evt.long;
					mapUrl = {"mapUrl": tempUrl};
				} else if (device.platform == 'Android') {
					var tempUrl = "geo:"+evt.lat+","+evt.long;
					mapUrl = {"mapUrl": tempUrl};
				} else {
					console.error("Not correct Phone Platform, must be iOS or Android!");
				}
				evt.mapUrl = mapUrl;
				li += LocationView.liTemplate(evt);
			});
			$('.event-list').html(li);
		});
	};

	this.initialize();
}

LocationView.template 	= Handlebars.compile($("#location-tmpl").html());
LocationView.liTemplate = Handlebars.compile($("#location-event-tmpl").html()); 
