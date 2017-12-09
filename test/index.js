const assert = require('assert')
const test = require('ava')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

test('Behaves as native EventEmitter for known events', t => {
  const foo = new Foo({ events: ['a'] })
  let count = 1
  foo.on(foo.events.a, () => count += 1)
  foo.emit(foo.events.a)

  t.is(count, 2)
})

test('Throws TypeError if a listener tries to listen to an undefined event', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(
    () => foo.on(foo.events.b, () => {}),
    TypeError
  )
})

test('Throws TypeError if it tries to emit undefined event', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(
    () => foo.emit(foo.events.b),
    TypeError
  )
})

test('Allows event to be added after instantiation', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(
    () => foo.emit(foo.events.b),
    TypeError
  )

  foo.addEvent('b')

  t.notThrows(
    () => foo.emit(foo.events.b),
    TypeError
  )
})

test('Dont allow event to be referenced as literal value', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(
    () => foo.emit('a'),
    TypeError
  )

  t.notThrows(
    () => foo.emit(foo.events.a),
    TypeError
  )
})

test('Dont allow direct modification to this.events', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(() => foo.events.a = 1, TypeError)
  t.throws(() => foo.events = undefined, TypeError)
})
