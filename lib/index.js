const Events = require('events')

// TODO: use uuid
function id() {
  return Math.random() * Date.now()
}

class StrictEmitter extends Events {
  constructor({
    events = [],
    __Symbol__ = (typeof Symbol !== 'undefined' && Symbol),
    __Proxy__ = (typeof Proxy !== 'undefined' && Proxy)
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
      this._events[eventName] = id()
    }
  }

  removeEvent(eventName) {
    if (typeof eventName !== 'string') {
      throw new TypeError(`Event must be a string`)
    }

    delete this._events[eventName]
  }

  //
  // Private
  //

  _isEventDeclared(eventName) {
    return Object.values(this._events).some(value => value === eventName)
  }
}

module.exports = StrictEmitter
