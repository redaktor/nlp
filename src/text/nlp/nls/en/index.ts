// data index for "en"
import multiples = require('./lexicon/multiples');
import nounsInflect = require('./nouns/inflect');
import nouns = require('./nouns/index');
import verbsSpecial = require('./verbs/special');
import verbsConjugate = require('./verbs/conjugate');
import verbs = require('./verbs/index');
import adjectivesDecline = require('./adjectives/decline');
import adjectivesDemonym = require('./adjectives/demonym');
import adjectives = require('./adjectives/index');
import adverbsDecline = require('./adverbs/decline');
import numbers = require('./lexicon/numbers');
import dates = require('./lexicon/dates');
import honorifics = require('./lexicon/honorifics');
import abbreviations = require('./lexicon/abbreviations');
import pos = require('./lexicon/pos');
import negate = require('./lexicon/negate');
import firstnames = require('./lexicon/firstnames');
import phrasalVerbs = require('./lexicon/phrasalVerbs');
import rulesNormalisations = require('./rules/normalisations');
import rulesWordnet = require('./rules/wordnet');
import rulesPos = require('./rules/pos');
import rulesSentence = require('./rules/sentence');
import rulesVerb = require('./rules/verb');
import rulesNoun = require('./rules/noun');
import rulesAdjective = require('./rules/adjective');
import rulesAdverb = require('./rules/adverb');
import rulesNumber = require('./rules/number');
import rulesUnits = require('./rules/units');
import rulesDate = require('./rules/date');


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