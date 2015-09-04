define(["require", "exports", '../_', '../term/index', './pos/index'], function (require, exports, _, Term, tagger) {
    var TYPES = {
        '?': 'interrogative',
        '!': 'exclamative',
        '.': 'declarative'
    };
    //
    var Sentence = (function () {
        function Sentence(str) {
            if (str === void 0) { str = ''; }
            this.str = '';
            this.terms = [];
            this.str = str;
            this.terms = str.split(' ').map(function (s, i) {
                var info = {
                    index: i
                };
                return new Term(s, info);
            });
        }
        // Sentence methods:
        // the ending punctuation
        Sentence.prototype.terminator = function () {
            var char = this.str.slice(-1) || '';
            if (TYPES[char]) {
                return char;
            }
            return '.';
        };
        // part-of-speech assign each term
        Sentence.prototype.tag = function () {
            this.terms = tagger(this);
            return this.terms;
        };
        // is it a question/statement
        Sentence.prototype.sentence_type = function () {
            var char = this.terminator();
            return TYPES[char] || 'declarative';
        };
        // map over Term methods
        Sentence.prototype.normalized = function () {
            return _.pluck(this.terms, 'normal').join(' ');
        };
        Sentence.prototype.text = function () {
            return _.pluck(this.terms, 'text').join(' ');
        };
        Sentence.prototype.parents = function () {
            return _.pluck(this.terms, 'parent');
        };
        return Sentence;
    })();
    return Sentence;
});
