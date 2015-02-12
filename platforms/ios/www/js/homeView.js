var HomeView = function() {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(HomeView.template());
    return this;
	};

	this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tmpl").html());