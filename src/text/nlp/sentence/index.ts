/**
 * a sentence is an array of Term objects, along with their various methods <br>
 * methods that hang on a parsed set of words
 * @module src/pos/sentence
 */
import _ = require('../_');
import Nlp = require('./module');
import Term = require('../term/index');
import tagger = require('./pos/tagger.js');
const TYPES = {
  '?': 'interrogative',
  '!': 'exclamative',
  '.': 'declarative'
}
//
class Sentence {

  str:string = '';
  terms:any[] = [];

  constructor(str:string = '') {
    this.str = str;
    this.terms = str.split(' ').map(function(s, i) {
      let info = {
        index: i
      };
      return new Term(s, info);
    });
  }

  //Sentence methods:
  //the ending punctuation
  terminator() {
    let char = this.str.slice(-1) || '';
    if (TYPES[char]) { return char; }
    return '.';
  }

  //part-of-speech assign each term
  tag() {
    this.terms = tagger(this);
    return this.terms;
  }

  //is it a question/statement
  sentence_type() {
    let char = this.terminator()

    return TYPES[char] || 'declarative';
  }

  //map over Term methods
  normalized() {
    return _.pluck(this.terms, 'normal').join(' ');
  }
  text() {
    return _.pluck(this.terms, 'text').join(' ');
  }
  parents() {
    return _.pluck(this.terms, 'parent');
  }
}

export = Sentence;
