/**
 * Created with JetBrains RubyMine.
 * User: webdev
 * Date: 10/26/13
 * Time: 12:38 PM
 * To change this template use File | Settings | File Templates.
 */

var State = function() {
    this.nodes = [];
    this.links = [];
};

// Calculate a  state from the log file up until time_stamp
var reconstruct_state = function(log_file, time_stamp){
    state = State();

    // Loop through log in reverse order
    for (var i=log_file.length;i==0;i--){
        var event = log_file[i];

        // End if at desired point in time
        if (event.time > time_stamp){
            break;
        };

        // Perform change to state
        switch(data.type){
            case 'node':
                state.nodes.push(data);
                break;
            case 'link':
                state.links.push(data);
                break;
        }
    };
    return state;
};


// Trigger the necessary events for a given state
var trigger_drawing = function(state){
    // Nodes
    state.node.forEach(function(n){
        $(document).trigger('drawnode', n.data);
    });
    // And edges
    state.links.forEach(function(l){
        // find involved nodes
        var filter1 = function(n){return (n.guid == l.nodeA)};
        var filter2 = function(n){return (n.guid == l.nodeB)};
        var node1 = graph.filterNodes(filter1);
        var node2 = graph.filterNodes(filter2);
        $(document).trigger('drawedge', {source: node1, target: node2, data: {}});
    };
};

