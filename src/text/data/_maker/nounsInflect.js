// 2 nouns: irregulars (plural), uncountables
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary');
module.exports = {
	id: 'inflect',
	folder: 'nouns',
	description: ['singular nouns having irregular plurals\n',
								'and uncountable nouns\n',
								'{{.irregulars}} irregular singular/plural nouns (NN, PRP, PP),\n',
								'{{.uncountables}} uncountable nouns (NN, PRP, PP)'].join(''),
	// zip
	zip: function(lang, isZip) {
		var _irregulars = [];
		var res = {
			NN: [],
			PRP: [],
			PP: [],
			uc: []
		};
		[[dict.NN.words, dict.NNS.words], [dict.PRP.words], [dict.PP.words]].forEach(function(a, i) {
			a[0].filter(__.possibleOrig).forEach(function(o) {
				var singular = __.val(o);
				a[((a[1]) ? 1 : 0)].filter(__.possibleRef).forEach(function(op) {
					if (__.isRef(op, o)) {
						var plural = __.val(op);
						var nA = (isZip) ? _.replBase([singular, plural], 0, ['es']) : [singular, plural];
						res[Object.keys(res)[i]].push(nA);
						_irregulars.push(nA);
					}
				});
			});
		});
		res.uc = dict.NN.words.filter(__.meta, {key: 'uncountable', isZip: isZip}).map(__.val);
		res.irregulars = [];
		res.uncountables = [];
		return res; // Note: the returned value becomes always variable 'zip' in the module ...
	},
	make: function(lang) {
		var zip = this.zip(lang);
		zip.irregulars = zip.NN.concat(zip.PRP, zip.PP);
		zip.uncountables = zip.uc.reduce(_.toObj, {});
		return zip;
	},
	// expand
	unzip: function() {
		var repl = function(a) { return _.replBase(a, ['es']); }
    var a/*::any::*/;
    a = zip.NN.map(repl); zip.NN = a;
		a = zip.PRP.map(repl); zip.PRP = a;
		a = zip.PP.map(repl); zip.PP = a;
		a = zip.NN.concat(zip.PRP, zip.PP); zip.irregulars = a;
		a = zip.uc.reduce(_.toObj, {}); zip.uncountables = a;
		return zip;
	}
}
