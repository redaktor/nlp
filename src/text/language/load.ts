// TODO - this is a stub
declare var require/*: Require*/;
declare var define: any;
import has = require('../../dojo/has');
import m = require('./nls/en/index');

// see also https://github.com/dojo/loader/issues/29 :
// TODO - might change to dojo loader plugin ...
function loadData(lang:string|boolean, keys:string[], callback?:any) {
  var hasCallback = (callback && typeof callback === 'function');
  function toModuleKeys(key:string) : string{
    if (!lang) { return ['./fingerprints/',key].join(''); }
    return ['./nls/',lang,'/',key].join('');
  }
  function cb(args){
    if (callback) {
      if (!lang) { return callback(args); }
      return callback.apply(callback, args);
    }
    return args;
  }
  // TODO - make it optional:
  // options like {commonjsMinify:false, amdMinify:true} :
  const toMinModuleKeys = function(key:string) : string {
    return ['./nls/',lang,'/',key,'.min'].join('');
  }
  const keysMin = keys.map(toMinModuleKeys);
  keys = keys.map(toModuleKeys);

  if (has('host-node')) {
    const modules:any[] = [];
    keys.forEach(function(key) {
      try {
        var data: typeof m = require(key);
        modules.push(data);
      } catch (err) {
        throw err;
      }
    });
    if (modules.length === keys.length) {
      return cb(modules);
    } else {
      throw new Error('Could not load module: '+keys.join(', '));
    }
  } else if (typeof define === 'function' && define.amd) {
    require((!lang) ? keys : keysMin, function () {
        return cb(arguments);
      },
      (err: Error) => {
        throw err;
      }
    );
  } else {
    throw new Error('Unknown loader');
  }
}
export = loadData;
