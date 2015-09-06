var CallbackQueue = (function () {
    function CallbackQueue() {
        this._callbacks = [];
    }
    CallbackQueue.prototype.add = function (callback) {
        var _callback = {
            active: true,
            callback: callback
        };
        this._callbacks.push(_callback);
        callback = null;
        return {
            remove: function () {
                this.remove = function () { };
                _callback.active = false;
                _callback = null;
            }
        };
    };
    CallbackQueue.prototype.drain = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var callbacks = this._callbacks;
        var item;
        // Any callbacks added after drain is called will be processed
        // the next time drain is called
        this._callbacks = [];
        for (var i = 0; i < callbacks.length; i++) {
            item = callbacks[i];
            if (item && item.active) {
                item.callback.apply(null, args);
            }
        }
    };
    return CallbackQueue;
})();
module.exports = CallbackQueue;
//# sourceMappingURL=CallbackQueue.js.map