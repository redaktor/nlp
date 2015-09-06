/**
 * HELPER fns
 * @module src/text/nlp/_
 */
 // TODO strong type

import _ = require('../../_');
import schema = require('./schema');

// helpers
function normalize(s:string, exclDot?:boolean|number, leaveCase?) {
	// TODO - does it handle all european languages?
	if (!s) { return ''; }
	if (!leaveCase) { s = s.toLowerCase(); }
	s = s.trim().replace(/[,#!$:;^?(){}=`~]/, '');
	// single curly quotes
	s = s.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
	// double curly quotes
	s = s.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
	if (!exclDot) s = s.replace(/\./g, '');
	if (!s.match(/[a-z0-9]/i)) { return '' }
	return s;
}
function addNextLast(o, i, a) {
	// add next / last
	o.last = a[i-1];
	o.next = a[i+1];
	return o;
}
function hash(s) {
	if (typeof s != 'string') { s = JSON.stringify(s); }
	var hash = 0, i, chr, len;
	if (s.length == 0) return hash;
	for (i = 0, len = s.length; i < len; i++) {
		chr   = s.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}
// input string and options
function w_options (sOo) {
	return (typeof sOo === 'string') ? {
		w: sOo || this.word || this.input || '',
		options: {}
	} : {
		w: this.word || this.input || '',
		options: (_.obj(sOo)) ? sOo : {}
	}
}
/*
function getObjKey(parts, o, create) {
	return !parts ? o : _getProp(parts, create, o); // Object
}
function getObject(name, o, create) {
	return !name ? o : _getProp(name.split('.'), create, o); // Object
}
function setObjKey(parts, value, o) {
	var parts = parts.map(function(s){
		return (typeof s === 'string') ? s : hash(s);
	});
	var p = parts.pop(), obj = _getProp(parts, true, o);
	return obj && p ? (obj[p] = value) : undefined; // Object
}
function setObject(name, value, o) {
	return this.setObjKey(name.split('.'), value, o);
}
*/
function sugarProto(prefix, o, _proto) {
	var k;
	for (k in o) {
		_proto[[prefix,k].join('')] = (function(k) {
				return function() { return this.conjugated[k]; }
		 })(k);
	}
	return _proto;
}
export = {
	// if we'd have to deal with callbacks
	noOp: function(){},
	// used for unzip
	repl: _.repl,
	replBase: _.replBase,
	// helpers
	normalize: normalize,
	addNextLast: addNextLast,
	toTitlecase: _.toTitlecase,
	toCamelCase: _.toCamelCase,
	toReadable: _.toReadable,
	toNames: _.toNames,
	//hash: hash,
	r: _.r,
	w_options: w_options,
	setPos: _.setPos,
	tokenFn: _.tokenFn,
	mapFn: _.mapFn,
	toObj: _.toObj,
	toObjValues: _.toObjValues,
	toObjDeep: _.toObjDeep,
	has: _.has,
	hasL: _.hasL,
	first: _.first,
	last: _.last,
  any: _.any,
	str: _.str,
	obj: _.obj,
	shallow: _.shallow,
	values: _.values,
	nr: _.nr,
	sugarProto: sugarProto
};
