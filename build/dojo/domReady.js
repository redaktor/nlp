var has = require('./has');
if (!has('host-browser')) {
    throw new Error('dojo/domReady makes no sense to load in a non-browser environment');
}
var readyStates = Object.create(null);
readyStates.loaded = readyStates.complete = true;
var ready = readyStates[document.readyState], readyQueue = [], processing = false;
function processQueue() {
    if (processing) {
        return;
    }
    processing = true;
    for (var i = 0; i < readyQueue.length; i++) {
        readyQueue[i](document);
    }
    processing = false;
}
if (!ready) {
    document.addEventListener('DOMContentLoaded', function () {
        if (ready) {
            return;
        }
        ready = true;
        processQueue();
    });
}
var domReady = function (callback) {
    readyQueue.push(callback);
    if (ready) {
        processQueue();
    }
};
domReady.load = function (resourceId, require, load) {
    domReady(load);
};
module.exports = domReady;
//# sourceMappingURL=domReady.js.map