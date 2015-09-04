define(["require", "exports", "../../data/load", '../../../dojo/Promise'], function (require, exports, load, Promise) {
    function sentenceParser(text, lang) {
        if (lang === void 0) { lang = 'en'; }
        return new Promise(function (resolve) {
            load(lang, ['lexicon/abbreviations', 'lexicon/dates'], function (abbreviations, dates) {
                var sentences = [];
                //first do a greedy-split..
                var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
                //detection of non-sentence chunks
                var abbrev_reg = new RegExp("\\b(" + abbreviations.join("|") + ")[.!?] ?$", "i");
                var acronym_reg = new RegExp("[ |\.][A-Z]\.?$", "i");
                var elipses_reg = new RegExp("\\.\\.\\.*$");
                abbreviations = abbreviations.nouns.concat(abbreviations.nonNouns, Object.keys(dates.monthsAbbrevs), Object.keys(dates.daysAbbrevs));
                // loop through these chunks, and join the non-sentence chunks back together..
                var chunks_length = chunks.length;
                for (var i = 0; i < chunks_length; i++) {
                    if (chunks[i]) {
                        chunks[i] = chunks[i].trim();
                        // should this chunk be combined with the next one?
                        if (chunks[i + 1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg)) {
                            chunks[i + 1] = ((chunks[i] || "") + " " + (chunks[i + 1] || "")).replace(/ +/g, " ");
                        }
                        else if (chunks[i] && chunks[i].length > 0) {
                            sentences.push(chunks[i]);
                            chunks[i] = "";
                        }
                    }
                }
                //if we never got a sentence, return the given text as one sentence
                if (sentences.length === 0) {
                    return [text];
                }
                return resolve(sentences);
            });
        });
    }
    return sentenceParser;
});
// console.log(sentenceParser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentenceParser('I like that Color').length === 1)
// console.log(sentenceParser("She was dead. He was ill.").length === 2)
// console.log(sentenceParser("i think it is good ... or else.").length == 1)
