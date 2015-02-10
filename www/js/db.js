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
						function hours12(date) { 
							function pad(n) {
						         return (n < 10) ? '0' + n : n;
						    }
							hours = date.getHours();
							minutes = date.getMinutes();
							if (hours > 12 && hours < 24) {
								date = (hours-12) + ":" + pad(minutes) + "PM";
							} else if (hours < 12) {
								date = hours + ":" + pad(minutes) + "AM";
							} else if (hours == 24) {
								date = (hours-12) + ":" + pad(minutes) + "AM";
							} else {
								date = hours + ":" + pad(minutes) + "PM";
							}
							return date;
						}
						events[i].start_time = hours12(new Date(events[i].start_time));
						events[i].end_time = hours12(new Date(events[i].end_time));
					};
					callLater(callback, events);
				}
			}
		}
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
}