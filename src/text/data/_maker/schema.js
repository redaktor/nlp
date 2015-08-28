var __ = require('../_');
var schema = require('../schema'), zip;
module.exports = { // The schema
	id: 'schema',
	description: 'The schema for Parts Of Speech tagging',
	prefix: 'declare var res:any;',
	// compress
	zip: function(lang, isZip) {
		var o = {parents: [], tags: []};
		var tags = schema.tags;
		for (var tag in tags) {
			var name = tags[tag].hasOwnProperty(lang) ? tags[tag][lang] : tags[tag].en;
			var pPos = o.parents.indexOf(tags[tag].parent);
			if (pPos < 0) {
				o.parents.push(tags[tag].parent);
				pPos = o.parents.length-1;
			}
			var a = [tag, name, pPos];
			if (tags[tag].hasOwnProperty('tense')) a.push(tags[tag].tense);
			o.tags.push(a);
		}
		o.tense = schema.tenses;
		zip = o;
		return zip;
	},
	make: function(lang) { return this.unzip(); },
	// expand
	unzip: function() {
		res = {};
		zip.tags.forEach(function(a) {
			res[a[0]] = { name:a[1], parent:zip.parents[a[2]], tag:a[0] };
			if (a.length > 3) {
				res[a[0]].tense = a[3];
			}
		});
		res.getTense = function(tense) {
			if (!zip.tense.hasOwnProperty(tense)) {
				return {tag: null};
			}
			return zip.tense[tense];
		}
		res._tense = zip.tense;
		res._tenses = Object.keys(zip.tense);
		res._baseTense = {};
		res._tenses.forEach(function(k) {
			if (res._tense[k].base) { res._baseTense[k] = res._tense[k]; }
		});
		res._baseTenses = Object.keys(res._baseTense);
		return res;
	}
}
