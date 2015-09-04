define(["require", "exports", './_options', '../../dojo/lang', './text/index'], function (require, exports, defaultOptions, lang, Text) {
    var NLP = (function () {
        function NLP(o) {
            this.options = defaultOptions;
            this.language = 'en';
            this.options = lang.mixin(this.options, o);
        }
        NLP.prototype.set = function (v) {
            if (typeof v === 'string') {
                if (v.length < 3) {
                    this.language = v;
                    return this.language;
                }
                return new Text(v);
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
