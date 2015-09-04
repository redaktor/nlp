define(["require", "exports", "../_"], function (require, exports, _) {
    //n-gram takes a list of pre-cleaned terms, and makes no assumptions
    function ngram(terms, options) {
        options = options || {};
        var min_count = options.min_count || 1; // minimum hit-count
        var max_size = options.max_size || 5; // maximum gram count
        var keys = [null];
        var results = [];
        //prepare the keys object
        for (var i = 1; i <= max_size; i++) {
            keys.push({});
        }
        // Create a hash for counting..
        var textlen = terms.length;
        for (var i = 0; i < textlen; i++) {
            var s = terms[i];
            keys[1][s] = (keys[1][s] || 0) + 1;
            for (var j = 2; j <= max_size; j++) {
                if (i + j <= textlen) {
                    s += " " + terms[i + j - 1];
                    keys[j][s] = (keys[j][s] || 0) + 1;
                }
                else {
                    break;
                }
            }
        }
        // map the hash to an array for sorting
        for (var k = 1; k < max_size; k++) {
            results[k] = [];
            var key = keys[k];
            var words = Object.keys(keys[k]);
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                if (key[word] >= min_count) {
                    results[k].push({
                        "word": word,
                        "count": key[word],
                        "size": k
                    });
                }
            }
        }
        //post-process + sort
        results = results.filter(_.any).map(function (r) {
            r = r.sort(function (a, b) {
                return b.count - a.count;
            });
            return r;
        });
        return results;
    }
    ;
    return ngram;
});
