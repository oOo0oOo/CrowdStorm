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

    window.csClient = $.fn.csClient({server: 'ws://37.218.249.19:8080/cs/ws', user: $('#userName').val()});
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
    var colors = ['#20A0B0', '#6A4A3C', '#CC333F', '#EB6841', '#EDC951'];

    function hashCode(str){
        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        }
        return hash;
    }

    var params = {label: node.content, guid: node.guid, size: 50, color: colors[hashCode(csClient.settings.user) % colors.length], style: 'circle'};
    $(document).trigger('drawnode', params);
});

$(document).on('serveredge', function(event, edge) {

    function findNodeByGuid(guid) {
        var foundNode;

        springy.graph.nodes.forEach(function(n){
            if(n.data.guid === guid) {
                foundNode = n;
                return false;
            }
        });

        return foundNode;
    }

    var sourceNode = findNodeByGuid(edge.source);
    var targetNode = findNodeByGuid(edge.target);

    var params = {source: sourceNode, target: targetNode, data: {}};
    $(document).trigger('drawedge', params);
});

$(window).on('resize', function(event) {
    var $canvas = $('#stormCanvas').first();

    $canvas.attr('width',$canvas.parent().width());
    $canvas.attr('height',$canvas.parent().height());
});

$(document).on('cleargraph', function() {
    springy.graph.nodeSet = {};
    springy.graph.edges = [];
    springy.graph.nodes = [];
    springy.graph.adjacency = {};
    springy.graph.notify();

    $(window).trigger('resize');
});
