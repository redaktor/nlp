'use strict';
var syllables = require("./syllables");
var americanize = require("./americanize");
var britishize = require("./britishize");
var Term = (function () {
    function Term(str, info) {
        str = str || '';
        this.text = str.trim();
        this.normal = this.normalize();
        this.reason = "";
    }
    //Term methods..
    Term.prototype.is_capital = function () {
        if (this.text.match(/[A-Z][a-z]/)) {
            return true;
        }
        return false;
    };
    Term.prototype.is_acronym = function () {
        if (this.text.match(/([A-Z]\.)+[A-Z]?$/)) {
            return true;
        }
        return false;
    };
    Term.prototype.normalize = function () {
        var str = this.text || "";
        str = str.toLowerCase();
        str = str.replace(/[,\.!:;\?\(\)]/, '');
        str = str.replace(/’/g, "'");
        str = str.replace(/"/g, "");
        // coerce single curly quotes
        str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
        // coerce double curly quotes
        str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
        if (!str.match(/[a-z0-9]/i)) {
            return "";
        }
        return str;
    };
    Term.prototype.americanize = function () {
        return americanize(this.normal);
    };
    Term.prototype.britishize = function () {
        return britishize(this.normal);
    };
    Term.prototype.syllables = function () {
        return syllables(this.normal);
    };
    return Term;
})();
module.exports = Term;
//# sourceMappingURL=term.js.map