// Require either Zepto
// require vendor/zepto

// or jQuery
//= require vendor/jquery


// All Foundation javascript libraries
//= require foundation

// or pick and choose
// require foundation/foundation
// require foundation/foundation.alerts
// require foundation/foundation.clearing
// require foundation/foundation.cookie
// require foundation/foundation.dropdown
// require foundation/foundation.forms
// require foundation/foundation.joyride
// require foundation/foundation.magellan
// require foundation/foundation.orbit
// require foundation/foundation.placeholder
// require foundation/foundation.reveal
// require foundation/foundation.section
// require foundation/foundation.tooltips
// require foundation/foundation.topbar


//= require vendor/dhotson-springy/springy.js
//= require vendor/dhotson-springy/springyui.js

//= require vendor/jquery.gracefulWebSocket.js

//= require _cs-client.js

//= require _cs-canvas.js

$(document).foundation();

$(document).on('click', '#startStorm', function(event){
    event.preventDefault();

    window.csClient = $(document).csClient({user: $('#userName').val()});
    $(document).trigger('loggedin');
});

$(document).on('loggedin', function() {

});