var defaults = require('./options');
var lang = require('../dojo/lang');
var Nlp = require('./nlp/index');
var TEXT = (function () {
    function TEXT(o) {
        if (o === void 0) { o = {}; }
        this.options = defaults;
        this.options = lang.mixin(defaults, o);
        return this;
    }
    TEXT.prototype.set = function (v) {
        if (typeof v === 'string') {
            return new Nlp(this.options).set(v);
        }
        else {
            this.options = lang.mixin(this.options, v);
            return this;
        }
        return v;
    };
    return TEXT;
})();
module.exports = TEXT;
//# sourceMappingURL=index.js.map