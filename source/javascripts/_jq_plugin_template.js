/**
 * Created with JetBrains RubyMine.
 * User: webdev
 * Date: 10/26/13
 * Time: 12:50 AM
 * To change this template use File | Settings | File Templates.
 */
(function($) {

    $.fn.myplugin = function(args) {

        var defaults = {
            abc : false,
            def : 'mmax',
        };

        var settings = $.extend({}, defaults, args);

        this.each(function() {

        });
    };

})($);