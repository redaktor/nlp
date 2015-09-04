//
import Nlp = require('../../interfaces.d');
import Term = require('../index')
import load = require('../../data/load');

class Adverb extends Term {
  options;
  parent = 'adverb';
  constructor(str:string, options:Nlp.IOptions) {
    super(str, options);
  }
  toAdjective() {
    load(this.options.language, ['lexicon/abbreviations','lexicon/dates'], function(abbreviations, dates):string {
      
      return '';
      //return to_adjective(this.normal);
    });
  }
}

export = Adverb;
// let t = new Adverb('quickly')
// console.log(t.to_adjective())
