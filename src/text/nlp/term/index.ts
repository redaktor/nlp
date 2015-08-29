import _ = require('../_');
import syllables = require("./syllables")
// TODO - only 'en';
import americanize = require("./americanize")
import britishize = require("./britishize")
const REGEXES = {
  capital: /^[A-Z][a-z]/,
  acronym: /([A-Z]\.)+[A-Z]?$/
}
class Term {
  text:string;
  normal:string;
  reason:string;
  constructor(str:string = '', info?:Object) {
    this.text = str.trim();
    this.normal = this.normalize();
    this.reason = '';
  }
  // Term methods..
  normalize() { return _.normalize (this.text, true); }
  is_capital() { return REGEXES.capital.test(this.text); }
  is_acronym() { return REGEXES.acronym.test(this.text); }
  americanize(){ return americanize(this.normal); }
  britishize() { return britishize(this.normal); }
  syllables() { return syllables(this.normal); }
}
// var t = new Term("synthesise")
// console.log(t.americanize())
export = Term;
