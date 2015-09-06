var defaults = require('../options');
var lang = require('../../dojo/lang');
var load = require('../i18n/load');
var Promise = require('../../dojo/Promise');
var I18n = (function () {
    function I18n(o) {
        if (o === void 0) { o = {}; }
        this.options = lang.mixin(defaults.language, o);
    }
    I18n.prototype.createModel = function (str) {
        // create an array of trigrams sorted by frequency
        var trigrams = {}, trigramsSorted = [];
        var i, l;
        var strArr = str.toLowerCase().split('');
        for (i = 0, l = strArr.length - 2; i < l; i++) {
            var trigramKey = strArr[i] + strArr[i + 1] + strArr[i + 2] + '';
            if (!trigrams[trigramKey]) {
                trigrams[trigramKey] = 1;
            }
            else {
                trigrams[trigramKey] += 1;
            }
        }
        // convert object to array
        for (i in trigrams) {
            trigramsSorted[trigramsSorted.length] = [i, trigrams[i]];
        }
        // sort array results, high-to-low
        return trigramsSorted.sort(function (objA, objB) { return objB[1] - objA[1]; });
    };
    I18n.prototype.compare = function (model, known_model) {
        // calculate the distance to the known model.
        var dist, i, l = 0;
        for (i = 0, l = model.length; i < l; i++) {
            if (known_model[model[i][0]]) {
                dist += Math.abs(model[i][1] - known_model[model[i][0]]);
            }
            else {
                dist += 300;
            }
        }
        return 1 - (dist / (300 * model.length));
    };
    I18n.prototype.score = function (str) {
        var myModel = this.createModel(str);
        var score = [];
        // console.log(myModel);
        for (var i in this.models) {
            var model = this.models[i];
            score[i] = this.compare(myModel, model['trigrams']);
        }
        ;
        return score;
    };
    I18n.prototype.best = function (str) {
        var list = this.score(str);
        var b, val = 0;
        var bestLang;
        for (var i in list) {
            val = list[i];
            if (b < val) {
                bestLang = { id: this.models[i].iso, name: this.models[i].name, score: val };
            }
        }
        return bestLang;
    };
    I18n.prototype.detectLang = function (resolve) {
        var languages = this.options.detect;
        if (!(languages instanceof Array) || !languages.length) {
            return resolve(false);
        }
        load(false, languages, function (models) {
            console.log('models', models);
            this.models = models;
            return resolve(this.best(this.str));
        }.bind(this));
    };
    I18n.prototype.detect = function (str) {
        this.str = str;
        return new Promise(this.detectLang.bind(this));
    };
    return I18n;
})();
module.exports = I18n;
//# sourceMappingURL=index.js.map