import multiples = require('./lexicon/multiples.min');
import nounsInflect = require('./nouns/inflect.min');
import nouns = require('./nouns/index.min');
import verbsSpecial = require('./verbs/special.min');
import verbsConjugate = require('./verbs/conjugate.min');
import verbs = require('./verbs/index.min');
import adjectivesDecline = require('./adjectives/decline.min');
import adjectivesDemonym = require('./adjectives/demonym.min');
import adjectives = require('./adjectives/index.min');
import adverbsDecline = require('./adverbs/decline.min');
import numbers = require('./lexicon/numbers.min');
import dates = require('./lexicon/dates.min');
import honorifics = require('./lexicon/honorifics.min');
import abbreviations = require('./lexicon/abbreviations.min');
import pos = require('./lexicon/pos.min');
import negate = require('./lexicon/negate.min');
import firstnames = require('./lexicon/firstnames.min');
import phrasalVerbs = require('./lexicon/phrasalVerbs.min');
import rulesNormalisations = require('./rules/normalisations.min');
import rulesWordnet = require('./rules/wordnet.min');
import rulesPos = require('./rules/pos.min');
import rulesSentence = require('./rules/sentence.min');
import rulesVerb = require('./rules/verb.min');
import rulesNoun = require('./rules/noun.min');
import rulesAdjective = require('./rules/adjective.min');
import rulesAdverb = require('./rules/adverb.min');
import rulesNumber = require('./rules/number.min');
import rulesUnits = require('./rules/units.min');
import rulesDate = require('./rules/date.min');


export = {
	multiples: multiples,
	nounsInflect: nounsInflect,
	nouns: nouns,
	verbsSpecial: verbsSpecial,
	verbsConjugate: verbsConjugate,
	verbs: verbs,
	adjectivesDecline: adjectivesDecline,
	adjectivesDemonym: adjectivesDemonym,
	adjectives: adjectives,
	adverbsDecline: adverbsDecline,
	numbers: numbers,
	dates: dates,
	honorifics: honorifics,
	abbreviations: abbreviations,
	pos: pos,
	negate: negate,
	firstnames: firstnames,
	phrasalVerbs: phrasalVerbs,
	rulesNormalisations: rulesNormalisations,
	rulesWordnet: rulesWordnet,
	rulesPos: rulesPos,
	rulesSentence: rulesSentence,
	rulesVerb: rulesVerb,
	rulesNoun: rulesNoun,
	rulesAdjective: rulesAdjective,
	rulesAdverb: rulesAdverb,
	rulesNumber: rulesNumber,
	rulesUnits: rulesUnits,
	rulesDate: rulesDate
};