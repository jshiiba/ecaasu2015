var FeedView = function() {

	this.initialize = function() {
		//this.el = $("<div/>"); 
	};

	this.render = function() {
		$('#body-content').html(FeedView.template);
	};

	this.initialize();
}

FeedView.template = Handlebars.compile($("#feed-tmpl").html());