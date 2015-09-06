/**
 * a sentence is an array of Term objects, along with their various methods <br>
 * methods that hang on a parsed set of words
 * @module text/nlp/sentence/index
 */
var _ = require('../_');
var Term = require('../term/index');
var tagger = require('./pos/index');
var TYPES = {
    '?': 'interrogative',
    '!': 'exclamative',
    '.': 'declarative'
};
//
var Sentence = (function () {
    function Sentence(str, options) {
        if (str === void 0) { str = ''; }
        this.str = '';
        this.terms = [];
        this.options = options;
        this.str = str;
        this.terms = str.split(' ').map(function (s, i) {
            var info = { index: i };
            return new Term(s, info);
        });
        return this;
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
        return TYPES[this.terminator()] || 'declarative';
    };
    // map over Term methods
    Sentence.prototype.normalized = function () {
        return _.values(this.terms, 'normal').join(' ');
    };
    Sentence.prototype.text = function () {
        return _.values(this.terms, 'text').join(' ');
    };
    Sentence.prototype.parents = function () {
        return _.values(this.terms, 'parent');
    };
    return Sentence;
})();
module.exports = Sentence;
//# sourceMappingURL=index.js.map