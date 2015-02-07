var MapView = function() {

	this.initialize = function() {

	};

	this.render = function() {
		console.log("platform: "+device.platform);
		var mapUrl;

		// Default maps for different platform
		if (device.platform == 'iOS') {
			mapUrl = {"mapUrl": "maps://?q=42.3744,-71.1169"};
		} else if (device.platform == 'Android') {
			mapUrl = {"mapUrl": "geo:42.3744,-71.1169"};
		} else {
			console.error("Not correct Phone Platform, must be iOS or Android!");
		}
		$('#body-content').html(MapView.template(mapUrl));
	};

	this.initialize();
}

MapView.template = Handlebars.compile($("#map-tmpl").html());