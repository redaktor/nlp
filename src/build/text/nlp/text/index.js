/**
 * a text object is a series of sentences, along with <br>
 * the generic methods for transforming them
 * @module text/nlp/text/index
 */
var _ = require('../_');
var load = require('../../i18n/load');
var sentenceParser = require('./sentenceParser');
var ngram = require('./ngram');
// let's not block anything - we return promises :
var Promise = require('../../../dojo/Promise');
var Text = (function () {
    function Text(options) {
        this.options = options;
        return this;
    }
    Text.prototype.set = function (str) {
        function parseSentences(resolve) {
            load(this.options.language, ['index'], function (i18nData) {
                function finish(mySentences) {
                    this.sentences = mySentences;
                    return resolve(this);
                }
                sentenceParser(str, this.options).then(finish.bind(this));
                return this;
            });
        }
        return new Promise(parseSentences.bind(this));
    };
    //Text methods
    Text.prototype.ngram = function () {
        var terms = this.terms();
        terms = terms.map(function (t) {
            return t.normal;
        });
        return ngram(terms);
    };
    Text.prototype.text = function () { return this.str; };
    //map over sentence methods
    Text.prototype.terms = function () {
        var arr = this.sentences.map(function (s) {
            return s.terms;
        });
        return _.values(arr);
    };
    Text.prototype.normalised = function () {
        var arr = this.sentences.map(function (s) {
            return s.normalized();
        });
        return _.values(arr).join(' ');
    };
    return Text;
})();
module.exports = Text;
//# sourceMappingURL=index.js.map