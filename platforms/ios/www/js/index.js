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
        StatusBar.backgroundColorByHexString('#fff');
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
            $('body').on('scrollstart', 'a', function(event) {
            });
            $('body').on('tap', 'a', function(event) {
                $(event.target).addClass('tappable-active');
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
        $(window).off().on('hashchange', $.proxy(this.route, this)); 

        // Changes hash route to render view from home nav bar
        $(document).off().on('click', '#home-navbar a', function() {
            var hash = $(this).attr("data-href");
            app.direction = "right";
            window.location.hash = hash;
        });

        // Changes hash route to render view nav bar
        $(document).on('click', 'div[data-role="header"] a', function() {
            var hash = $(this).attr("data-href");
            app.direction = "left";
            window.location.hash = hash;
        });

        $(document).on('backbutton', function() {
            app.direction = "left";
            var hash = window.location.hash.split('/');
            if (typeof hash[1] === 'undefined') {
                window.location.hash = 'home';
            } else {
                window.location.hash = hash[0].substr(1);
            }
        })

    },

    // Handles view routing
    route: function() {
        var self = this;
        console.log('route!!')
        router.addRoute('', function() {

            setTimeout(function(){
                if (window.device.platform == 'Android') {
                    console.log('android');
                    $('body').html(new SplashView().render().el);
                    setTimeout( function () {
                        $( ".splash-screen" ).animate({
                          top: "-100%"
                        }, 500, function () {
                            router.load('home');
                        });
                    }, 2000);
                } else if (window.device.platform == 'iOS') {
                    console.log('route to home first');
                    router.load('home');
                } else {
                    alert("Device Platform not supported!");
                }
            },1000);
        });

        router.addRoute('home', function() {
            app.homePage = new HomeView().render();

            // View to home
            $(app.homePage.el).attr('class', 'page stage-left');
            $('body').append(app.homePage.el);

            setTimeout( function() {
                $(app.homePage.el).attr('class', 'page stage-center transition');
                if (app.currentPage) {
                    $(app.currentPage.el).attr('class', 'page stage-right transition');
                    app.removeNonCenterViews();
                }
            });
        });  

        router.addRoute('schedule', function() {
            self.slidePage(new ScheduleView(app.db).render());
        });

        router.addRoute('schedule/:id', function(id) {
            app.direction = "right";
            app.db.findById(parseInt(id), function(evt){
                app.slidePage(new EventView(evt, "schedule").render());
            });
        });

        router.addRoute('workshops', function() {
            self.slidePage(new WorkshopsView(app.db).render());
        });

        router.addRoute('workshops/:id', function(id) {
            app.direction = "right";
            app.db.findWorkshopById(parseInt(id), function(evt){

                var seriesTimeDetailsMap = {
                    0: "Available at both Series 1 & 2",
                    1: "Series 1 (2/20/15, 10:45AM-11:45AM)",
                    2: "Series 2 (2/20/15, 1:30AM-2:30AM)"
                };
                evt.eventTimeDetails = seriesTimeDetailsMap[evt['series_no']];
                evt.category = evt.category.charAt(0).toUpperCase() + evt.category.slice(1);
                app.slidePage(new EventView(evt, "workshops").render());
            });
        });

        router.addRoute('speakers', function() {
            app.slidePage(new SpeakersView(app.db).render());
        });

        router.addRoute('speakers/:id', function(id) {
            app.direction = "right";
            app.db.findSpeakerById(parseInt(id), function(evt){
                app.slidePage(new EventView(evt, "speakers").render());
            });
        });

        router.addRoute('location', function() {
            self.slidePage(new LocationView(app.db).render());
        });

        router.start();
    },

    slidePage: function(view) {
        // home to view, view to detail
        if (app.direction == "right") {
            $(view.el).attr('class', 'page stage-right');
            $('body').append(view.el);
            
            setTimeout( function() {
                if (typeof view.registerEvents === "function") {
                    // home to view
                    view.registerEvents();
                    setTimeout( function() {
                        $(view.el).attr('class', 'page stage-center transition');
                        $(app.homePage.el).attr('class', 'page stage-left transition');
                        app.currentPage = view;
                        app.removeNonCenterViews();
                    }); 
                } else {
                    // view to detail
                    setTimeout( function() {
                        $(view.el).attr('class', 'page stage-center transition');
                        $(app.currentPage.el).attr('class', 'page stage-left transition');
                        app.currentPage = view;
                        app.removeNonCenterViews();
                    });          
                }

            });
        } else {
            // direction LEFT, detail to view
            $(view.el).attr('class', 'page stage-left');
            $('body').append(view.el);

            setTimeout( function() {
                view.registerEvents();
                setTimeout( function() {
                     $(view.el).attr('class', 'page stage-center transition');
                    $(app.currentPage.el).attr('class', 'page stage-right transition');
                    app.currentPage = view;
                    app.removeNonCenterViews();
                });
            });
        }
     
    },

    removeNonCenterViews: function() {
        setTimeout( function() {
            $('.stage-right, .stage-left').not('homePage').remove();
        }, 400);
    }
};


app.initialize();












