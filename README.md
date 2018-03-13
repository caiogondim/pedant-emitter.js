<img src="https://rawgit.com/caiogondim/pedant-emitter.js/master/logo/banner.svg" width="100%" />

# pedant-emitter

<div>
  <img src="http://travis-ci.org/caiogondim/pedant-emitter.js.svg?branch=master" alt="Travis CI"> <img src="http://img.badgesize.io/caiogondim/pedant-emitter.js/master/build/pedant-emitter.js?compression=gzip"> <img src='https://coveralls.io/repos/github/caiogondim/strict-emitter.js/badge.svg' alt='Coverage Status' />
</div>

<br>

Strict event emitter. Forces event names to be accessed by key, not value.

## Installation

```
npm install pedant-emitter -S
```

## Usage

```js
import Emitter from 'pedant-emitter'

const emitter = new Emitter({ events: ['a', 'b'] })
emitter.on('c', () => {}) // => throws TypeError since the event `c` was never registered

emitter.addEvent('c')
emitter.on('c', () => {}) // still throws a TypeError. Event names should be accessed by key, not value

emitter.on(emitter.events.c, () => {}) // 👍
```

## API

`pedant-emitter` extends from [`EventEmitter`](https://nodejs.org/api/events.html) (Node.js native event emitter) so the same API is available, plus the methods below:

### `events`

Object with all events registered.

### `addEvent(eventName)`

Registers new event.

### `removeEvent(eventName)`

Removes previously registered event.

## Credits
- Icon by Gregor Cresnar from the Noun Project

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
