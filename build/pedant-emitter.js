var e=require("global-object"),t=require("nanoid"),r=require("events"),n=r.EventEmitter,o=function(r){function n(t){var n=this,o=t.events;void 0===o&&(o=[]);var i=t.__Symbol__;void 0===i&&(i=e.Symbol);var s=t.__Proxy__;void 0===s&&(s=e.Proxy),r.call(this),this.__Symbol__=i,this.__Proxy__=s,this._events={},o.forEach(function(e){return n.addEvent(e)})}r&&(n.__proto__=r),(n.prototype=Object.create(r&&r.prototype)).constructor=n;var o={events:{configurable:!0}};return o.events.get=function(){return this.__Proxy__?new this.__Proxy__(this._events,{set:function(){throw new TypeError("events property can't be directly modified. Use addEvent and removeEvent for it.")}}):this._events},o.events.set=function(e){throw new TypeError("events property can't be directly modified. Use addEvent and removeEvent for it.")},n.prototype.on=function(e){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];if(!this._isEventDeclared(e))throw new TypeError("Event "+e+" is undefined for this event emitter");r.prototype.on.apply(this,[e].concat(t))},n.prototype.emit=function(e){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];if(!this._isEventDeclared(e))throw new TypeError("Event "+e+" is undefined for this event emitter");r.prototype.emit.apply(this,[e].concat(t))},n.prototype.addEvent=function(e){if("string"!=typeof e)throw new TypeError("Event must be a string");this.__Symbol__?this._events[e]=this.__Symbol__():this._events[e]=t()},n.prototype.removeEvent=function(e){var t=this;if(!this._isEventDeclared(e))throw new TypeError("Event "+e+" is undefined for this event emitter");Object.entries(this._events).forEach(function(r){var n=r[0];r[1]===e&&delete t._events[n]})},n.prototype._isEventDeclared=function(e){return Object.values(this._events).some(function(t){return t===e})},Object.defineProperties(n.prototype,o),n}(n);module.exports=o;
//# sourceMappingURL=pedant-emitter.js.map
