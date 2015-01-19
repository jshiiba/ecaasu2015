var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        var home = new HomeView;
        var map = new MapView;
        var feed = new FeedView;
        var about = new AboutView;
        home.render();
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
    }
};

var home, about, feed, map;

$(document).on('click', 'div[data-role="navbar"] a', function() {
    var el = $(this).attr("data-href");
    var viewController;
    // Create view based on which tab was clicked
    switch (el) {
        case "Home":
            viewController = home;
            break;
        case "Map":
            viewController = map;
            break;
        case "Feed":
            viewController = feed;
            break;
        case "About":
            viewController = about;
            break;
        default:
            viewController = null;
            break;
    }
    if (viewController) {
        // Render view of current Tab
        viewController.render();
    }
});


app.initialize();












