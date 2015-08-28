define(["require", "exports", './sentence/sentence'], function (require, exports, Sentence) {
    var NLP = (function () {
        function NLP(kwArgs) {
            var s = new Sentence("hello version two");
            // let v = new Verb("walks");
            s.tag();
            console.log(s.syllables());
        }
        return NLP;
    })();
    exports.NLP = NLP;
});
