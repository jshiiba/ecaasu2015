var SplashView = function() {

  this.initialize = function() {
    var self = this;
    this.el = $('<div/>');
  };

  this.render = function() {
    this.el.html(SplashView.template());
    return this;
  };

  this.initialize();
}

SplashView.template = Handlebars.compile($("#splash-tmpl").html());