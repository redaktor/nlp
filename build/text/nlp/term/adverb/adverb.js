var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Term = require('../index');
var load = require('../../../i18n/load');
var Adverb = (function (_super) {
    __extends(Adverb, _super);
    function Adverb(str, options) {
        _super.call(this, str, options);
        this.parent = 'adverb';
    }
    Adverb.prototype.toAdjective = function () {
        load(this.options.language, ['lexicon/abbreviations', 'lexicon/dates'], function (abbreviations, dates) {
            return '';
            //return to_adjective(this.normal);
        });
    };
    return Adverb;
})(Term);
module.exports = Adverb;
// let t = new Adverb('quickly')
// console.log(t.to_adjective())
//# sourceMappingURL=adverb.js.map