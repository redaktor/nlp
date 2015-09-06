var lang = require('./lang');
var Scheduler = require('./Scheduler');
// TODO: `informImmediately` is a strange beast, but something that is useful.
// I need to experiment with a different mechanism for calling the observer
// initially than providing a boolean parameter to `observe()`.
var Observable = (function () {
    function Observable(props) {
        if (props) {
            lang.mixin(this, props);
        }
        Object.defineProperties(this, {
            _callbacks: {
                value: {}
            },
            _dispatch: {
                configurable: true,
                value: this._dispatch.bind(this),
                writable: true
            },
            _notifications: {
                value: Object.create(null),
                writable: true
            },
            _timer: {
                value: null,
                writable: true
            }
        });
    }
    Observable.prototype._dispatch = function () {
        if (this._timer) {
            this._timer.remove();
            this._timer = null;
        }
        // Grab the current notifications and immediately create a new hash
        // to start storing any notifications that might be generated this turn
        var notifications = this._notifications;
        this._notifications = Object.create(null);
        for (var property in notifications) {
            var notification = notifications[property];
            if (this._isEqual(notification.oldValue, notification.newValue)) {
                // If a different-value notification is in-flight and something changes
                // the value back to what it started as, skip the notification
                continue;
            }
            var callback;
            for (var i = 0; (callback = notification.callbacks[i]); i++) {
                // If a callback was removed after the notification was scheduled to
                // start, don't call it
                if (!callback.removed) {
                    callback.callback.call(this, notification.newValue, notification.oldValue);
                }
            }
        }
    };
    Observable.prototype._isEqual = function (a, b) {
        return lang.isEqual(a, b);
    };
    /* tslint:disable:no-unused-variable */
    Observable.prototype._notify = function (property, newValue, oldValue) {
        /* tslint:enable:no-unused-variable */
        var callbacks = this._callbacks[property];
        if (!callbacks || !callbacks.length) {
            return;
        }
        var notification = this._notifications[property];
        if (notification) {
            notification.newValue = newValue;
        }
        else {
            // Create a notification and give it a copy of the callbacks
            // that are currently registered
            this._notifications[property] = {
                newValue: newValue,
                oldValue: oldValue,
                callbacks: callbacks.slice(0)
            };
        }
        this._schedule();
    };
    Observable.prototype.observe = function (property, callback) {
        var callbackObject = {
            callback: callback
        };
        if (!this._callbacks[property]) {
            var oldDescriptor = lang.getPropertyDescriptor(this, property), currentValue = this[property], descriptor = {
                configurable: true,
                enumerable: true
            };
            if (oldDescriptor && !('value' in oldDescriptor)) {
                descriptor.get = oldDescriptor.get;
                if (oldDescriptor.set) {
                    descriptor.set = function (value) {
                        oldDescriptor.set.apply(this, arguments);
                        var newValue = descriptor.get.call(this);
                        this._notify(property, newValue, currentValue);
                        currentValue = newValue;
                    };
                }
            }
            else {
                // property
                descriptor.get = function () {
                    return currentValue;
                };
                if (oldDescriptor.writable) {
                    descriptor.set = function (newValue) {
                        this._notify(property, newValue, currentValue);
                        currentValue = newValue;
                    };
                }
            }
            Object.defineProperty(this, property, descriptor);
            this._callbacks[property] = [callbackObject];
        }
        else {
            this._callbacks[property].push(callbackObject);
        }
        var self = this;
        return {
            remove: function () {
                this.remove = function () { };
                // remove from in-flight notifications
                callbackObject.removed = true;
                // remove from future notifications
                lang.pullFromArray(self._callbacks[property], callbackObject);
            }
        };
    };
    Observable.prototype._schedule = function () {
        if (!this._timer) {
            this._timer = Scheduler.schedule(this._dispatch);
        }
    };
    return Observable;
})();
module.exports = Observable;
//# sourceMappingURL=Observable.js.map