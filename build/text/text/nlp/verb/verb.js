var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Term = require("../term/term");
var Verb = (function (_super) {
    __extends(Verb, _super);
    function Verb(text) {
        _super.call(this, text);
        this.pos = "verb";
    }
    Verb.prototype.conjugate = function () {
        console.log(this.text);
        console.log(this.pos);
    };
    return Verb;
})(Term);
module.exports = Verb;
