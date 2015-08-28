// get _maker
module.exports = function(key, lang, isMake) {
  exports.module = require('./'+key);
  var zip = exports.module.zip(lang);
  var unzip = exports.module.unzip;
  if (isMake && exports.module.make) { return exports.module.make(lang) }
  return (!isMake && unzip && typeof unzip === 'function' && !(unzip instanceof RegExp)) ?
    unzip(zip) : zip;
}
