import Text = require('../interfaces.d');
import defaults = require('../options');
import lang = require('../../dojo/lang');
import load = require('../i18n/load');
import Promise = require('../../dojo/Promise');
class I18n {
  options: Text.IOptionsLanguage;
  str: string;
  count: number;
  models: any[];
  constructor(o:Text.IOptionsLanguage = {}) {
    this.options = lang.mixin(defaults.language, o);
  }
  // create an array of trigrams sorted by frequency :
  createModel() : number[][] {
    const trigrams = {}, trigramsSorted = [];
    const strArr = this.str.toLowerCase().split('');
    var i, l;
    for (i = 0, l = strArr.length - 2; i < l; i++) {
      const trigramKey = strArr[i] + strArr[i + 1] + strArr[i + 2] + '';
      if (!trigrams[trigramKey]) {
        trigrams[trigramKey] = 1;
      } else {
        trigrams[trigramKey] += 1;
      }
    }
    // convert trigram object to array
    for (i in trigrams) {
      trigramsSorted[trigramsSorted.length] = [i, trigrams[i]];
    }
    // sort trigrams, high-to-low
    return trigramsSorted.sort(function(objA, objB) { return objB[1] - objA[1]; });
  }
  compare(model:number[][], modelKnown:number[]) : number {
    // calculate the distance to the fingerprint model...
    let dist = 0;
    var i, l;
    for (i = 0, l = model.length; i < l; i++) {
      if (modelKnown[model[i][0]]) {
        dist += Math.abs(model[i][1] - modelKnown[model[i][0]]);
      } else {
    	  dist += 300;
      }
    }
    return 5.555 * (1 - (dist / (300 * model.length)));
  }
  score() : number[] {
    const myModel = this.createModel();
    const score:number[] = [];
    for (var i in this.models) {
      const model = this.models[i];
      score[i] = this.compare(myModel, model['trigrams']);
    };
    return score;
  }
  best() : Object {
  	var list = this.score();
  	var bestVal = 0;
    var bestLangs = [];
  	for ( var i in list ) {
    	var val = list[i];
  		if ( bestVal < val ) {
  			var bestLang = { id: this.models[i].iso, name: this.models[i].name, score: val };
        bestLangs.unshift(bestLang);
        bestVal = val; // sic! set new best value ...
        // console.log ( bestLang, score );
  		};
  	};
  	return (this.count === 1) ? bestLang : bestLangs.slice(0, this.count);
  }
  detectLang(resolve:(lang) => Object|boolean) {
    var languages:any = this.options.detect;
    if (!(languages instanceof Array) || !languages.length) {
      return resolve(false);
    }
    load(false, languages, function(models) : Object {
        this.models = models;
        return resolve(this.best());
    }.bind(this));
  }
  public detect<T>(str:string, count:number = 1) : Promise<Object[]|Object> {
    this.str = str;
    this.count = (count > 1) ? count : 1;
    return new Promise(this.detectLang.bind(this));
  }
}
export = I18n;
