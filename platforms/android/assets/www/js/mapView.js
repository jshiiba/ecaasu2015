var MapView = function() {

	this.initialize = function() {

	};

	this.render = function() {
		var temp = {"lat": 42.3744, "long": -71.1169};

		console.log("platform: "+device.platform);

		if (device.platform == 'iOS') {
			console.log("iOS");
		}
		var temp = {"mapUrl": "maps://?q=42.3744,-71.1169"};

		console.log("mapUrl: "+temp.mapUrl);
		$('#body-content').html(MapView.template(temp));
		

		// geo:42.3744,71.1169

	};

    this.onSuccess = function(position) {
    	console.log('success load map');
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude,longitude);
        console.log("lat: "+latitude+" long: "+longitude+" latLong: "+latLong);

        var mapOptions = {
            center: latLong,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    };

    this.onError = function(error) {
        console.log('code: '+error.code+'\n message: '+error.message+'\n');
    };

	this.initialize();
}

MapView.template = Handlebars.compile($("#map-tmpl").html());