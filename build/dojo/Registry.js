var lang = require('./lang');
var Registry = (function () {
    function Registry(defaultValue) {
        this._entries = [];
        this._defaultValue = defaultValue;
    }
    Registry.prototype.match = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var entries = this._entries.slice(0);
        var entry;
        for (var i = 0; (entry = entries[i]); ++i) {
            if (entry.test.apply(null, args)) {
                return entry.value;
            }
        }
        if (this._defaultValue !== undefined) {
            return this._defaultValue;
        }
        throw new Error('No match found');
    };
    Registry.prototype.register = function (test, value, first) {
        var entries = this._entries;
        var entry = {
            test: test,
            value: value
        };
        entries[first ? 'unshift' : 'push'](entry);
        return {
            remove: function () {
                this.remove = function () { };
                lang.pullFromArray(entries, entry);
                test = value = entries = entry = null;
            }
        };
    };
    return Registry;
})();
module.exports = Registry;
//# sourceMappingURL=Registry.js.map