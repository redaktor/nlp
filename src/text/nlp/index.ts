/** @namespace */
declare var nlp;
/**
 * redaktor/nlp by @redaktor foundation and the contributors in 2015<br>
 * derives from<br>
 * // nlp_comprimise by @spencermountain in 2014<br>
 * // (https://github.com/spencermountain/nlp_compromise)<br>
 *
 * a Natural-Language-Processing library in Javascript,
 * small-enough for the browser, and quick-enough to run on keypress - <br>
 * it does tons of clever things: <br><br>
 *
 * <code>var nlp = new NLP(text, options);<br>nlp.myMethod ...</code>
 * <br>
 * @module text/nlp/index
 * @param {text} text
 * @param {object} options
 * @returns {Promise}
 * @summary a Natural-Language-Processing library in JS
 */
 // TODO "use strict" only ES6 ! https://github.com/Microsoft/TypeScript/issues/3576
 // i18n warnings, see https://github.com/mnater/Hyphenator/blob/master/Hyphenator.js

// interfaces:
import Nlp = require('./interfaces.d');
import def = require('./_options');
import _ = require('./_');
import lang = require('../../dojo/lang');
import Text = require('./text/index');

class NLP {
  options:Nlp.IOptions = def;
  constructor(o:Nlp.IOptions) {
    this.options = lang.mixin(this.options, o);
    return this;
  }
  set(v:string|Object) {
  	if (typeof v === 'string') {
  		return new Text(this.options).set(v);
  	} else {
      this.options = lang.mixin(this.options, v);
      return this.options;
  	}
  	return v;
  }
}
export = NLP;
