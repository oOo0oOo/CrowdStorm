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

//= require _cs-time-machine.js

$(document).foundation();

$(document).on('click', '#startStorm', function(event){
    event.preventDefault();

    window.csClient = $(document).csClient({server: 'ws://37.218.249.19:8080/cs/ws', user: $('#userName').val()});
    $(document).trigger('loggedin');
});

$(document).on('loggedin', function() {
    $('header.page-header').addClass('go-away');
    $('section.introduction').addClass('go-away');
    $('section.storm-plane').removeClass('go-away');
});

$(document).on('newnode', function(event, content) {
    csClient.generateAndSendNode(content);
});

$(document).on('newedge', function(event, params) {
    csClient.generateAndSendEdge(params);
});

$(document).on('servernode', function(event, node) {
    var params = {label: node.content, guid: node.guid, size: 45, color: '#20A0B0', style: 'square'};
    $(document).trigger('drawnode', params);
});

$(document).on('serveredge', function(event, edge) {

    function findNodeByGuid(guid) {
        var foundNode;

        springy.layout.graph.nodes.forEach(function(n){
            if(n.data.guid === guid) {
                foundNode = n;
                return false;
            }
        });

        return foundNode;
    }

    var sourceNode = findNodeByGuid(edge.source);
    var targetNode = findNodeByGuid(edge.target);

    var params = {source: sourceNode, target: targetNode};
    $(document).trigger('drawedge', params);
});