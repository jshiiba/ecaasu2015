var MapView = function() {

	this.initialize = function() {
		//this.el = $("<div/>");
		navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError); 
	};

	this.render = function() {
		$('#body-content').html(MapView.template);
		var div = $('#map_canvas');
		// var map = plugin.google.maps.Map.getMap(div);
		// map.showDialog();
		
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