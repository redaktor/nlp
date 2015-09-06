import Text = require('../interfaces.d');
import Promise = require('../../dojo/Promise');
import lang = require('../../dojo/lang');
import defaults = require('../options');
import load = require('./load');
class Language {
  options: Text.IOptionsLanguage;
  str: string;
  count: number = 5;
  models: any[];
  constructor(o:Text.IOptionsLanguage = {}) {
    this.options = lang.mixin(defaults.language, o);
  }
  public set<T>(str:string) : Promise<Object[]|Object> {
    this.str = str;
    return new Promise(this.detectLang.bind(this));
  }

  // load optional modules at runtime :
  protected detectLang(resolve:(lang) => Object|boolean) {
    var languages:any = this.options.detect;
    if (!(languages instanceof Array) || !languages.length) {
      return resolve(false);
    }
    load(false, languages, function(models) : Object {
        this.models = models;
        return resolve(this.best());
    }.bind(this));
  }
  // create languages array :
  protected best() : Object {
  	var list = this.score();
  	var bestVal = 0;
    var bestLangs = [];
  	for ( var i in list ) {
    	var val = list[i];
  		if ( bestVal < val ) {
        bestLangs.unshift({
          id: this.models[i].iso,
          name: this.models[i].name,
          score: val
        });
        bestVal = val; // sic! set new best value ...
        // console.log ( bestLangs[0], score );
  		};
  	};

  	return (this.count === 1) ? bestLangs[0] : bestLangs.slice(0, this.count);
  }
  // create score array :
  protected score() : number[] {
    const myModel = this.createModel();
    const score:number[] = [];
    for (var i in this.models) {
      const model = this.models[i];
      score[i] = this.compare(myModel, model['trigrams']);
    };
    return score;
  }
  // calculate the distance to the fingerprint model :
  protected compare(model:number[][], modelKnown:number[]) : number {
    let dist = 0;
    var i, l;
    for (i = 0, l = model.length; i < l; i++) {
      if (modelKnown[model[i][0]]) {
        dist += Math.abs(model[i][1] - modelKnown[model[i][0]]);
      } else {
    	  dist += 300;
      }
    }
    return Math.floor(5*(1 - (dist / (300 * model.length)))*1000)/1000;
  }
  // create array of trigrams sorted by frequency :
  protected createModel() : number[][] {
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
    // sort trigrams array, high-to-low
    return trigramsSorted.sort(function(objA, objB) { return objB[1] - objA[1]; });
  }
}
export = Language;
