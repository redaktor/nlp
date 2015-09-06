var on = require('../on');
function once(type) {
    return function (target, listener, capture) {
        var handle = on(target, type, function () {
            handle.remove();
            listener.apply(this, arguments);
        });
        return handle;
    };
}
;
module.exports = once;
//# sourceMappingURL=once.js.map