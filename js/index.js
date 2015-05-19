window._VISIT_COOKIE = "_has_visited_site";
window._VISIT_COOKIE_DATE = "_has_visited_site_date";

$(document).ready(function() {
	if (hasVisited())
		return;

	setVisitedCookie();
	sendVisitEvent();
});


function hasVisited() {
	return getFirstVisitCookie();
}

function getFirstVisitCookie() {
	return Cookies.get(window._VISIT_COOKIE);
}

function getFirstVisitedDateCookie() {
	var value = Cookies.get(window._VISIT_COOKIE_DATE);

	if (value)
		return new Date(value);

	return null;
}

function setVisitedCookie() {
    var genSub = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    var guid = genSub() + genSub() + "-" + genSub() + "-" +
      genSub() + "-" + genSub() + "-" + genSub() + genSub() + genSub();

	Cookies.set(window._VISIT_COOKIE, guid);
	Cookies.set(window._VISIT_COOKIE_DATE, (new Date()).toISOString());
}

function sendVisitEvent() {
	var visitEvent = {
		path: location.pathname,
		referrer: document.referrer,
		user: {
			uuid: getFirstVisitCookie(),
			visited_at: getFirstVisitedDateCookie()
		}
	};

	if (location.search && location.search.length) {
		var params = qs.parse(location.search.slice(1));
		visitEvent.params = params;
	}

	Keen.ready(function() {
		window._addEvent("first_visits", visitEvent, function(err, res) {

		}, "First visit using this browser. (No cookie was set before)");

	});
}