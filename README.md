# Better Logger

Easier console logging for your JavaScript and TypeScript projects.

## Features

- Log levels that follow and extend browser console log levels
- `success`, `critical` and `run` methods for more secure and informative logging
- Nice looking and fully configurable output
- Full TypeScript support

## Installation

Yarn

```sh
yarn add -D @slipmatio/logger
```

Npm

```sh
npm install -D @slipmatio/logger
```

## Usage

The easiest way to use this logger is to install it globally in your main project file. It adds a `window.logger` object for you:

```js
import { useLogger } from '@slipmatio/logger'

useLogger()
```

and then just use it wherever you need:

```js
logger.log('Hello World!')
// > Hello world!

logger.run('Hello World!')
// > 🚀 [main.js] Hello world!
```

### Importing manually

You can also instantiate and import the logger manually. It works as you'd expect:

```js
import { Logger } from '@slipmatio/logger'

const logger = new Logger()
```

If you export this `logger` from your main file, you can then import it manually wherever you want to use it. This requires the one extra import for each file but is more explicit and doesn't rely on `window`.

### Setting log level

By default the log level is:

```js
process.env.NODE_ENV !== 'production' ? LogLevel.INFO : LogLevel.ERROR
```

in other words, when developing you will see anything but `debug` logs and in production only `error` and `critical` messages are shown.

You can easily set the log level to work however you like by passing it as an argument to the constructor:

```js
import { useLogger, LogLevel } from '@slipmatio/logger'

// Show nothing
useLogger({
  logLevel: logger.DEBUG,
})

// Show nothing
useLogger({
  logLevel: logger.WARNING,
})
```
