var Verb = require("../verb/verb");
var Term = require("../term/term");
var Sentence = (function () {
    function Sentence(text) {
        this.text = text;
        this.terms = text.split(" ").map(function (t) {
            return new Term(t);
        });
    }
    Sentence.prototype.tag = function () {
        this.terms = this.terms.map(function (t) {
            return new Verb(t.text);
        });
    };
    Sentence.prototype.syllables = function () {
        return this.terms.reduce(function (arr, t) {
            return arr.concat(t.syllables());
        }, []);
    };
    return Sentence;
})();
module.exports = Sentence;
