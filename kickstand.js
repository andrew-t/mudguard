document.addEventListener('DOMContentLoaded', function() {
	var all = document.getElementsByClassName('kickstand');
	for (var i = 0; i < all.length; ++i) (function(element, i) {

		// Create a 'guard' div to cover the guarded element:
		if (window.getComputedStyle(element).position == 'static')
			element.style.position = 'relative';
		var guard = document.createElement('div');
		guard.classList.add('mudguard-cover');
		element.appendChild(guard);

		// Make it vanish when clicked:
		guard.addEventListener('click', function() {
			guard.style.display = 'none';
		});
	})(all[i], i);
});