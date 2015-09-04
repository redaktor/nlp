
import _ = require('../../../nlp/_');
import data = require('../index');
import schema = require('../../../nlp/schema');
import parents = require('../../../nlp/parents'); // TODO - does not exist yet
var main = {};

  var zip:any = { EX: [ 'there' ],
  NN: 
   [ 'president',
     'dollar',
     'student',
     'patent',
     'funding',
     'morning',
     'banking',
     'ceiling',
     'energy',
     'secretary',
     'purpose',
     'event' ],
  NNS: [ 'friends', 'sons', 'partners' ],
  CC: 
   [ 'how',
     'or',
     'while',
     'nor',
     'though',
     'because',
     'but',
     'for',
     'and',
     'if',
     'however',
     'before',
     'although',
     'not',
     'whether',
     'yet',
     'therefore',
     'plus',
     'versus' ],
  VBD: [ 'walked', 'where\'d', 'when\'d', 'how\'d', 'what\'d' ],
  VBN: [ 'born' ],
  VBG: [ 'according', 'resulting', 'staining' ],
  DT: 
   [ 'that',
     'this',
     'these',
     'those',
     'such',
     'neither',
     'which',
     'what',
     'the',
     'no',
     'any',
     'each',
     'whatever',
     'whichever',
     'whenever',
     'whoever',
     'wherever',
     'an',
     'a',
     'own',
     'few',
     'both',
     'much',
     'some',
     'enough',
     'every',
     'another',
     'plenty',
     'least',
     'various',
     'either',
     'else',
     'la',
     'le',
     'les',
     'des',
     'de',
     'du',
     'el' ],
  IN: 
   [ 'in',
     'out',
     'on',
     'off',
     'away',
     'back',
     'over',
     'under',
     'up',
     'down',
     'together',
     'apart',
     'into',
     'for',
     'against',
     'after',
     'before',
     'of',
     'about',
     'to',
     'round',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'across',
     'ahead',
     'upon',
     'aback',
     'forth',
     'along',
     'way',
     'with',
     'without',
     'until',
     'except',
     'by',
     'between',
     'at',
     'as',
     'from',
     'among',
     'amid',
     'since',
     'within',
     'during',
     'per',
     'throughout',
     'than',
     'via',
     'despite',
     'above',
     'below',
     'unless',
     'whereas',
     'unlike',
     'towards',
     'besides',
     'amidst',
     'amongst',
     'apropos',
     'atop',
     'barring',
     'chez',
     'mid',
     'midst',
     'notwithstanding',
     'qua',
     'sans',
     'vis-a-vis',
     'thru',
     'till',
     'versus',
     'w/o',
     '\'o',
     'o\'',
     'a\'' ],
  PP: 
   [ 'my',
     'myself',
     'your',
     'yourself',
     'yourselves',
     'himself',
     'herself',
     'itself',
     'ourselves',
     'themself',
     'themselves',
     'none',
     'who',
     'whom',
     'whose',
     'something',
     'anything',
     'anyone',
     'lot',
     'nothing',
     'everything' ],
  UH: 
   [ 'uhh',
     'uh-oh',
     'ugh',
     'sheesh',
     'eww',
     'pff',
     'voila',
     'oy',
     'eep',
     'hurrah',
     'yuck',
     'ow',
     'duh',
     'oh',
     'hmm',
     'yeah',
     'whoa',
     'ooh',
     'whee',
     'ah',
     'bah',
     'gah',
     'yaa',
     'phew',
     'gee',
     'ahem',
     'eek',
     'meh',
     'yahoo',
     'oops',
     'd\'oh',
     'psst',
     'argh',
     'grr',
     'nah',
     'shhh',
     'whew',
     'mmm',
     'yay',
     'uh-huh',
     'boo',
     'wow',
     'nope' ],
  FW: [ 'ie', 'etc' ],
  RB: 
   [ 'when',
     'whence',
     'where',
     'why',
     'now',
     'again',
     'here',
     'so',
     'very',
     'just',
     'too',
     'quite',
     'then',
     'once',
     'maybe',
     'rather',
     'anyway',
     'hence',
     'further',
     'already',
     'soon',
     'directly',
     'toward',
     'forever',
     'apart',
     'instead',
     'yes',
     'alone',
     'ago',
     'indeed',
     'ever',
     'perhaps',
     'thus',
     'often',
     'never',
     'always',
     'sometimes',
     'also',
     'several',
     'randomly',
     'abroad',
     'almost',
     'twice',
     'somewhat',
     'somehow',
     'meanwhile',
     'furthermore',
     'aside',
     'moreover',
     'anymore',
     'newly',
     'damn',
     'absolutely',
     'actually',
     'apparently',
     'approximately',
     'certainly',
     'clearly',
     'completely',
     'definitely',
     'easily',
     'effectively',
     'entirely',
     'essentially',
     'exactly',
     'extremely',
     'fairly',
     'frankly',
     'frequently',
     'generally',
     'hardly',
     'heavily',
     'highly',
     'hopefully',
     'largely',
     'literally',
     'mostly',
     'necessarily',
     'nicely',
     'obviously',
     'particularly',
     'possibly',
     'primarily',
     'probably',
     'precisely',
     'really',
     'relatively',
     'seriously',
     'significantly',
     'slightly',
     'specifically',
     'strongly',
     'surely',
     'totally',
     'truly',
     'typically',
     'ultimately',
     'usually',
     'virtually',
     'widely' ],
  RBR: [ 'more' ],
  RBS: [ 'most' ] }
  var unzip = function lexicon(cat?){
	var nrOnes = Object.keys(data.numbers.ones).filter(function(s){ return s!='a' })
	var did = {
		NN: data.nounsInflect.NN.map(function(a){ return a[0]; }).concat(Object.keys(data.nounsInflect.uncountables)),
		NNS: data.nounsInflect.NN.map(function(a){ return a[1]; }),
		VBD: data.verbsConjugate.irregulars.map(function(o){ return o.past; }),
		VBG: data.verbsConjugate.irregulars.map(function(o){ return o.gerund; }),
		RB: Object.keys(data.adverbsDecline).concat(Object.keys(data.adjectivesDecline.adverb.to).map(function(s) {
			return data.adjectivesDecline.adverb.to[s];
		})),
	}
	var lexiZip = {
		NNA: Object.keys(data.verbsConjugate.irregularDoers).map(function(s){ return data.verbsConjugate.irregularDoers[s];  }),
		NNAB: data.abbreviations.nouns,
		NNP: Object.keys(data.firstnames),
		PP: Object.keys(data.nouns.PP),
		PRP: Object.keys(data.nouns.PRP),
		CP: Object.keys(data.verbsSpecial.CP),
		MD: Object.keys(data.verbsSpecial.MD),
		VBP: data.verbsConjugate.irregulars.map(function(o){ return o.infinitive; }),
		VBZ: data.verbsConjugate.irregulars.map(function(o){ return o.present; }),
		JJR: Object.keys(data.adjectivesDecline.comparative.to).map(function(s){ return data.adjectivesDecline.comparative.to[s]; }),
		JJS: Object.keys(data.adjectivesDecline.superlative.to).map(function(s){ return data.adjectivesDecline.superlative.to[s]; }),
		JJ: data.adjectivesDemonym.concat(
				Object.keys(data.adjectivesDecline.adverb.no), Object.keys(data.adjectivesDecline.adverb.to),
				Object.keys(data.adjectivesDecline.comparative.to), Object.keys(data.adjectivesDecline.superlative.to),
				Object.keys(data.adverbsDecline).map(function(s) { return data.adverbsDecline[s]; })
		),
		CD: nrOnes.concat(
			Object.keys(data.numbers.teens),
			Object.keys(data.numbers.tens),
			Object.keys(data.numbers.multiple),
			Object.keys(data.dates.months),
			Object.keys(data.dates.days)
		)
	}
	//::NODE::
	if (cat===1) {return [did,lexiZip]}
	//::

	if (!cat) {
		var toMain = function(key, o) {
			o[key].forEach(function(w) { if (w && !main[w]) {main[w] = key} });
		}
		// irregulars to main
		for (var key in did) { toMain(key, did) }
		for (var key in lexiZip) { toMain(key, lexiZip) }
		// zip to main
		for (var key in zip) {
			//::BROWSER::
			zip[key] = _.repl(zip[key], ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es']);
			//::
			toMain(key, zip);
		}

		// conjugate all phrasal verbs:
		var c = {};
		var splits, verb, particle, phrasal;
		for (var pv in data.phrasalVerbs) {
			splits = pv.split(' ');
			verb = splits.shift();
			particle = splits.join(' ');
			c = parents.verb(verb).conjugate();
			for (var tense in c) {
				if (tense != 'doer') {
					phrasal = c[tense] + ' ' + particle;
					main[phrasal] = schema.getTense(tense).tag;
				}
			}
		}
		// conjugate all verbs: (~8ms, triples the lexicon size)
		c = {};
		data.verbs.forEach(function(verb) {
			c = parents.verb(verb).conjugate();
			for (var tense in schema._tense) {
				if (c[tense] && !main[c[tense]]) {
					main[c[tense]] = schema.getTense(tense).tag;
				}
			}
		});
		// decline all adjectives to their adverbs_ (~13ms)
		// 'to_adverb','to_superlative','to_comparative'
		// to_methods are slightly more performant than .conjugate because we skip to_noun yet ...
		data.adjectives.concat(Object.keys(data.adjectivesDecline.convertables)).forEach(function(adjective) {
			if (!main.hasOwnProperty(adjective)) {
				main[adjective] = 'JJ';
				var adj = parents.adjective(adjective);
				var o = { adverb: 'RB', comparative: 'JJR', superlative: 'JJS' };
				for (var k in o) {
					var tag = o[k];
					o[k] = adj[['to_',k].join('')];
					if (o[k] && o[k] !== adjective && !main[o[k]]) {
						main[k] = main[k] || 'RB';
					}
				}
			}
		});
		// Make sure CP are CP and not conjugated verb type
		// TODO FIXME
		lexiZip.CP.forEach(function(w) {
			main[w] = 'CP';
		});

		return main;
	} else if (cat in did) { return did[cat] }
	return [];
}
  unzip();


export = main;
