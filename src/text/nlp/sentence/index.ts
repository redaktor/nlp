/**
 * a sentence is an array of Term objects, along with their various methods <br>
 * methods that hang on a parsed set of words
 * @module text/nlp/sentence/index
 */
import _ = require('../_');
import Nlp = require('../interfaces.d');
import Term = require('../term/index');
import tagger = require('./pos/index');
const TYPES = {
  '?': 'interrogative',
  '!': 'exclamative',
  '.': 'declarative'
}
//
class Sentence implements Nlp.ISentence {
  options;
  str = '';
  terms = [];

  constructor(str:string = '', options:Nlp.IOptions) {
    this.options = options;
    this.str = str;
    this.terms = str.split(' ').map(function(s, i) {
      const info = { index: i };
      return new Term(s, info);
    });
    return this;
  }

  // Sentence methods:
  // the ending punctuation
  terminator() {
    let char = this.str.slice(-1) || '';
    if (TYPES[char]) { return char; }
    return '.';
  }
  // part-of-speech assign each term
  tag() {
    this.terms = tagger(this);
    return this.terms;
  }
  // is it a question/statement
  sentence_type() {
    return TYPES[this.terminator()] || 'declarative';
  }
  // map over Term methods
  normalized() {
    return _.values(this.terms, 'normal').join(' ');
  }
  text() {
    return _.values(this.terms, 'text').join(' ');
  }
  parents() {
    return _.values(this.terms, 'parent');
  }
}

export = Sentence;
