var app = {
    // Application Constructor
    initialize: function() {
        var self = this;
        this.bindEvents();
        this.eventDetailsURL = /^#events\/(\d{1,})/;
        this.registerEvents(); 
        this.db = new Database(function() {
            self.route();
        });
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
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();
        // Get current position
       
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

    registerEvents: function() {
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }

        // Listens for URL change
        $(window).on('hashchange', $.proxy(this.route, this)); 

        // Changes hash route to render view from tab bar
        $(document).on('click', 'div[data-role="navbar"] a', function() {
            var hash = $(this).attr("data-href");
            window.location.hash = hash;
        });
    },

    // Handles view routing
    route: function() {
        router.addRoute('', function() {
            home = new HomeView(app.db);
            home.render();
        });

        router.addRoute('home', function() {
            home = new HomeView(app.db);
            home.render();
        });  

        router.addRoute('events/:id', function(id) {
            app.db.findById(parseInt(id), function(evt){
                var detailedView = new EventView(evt);
                detailedView.render();
            })
        });

        router.addRoute('map', function() {
            var map = new MapView();
            map.render();
        });

        router.addRoute('feed', function() {
            var feed = new FeedView();
            feed.render();
        });       

        router.addRoute('about', function() {
            var about = new AboutView();
            about.render();
        });  

        router.start();
    }
};


app.initialize();












