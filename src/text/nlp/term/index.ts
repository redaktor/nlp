/**
 * a term is an array of Term objects, along with their various methods <br>
 * methods that hang on a parsed set of words
 * @module text/nlp/sentence/index
 */
import _ = require('../_');
import Nlp = require('../interfaces.d');
import syllables = require("./syllables");

// TODO - only for 'en';
import americanize = require("./americanize");
import britishize = require("./britishize");
const REGEXES = {
  capital: /^[A-Z][a-z]/,
  acronym: /([A-Z]\.)+[A-Z]?$/
}
class Term implements Nlp.ITerm {
  options;
  normal;
  text = '';
  reason = '';
  constructor(str:string = '', info?:Object) {
    this.text = str.trim();
    this.normal = this.normalize();
  }
  // Term methods..
  normalize() { return _.normalize (this.text, true); }
  isCapital() { return REGEXES.capital.test(this.text); }
  isAcronym() { return REGEXES.acronym.test(this.text); }
  americanize(){ return americanize(this.normal); }
  britishize() { return britishize(this.normal); }
  syllables() { return syllables(this.normal); }
}
export = Term;
// var t = new Term("synthesise")
// console.log(t.americanize())
