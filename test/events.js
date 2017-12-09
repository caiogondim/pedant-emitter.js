const test = require('ava')
const StrictEmitter = require('../lib')

class Foo extends StrictEmitter {}

test('dont allow direct modification to this.events', t => {
  const foo = new Foo({ events: ['a'] })

  t.throws(() => { foo.events.a = 1 }, TypeError)
  t.throws(() => { foo.events = undefined }, TypeError)
})

test('uses Proxy only when available', t => {
  const foo = new Foo({ events: ['a'], __Proxy__: null })

  t.notThrows(() => { foo.events.a = '' }, TypeError)
})
