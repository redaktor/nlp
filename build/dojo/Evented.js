var on = require('./on');
var aspect = require('./aspect');
var Evented = (function () {
    function Evented() {
    }
    Evented.prototype.on = function (type, listener) {
        var _this = this;
        return on.parse(this, type, listener, this, function (target, type) {
            var name = '__on' + type;
            if (!_this[name]) {
                Object.defineProperty(_this, name, {
                    configurable: true,
                    value: undefined,
                    writable: true
                });
            }
            return aspect.on(_this, '__on' + type, listener);
        });
    };
    Evented.prototype.emit = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        type = '__on' + type;
        var method = this[type];
        if (method) {
            return method.apply(this, args);
        }
    };
    return Evented;
})();
module.exports = Evented;
//# sourceMappingURL=Evented.js.map