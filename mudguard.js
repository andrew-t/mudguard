document.addEventListener('DOMContentLoaded', function() {

	var timeout = 750,
		lastWheel = new Date().getTime();

	function onWheel(element, callback) {
		element.addEventListener('wheel', callback);
		// Non-standard wheel events:
		element.addEventListener('mousewheel', callback);
		element.addEventListener('DOMMouseScroll', callback);
		element.addEventListener('MozMousePixelScroll', callback);
	}

	var all = document.getElementsByClassName('mudguard'),
		guards = [],
		clearTimers = [];
	for (var i = 0; i < all.length; ++i) (function(element, i) {

		// Create a 'guard' div to cover the guarded element:
		if (window.getComputedStyle(element).position == 'static')
			element.style.position = 'relative';
		var guard = document.createElement('div');
		guard.classList.add('mudguard-cover');
		guards.push(guard);
		element.appendChild(guard);

		// Make it appear and disappear as needed:
		guard.addEventListener('mouseover', function() {
			var timeLeft = lastWheel + timeout - new Date().getTime();
			if (timeLeft > 0)
				// The user wheeled but a moment ago; they probably don't want to zoom the map.
				clearTimers[i] = setTimeout(function() {
					guard.style.display = 'none';
					clearTimers[i] = undefined;
				}, timeLeft);
			else
				// The user hasn't wheeled for ages; they probably came here to play with the map.
				guard.style.display = 'none';
		});
		guard.addEventListener('mouseout', function() {
			console.log(leaving)
			// This probably means the user wheeled clean past the map. Best put everything back.
			if (clearTimers[i]) {
				clearTimeout(clearTimers[i]);
				clearTimers[i] = undefined;
			}
		});
		onWheel(guard, function(e) {
			// This should mean the user is continuing to wheel past the map. Reset the timer.
			clearTimeout(clearTimers[i]);
			clearTimers[i] = setTimeout(function() {
				guard.style.display = 'none';
				clearTimers[i] = undefined;
			}, timeout);
		});
	})(all[i], i);

	onWheel(window, function(e) {
		// If the document scrolls, that's our cue to replace all the guard covers.
		if (!e.defaultPrevented) {
			guards.forEach(function(guard) {
				guard.style.display = 'block';
			});
			clearTimers.forEach(function (clearTimer) {
				if (clearTimer) {
					clearTimeout(clearTimer);
					clearTimer = undefined;
				}
			});
			lastWheel = new Date().getTime();
		}
	});
});