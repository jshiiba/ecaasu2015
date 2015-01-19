var MapView = function() {

	this.initialize = function() {
		//this.el = $("<div/>"); 
	};

	this.render = function() {
		$('#body-content').html(MapView.template);
	};

	this.initialize();
}

MapView.template = Handlebars.compile($("#map-tmpl").html());