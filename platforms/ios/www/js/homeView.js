var HomeView = function() {

	this.initialize = function() {
		// Div wrapper for view, used to attach events
		this.el = $("<div/>"); 
	};

	this.render = function() {
		this.el.html(HomeView.template);
		return this;
	};

	this.initialize();
}

HomeView.template = Handlebars.compile($("#content-tmpl").html());