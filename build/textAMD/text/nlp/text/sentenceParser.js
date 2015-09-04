define(["require", "exports", '../../data/load', '../sentence/index', '../../../dojo/Promise'], function (require, exports, load, Sentence, Promise) {
    function sentenceParser(text, options) {
        function parse(resolve) {
            load(options.language, ['lexicon/abbreviations', 'lexicon/dates'], function (abbreviations, dates) {
                var sentences = [];
                //first do a greedy-split..
                var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|')/g);
                //detection of non-sentence chunks
                var abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
                var acronym_reg = new RegExp('[ |\.][A-Z]\.?$', 'i');
                var elipses_reg = new RegExp('\\.\\.\\.*$');
                abbreviations = abbreviations.nouns.concat(abbreviations.nonNouns, Object.keys(dates.monthsAbbrevs), Object.keys(dates.daysAbbrevs));
                // loop through these chunks, and join the non-sentence chunks back together..
                var chunks_length = chunks.length;
                var i;
                for (i = 0; i < chunks_length; i++) {
                    if (chunks[i]) {
                        chunks[i] = chunks[i].trim();
                        // should this chunk be combined with the next one?
                        if (chunks[i + 1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg)) {
                            chunks[i + 1] = ((chunks[i] || '') + ' ' + (chunks[i + 1] || '')).replace(/ +/g, ' ');
                        }
                        else if (chunks[i] && chunks[i].length > 0) {
                            sentences.push(new Sentence(chunks[i], options));
                            chunks[i] = '';
                        }
                    }
                }
                //if we never got a sentence, return the given text as one sentence
                if (sentences.length === 0) {
                    return [new Sentence(text, options)];
                }
                return resolve(sentences);
            });
        }
        return new Promise(parse.bind(this));
    }
    return sentenceParser;
});
// console.log(sentenceParser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentenceParser('I like that Color').length === 1)
// console.log(sentenceParser('She was dead. He was ill.').length === 2)
// console.log(sentenceParser('i think it is good ... or else.').length == 1)
