const EventEmitter = require('events')

class StrictEmitter extends EventEmitter{
  constructor(events) {
    super()
    this.events = events
  }

  on(eventName, ...args) {
    if (!this.events.includes(eventName)) {
      throw new TypeError(`Event ${eventName} is undefined for this event emitter`)
    }

    super.on(eventName, ...args)
  }

  emit(eventName, ...args) {
    if (!this.events.includes(eventName)) {
      throw new TypeError(`Event ${eventName} is undefined for this event emitter`)
    }

    super.emit(eventName, ...args)
  }
}

module.exports = StrictEmitter
