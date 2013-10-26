/**
 * Created with JetBrains RubyMine.
 * User: webdev
 * Date: 10/26/13
 * Time: 12:53 AM
 * To change this template use File | Settings | File Templates.
 */
$( document ).ready(function() {
    var graph = new Springy.Graph();
    //var initial_node = graph.newNode({label: 'Parent', guid: '1', size: 40, color: '#EDC951', style: 'circle'});

    // Initialize springy
    var springy = window.springy = jQuery('#stormCanvas').springy({
        graph: graph,
        stiffness: 300.0,
        repulsion: 400.0,
        damping: 0.3
    });

    // Node Drawing Event Listener
    $(document).bind('drawnode', function(event, params){
        graph.newNode(params);
    });

    // Edge drawing event listener
    $(document).bind('drawedge', function(event, params){
        graph.newEdge(params.source, params.target, params.data);
    });
});
