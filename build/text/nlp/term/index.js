/**
 * a term is an array of Term objects, along with their various methods <br>
 * methods that hang on a parsed set of words
 * @module text/nlp/sentence/index
 */
var _ = require('../_');
var syllables = require("./syllables");
// TODO - only for 'en';
var americanize = require("./americanize");
var britishize = require("./britishize");
var REGEXES = {
    capital: /^[A-Z][a-z]/,
    acronym: /([A-Z]\.)+[A-Z]?$/
};
var Term = (function () {
    function Term(str, info) {
        if (str === void 0) { str = ''; }
        this.text = '';
        this.reason = '';
        this.text = str.trim();
        this.normal = this.normalize();
    }
    // Term methods..
    Term.prototype.normalize = function () { return _.normalize(this.text, true); };
    Term.prototype.isCapital = function () { return REGEXES.capital.test(this.text); };
    Term.prototype.isAcronym = function () { return REGEXES.acronym.test(this.text); };
    Term.prototype.americanize = function () { return americanize(this.normal); };
    Term.prototype.britishize = function () { return britishize(this.normal); };
    Term.prototype.syllables = function () { return syllables(this.normal); };
    return Term;
})();
module.exports = Term;
// var t = new Term("synthesise")
// console.log(t.americanize())
//# sourceMappingURL=index.js.map