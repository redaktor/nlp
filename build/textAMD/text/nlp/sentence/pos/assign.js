define(["require", "exports", '../../term/verb/verb', '../../term/noun/noun', '../../term/value/value', '../../term/adverb/adverb', '../../term/adjective/adjective'], function (require, exports, Verb, Noun, Value, Adverb, Adjective) {
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
    return assign;
});
