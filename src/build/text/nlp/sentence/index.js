var Term = require('../term/term');
var fns = require('../fns.js');
var tagger = require('./pos/tagger.js');
//a sentence is an array of Term objects, along with their various methods
var Sentence = (function () {
    function Sentence(str) {
        this.str = '';
        this.terms = [];
        this.str = str || '';
        var terms = str.split(' ');
        this.terms = terms.map(function (s, i) {
            var info = {
                index: i
            };
            return new Term(s, info);
        });
    }
    //Sentence methods:
    //the ending punctuation
    Sentence.prototype.terminator = function () {
        var allowed = {
            '.': true,
            '!': true,
            '?': true
        };
        var char = this.str.slice(-1) || '';
        if (allowed[char]) {
            return char;
        }
        return '.';
    };
    //part-of-speech assign each term
    Sentence.prototype.tag = function () {
        this.terms = tagger(this);
        return this.terms;
    };
    //is it a question/statement
    Sentence.prototype.sentence_type = function () {
        var char = this.terminator();
        var types = {
            '?': 'interrogative',
            '!': 'exclamative',
            '.': 'declarative',
        };
        return types[char] || 'declarative';
    };
    //map over Term methods
    Sentence.prototype.normalized = function () {
        return fns.pluck(this.terms, 'normal').join(' ');
    };
    Sentence.prototype.text = function () {
        return fns.pluck(this.terms, 'text').join(' ');
    };
    Sentence.prototype.parents = function () {
        return fns.pluck(this.terms, 'parent');
    };
    return Sentence;
})();
module.exports = Sentence;
//# sourceMappingURL=index.js.map