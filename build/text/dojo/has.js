/* tslint:enable:class-name */
var has = require.has;
if (!has) {
    has = (function () {
        var hasCache = Object.create(null);
        var global = this;
        var document = global.document;
        var element = document && document.createElement('div');
        var has = function (name) {
            return typeof hasCache[name] === 'function' ? (hasCache[name] = hasCache[name](global, document, element)) : hasCache[name];
        };
        has.add = function (name, test, now, force) {
            (!(name in hasCache) || force) && (hasCache[name] = test);
            now && has(name);
        };
        return has;
    })();
    has.add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
    has.add('host-node', typeof process === 'object' && process.versions && process.versions.node);
    has.add('debug', true);
}
has.normalize = function (resourceId, normalize) {
    var tokens = resourceId.match(/[\?:]|[^:\?]*/g);
    var i = 0;
    function get(skip) {
        var term = tokens[i++];
        if (term === ':') {
            // empty string module name, resolves to 0
            return null;
        }
        else {
            // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
            if (tokens[i++] === '?') {
                if (!skip && has(term)) {
                    // matched the feature, get the first value from the options
                    return get();
                }
                else {
                    // did not match, get the second value, passing over the first
                    get(true);
                    return get(skip);
                }
            }
            // a module
            return term;
        }
    }
    resourceId = get();
    return resourceId && normalize(resourceId);
};
has.load = function (resourceId, require, load) {
    if (resourceId) {
        require([resourceId], load);
    }
    else {
        load();
    }
};
module.exports = has;
