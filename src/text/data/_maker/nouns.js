// 3 other nouns
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary'), zip;
module.exports = {
	// 3 other
	id: 'index',
	folder: 'nouns',
	description: ['singular nouns having irregular plurals\n',
								'and uncountable nouns\n',
								'{{.refs}} PRPs that can be a reference (e.g. "she"),\n',
								'{{.PRP}} all PRP "nouns",',
								'{{.PP}} all PP "nouns",',
								'{{.entityBlacklist}},', // TODO doc
								'{{.personBlacklist}}'].join(''),
	// build
	zip: function(lang, isZip) {
		// TODO: 'it', 'one'
		var _all = dict.NN.words.concat(dict.PP.words, dict.DT.words, dict.NNAB.words, dict.CC.words).filter(__.possible);
		var _refs = [];
		var _prps = dict.PRP.words.map(function(o, i) {
			if(__.meta(o, {key: 'referable', isZip: isZip})) { _refs.push(i); }
			return __.val(o);
		});
		var _prpRefs = dict.PRP.words.filter(__.meta, {key: 'parent', noLang: 1}).map(function(o) {
			return [_prps.indexOf(__.val(o)), o.meta.parent];
		});
		var _pps = dict.PP.words.filter(__.meta, {key: 'parent', noLang: 1}).map(function(o) {
			return [__.val(o), o.meta.parent];
		});
		var _black = function(type) {
			var b = _all.filter(__.meta, {key: type+'Blacklist', isZip: isZip}).map(__.val);
			b.push('&');
			return b;
		}
		zip = {
			refs: _refs,
			PRP: _prps,
			PP: _pps,
			prpRefs: _prpRefs,
			entityBlacklist: _black('entity'),
			personBlacklist: _black('person')
		};
		return zip;
	},
	make: function(lang) { return this.unzip(); },
	// expand
	unzip: function () {
		var _ppRefs = {};
		zip.PP.forEach(function(a) { _ppRefs[a[0]] = zip.PRP[a[1]]; });
		zip.prpRefs.forEach(function(a) { _ppRefs[zip.PRP[a[0]]] = zip.PRP[a[1]]; });
		return {
			refs: zip.refs.map(function(i) { return zip.PRP[i]; }),
			PRP: zip.PRP.reduce(_.toObj, {}),
			PP: zip.PP.reduce(_.toObj, {}),
			ppRefs: _ppRefs,
			entityBlacklist: zip.entityBlacklist.reduce(_.toObj, {}),
			personBlacklist: zip.personBlacklist,
		}
	}
}
