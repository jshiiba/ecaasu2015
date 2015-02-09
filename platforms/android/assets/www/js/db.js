var Database = function(success, error) {

	this.initialize = function() {
		callLater(success);
	};

	this.findById = function(id, callback) {
		var url = "http://ecaasu2015.herokuapp.com/api/events/" + id;
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
					var events = JSON.parse(request.responseText);
					callLater(callback, events);
				}
			}
		}
		console.log('requesting id events');
		request.send();
	}

	this.findByDate = function(date, callback) {
		var url = "http://ecaasu2015.herokuapp.com/api/events?date=" + date;
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
					var events = JSON.parse(request.responseText);
					for (var i = 0; i < events.length; i++) {
						console.log(events[i]);
					};
					callLater(callback, events);
				}
			}
		}
		console.log('requesting date events');
		request.send();
	};

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    };

    this.initialize();

	this.events = [ 
		{"id": 1, "eventTitle": "Event 1", "location": "Harvard"},
		{"id": 2, "eventTitle": "Event 2", "location": "MIT"},
		{"id": 3, "eventTitle": "Event 3", "location": "Tufts"},
		{"id": 4, "eventTitle": "Event 4", "location": "Brandeis"},
		{"id": 5, "eventTitle": "Event 5", "location": "BU"},
		{"id": 6, "eventTitle": "Event 6", "location": "BC"},
		{"id": 7, "eventTitle": "Event 7", "location": "NE"},
		{"id": 8, "eventTitle": "Event 8", "location": "Amherst"},
		{"id": 9, "eventTitle": "Event 9", "location": "Tufts again"}
	];
}