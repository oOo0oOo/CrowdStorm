/**
 * Created with JetBrains RubyMine.
 * User: webdev
 * Date: 10/26/13
 * Time: 12:53 AM
 * To change this template use File | Settings | File Templates.
 */
$( document ).ready(function() {
    var graph = new Springy.Graph();
    var initial_node = graph.newNode({label: 'Parent', guid: '1', size: 40, color: '#EDC951', style: 'circle'});

    // Initialize springy
    var springy = window.springy = jQuery('#stormCanvas').springy({
        graph: graph,
        stiffness: 300.0,
        repulsion: 400.0,
        damping: 0.3
    });

    /*
    // Set mass of all nodes (their representation in layout)
    var set_node_masses = function(mass){
        springy.layout.eachNode(function(n, p){
            p.m = mass;
        });
    };

    // Stop all movement when dragging
    $(document).on('mousedown', '#graphdemo', function(){
        set_node_masses(10000);
    });

    // Detect drop and set back mass
    $(document).on('mouseup', '#graphdemo', function(e){
        // var pos = $('#graphdemo').offset();
        // var n = springy.layout.nearest(pos);
        set_node_masses(1);
    });

    */

    // Node Drawing Event Listener
    $(document).bind('drawnode', function(event, data){
        graph.newNode(data.params);
    });

    // Edge drawing event listener
    $(document).bind('drawedge', function(event, data){
        graph.newEdge(data.params.source, data.params.target, data.params.data);
    });


    // NODE MOCK REDIRECT
    /*$(document).bind('newnode', function(data){
        var params = {label: data.content, guid: '1', size: 45, color: '#20A0B0', style: 'square'};
        var e = jQuery.Event( 'drawnode', { params: params } );
        $(document).trigger( e );
    });*/

    // EDGE MOCK REDIRECT
    $(document).bind('newedge', function(event, params){
        $(document).trigger('drawedge', params );
    });


    // Add a random node
    $(document).on('click', '#add_random_node', function(){
        // Set masses low to enable layouting
        var size = 25 + Math.random() * 30;
        var new_node = graph.newNode({label: 'Child', guid: '2', color: '#00A0B0', size: size, style: 'square'});

        // Link with inital node
        graph.newEdge(initial_node, new_node, {color: '#EB6841', guid: '3'});
    });

});
