var sampleMessages = [
    {type: "node",
        guid: "936DA01F-9ABD-4D9D-80C7-02AF85C822A8",
        time: 1234567890123,
        user: "User 1",
        content: "Test Content"},

    {type: "node",
        guid: "9AFA6424-21E4-4B91-B9B1-C73F81B8CDD9",
        time: 1234567890123,
        user: "User 1",
        content: "Second Test Content"},

    {type: "edge",
        guid: "81315AE5-6DE5-4930-9EEC-33A8F05881E6",
        time: 1234567890125,
        user: "User 1",
        source: "936DA01F-9ABD-4D9D-80C7-02AF85C822A8",
        target: "9AFA6424-21E4-4B91-B9B1-C73F81B8CDD9"}
];

(function ($) {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    $.fn.csClient = function (args) {
        var nodeMap = [];

        var defaults = {
            server: 'ws://echo.websocket.org/',
            user: 'Default User'
        };

        var client = this;

        client.settings = $.extend({}, defaults, args);
        var socket = new WebSocket(client.settings.server);

        socket.onopen = function () {
            socket.send('name:' + client.settings.user);
        }

        socket.onmessage = function (event) {
            var data;

            try {
                data = JSON.parse(event.data);
            } catch(e) {
                return;
            }

            if(data instanceof Object) {
                nodeMap.push(data);

                if(data.type === 'node') {
                    $(document).trigger('servernode', data);
                } else if(data.type === 'edge') {
                    $(document).trigger('serveredge', data);
                }
            }
        };

        this.generateAndSendNode = function(content) {
            var generatedGuid = guid();
            var node = {type: 'node', guid: generatedGuid, time: new Date().getTime(), user: client.settings.user, content: content};
            socket.send(JSON.stringify(node));
            return node;
        }

        this.generateAndSendEdge = function(params) {
            var generatedGuid = guid();
            var edge = {type: 'edge', guid: generatedGuid, time: new Date().getTime(), user: client.settings.user, source: params.source.data.guid, target: params.target.data.guid};
            socket.send(JSON.stringify(edge));
            return edge;
        }

        return this;
    };

})($);