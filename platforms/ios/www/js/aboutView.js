var AboutView = function() {

	this.initialize = function() {
		this.el = $("<div/>"); 
	};

	this.render = function() {
		this.el.html(AboutView.template);
		return this;
	};

	this.initialize();
}

AboutView.template = Handlebars.compile($("#about-tmpl").html());