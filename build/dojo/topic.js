var Evented = require('./Evented');
var hub = new Evented();
function subscribe(topic, listener) {
    return hub.on.apply(hub, arguments);
}
exports.subscribe = subscribe;
function publish(topic) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    hub.emit.apply(hub, arguments);
}
exports.publish = publish;
//# sourceMappingURL=topic.js.map