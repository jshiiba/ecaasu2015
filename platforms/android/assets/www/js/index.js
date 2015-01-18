var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        // Create HTML Templates
        this.headerTmpl = Handlebars.compile($("#header-tmpl").html());
        this.contentTmpl = Handlebars.compile($("#content-tmpl").html());
        this.footerTmpl = Handlebars.compile($("#footer-tmpl").html());

        // Render page view
        $('body').html(this.headerTmpl() + this.contentTmpl() + this.footerTmpl());
        this.renderBodyView(new HomeView().render().el);
        
        //$('#content-tmpl').html(new HomeView().render().el);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    renderBodyView: function(content) {
        console.log(content);
        $('#content').html(content);

    }
};

app.initialize();