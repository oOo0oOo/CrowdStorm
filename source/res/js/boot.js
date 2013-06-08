//= require '_modernizr.js'

/**
 * Global modernizer load (yepnope) to load main script
 */
Modernizr.load([{
	both : ['/res/js/main.js'],
	complete : function() {
		$(document).foundation();
		$(document).trigger('jsloaded');
	}
}]);