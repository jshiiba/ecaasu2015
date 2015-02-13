var HomeView = function() {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		StatusBar.backgroundColorByHexString('#fff');
	};

	this.render = function() {
		this.el.html(HomeView.template());
    return this;
	};

	this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tmpl").html());