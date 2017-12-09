const test = require('ava')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

test('behaves as native EventEmitter for known events', t => {
  const foo = new Foo({ events: ['a'] })
  let count = 1
  foo.on(foo.events.a, () => { count += 1 })
  foo.emit(foo.events.a)

  t.is(count, 2)
})

test('throws TypeError if a listener tries to listen to an undefined event', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(
    () => foo.on(foo.events.b, () => {}),
    TypeError
  )
})
