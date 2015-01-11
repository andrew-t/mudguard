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

	var all = document.getElementsByClassName('wheelguard'),
		guards = [];
	for (var i = 0; i < all.length; ++i) {
		var element = all[i];

		// Create a 'guard' div to cover the guarded element:
		if (window.getComputedStyle(element).position == 'static')
			element.style.position = 'relative';
		var guard = document.createElement('div');
		guard.classList.add('wheelguard-cover');
		guard.style.position = 'absolute';
		guard.style.display = 'none';
		guard.style.zIndex = '100000';
		guard.style.top = guard.style.left = guard.style.bottom = guard.style.right = '0';
		guards.push(guard);
		element.appendChild(guard);

		// Make it appear and disappear as needed:
		var clearTimer, addTimer;
		guard.addEventListener('mouseover', function() {
			if (lastWheel + timeout > new Date().getTime())
				// The user wheeled but a moment ago; they probably don't want to zoom the map.
				clearTimer = setTimeout(function() {
					guard.style.display = 'none';
					clearTimer = undefined;
				}, timeout);
			else
				// The user hasn't wheeled for ages; they probably came here to play with the map.
				guard.style.display = 'none';
		});
		guard.addEventListener('mouseout', function() {
			// This probably means the user wheeled clean past the map. Best put everything back.
			if (clearTimer) {
				clearTimeout(clearTimer);
				clearTimer = undefined;
			}
		});
		onWheel(guard, function(e) {
			// This should mean the user is continuing to wheel past the map. Reset the timer.
			clearTimeout(clearTimer);
			clearTimer = setTimeout(function() {
				guard.style.display = 'none';
				clearTimer = undefined;
			}, timeout);
		});
	}

	onWheel(window, function(e) {
		// If the document scrolls, that's our cue to replace all the guard covers.
		if (!e.defaultPrevented) {
			guards.forEach(function(guard) {
				guard.style.display = 'block';
			});
			if (clearTimer) {
				clearTimeout(clearTimer);
				clearTimer = undefined;
			}
			lastWheel = new Date().getTime();
		}
	});
});