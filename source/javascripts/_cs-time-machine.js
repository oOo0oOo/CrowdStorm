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
var reconstruct_state(log_file, time_stamp){
    state = State();

    // Loop through log in reverse order
    for (var i=log_file.length;i==0;i--){
        var event = log_file[i];

        // End if at desired point in time
        if (event.time > time_stamp){
            break;
        };

        // Add nodes or edges
        if(data instanceof Object) {
            switch(data.type){
                case 'node':
                    state.nodes.push(data);
                    break;
                case 'link':
                    state.links.push(data);
                    break;
            }
        };
    };

    return state;

};

