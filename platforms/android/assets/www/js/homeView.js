var HomeView = function() {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(HomeView.template());
    $( ".splash-screen" ).animate({
      top: "-100%"
    }, 5000);
    return this;
	};

	this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tmpl").html());