/**
 * a text object is a series of sentences, along with <br>
 * the generic methods for transforming them
 * @module text/nlp/text/index
 */
import _ = require('../_');
import Nlp = require('../interfaces.d');
import load = require('../../data/load');
import sentenceParser = require('./sentenceParser');
import ngram = require('./ngram');
// let's not block anything - we return promises :
import Promise = require('../../../dojo/Promise');

class Text implements Nlp.IText {
  options:Nlp.IOptions;
  str:string;
  sentences:Nlp.ISentence[];
  constructor(options:Nlp.IOptions) {
    this.options = options;
    return this;
  }
  set<T>(str:string) : Promise<any> {
    function parseSentences(resolve:(sentences) => Nlp.IText) {
      load(this.options.language, ['index'], function(i18nData) : Nlp.IText {
        
        function finish(mySentences:string[]) {
          this.sentences = mySentences;
          return resolve(this);
        }
        sentenceParser(str, this.options).then(finish.bind(this));
        return this;
      });
    }
  	return new Promise(parseSentences.bind(this));


  }
  //Text methods
  ngram():Object {
    let terms = this.terms();
    terms = terms.map(function(t) {
      return t.normal;
    });
    return ngram(terms);
  }
  text():string { return this.str; }
  //map over sentence methods
  terms():any[] {
    const arr = this.sentences.map(function(s) {
      return s.terms;
    });
    return _.values(arr);
  }
  normalised():string {
    const arr = this.sentences.map(function(s) {
      return s.normalized();
    });
    return _.values(arr).join(' ');
  }
}
export = Text;
