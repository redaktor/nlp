/** @namespace */
declare var text;
/**
 * redaktor/text by @redaktor foundation and the contributors in 2015<br>
 *
 * a Text-Handling, Language-Detection and Natural-Language-Processing library in Javascript,
 * small-enough for the browser, and quick-enough to run on keypress - <br>
 * it does tons of clever things... <br><br>
 *
 * <code>var nlp = new NLP(text, options);<br>nlp.myMethod ...</code>
 * <br>
 * @module text
 * @param {text} text
 * @param {object} options
 * @returns {Promise}
 * @summary a Natural-Language-Processing library in JS
 */
 // "use strict" only ES6 ! https://github.com/Microsoft/TypeScript/issues/3576
 // TODO
 // i18n warnings, see https://github.com/mnater/Hyphenator/blob/master/Hyphenator.js

import Text = require('./interfaces.d');
import defaults = require('./options');
import lang = require('../dojo/lang');
import Nlp = require('./nlp/index');

class TEXT {
  options:Text.IOptions = defaults;
  constructor(o:Text.IOptions = {}) {
    this.options = lang.mixin(defaults, o);
    return this;
  }
  set(v:string|Object) {
  	if (typeof v === 'string') {
  		return new Nlp(this.options).set(v);
  	} else {
      this.options = lang.mixin(this.options, v);
      return this;
  	}
  	return v;
  }
}
export = TEXT;
