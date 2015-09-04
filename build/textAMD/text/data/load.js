define(["require", "exports", '../../dojo/has'], function (require, exports, has) {
    // see also https://github.com/dojo/loader/issues/29 :
    // TODO - might change to dojo loader plugin ...
    function loadData(lang, keys, callback) {
        var hasCallback = (callback && typeof callback === 'function');
        var toModuleKeys = function (key) {
            return ['./', lang, '/', key].join('');
        };
        // TODO - make it optional:
        // options like {commonjsMinify:false, amdMinify:true} :
        var toMinModuleKeys = function (key) {
            return ['./', lang, '/', key, '.min'].join('');
        };
        var keysMin = keys.map(toMinModuleKeys);
        keys = keys.map(toModuleKeys);
        if (has('host-node')) {
            var modules = [];
            keys.forEach(function (key) {
                var data = require(key);
                modules.push(data);
            });
            if (modules.length === keys.length && hasCallback) {
                callback.apply(callback, modules);
            }
            else if (modules.length === keys.length && !hasCallback) {
                return modules;
            }
            else {
                throw new Error('Could not load module: ' + keys.join(', '));
            }
        }
        else if (typeof define === 'function' && define.amd) {
            require(keysMin, function () {
                if (hasCallback) {
                    callback.apply(callback, arguments);
                }
            }, function (err) {
                throw err;
            });
        }
        else {
            throw new Error('Unknown loader');
        }
    }
    return loadData;
});
