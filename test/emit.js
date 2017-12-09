const test = require('ava')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

test('throws TypeError if it tries to emit undefined event', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(
    () => foo.emit(foo.events.b),
    TypeError
  )
})

test('dont allow event to be referenced as literal value', t => {
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
