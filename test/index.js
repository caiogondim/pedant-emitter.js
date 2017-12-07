const assert = require('assert')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

// Behaves as native EventEmitter for known events
;(() => {
  const foo = new Foo({ events: ['a'] })
  let count = 1
  foo.on(foo.events.a, () => count += 1)
  foo.emit(foo.events.a)

  assert.equal(count, 2)
})()

// Throws TypeError if a listener tries to listen to an undefined event
;(() => {
  const foo = new Foo({ events: ['a'] })

  assert.throws(
    () => foo.on(foo.events.b, () => {}),
    TypeError
  )
})()

// Throws TypeError if it tries to emit undefined event
;(() => {
  const foo = new Foo({ events: ['a'] })

  assert.throws(
    () => foo.emit(foo.events.b),
    TypeError
  )
})()

// Allows event to be added after instantiation
;(() => {
  const foo = new Foo({ events: ['a'] })

  assert.throws(
    () => foo.emit(foo.events.b),
    TypeError
  )

  foo.addEvent('b')

  assert.doesNotThrow(
    () => foo.emit(foo.events.b),
    TypeError
  )
})()

// Dont allow event to be referenced as literal value
;(() => {
  const foo = new Foo({ events: ['a'] })

  assert.throws(
    () => foo.emit('a'),
    TypeError
  )

  assert.doesNotThrow(
    () => foo.emit(foo.events.a),
    TypeError
  )
})()

// Dont allow direct modification to this.events
;(() => {
  const foo = new Foo({ events: ['a'] })

  assert.throws(() => foo.events.a = 1, TypeError)
  assert.throws(() => foo.events = undefined, TypeError)
})()
