// TODO - this is a stub
declare var require/*: Require*/;
declare var define: any;
import has = require('../../dojo/has');
import m = require('./nls/en/index');

// see also https://github.com/dojo/loader/issues/29 :
// TODO - might change to dojo loader plugin ...
function loadData(lang:string, keys:string[], callback?:any) {
  var hasCallback = (callback && typeof callback === 'function');
  const toModuleKeys = function(key:string) : string{
    return ['./nls/',lang,'/',key].join('');
  }
  // TODO - make it optional:
  // options like {commonjsMinify:false, amdMinify:true} :
  const toMinModuleKeys = function(key:string) : string{
    return ['./nls/',lang,'/',key,'.min'].join('');
  }
  const keysMin = keys.map(toMinModuleKeys);
  keys = keys.map(toModuleKeys);

  if (has('host-node')) {
    const modules:any[] = [];
    keys.forEach(function(key) {
      var data: typeof m = require(key);
      modules.push(data);
    });
    if (modules.length === keys.length && hasCallback) {
      callback.apply(callback, modules);
    } else if (modules.length === keys.length && !hasCallback) {
      return modules;
    } else {
      throw new Error('Could not load module: '+keys.join(', '));
    }
  } else if (typeof define === 'function' && define.amd) {
    require(keysMin, function () {
        if (hasCallback) { callback.apply(callback, arguments); }
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
