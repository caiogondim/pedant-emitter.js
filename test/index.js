const assert = require('assert')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

// Behaves as native EventEmitter for known events
;(() => {
  const foo = new Foo(['a'])
  let count = 1
  foo.on('a', () => count += 1)
  foo.emit('a')

  assert.equal(count, 2)
})()

// Throws TypeError if a listener tries to listen for an undefined event
;(() => {
  const foo = new Foo(['a'])

  assert.throws(
    () => foo.on('b', () => {}),
    TypeError
  )
})()

// Throws TypeError if it tries to emit undefined event
;(() => {
  const foo = new Foo(['a'])

  assert.throws(
    () => foo.emit('b'),
    TypeError
  )
})()

// Allows event to be added after instantiation
;(() => {
  const foo = new Foo(['a'])

  assert.throws(
    () => foo.emit('b'),
    TypeError
  )

  foo.events.push('b')

  assert.doesNotThrow(
    () => foo.emit('b'),
    TypeError
  )
})()
