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
 * @module index
 * @param {text} text
 * @param {object} options
 * @returns {Promise}
 * @summary a Natural-Language-Processing library in JS
 */
 // TODO "use strict" only ES6 ! https://github.com/Microsoft/TypeScript/issues/3576
 // i18n warnings, see https://github.com/mnater/Hyphenator/blob/master/Hyphenator.js

// interfaces:
import Nlp = require('./module');
// let's not block anything - we return promises :
import Promise = require('../../dojo/Promise');
import Sentence = require('./sentence/index');

export class NLP {
  constructor(o:Nlp.Iinput) {

    var s = new Sentence("hello version two");
    // let v = new Verb("walks");
    s.tag();
    console.log(s.syllables());

  }
}
