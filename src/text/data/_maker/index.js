// get _maker
module.exports = function(key, lang, isMake) {
  var m = require('./'+key);
  //console.log(key, isMake, m);
  var zip = m.zip(lang);
  if (isMake && m.hasOwnProperty('make')) { return m.make(lang); }
  var unzip = m.unzip;
  return (!isMake && unzip && typeof unzip === 'function' && !(unzip instanceof RegExp)) ?
    unzip(zip) : zip;
}
