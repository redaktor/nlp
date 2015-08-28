define(["require", "exports", "../verb/verb", "../term/term"], function (require, exports, Verb, Term) {
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
    return Sentence;
});
