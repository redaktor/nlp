define(["require", "exports", "./sentences", "../_"], function (require, exports, sentences, _) {
    var Text = (function () {
        function Text(str) {
            this.str = str || '';
            this.sentences = sentences(str).map(function (s) {
                return this.str;
            });
        }
        //Text methods
        Text.prototype.ngram = function () {
            var terms = this.terms();
            terms = terms.map(function (t) {
                return t.normal;
            });
            return 'not implemented yet'; //TODO //ngram(terms);
        };
        //map over sentence methods
        Text.prototype.text = function () {
            var arr = this.sentences.map(function (s) {
                return s.text();
            });
            return _.flatten(arr).join(" ");
        };
        Text.prototype.terms = function () {
            var arr = this.sentences.map(function (s) {
                return s.terms;
            });
            return _.flatten(arr);
        };
        Text.prototype.normalised = function () {
            var arr = this.sentences.map(function (s) {
                return s.normalized();
            });
            return _.flatten(arr).join(" ");
        };
        return Text;
    })();
    return Text;
});
/*
"use strict";
//a text object is a series of sentences, along with the generic methods for transforming them
class Text {

  constructor(str) {
    this.str = str || "";
    this.sentences = sentences(str).map(function(s) {
      return new Sentence(s);
    });
  }


}

module.exports = Text;
*/
