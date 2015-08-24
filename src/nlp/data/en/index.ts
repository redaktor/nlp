// data index for "en"
import schema = require('./schema');
import multiples = require('./lexicon/multiples');
import nouns_inflect = require('./nouns/inflect');
import nouns = require('./nouns/index');
import verbs_special = require('./verbs/special');
import verbs_conjugate = require('./verbs/conjugate');
import verbs = require('./verbs/index');
import adjectives_decline = require('./adjectives/decline');
import adjectives_demonym = require('./adjectives/demonym');
import adjectives = require('./adjectives/index');
import adverbs_decline = require('./adverbs/decline');
import numbers = require('./lexicon/numbers');
import dates = require('./lexicon/dates');
import honorifics = require('./lexicon/honorifics');
import abbreviations = require('./lexicon/abbreviations');
import pos = require('./lexicon/pos');
import negate = require('./lexicon/negate');
import firstnames = require('./lexicon/firstnames');
import phrasalVerbs = require('./lexicon/phrasalVerbs');
import units = require('./units');


export = {
  schema: schema,
  multiples: multiples,
  nouns_inflect: nouns_inflect,
  nouns: nouns,
  verbs_special: verbs_special,
  verbs_conjugate: verbs_conjugate,
  verbs: verbs,
  adjectives_decline: adjectives_decline,
  adjectives_demonym: adjectives_demonym,
  adjectives: adjectives,
  adverbs_decline: adverbs_decline,
  numbers: numbers,
  dates: dates,
  honorifics: honorifics,
  abbreviations: abbreviations,
  pos: pos,
  negate: negate,
  firstnames: firstnames,
  phrasalVerbs: phrasalVerbs,
  units: units
};