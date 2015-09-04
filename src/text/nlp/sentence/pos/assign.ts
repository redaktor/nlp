import schema = require('../../schema');
import Verb = require('../../term/verb/verb');
import Noun = require('../../term/noun/noun');
import Value = require('../../term/value/value');
import Adverb = require('../../term/adverb/adverb');
import Adjective = require('../../term/adjective/adjective');
// TODO - check e.g.
//  "MD": Verb,
// "DT":   "Determiner",
// "IN":   "Preposition",
// "CC":   "Conjunction"
const mapping = {
  N: Noun,
  P: Noun,
  M: Verb,
  V: Verb,
  J: Adjective,
  R: Adverb,
  C: Value,
  D: Value
}
// swap the Term object with a proper Pos class
function assign(t, pos, reason) {  // TODO args should be Interface ...
  if (pos != 'CC') {
    const cat = pos.charAt(0);
    if (mapping[cat] !== undefined) {
      t = new mapping[cat](t.text);
      t.reason = reason;
    }
  }
  return t;
}
export = assign;
