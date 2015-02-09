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

        // Changes hash route to render view from home nav bar
        $(document).on('click', '#home-navbar a', function() {
            var hash = $(this).attr("data-href");
            window.location.hash = hash;
        });

        // Changes hash route to render view nav bar
        $(document).on('click', 'div[data-role="header"] a', function() {
            var hash = $(this).attr("data-href");
            window.location.hash = hash;
        });

        $(document).on('click', 'div[data-role="header"] a', function() {
            var hash = $(this).attr("data-href");
            window.location.hash = hash;
        });
    },

    // Handles view routing
    route: function() {
        router.addRoute('', function() {
            $('body').html(new HomeView().render().el);
        });

        router.addRoute('home', function() {
            $('body').html(new HomeView().render().el);
        });  

        router.addRoute('schedule', function() {
            var view = new ScheduleView(app.db).render();
            $('body').html(view.el);
            view.registerScheduleEvents();
        });

        router.addRoute('schedule/:id', function(id) {
            app.db.findById(parseInt(id), function(evt){
                $('body').html(new EventView(evt, "schedule").render().el);
            });
        });

        router.addRoute('workshops', function() {
            var view = new WorkshopsView(app.db).render();
            $('body').html(view.el);
            view.registerWorkshopEvents();
        });

        router.addRoute('workshops/:id', function(id) {
            app.db.findById(parseInt(id), function(evt){
                $('body').html(new EventView(evt, "workshops").render().el);
            });
        });

        router.addRoute('speakers', function() {
            var view = new SpeakersView(app.db).render();
            $('body').html(view.el);
            view.registerSpeakerEvents();
        });

        router.addRoute('speakers/:id', function(id) {
            app.db.findById(parseInt(id), function(evt){
                $('body').html(new EventView(evt, "speakers").render().el);
            });
        });


        router.start();
    }
};


app.initialize();












