var globalObj = require('global-object');
var uuid = require('nanoid');
var ref = require('events');
var EventEmitter = ref.EventEmitter;
var StrictEmitter = (function (EventEmitter) {
    function StrictEmitter(ref) {
        var this$1 = this;
        var events = ref.events; if ( events === void 0 ) events = [];
        var __Symbol__ = ref.__Symbol__; if ( __Symbol__ === void 0 ) __Symbol__ = globalObj.Symbol;
        var __Proxy__ = ref.__Proxy__; if ( __Proxy__ === void 0 ) __Proxy__ = globalObj.Proxy;

        EventEmitter.call(this);
        this.__Symbol__ = __Symbol__;
        this.__Proxy__ = __Proxy__;
        this._events = {};
        events.forEach(function (event) { return this$1.addEvent(event); });
    }

    if ( EventEmitter ) StrictEmitter.__proto__ = EventEmitter;
    StrictEmitter.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    StrictEmitter.prototype.constructor = StrictEmitter;

    var prototypeAccessors = { events: { configurable: true } };
    prototypeAccessors.events.get = function () {
        if (this.__Proxy__) {
            return new this.__Proxy__(this._events, {
                set: function set() {
                    throw new TypeError("events property can't be directly modified. Use addEvent and removeEvent for it.");
                }
            });
        }
        return this._events;
    };
    prototypeAccessors.events.set = function (val) {
        throw new TypeError("events property can't be directly modified. Use addEvent and removeEvent for it.");
    };
    StrictEmitter.prototype.on = function on (eventName) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        if (!this._isEventDeclared(eventName)) {
            throw new TypeError(("Event " + eventName + " is undefined for this event emitter"));
        }
        EventEmitter.prototype.on.apply(this, [ eventName ].concat( args ));
    };
    StrictEmitter.prototype.emit = function emit (eventName) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        if (!this._isEventDeclared(eventName)) {
            throw new TypeError(("Event " + eventName + " is undefined for this event emitter"));
        }
        EventEmitter.prototype.emit.apply(this, [ eventName ].concat( args ));
    };
    StrictEmitter.prototype.addEvent = function addEvent (eventName) {
        if (typeof eventName !== 'string') {
            throw new TypeError("Event must be a string");
        }
        if (this.__Symbol__) {
            this._events[eventName] = this.__Symbol__();
        } else {
            this._events[eventName] = uuid();
        }
    };
    StrictEmitter.prototype.removeEvent = function removeEvent (eventName) {
        var this$1 = this;

        if (!this._isEventDeclared(eventName)) {
            throw new TypeError(("Event " + eventName + " is undefined for this event emitter"));
        }
        Object.entries(this._events).forEach(function (ref) {
            var key = ref[0];
            var value = ref[1];

            if (value === eventName) {
                delete this$1._events[key];
            }
        });
    };
    StrictEmitter.prototype._isEventDeclared = function _isEventDeclared (eventName) {
        return Object.values(this._events).some(function (value) { return value === eventName; });
    };

    Object.defineProperties( StrictEmitter.prototype, prototypeAccessors );

    return StrictEmitter;
}(EventEmitter));
module.exports = StrictEmitter;
//# sourceMappingURL=pedant-emitter.m.js.map
