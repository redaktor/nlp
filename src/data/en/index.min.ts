import schema = require('./schema.min');
import multiples = require('./lexicon/multiples.min');
import nouns_inflect = require('./nouns/inflect.min');
import nouns = require('./nouns/index.min');
import verbs_special = require('./verbs/special.min');
import verbs_conjugate = require('./verbs/conjugate.min');
import verbs = require('./verbs/index.min');
import adjectives_decline = require('./adjectives/decline.min');
import adjectives_demonym = require('./adjectives/demonym.min');
import adjectives = require('./adjectives/index.min');
import adverbs_decline = require('./adverbs/decline.min');
import numbers = require('./lexicon/numbers.min');
import dates = require('./lexicon/dates.min');
import honorifics = require('./lexicon/honorifics.min');
import abbreviations = require('./lexicon/abbreviations.min');
import pos = require('./lexicon/pos.min');
import negate = require('./lexicon/negate.min');
import firstnames = require('./lexicon/firstnames.min');
import phrasalVerbs = require('./lexicon/phrasalVerbs.min');
import units = require('./units.min');


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