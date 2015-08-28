'use strict'
let syllables = require("./syllables")
let americanize = require("./americanize")
let britishize = require("./britishize")

class Term {
  constructor(str) {
    str = str || '';
    this.text = str.trim();
    this.normal = this.normalize();
    this.reason = ""
  }

  //Term methods..
  is_capital() {
    if (this.text.match(/[A-Z][a-z]/)) { //tranditional capital
      return true
    }
    return false
  }
  is_acronym() {
    if (this.text.match(/([A-Z]\.)+[A-Z]?$/)) {
      return true
    }
    return false
  }

  normalize() {
    let str = this.text || ""
    str = str.toLowerCase()
    str = str.replace(/[,\.!:;\?\(\)]/, '')
    str = str.replace(/’/g, "'")
    str = str.replace(/"/g, "")
    // coerce single curly quotes
    str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
    // coerce double curly quotes
    str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
    if (!str.match(/[a-z0-9]/i)) {
      return ""
    }
    return str
  }
  americanize() {
    return americanize(this.normal)
  }
  britishize() {
    return britishize(this.normal)
  }
  syllables() {
    return syllables(this.normal)
  }
}

// var t = new Term("synthesise")
// console.log(t.americanize())

export = Term
