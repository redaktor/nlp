var lexiconPass = require("./lexiconPass");
var contractions = require("./contractions");
var assign = require("./assign");
var wordRules = require("./wordRules");
//set POS for capitalised words
function capitalSignals(terms) {
    //first words need careful rules
    if (terms[0].isAcronym()) {
        terms[0] = assign(terms[0], "NN", "acronym");
    }
    //non-first-word capitals are nouns
    var i;
    for (i = 1; i < terms.length; i++) {
        if (terms[i].isCapital() || terms[i].isAcronym()) {
            terms[i] = assign(terms[i], "NN", "capital_signal");
        }
    }
    return terms;
}
//regex-rules for words/suffixes
function rulesPass(terms) {
    var i, j;
    for (i = 0; i < terms.length; i++) {
        for (j = 0; j < wordRules.length; j++) {
            if (terms[i].normal.length > 4 && terms[i].normal.match(wordRules[j].reg)) {
                return assign(terms[i], wordRules[j].pos, "rulesPass");
            }
        }
    }
    return terms;
}
function tagger(s) {
    s.terms = capitalSignals(s.terms);
    s.terms = contractions(s.terms);
    s.terms = lexiconPass(s.terms);
    s.terms = rulesPass(s.terms);
    return s.terms;
}
module.exports = tagger;
//# sourceMappingURL=index.js.map