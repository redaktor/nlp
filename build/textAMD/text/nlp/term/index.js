define(["require", "exports", '../_', "./syllables", "./americanize", "./britishize"], function (require, exports, _, syllables, americanize, britishize) {
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
    return Term;
});
// var t = new Term("synthesise")
// console.log(t.americanize())
