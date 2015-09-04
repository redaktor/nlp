/**
 * HELPER fns
 * @module src/fns
 */
function repl(a, r, s){
	// advanced data minifying, general logic
	if (typeof a === 'undefined') { return null; }
	var std = ['&','_','#','~','!','%',';','@','0','1','2','3','4','5','6','7','8','9','>','`'];
	if (!s && r) { s = std.slice(0, r.length); }
	if (!r) { r = std; }
	function _r(w){
		s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
		return w;
	}
	return (a instanceof Array) ? a.map(_r) : _r(a);
}
function replBase(a, r, s, baseI){
	// advanced data minifying - also replace another array element (['fantastic', '=ally'])
	if (!(a instanceof Array)) { return null; }
	if (!baseI) baseI = 0;
	return a.map(function(w, i) {
		if (typeof w != 'string') {
			return w;
		} else if (i === baseI) {
			return (r||s) ? this.repl(w, r, s) : w;
		} else if (r) {
			var _w = w.replace('=', a[baseI]).replace('<', a[baseI].slice(0,-2));
		} else { // do zip
			var _w = w.replace(a[baseI], '=').replace(a[baseI].slice(0,-2), '<');
		}
		return (r||s) ? this.repl(_w, r, s) : _w;
	}.bind(this));
}
// map shorthand fn
function mapFn(key) {
	return function(o) { return getObject(key, false, o); }
}
// reduce
function toObj(o,s) {
	o[(this.key) ? this.key : ((s instanceof Array) ? s[0] : s)] = (this.key) ? s : true;
	return o;
}
// special reduces
function toObjValues(zip, o) {
	if (!o) {o = {}}
	return Object.keys(zip).reduce(function(h, k) {
		zip[k].forEach(function(w) { h[w] = k; });
		return h;
	}, o);
}
function toObjDeep(arr, keys) {
	return arr.map(function(a) {
		var res = {};
		if (!(a instanceof Array)) { a = [a]; };
		a.forEach(function(s, i) {
			res[keys[i]||s] = s;
		});
		return res;
	});
}
// array.indexOf or obj.hasOwnProperty
function has(k, ao) {
	return ((ao instanceof Array && ao.indexOf(k) > -1)||ao.hasOwnProperty(k));
}
// array.length
function hasL(a, l) {
	if (!l) l = 0;
	return (a && a instanceof Array && a.length > l) ? a.length : 0;
}

function any(a) {
  return (a != null) ? true : false;
}
// string, non empty
function str(s) { return (typeof s === 'string' && s.trim() != ''); }
// number
function nr(n) { return (typeof n === 'number'); }
// object
function obj(o) { return (o && typeof o === 'object' && !(o instanceof Array)); }
function shallow(o) { return (obj(o) ? JSON.parse(JSON.stringify(o)) : o); }
// array / object items
function first(a) {
	return (typeof a != 'object') ? a : ((a instanceof Array) ? a[0] : a[Object.keys[a][0]]);
}
function last(a) {
	if (typeof a != 'object') { return a; }
	if (a instanceof Array) { return a[a.length-1]; }
	var keys = Object.keys[a][0];
	return a[keys[keys.length-1]];
}
function values(a, key) {
	if (typeof a != 'object') { return a; }
	if (a instanceof Array) {
		// if key -> flatten subobjects:
		if (key) { return a.map(function(o) { return o[key]; }); }
		// else -> flatten subarrays:
		[].concat.apply([],a);
	}
	// or object values to array
	return (obj(a) ? Object.keys(a).map(function(k){return a[k];}) : o);
}

// string transformation
function toTitlecase(str) {
	return (!str) ? '' : str.charAt(0).toUpperCase() + str.slice(1);
}
function toCamelCase(str) {
	return (!str) ? '' : str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
}
function toReadable(str) {
	return (!str) ? '' : str.replace(/([A-Z])/g, function($1){return [' ', $1.toLowerCase()].join('');});
}
function toNames(str) {
	return (!str) ? '' : str.split(' ').map(function (a) { return a.toLowerCase(); });
}
// regex
function r(a, j, f) {
		if (!j) {j = ''}
    return new RegExp(a.join(j), f||'');
}
// shorthand .pos...
function setPos(token, p, pr) {
	token.pos = p;
	token.pos_reason = _.toReadable(pr);
	return token;
}
function _index(a, st){
	a = a.slice(st);
	if(!_.hasL(a)) { return -1; }
	var i;
	for (i=0; i<a.length; i++){ if(a[i]) { return i; } }
}
function setToken(t, i, tokens, id, r, countStart) {
	if (r._if && r._if(t, tokens[i+1], tokens[i-1], i)) {
		var token = (r.set) ? tokens[i+(r.set)] : t;
		setPos(token, schema[r.tag], _.toReadable(id));
	} else if (r.matches) {
		var matches = t.match(r.matches);
		if (matches) {
			if (_.hasL(matches) && typeof countStart === 'number') {
				matches.i = _index(matches, countStart);
				return matches;
			}
			if (r.tag) { return schema[r.tag]; }
			if (r.hasOwnProperty('returns')) { return r.returns; }
			if (r.hasOwnProperty('replacer')) { return t.replace(r[(r.replaces) ? 'replaces':'matches'], r.replacer); }
			if (r.parameters) {
				for (var k in r.parameters) { matches[k] = r.parameters[k]; }
				return matches;
			}
			return true;
		}
		return false;
	} else if (r.hasOwnProperty('replacer')) {
		return t.replace(r.replaces, r.replacer);
	}
}
// set token against data rules, general logic - huge workhouse, saves much typing
function tokenFn(rules, type, noFallback, countStart) {
	if (type instanceof Array) {
		var r = lang.getProperty(rules, type);
	} else {
		var r = (rules.hasOwnProperty(type)) ? rules[type] : 0;
	}
	return function(t, i, tokens) {
		if (!r) return false;
		var id;
		if (r instanceof Array) {
			for (id = 0; id < r.length; id++) {
				var rule = r[id];
				var set = setToken(t, i, tokens, rule.tag+'Rule_'+id, rule, countStart);
				if (set) return set;
			}
		} else {
			for (id in r) {
				var rule = r[id];
				var set = setToken(t, i, tokens, id, rule, countStart);
				if (set) return set;
			}
		}
		return (noFallback) ? false : t;
	}
}
module.exports = {
	// if we'd have to deal with callbacks
	noOp: function(){},
	repl: repl,
	replBase: replBase,
	r: r,
	mapFn: mapFn,
	toObj: toObj,
	toObjValues: toObjValues,
	toObjDeep: toObjDeep,
	has: has,
	hasL: hasL,
	first: first,
	last: last,
	any: any,
	str: str,
	nr: nr,
	obj: obj,
	shallow: shallow,
	values: values,
	toTitlecase: toTitlecase,
	toCamelCase: toCamelCase,
	toReadable: toReadable,
	toNames: toNames,
	setPos: setPos,
	tokenFn: tokenFn
};
