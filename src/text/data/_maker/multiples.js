// 1 sort out multiple words
var _ = require('../../nlp/_');
var __ = require('../_'), zip;
module.exports = {
	id: 'multiples',
	folder: 'lexicon',
	description: 'known "multiples" (words with more than one)\ne. g. "New York"',
	// build
	zip: function(lang, isZip) {
		__.newRes(isZip);
		zip = {};
		__.allPossible().forEach(function(o) {
			var v = __.val(o);
			if (v.indexOf(' ') > -1) {
				var s = (isZip) ? _.repl(v, 0, ['at', ' ', 'united', 'new', 'in ']) : v;
				zip[s] = o.tag;
			}
		});
		return zip;
	},
	unzip: function() {
		return _.repl(zip, ['at', ' ', 'united', 'new', 'in ']);
	}
}
