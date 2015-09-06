var Verb = require('../../term/verb/verb');
var Noun = require('../../term/noun/noun');
var Value = require('../../term/value/value');
var Adverb = require('../../term/adverb/adverb');
var Adjective = require('../../term/adjective/adjective');
// TODO - check e.g.
//  "MD": Verb,
// "DT":   "Determiner",
// "IN":   "Preposition",
// "CC":   "Conjunction"
var mapping = {
    N: Noun,
    P: Noun,
    M: Verb,
    V: Verb,
    J: Adjective,
    R: Adverb,
    C: Value,
    D: Value
};
// swap the Term object with a proper Pos class
function assign(t, pos, reason) {
    if (pos != 'CC') {
        var cat = pos.charAt(0);
        if (mapping[cat] !== undefined) {
            t = new mapping[cat](t.text);
            t.reason = reason;
        }
    }
    return t;
}
module.exports = assign;
//# sourceMappingURL=assign.js.map