//chop a string into pronounced syllables
//suffix fixes
function postprocess(arr) {
    //trim whitespace
    arr = arr.map(function (w) {
        return w.trim();
    });
    if (arr.length > 2) {
        return arr;
    }
    var ones = [
        /^[^aeiou]?ion/,
        /^[^aeiou]?ised/,
        /^[^aeiou]?iled/
    ];
    var l = arr.length;
    if (l > 1) {
        var suffix = arr[l - 2] + arr[l - 1];
        for (var i = 0; i < ones.length; i++) {
            if (suffix.match(ones[i])) {
                arr[l - 2] = arr[l - 2] + arr[l - 1];
                arr.pop();
            }
        }
    }
    return arr;
}
var getSyllables = function (str) {
    var all = [];
    var doer = function (w) {
        var vow = /[aeiouy]$/;
        var chars = w.split('');
        var before = "";
        var after = "";
        var current = "";
        for (var i = 0; i < chars.length; i++) {
            before = chars.slice(0, i).join('');
            current = chars[i];
            after = chars.slice(i + 1, chars.length).join('');
            var candidate = before + chars[i];
            //rules for syllables-
            //it's a consonant that comes after a vowel
            if (before.match(vow) && !current.match(vow)) {
                if (after.match(/^e[sm]/)) {
                    candidate += "e";
                    after = after.replace(/^e/, '');
                }
                all.push(candidate);
                return doer(after);
            }
            //unblended vowels ('noisy' vowel combinations)
            if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) {
                all.push(before);
                all.push(current);
                return doer(after);
            }
        }
        //if still running, end last syllable
        if (str.match(/[aiouy]/) || str.match(/ee$/)) {
            all.push(w);
        }
        else {
            all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
        }
    };
    str.split(/\s\-/).forEach(function (s) {
        doer(s);
    });
    all = postprocess(all);
    //for words like 'tree' and 'free'
    if (all.length === 0) {
        all = [str];
    }
    //filter blanks
    all = all.filter(function (s) {
        return s != "";
    });
    return all;
};
module.exports = getSyllables;
