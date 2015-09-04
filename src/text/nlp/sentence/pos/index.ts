/**
 * parts of speech tagging (POS) module for sentences.
 * @module src/text/nlp/pos/index
 */
import Nlp = require('../../interfaces.d');
import lexiconPass = require("./lexiconPass");
import contractions = require("./contractions");
import assign = require("./assign");
import wordRules = require("./wordRules");

//set POS for capitalised words
function capitalSignals(terms:Nlp.ITerm[]) {
  //first words need careful rules
  if (terms[0].isAcronym()) {
    terms[0] = assign(terms[0], "NN", "acronym");
  }
  //non-first-word capitals are nouns
  let i:number;
  for (i = 1; i < terms.length; i++) {
    if (terms[i].isCapital() || terms[i].isAcronym()) {
      terms[i] = assign(terms[i], "NN", "capital_signal");
    }
  }
  return terms
}
//regex-rules for words/suffixes
function rulesPass(terms) {
  let i,j:number;
  for (i = 0; i < terms.length; i++) {
    for (j = 0; j < wordRules.length; j++) {
      if (terms[i].normal.length > 4 && terms[i].normal.match(wordRules[j].reg)) {
        return assign(terms[i], wordRules[j].pos, "rulesPass");
      }
    }
  }
  return terms;
}
function tagger(s:Nlp.ISentence) {
  s.terms = capitalSignals(s.terms)
  s.terms = contractions(s.terms)
  s.terms = lexiconPass(s.terms)
  s.terms = rulesPass(s.terms)
  return s.terms
}
export = tagger;
