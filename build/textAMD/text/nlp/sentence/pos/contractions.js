define(["require", "exports", "../../term/index"], function (require, exports, Term) {
    /* // 2.0:
    let contractions = {
      "i'd": ["i", "would"],
      "she'd": ["she", "would"],
      "he'd": ["he", "would"],
      "they'd": ["they", "would"],
      "we'd": ["we", "would"],
      "i'll": ["i", "will"],
      "she'll": ["she", "will"],
      "he'll": ["he", "will"],
      "they'll": ["they", "will"],
      "we'll": ["we", "will"],
      "i've": ["i", "have"],
      "they've": ["they", "have"],
      "we've": ["we", "have"],
      "should've": ["should", "have"],
      "would've": ["would", "have"],
      "could've": ["could", "have"],
      "must've": ["must", "have"],
      "i'm": ["i", "am"],
      "we're": ["we", "are"],
      "they're": ["they", "are"],
      "cannot": ["can", "not"]
    }
    */
    /*
    function contract(isAmbiguous) {
        if (this.tokens.length < 2) { return this.tokens; } // nothing to contract
        // isAmbiguous contractions require (some) grammatical knowledge to disambigous properly (e.g "he's"=> ['he is', 'he was'])
        var i, before, after, fix;
        var type = (isAmbiguous) ? 'ambiguousContractions' : 'contractions';
        for (i = 0; i < this.tokens.length; i++) {
            if (data[type].hasOwnProperty(this.tokens[i].normalised)) {
                before = this.tokens.slice(0, i);
                after = this.tokens.slice(i + 1, this.tokens.length);
                fix = [{text: this.tokens[i].text, normalised: '', start: this.tokens[i].start},
                            {text: '', normalised: '', start: undefined}];
                if (isAmbiguous && rules.hasOwnProperty(type)) {
                    var chosen = rules.ambiguousContractions(this.tokens, i);
                    fix[0].normalised = data.ambiguousContractions[this.tokens[i].normalised], // e.g. the 'he' part
                    fix[0].pos = schema[lexicon[data.ambiguousContractions[this.tokens[i].normalised]]];
                    fix[0].pos_reason = 'ambiguous contraction';
                    fix[1].normalised = chosen, //e.g. 'is', 'was' or 'have'
                    fix[1].pos = schema[lexicon[chosen]];
                    fix[1].pos_reason = 'silent contraction';
                } else {
                    fix[0].normalised = data.contractions[this.tokens[i].normalised][0];
                    fix[1].normalised = data.contractions[this.tokens[i].normalised][1];
                }
                this.tokens = before.concat(fix).concat(after);
                return contract(this.tokens, isAmbiguous); // recursive
            }
        }
        return this.tokens;
    }
    */
    /*
    var data = require(dPath+'lexicon/pos');
    // .particles (possible 2nd part in a phrasal verb) and .contractions:
    var wordnet = require(dPath+'rules/wordnet');
    var rules = require(dPath+'rules/pos');
    */
    /*
    function set<T>(str:string) : any {
      function parseSentences(resolve:(sentences) => Nlp.IText) {
        function finish(mySentences:string[]) {
          this.sentences = mySentences.map(toSentence.bind(this));
          return resolve(this);
        }
        sentenceParser(str, this.options).then(finish.bind(this));
      }
      return new Promise(parseSentences.bind(this));
    }
    */
    function handleContractions(terms) {
        for (var i = 0; i < terms.length; i++) {
            var t = terms[i];
            if (contractions[t.normal] !== undefined) {
                var split = contractions[t.normal];
                var fixup = [].concat(terms.slice(0, i), [new Term(split[0])], [new Term(split[1])], terms.slice(i + 1, terms.length));
                return handleContractions(fixup); //recursive
            }
        }
        return terms;
    }
    return handleContractions;
});
