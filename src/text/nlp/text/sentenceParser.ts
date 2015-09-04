//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
import Nlp = require('../interfaces.d');
import load = require('../../data/load');
import Sentence = require('../sentence/index');
import Promise = require('../../../dojo/Promise');

function sentenceParser(text:string, options:Nlp.IOptions) : Promise<any> {
	function parse(resolve:(sentences)=>Nlp.ISentence[]) {
		load(options.language, ['lexicon/abbreviations','lexicon/dates'], function(abbreviations, dates) : any[] {
			const sentences = [];
			//first do a greedy-split..
			const chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|')/g);
			//detection of non-sentence chunks
			const abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
			const acronym_reg = new RegExp('[ |\.][A-Z]\.?$', 'i');
			const elipses_reg = new RegExp('\\.\\.\\.*$');

			abbreviations = abbreviations.nouns.concat(abbreviations.nonNouns, Object.keys(dates.monthsAbbrevs), Object.keys(dates.daysAbbrevs));

			// loop through these chunks, and join the non-sentence chunks back together..
			const chunks_length = chunks.length;
			let i:number;
			for (i = 0; i < chunks_length; i++) {
				if (chunks[i]) {
					chunks[i] = chunks[i].trim();
					// should this chunk be combined with the next one?
					if (chunks[i + 1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg)) {
						chunks[i + 1] = ((chunks[i] || '') + ' ' + (chunks[i + 1] || '')).replace(/ +/g, ' ');
					} else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
						sentences.push(new Sentence(chunks[i], options));
						chunks[i] = '';
					}
				}
			}
			//if we never got a sentence, return the given text as one sentence
			if (sentences.length === 0) { return [new Sentence(text, options)]; }
			return resolve(sentences);
		});
	}
	return new Promise(parse.bind(this));
}
export = sentenceParser;

// console.log(sentenceParser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentenceParser('I like that Color').length === 1)
// console.log(sentenceParser('She was dead. He was ill.').length === 2)
// console.log(sentenceParser('i think it is good ... or else.').length == 1)
