const Events = require('events')

// TODO: use uuid
function id() {
  return Math.random() * Date.now()
}

class StrictEmitter extends Events {
  constructor({ events = [], __Symbol__ = Symbol }) {
    super()

    this.__Symbol__ = __Symbol__
    this.events = {}

    events.forEach(event => this.addEvent(event))
  }

  //
  // Public
  //

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

    if (this._hasSymbolSupport()) {
      this.events[eventName] = this.__Symbol__()
    } else {
      this.events[eventName] = id()
    }
  }

  //
  // Private
  //

  _isEventDeclared(eventName) {
    return Object.values(this.events).some(value => value === eventName)
  }

  _hasSymbolSupport() {
    return typeof this.__Symbol__ !== 'undefined'
  }
}

module.exports = StrictEmitter
