<img src="./logo/banner.svg" width="100%" />

<h1 align="center">strict-emitter.js</h1>

<div align="center">
  <img src="http://travis-ci.org/caiogondim/strict-emitter.js.svg?branch=master" alt="Travis CI"> <img src="http://img.badgesize.io/caiogondim/strict-emitter.js/master/src/index.js?compression=gzip"> <img src="https://codecov.io/gh/caiogondim/strict-emitter.js/branch/master/graph/badge.svg" alt="Code coverage">
</div>

<br>

Strict event emitter. Forces event names to be accesed by key, not value.

## Installation

```
npm install strict-emitter -S
```

## Usage

```js
import Emitter from 'strict-emitter'

const emitter = new Emitter({ events: ['a', 'b'] })
emitter.on('c', () => {}) // => throws TypeError since the event `c` was never registered

emitter.addEvent('c')
emitter.on('c', () => {}) // still throws a TypeError. Event names should be acessed by key, not value

emitter.on(emitter.events.c, () => {}) // 👍
```

## Motivation

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem molestias, beatae facere doloremque,
dolore modi voluptatibus perferendis expedita dolorem similique error deleniti maiores non repellat
doloribus voluptatum, earum placeat tenetur.

## API

`strict-emitter` extends from `EventEmitter` (Node.js native event emitter) so the same API is
available, plus the methods below:

### `events`

### `addEvent(eventName)`

### `removeEvent(eventName)`

## Credits
- Icon by Gregor Cresnar from the Noun Project

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
