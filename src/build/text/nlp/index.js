var Sentence = require('./sentence/index');
var NLP = (function () {
    function NLP(o) {
        var s = new Sentence("hello version two");
        // let v = new Verb("walks");
        s.tag();
        console.log(s.syllables());
    }
    return NLP;
})();
exports.NLP = NLP;
//# sourceMappingURL=index.js.map