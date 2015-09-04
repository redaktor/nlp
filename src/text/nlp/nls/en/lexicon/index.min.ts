
import _ = require('../../../nlp/_');
import data = require('../index');
import schema = require('../../../nlp/schema');
import parents = require('../../../nlp/parents'); // TODO - does not exist yet
var main = {};

  var zip:any = { EX: [ 'th2e' ],
  NN: 
   [ 'pr4ident',
     'dollar',
     'student',
     'patent',
     'fund%',
     'morn%',
     'bank%',
     'ceil%',
     'en2gy',
     'secretary',
     'purpose',
     'event' ],
  NNS: [ 'friends', 'sons', 'partn2s' ],
  CC: 
   [ '!',
     'or',
     'while',
     'nor',
     'though',
     'because',
     'but',
     'for',
     'and',
     'if',
     '!1',
     'before',
     'although',
     'not',
     'wheth2',
     'yet',
     'th2efore',
     'plus',
     'v2sus' ],
  VBD: [ 'walk3', 'wh2e\'d', 'when\'d', '!\'d', '~\'d' ],
  VBN: [ 'born' ],
  VBG: [ 'accord%', 'r4ult%', 'stain%' ],
  DT: 
   [ 'that',
     'this',
     'th4e',
     'those',
     'such',
     'neith2',
     'which',
     '~',
     'the',
     'no',
     'any',
     'each',
     '~1',
     'which1',
     'when1',
     'who1',
     'wh21',
     'an',
     'a',
     'own',
     'few',
     'both',
     'much',
     'some',
     'enough',
     '1y',
     'anoth2',
     'plenty',
     'least',
     'various',
     'eith2',
     'else',
     'la',
     'le',
     'l4',
     'd4',
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
     'ov2',
     'und2',
     'up',
     'down',
     'togeth2',
     'apart',
     'into',
     'for',
     'against',
     'aft2',
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
     'dur%',
     'p2',
     'throughout',
     'than',
     'via',
     'd4pite',
     'above',
     'below',
     'unl4s',
     'wh2eas',
     'unlike',
     'towards',
     'b4id4',
     'amidst',
     'amongst',
     'apropos',
     'atop',
     'barr%',
     'chez',
     'mid',
     'midst',
     'notwithstand%',
     'qua',
     'sans',
     'vis-a-vis',
     'thru',
     'till',
     'v2sus',
     'w/o',
     '\'o',
     'o\'',
     'a\'' ],
  PP: 
   [ 'my',
     'my_',
     'your',
     'your_',
     'your&',
     'him_',
     'h2_',
     'it_',
     'our&',
     'them_',
     'them&',
     'none',
     'who',
     'whom',
     'whose',
     'some#',
     'any#',
     'anyone',
     'lot',
     'no#',
     '1y#' ],
  UH: 
   [ 'uhh',
     'uh-oh',
     'ugh',
     'she4h',
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
     'wh2e',
     'why',
     'now',
     'again',
     'h2e',
     'so',
     'v2y',
     'just',
     'too',
     'quite',
     'then',
     'once',
     'maybe',
     'rath2',
     'anyway',
     'hence',
     'furth2',
     'already',
     'soon',
     'direct0',
     'toward',
     'for1',
     'apart',
     'instead',
     'y4',
     'alone',
     'ago',
     'inde3',
     '1',
     'p2haps',
     'thus',
     'often',
     'n1',
     'always',
     'sometim4',
     'also',
     's1al',
     'random0',
     'abroad',
     'almost',
     'twice',
     'some~',
     'some!',
     'meanwhile',
     'furth2more',
     'aside',
     'moreov2',
     'anymore',
     'new0',
     'damn',
     'absolute0',
     'actu;',
     'apparent0',
     'approximate0',
     'c2tain0',
     'clear0',
     'complete0',
     'definite0',
     'eas@',
     'effective0',
     'entire0',
     '4senti;',
     'exact0',
     'extreme0',
     'fair0',
     'frank0',
     'frequent0',
     'gen2;',
     'hard0',
     'heav@',
     'high0',
     'hopeful0',
     'large0',
     'lit2;',
     'most0',
     'nec4sar@',
     'nice0',
     'obvious0',
     'particular0',
     'possib0',
     'primar@',
     'probab0',
     'precise0',
     're;',
     'relative0',
     's2ious0',
     'significant0',
     'slight0',
     'specific;',
     'strong0',
     'sure0',
     'tot;',
     'tru0',
     'typic;',
     'ultimate0',
     'usu;',
     'virtu;',
     'wide0' ],
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
