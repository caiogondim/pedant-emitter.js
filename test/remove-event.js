const test = require('ava')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

test('removes event', t => {
  const foo = new Foo({ events: ['a'] })

  t.is(typeof foo.events.a, 'symbol')
  foo.removeEvent(foo.events.a)
  t.is(typeof foo.events.a, 'undefined')
})

test('throws TypeError if event is not defined', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(() => foo.removeEvent(1), TypeError)
})
