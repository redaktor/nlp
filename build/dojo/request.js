var has = require('./has');
var Promise = require('./Promise');
var Registry = require('./Registry');
var defaultProvider;
if (has('host-node')) {
    defaultProvider = require('./request/node');
}
else if (has('host-browser')) {
    defaultProvider = require('./request/xhr');
}
var request = function (url, options) {
    if (options === void 0) { options = {}; }
    var args = Array.prototype.slice.call(arguments, 0);
    var promise = request.providerRegistry.match(arguments).apply(null, arguments).then(function (response) {
        args.unshift(response);
        return Promise.resolve(request.filterRegistry.match(args).apply(null, args)).then(function (filterResponse) {
            response.data = filterResponse.data;
            return response;
        });
    });
    promise.data = promise.then(function (response) {
        return response.data;
    });
    return promise;
};
request.providerRegistry = new Registry(defaultProvider);
request.filterRegistry = new Registry(function (response) {
    return response;
});
// TODO: Put somewhere permanent
request.filterRegistry.register(function (response, url, options) {
    return typeof response.data === 'string' && options.responseType === 'json';
}, function (response, url, options) {
    return JSON.parse(response.data);
});
['delete', 'get', 'post', 'put'].forEach(function (method) {
    request[method] = function (url, options) {
        options = Object.create(options);
        options.method = method.toUpperCase();
        return request(url, options);
    };
});
module.exports = request;
//# sourceMappingURL=request.js.map