var _ = require('../_');
var syllables = require("./syllables");
// TODO - only 'en';
var americanize = require("./americanize");
var britishize = require("./britishize");
var REGEXES = {
    capital: /^[A-Z][a-z]/,
    acronym: /([A-Z]\.)+[A-Z]?$/
};
var Term = (function () {
    function Term(str, info) {
        if (str === void 0) { str = ''; }
        this.text = str.trim();
        this.normal = this.normalize();
        this.reason = '';
    }
    // Term methods..
    Term.prototype.normalize = function () { return _.normalize(this.text, true); };
    Term.prototype.is_capital = function () { return REGEXES.capital.test(this.text); };
    Term.prototype.is_acronym = function () { return REGEXES.acronym.test(this.text); };
    Term.prototype.americanize = function () { return americanize(this.normal); };
    Term.prototype.britishize = function () { return britishize(this.normal); };
    Term.prototype.syllables = function () { return syllables(this.normal); };
    return Term;
})();
module.exports = Term;
//# sourceMappingURL=index.js.map