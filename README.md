# Better Logger

Easy and lightweight console logging for your JavaScript and TypeScript projects. Control log levels in development vs production, integrate with third-party log tools and debug Vue applications.

## Features

- Log levels that follow and extend browser console log levels
- `success`, `critical` and `run` methods for more secure and informative logging
- Nice looking and fully configurable output
- Custom formatter for Vue 3
- Full TypeScript support
- Good test coverage

## Installation

Yarn

```sh
yarn add @slipmatio/logger
```

Npm

```sh
npm install @slipmatio/logger
```

## Usage

The easiest way to use this logger is to install it globally from your main project file. It adds a `window.logger` object for you:

```js
import { useLogger } from '@slipmatio/logger/global'

useLogger()
```

or with Vue 3:

```js
import { useLogger } from '@slipmatio/logger/global/vue'

useLogger()
```

As this adds a global `logger` variable to your window object, you might need to add following to your `.eslintrc.js` or other linter config to make your linter and editor aware of it:

```js
// eslint config
globals: {
  logger: 'readonly',
},
```

Then just use `logger` wherever you want, no extra imports or other steps required:

```js
logger.log('Hello World!')
// > Hello world!

logger.run()
// > 🚀 [main.ts]
```

### Importing and using manually

You can also instantiate and import the logger manually. It works as you'd expect:

```js
import { Logger } from '@slipmatio/logger'

const logger = new Logger()
```

If you export this `logger` from your main file, you can then import it manually wherever you want to use it. This requires the one extra import for each file but is more explicit and doesn't rely on `window` and doesn't need any special configuration for linters.

### Setting log level

By default the log level is:

```js
process.env.NODE_ENV !== 'production' ? LogLevel.INFO : LogLevel.ERROR
```

in other words, when developing you will see anything but `debug` logs and in production only `error` and `critical` messages are shown.

You can easily set the log level to work however you like by passing it as an argument to the constructor:

```js
import { useLogger, LogLevel } from '@slipmatio/logger/global'

// Log everything
useLogger({
  logLevel: logger.DEBUG,
})

// Log nothing
useLogger({
  logLevel: logger.OFF,
})
```

## Options

Here are the options and defaults for the Logger class. (The same options and defaults are used for `useLogger`.)

```js
import { Logger, LogLevel } from '@slipmatio/logger'

const logger = new Logger({
  // Log levels: DEBUG, INFO, WARN, ERROR, CRITICAL, OFF
  logLevel: process.env.NODE_ENV !== 'production' ? LogLevel.INFO : LogLevel.ERROR,
  name: '',
  logFn: defaultLogger, // see source for implementation
})
```

## Status

This project was originally born around 2016 and has been copy-pasted in various formats from project to project. As it has been helpful in so many projects, I finally decided to clean it up, convert to TypeScript and release as open source. So while the repo itself is new, the project is mature and ready for production.

That said, the documentation is slim and I'm unexperienced in packaging JS applications so any help and feedback is surely appreciated!

## Support

Follow [@uninen on Twitter](https://twitter.com/uninen)
