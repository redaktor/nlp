"use strict";
var assign = require("./assign");
var lexicon = require("../../lexicon.js");
//consult lexicon for this known-word
var lexicon_pass = function (terms) {
    return terms.map(function (t) {
        //check lexicon straight-up
        if (lexicon[t.normal] !== undefined) {
            return assign(t, lexicon[t.normal], "lexicon_pass");
        }
        //try to match it without a prefix - eg. outworked -> worked
        if (t.normal.match(/^(over|under|out|-|un|re|en).{4}/)) {
            var attempt = t.normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
            return assign(t, lexicon[attempt], "lexicon_prefix");
        }
        return t;
    });
};
module.exports = lexicon_pass;
