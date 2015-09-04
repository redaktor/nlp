define(["require", "exports", './_options', '../../dojo/lang', './text/index'], function (require, exports, def, lang, Text) {
    var NLP = (function () {
        function NLP(o) {
            this.options = def;
            this.options = lang.mixin(this.options, o);
            return this;
        }
        NLP.prototype.set = function (v) {
            if (typeof v === 'string') {
                return new Text(this.options).set(v);
            }
            else {
                this.options = lang.mixin(this.options, v);
                return this.options;
            }
            return v;
        };
        return NLP;
    })();
    return NLP;
});
