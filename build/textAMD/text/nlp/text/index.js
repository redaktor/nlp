define(["require", "exports", '../_', '../../data/load', './sentenceParser', './ngram', '../../../dojo/Promise'], function (require, exports, _, load, sentenceParser, ngram, Promise) {
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
    return Text;
});
