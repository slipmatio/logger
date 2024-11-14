# Better Logger

Easy and lightweight console logging for your JavaScript and TypeScript projects. Control log levels in development vs production, integrate with third-party log tools and debug Vue applications.

## Features

- Log levels that follow and extend browser console log levels
- `success`, `critical` and `run` methods for more secure and informative logging
- Nice looking and fully configurable output
- Custom formatter for Vue
- Full TypeScript support
- Good test coverage

## Installation

```sh
pnpm add @slipmatio/logger
```

## Basic Usage

The easiest way to use this logger is to use the `useLogger` or `useVueLogger` helpers. The helpers are configured to print only errors in production and print all but debug messages in development mode unless called with `debug=true`. You can also set the logger `name` attribute. Both arguments are optional:

```js
import { useLogger } from '@slipmatio/logger'

const logger = useLogger()
```

Then just use `logger` wherever you want:

```js
logger.log('Hello World!')
// > Hello world!

logger.run()
// > 🚀 [main.ts]
```

### Vue Logger

Vue logger uses a special logger function that pretty prints ref, reactive, and computed objects for you so instead of unreadable garble you can read the logs easily.

```js
import { ref, computed } from 'vue'
import { useVueLogger } from '@slipmatio/logger'

const logger = useVueLogger('vuelogger')

const num = ref(1)
const timesTwo = computed(() => num.value * 2)

console.log('proxy objects', num, timesTwo)
// > proxy objects  Object { __v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 1, _value: 1 } Object { _setter: setter(), dep: undefined, __v_isRef: true, __v_isReadonly: true, _dirty: true, effect: {…}, _cacheable: true }
logger.log('proxy objects', num, timesTwo)
// > [vuelogger] proxy objects (ref): 1 (computed): 2
```

### Automatic Imports

Tip: use something like [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) with your bundler to automagically import your logger instance wherever you need it.

## Setting Up Manually

You can also instantiate and import the logger manually. It works as you'd expect:

```js
import { Logger, LogLevel } from '@slipmatio/logger'

const logger = new Logger({
  // Log levels: DEBUG, INFO, WARN, ERROR, CRITICAL, OFF
  logLevel: process.env.NODE_ENV !== 'production' ? LogLevel.INFO : LogLevel.ERROR,
  name: 'mylogger',
  logFn: myLogFn, // see source for implementation
})
```

## Status

This project was originally born around 2016 and has been copy-pasted in various formats from project to project. As it has been helpful in so many projects, I finally decided to clean it up, convert to TypeScript and release as open source. Some parts of the code are a bit ugly, but it works well enough for most production needs. Contributions welcome!

## Elsewhere

Follow [@uninen on Twitter](https://twitter.com/uninen)
