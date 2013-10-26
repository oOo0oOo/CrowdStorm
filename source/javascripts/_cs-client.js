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

    {type: "link",
        guid: "81315AE5-6DE5-4930-9EEC-33A8F05881E6",
        time: 1234567890125,
        user: "User 1",
        nodeA: "936DA01F-9ABD-4D9D-80C7-02AF85C822A8",
        nodeB: "9AFA6424-21E4-4B91-B9B1-C73F81B8CDD9"}
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

        var settings = $.extend({}, defaults, args);
        var socket = new WebSocket(settings.server);

        socket.onopen = function () {
            socket.send('name:' + settings.user);
        }

        socket.onmessage = function (event) {
            var data = JSON.parse(event.data);
            if(data instanceof Object) {
                nodeMap.push(data);

                if(data.type === "node") {

                }
            }
        };

        return this;
    };

})($);