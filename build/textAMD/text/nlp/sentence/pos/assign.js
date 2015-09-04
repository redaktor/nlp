"use strict";
var Verb = require("../../term/verb/verb.js");
var Noun = require("../../term/noun/noun.js");
var Value = require("../../term/value/value.js");
var Adverb = require("../../term/adverb/adverb.js");
var Adjective = require("../../term/adjective/adjective.js");
var mapping = {
    "NN": Noun,
    "NNA": Noun,
    "NNP": Noun,
    "NNO": Noun,
    "NNPA": Noun,
    "NNAB": Noun,
    "NNPS": Noun,
    "NNS": Noun,
    "NNG": Noun,
    "PP": Noun,
    "PRP": Noun,
    "VB": Verb,
    "VBD": Verb,
    "VBP": Verb,
    "VBG": Verb,
    "VBF": Verb,
    "VBN": Verb,
    "VBZ": Verb,
    "CP": Verb,
    "JJ": Adjective,
    "JJR": Adjective,
    "JJS": Adjective,
    "RB": Adverb,
    "RBR": Adverb,
    "RBS": Adverb,
    "CD": Value,
    "NU": Value,
    "DA": Value,
    "MD": Verb,
};
//swap the Term object with a proper Pos class
var assign = function (t, pos, reason) {
    if (mapping[pos] !== undefined) {
        t = new mapping[pos](t.text);
        t.reason = reason;
    }
    return t;
};
module.exports = assign;
