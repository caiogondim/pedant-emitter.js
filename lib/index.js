const globalObj = require('global-object')
const uuid = require('uuid/v4')
const Events = require('events')

class StrictEmitter extends Events {
  constructor({
    events = [],
    __Symbol__ = globalObj.Symbol,
    __Proxy__ = globalObj.Proxy
  }) {
    super()

    this.__Symbol__ = __Symbol__
    this.__Proxy__ = __Proxy__
    this._events = {}

    events.forEach(event => this.addEvent(event))
  }

  //
  // Public
  //

  get events() {
    if (this.__Proxy__) {
      return new Proxy(this._events, {
        set() {
          throw new TypeError(`events property can't be directly modified. Use addEvent and removeEvent for it.`)
        }
      })
    }

    return this._events
  }

  set events(val) {
    throw new TypeError(`events property can't be directly modified. Use addEvent and removeEvent for it.`)
  }

  on(eventName, ...args) {
    if (!this._isEventDeclared(eventName)) {
      throw new TypeError(`Event ${eventName} is undefined for this event emitter`)
    }

    super.on(eventName, ...args)
  }

  emit(eventName, ...args) {
    if (!this._isEventDeclared(eventName)) {
      throw new TypeError(`Event ${eventName} is undefined for this event emitter`)
    }

    super.emit(eventName, ...args)
  }

  addEvent(eventName) {
    if (typeof eventName !== 'string') {
      throw new TypeError(`Event must be a string`)
    }

    if (this.__Symbol__) {
      this._events[eventName] = this.__Symbol__()
    } else {
      this._events[eventName] = uuid()
    }
  }

  removeEvent(eventName) {
    if (!this._isEventDeclared(eventName)) {
      throw new TypeError(`Event ${eventName} is undefined for this event emitter`)
    }

    Object.entries(this._events).forEach(([key, value]) => {
      if (value === eventName) {
        delete this._events[key]
      }
    })
  }

  //
  // Private
  //

  _isEventDeclared(eventName) {
    return Object.values(this._events).some(value => value === eventName)
  }
}

module.exports = StrictEmitter
