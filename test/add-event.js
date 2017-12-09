const test = require('ava')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

test('allows event to be added after instantiation', t => {
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

test('uses uuid as event value if Symbol is not available', t => {
  const foo = new Foo({ events: ['a'], __Symbol__: null })
  t.is(typeof foo.events.a, 'string')

  const bar = new Foo({ events: ['a'] })
  t.is(typeof bar.events.a, 'symbol')
})

test('throws TypeError if event name is not a string', t => {
  const foo = new Foo({ events: ['a'], __Symbol__: null })

  t.throws(() => foo.addEvent(1), TypeError)
})
