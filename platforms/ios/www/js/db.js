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
					// Converts Date to EST HH:MM
					events.start_time = formatDate(new Date(events.start_time));
					events.end_time = formatDate(new Date(events.end_time));

					var mapUrl;
					if (device.platform == 'iOS') {
						var tempUrl = "maps://?q="+events.location.lat+","+events.location.long;
						mapUrl = {"mapUrl": tempUrl};
					} else if (device.platform == 'Android') {
						var tempUrl = "geo:"+events.location.lat+","+events.location.long;
						mapUrl = {"mapUrl": tempUrl};
					} else {
						console.error("Not correct Phone Platform, must be iOS or Android!");
					}
					events.mapUrl = mapUrl;
					callLater(callback, events);
				} else {
					navigator.notification.alert("Phone cannot connect to the internet!", null, "Network Error", "OK");
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
					// Converts Date to EST HH:MM
					for (var i = 0; i < events.length; i++) {
						events[i].start_time = formatDate(new Date(events[i].start_time));
						events[i].end_time = formatDate(new Date(events[i].end_time));
					};
					callLater(callback, events);
				} else {
					navigator.notification.alert("Phone cannot connect to the internet!", null, "Network Error", "OK");
				}
			}
		}
		request.send();
	};

	this.findSpeakerById = function(id, callback) {
		var performers = JSON.parse(window.localStorage.getItem("performers"));
		$.each(performers, function(index, evt) {
			if (evt.id == id) {
				callLater(callback, evt);
				return;
			}
		});
	};

	this.findSpeakersByTime = function(time, callback) {
		var performers = JSON.parse(window.localStorage.getItem("performers"));
		var perArray = new Array();
		$.each(performers, function(index, perf) {
			if (perf.time == time) {
				perArray.push(perf);
			}
		});
		callLater(callback, perArray);
	};

	this.findLocations = function(callback) {
		var request = new XMLHttpRequest();
		request.open("GET", "http://ecaasu2015.herokuapp.com/api/locations", true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
					var events = JSON.parse(request.responseText);
					callLater(callback, events);
				}
			} else {
				navigator.notification.alert("Phone cannot connect to the internet!", null, "Network Error", "OK");
			}
		}
		request.send();
	};

	this.findWorkshopById = function(workshop_id, callback) {
		var request = new XMLHttpRequest();
		var url = "http://ecaasu2015.herokuapp.com/api/workshops/" + workshop_id;
		request.open("GET", url , true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
					var workshop = JSON.parse(request.responseText);
					var mapUrl;
					if (device.platform == 'iOS') {
						var tempUrl = "maps://?q="+workshop.location.lat+","+workshop.location.long;
						mapUrl = {"mapUrl": tempUrl};
					} else if (device.platform == 'Android') {
						var tempUrl = "geo:"+workshop.location.lat+","+workshop.location.long;
						mapUrl = {"mapUrl": tempUrl};
					} else {
						console.error("Not correct Phone Platform, must be iOS or Android!");
					}
					workshop.mapUrl = mapUrl;
					callLater(callback, workshop);
				} else {
					navigator.notification.alert("Phone cannot connect to the internet!", null, "Network Error", "OK");
				}
			}
		}
		request.send();
	};

	this.findWorkshopsBySeries = function(series_id, callback) {
		var request = new XMLHttpRequest();
		var url = "http://ecaasu2015.herokuapp.com/api/workshops/?series=" + series_id; 
		request.open("GET", url , true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
					var workshops = JSON.parse(request.responseText);
					callLater(callback, workshops);
				} else {
					navigator.notification.alert("Phone cannot connect to the internet!", null, "Network Error", "OK");
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

	var formatDate = function(date) { 
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
	};

    this.initialize();

    var performers = [
    	{"id": 1, "class": "speaker-img-arch", "time": "opening", "name": "Archipelag-A", "genre": "Poets", "description": "Archipelag-a was created in 1995 by 14 Filipina students at Brown University as an opportunity to voice the many perspectives of silenced Filipinas, and by extension all silenced women. Our words celebrate the multiplicity and diversity of the Filipino culture and experience. Archipelag-a has provided us with a forum - a space to write together, re-read old scripts, and re-perform 19 years of storytelling - to truly appreciate the uncanny similarities and timelessness of our experiences, as well as the beauty contained within the patchwork of our differences, We write because we have each discovered a profound connection through poetry and performance that inextricably ties us to one another, to those that came before us, and to those whom we hope will follow."},
    	{"id": 2, "class": "speaker-img-dan", "time": "opening", "name": "Dan AKA Dan", "genre": "Hip Hop Artist", "description": "During the summer of 2013, Los Angeles-based alternative hip hop artist and Korean adoptee DANakaDAN (Dan Matthews) was reunited with his biological family in Korea, including an identical twin brother (who also raps) he never knew existed. Dan has since released the feature length documentary \"aka DAN\" that has been released via ISAtv, Hulu, and Drama Fever. Dan also released a companion full length album, \"Stuntman,\" which chronicles his experience with adoption, addiction, self, and identity. He currently works as the Director of Productions at International Secret Agents, an Asian American media network founded by Far East Movement and Wong Fu Productions."},
    	{"id": 3, "class": "speaker-img-alex", "time": "opening", "name": "Alex Dang", "genre": "Slam Poet", "description": "Alex Dang is an aspiring poet from Portland, Oregon that started performing slam poetry at 17. Since then, he hasn't slowed down. He has been on the Portland Poetry Slam nationals team in 2013 and 2014. Combining a firework performance style and intimate writing, Alex has earned his way to becoming the Eugene Poetry Grand Slam Champion in 2014. Though his career has only begun, he has been a TEDx speaker for both University of Oregon and Reno, Nevada, and his chapbook, 'You Can Do Better,' is published through Where Are You Press. You can find him in the best burger spot in town or on a stage near you."},
    	{"id": 4, "class": "speaker-img-jenn", "time": "opening", "name": "Jennifer Chung", "genre": "Musician", "description": "Jennifer Chung is one of the first pioneers of YouTube music. Being one of the first people ever to post videos of herself singing, she created a worldwide fan base within 2 years of starting. Now with over 30 million views online and over 130,000 subscribers, Jennifer has become known as a force to be reckoned with not only in the online music community but within the music industry itself. Jennifer has a soulful, resonating voice that has allowed media such as MTV to recognize her as the next big act."},
    	{"id": 5, "class": "speaker-img-dumb", "time": "opening", "name": "Dumbfoundead", "genre": "Rapper, Entertainer", "description": "Better known by his stage name Dumbfoundead, Jonathan is a Korean American entertainer. At an early age, he was exposed to hip-hop at age by entering a community center in MacArthur Park and meeting emcees such as Mark Luv of Zulu Nation, Poppin' Chuck, Cre8 RTN, and Ezrock. This first experience with hip-hop allowed him to develop the technique of freestyling and to educate himself on hip-hop's history and roots. A year later, he was taken to Project Blowed, an open-mic workshop located in Leimert Park in South Central Los Angeles, by a high school friend. There he would continue to hone his abilities as an emcee amongst the influence of \"Blowdians\".His transition from a freestyler to a full-fledged musician is evident in his popular songs and videos."},
    	{"id": 6, "class": "speaker-img-jeni", "time": "closing", "name": "Jeni Suk", "genre": "Musician", "description": "Jeni Suk is a Korean American YouTube artist from Cupertino, California. She's known for her chill sounds, fresh covers, and amazing original tracks. If you look on the internet for information on the origins of Jeni Suk, there isn't much to be found but her 4 sources of social networking. With a staggering 12 million+ views and counting on her YouTube channel, it's no surprise that maybe she doesn't need the help of other social mediums to get her music out there. This Los Angeles native has a sound that sets her apart."},
    	{"id": 7, "class": "speaker-img-lian", "time": "closing", "name": "Liane Wong", "genre": "Chinese Dulcimer", "description": "Liane Wong is currently a 3rd year Electrical Engineering student attending Northeastern University. She has played the Chinese Hammered Dulcimer (yangqin) for 14 years under the instruction of master Zhang Zhentian. She has performed at Lincoln Center, the 2004 Democratic National Convention and at many colleges around New England."},
    	{"id": 8, "class": "speaker-img-hari", "time": "closing", "name": "Hari Kondabolu", "genre": "Comedian", "description": "Hari Kondabolu is a Brooklyn-based, Queens-raised comic who the NY Times has called \"one of the most exciting political comics in stand-up today.\" In March 2014, he released his debut standup album \"Waiting for 2042\" on indie-label Kill Rock Stars. He is currently NYU's APA Institute's \"Artist in Residence\" for the 2014-2015 Academic Year. Hari has done standup on the Late Show with David Letterman, Conan, Jimmy Kimmel Live, Live at Gotham and John Oliver's New York Standup Show. His Comedy Central Presents half-hour television special debuted on the network in February 2011. He was also a writer and correspondent for the Chris Rock-produced Totally Biased with W. Kamau Bell on FX."},
    	{"id": 9, "class": "speaker-img-dark", "time": "closing", "name": "DarkMatter", "genre": "Spoken Word", "description": "DarkMatter is a trans south asian performance art duo compromised of Alok Vaid-Menon and Janani Balasubramanian. Based in New York City, DarkMatter regularly performs to sold-out houses at venues like La MaMa Experimental Theater, Nuyorican Poets Cafe, and the Asian American Writer's Workshop. DarkMatter was recently part of the Public Theater's Under the Radar Festival as well as the Queer International Arts Festival. Known for their quirky aesthetic and political panache, DarkMatter has been invited to perform at stages and universities across the world."},
    	{"id": 10, "class": "speaker-img-dere", "time": "closing", "na4me": "Derek Hsu", "genre": "Chinese Yo-yo", "description": "Derek Hsu, a recent graduate from Northeastern University, is the recent winner of Kollaboration Boston. Over the last decade, the Chinese yo-yo, aka the diabolo, has been gaining popularity all over the world. Since picking up the Chinese yo-yo at the age of 12, Derek has taught at local Chinese schools and participated in multiple cultural shows. A two-time winner of the Association of NJ Chinese School Yo-Yo contest, Derek has been frequently performing around the Boston, New Jersey, and New York areas over the last few years. In 2014, he was also given the opportunity to open for the New York Mets at Citifield Stadium."},
    	{"id": 11, "class": "speaker-img-unof", "time": "closing", "name": "Unofficial Project", "genre": "Dance", "description": "Founded in the Spring of 2005, Unofficial Project started off as a side project of dancers. Combining elements of Asian music and American hip hop culture, UPro promoted the link between the two genres. Since its debut, UPro has expanded and developed in terms of dance palette, taking on more modern forms of hiphop. Now, UPro strives to challenge themselves through competitions and performances; they aim to bring performances that remain true to their own artistic integrity and to showcase the creativity and inspirations of the individuals on the team. Unofficial Project has appeared at various locations at Boston University as well as around the New England area, including Northeastern University, Wellesley College, Boston College, and MIT. They have participated in various competitions including Elements, Prelude New England, and WOD Boston, and have recently placed second at Ring the Alarm 2014."},
    	{"id": 12, "class": "speaker-img-bria", "time": "closing", "name": "Brian, Andrew, JRA", "genre": "Musicians", "description": "What happens when you mix together three great voices from three awesome dudes? You get this amazing trio: Brian Puspos, Andrew Garcia, and JRA! Born from a born into a family of performers, Brian Puspos was constantly around an entertainment environment. Being part of SorealCru, he helped them reach it to the finals. From dancing to singing, he has performed in over 30 countries, been apart of various prestigious crews, attained over 300,000 subscribers on Youtube. With one video with over 7 million views, he is a force of talent to be reckon with. Andrew Garcia is a singer/song writer, playing the guitar and singing since he was 18. In the 2010 American Idol competition, he made it as far as the top 9, being praised by all judges. Though eliminated, Andrew continues to perform and wow his audience with his genuine and amazing voice. Pior to the Idol competition, Andrew was a well known on Youtube. His account contains videos of him doing covers of songs or originals with also family and friends. He has been involved with various other Youtube artists, singing and guest acting. JR Aquino, also known as djkeeno (on Youtube), is from Anchorage Alaska. He has been singing since he was \"kneehigh\". He writes his own lyrics and melodies. He was on American Idol Season 4, making it to the top 44, and was in Team Cee-Lo on The Voice : Season 3. Bringing his amazing voice, he's a special performer you don't want to miss."}
    ];

    window.localStorage.setItem('performers', JSON.stringify(performers));
}


