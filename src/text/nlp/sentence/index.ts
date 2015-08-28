import Term = require('../term/term');
import fns = require('../fns.js');
import tagger = require('./pos/tagger.js');

//a sentence is an array of Term objects, along with their various methods
class Sentence {

  str:String = '';
  terms:any[] = [];

  constructor(str:String) {
    this.str = str || '';
    let terms = str.split(' ');
    this.terms = terms.map(function(s, i) {
      let info = {
        index: i
      }
      return new Term(s, info);
    });
  }

  //Sentence methods:

  //the ending punctuation
  terminator() {
    let allowed = {
      '.': true,
      '!': true,
      '?': true
    }
    let char = this.str.slice(-1) || '';
    if (allowed[char]) {
      return char
    }
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
    let types = {
      '?': 'interrogative',
      '!': 'exclamative',
      '.': 'declarative',
    }
    return types[char] || 'declarative';
  }

  //map over Term methods
  normalized() {
    return fns.pluck(this.terms, 'normal').join(' ');
  }
  text() {
    return fns.pluck(this.terms, 'text').join(' ');
  }
  parents() {
    return fns.pluck(this.terms, 'parent');
  }
}

export = Sentence;
