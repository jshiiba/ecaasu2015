var Database = function(success, error) {

	this.findById = function(id, callback) {
		var events = this.events;
		var evt = null;
		var l = events.length;
		for (var i=0; i < l; i++) {
			if (events[i].id === id) {
				evt = events[i];
				break;
			}
		}
		callLater(callback, evt);
	}

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

	this.events = [ 
		{"id": 1, "eventTitle": "Event 1", "location": "Harvard"},
		{"id": 2, "eventTitle": "Event 2", "location": "Harvard"},
		{"id": 3, "eventTitle": "Event 3", "location": "Harvard"},
		{"id": 4, "eventTitle": "Event 4", "location": "Harvard"},
		{"id": 5, "eventTitle": "Event 5", "location": "Harvard"},
		{"id": 6, "eventTitle": "Event 6", "location": "Harvard"},
		{"id": 7, "eventTitle": "Event 7", "location": "Harvard"},
		{"id": 8, "eventTitle": "Event 8", "location": "Harvard"},
		{"id": 9, "eventTitle": "Event 9", "location": "Harvard"}
	];

	callLater(success);
}