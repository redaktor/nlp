//add a 'quiet' token for contractions so we can represent their grammar
"use strict";
var Term = require("../../term/term.js");
var contractions = {
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
};
var handle_contractions = function (terms) {
    for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (contractions[t.normal] !== undefined) {
            var split = contractions[t.normal];
            var fixup = [].concat(terms.slice(0, i), [new Term(split[0])], [new Term(split[1])], terms.slice(i + 1, terms.length));
            return handle_contractions(fixup); //recursive
        }
    }
    return terms;
};
module.exports = handle_contractions;
