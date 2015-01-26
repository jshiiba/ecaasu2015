var AboutView = function() {

	this.initialize = function() {
		//this.el = $("<div/>"); 
	};

	this.render = function() {
		$('#body-content').html(AboutView.template);
	};

	this.initialize();
}

AboutView.template = Handlebars.compile($("#about-tmpl").html());