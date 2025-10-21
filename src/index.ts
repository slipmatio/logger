import { LogLevel, type LoggerFunction } from './types'
import { VueLogFn } from './vue.ts'

const defaultLogger: LoggerFunction = (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: unknown,
  ...optionalParams: unknown[]
) => {
  let logFn: (message: unknown, ...optionalParams: unknown[]) => void

  switch (method) {
    case 'log':
      logFn = console.log
      break
    case 'debug':
      logFn = console.debug
      break
    case 'info':
      logFn = console.info
      break
    case 'warn':
      logFn = console.warn
      break
    case 'error':
      logFn = console.error
      break
    case 'critical':
      logFn = console.error
      break
    default:
      logFn = console.log
  }

  if (optionalParams) {
    logFn(message, ...optionalParams)
  } else {
    logFn(message)
  }
}

class Logger {
  logLevel: LogLevel
  loggerName = ''
  private logFn: LoggerFunction

  constructor(options?: { logLevel?: LogLevel; name?: string; logFn?: LoggerFunction }) {
    if (options && options.logLevel !== undefined) {
      this.logLevel = options.logLevel
    } else {
      this.logLevel = import.meta.env.MODE === 'development' ? LogLevel.INFO : LogLevel.ERROR
    }

    if (options && options.name) {
      this.loggerName = options.name
    }

    if (options && options.logFn) {
      this.logFn = options.logFn
    } else {
      this.logFn = defaultLogger
    }
  }

  private formatMsg(msg: unknown): string {
    if (this.loggerName) {
      return `[${this.loggerName}] ${msg as string}`
    }
    return msg as string
  }

  private getCallerName(): string {
    // TODO: currently works ok with Firefox but not that well in Chrome
    let error = {} as Error

    try {
      throw new Error('')
    } catch (err) {
      error = err as Error
    }

    if (error.stack === undefined) {
      return ''
    }
    // console.trace()
    // console.log('error', error)
    // console.log('error.stack', error.stack)

    try {
      const stack = error.stack.split('\n')[2]
      // Case: Firefox
      const fnName = `${stack!.split('@')[0]}()`
      if (fnName.includes(' (http')) {
        // Case: Chromium
        const stack2 = error.stack.split('\n')[3]
        const fnMatch = stack2!.match(/at (?:Proxy\.)?(\w+)/)
        if (fnMatch) {
          return `${fnMatch[1]}()`
        }
        return ''
      }
      return fnName
    } catch (_err) {
      return ''
    }
  }

  log(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('log', this.formatMsg(message), ...obj)
    }
  }

  debug(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      this.logFn('debug', this.formatMsg(message), ...obj)
    }
  }

  info(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('info', this.formatMsg(message), ...obj)
    }
  }

  warn(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      this.logFn('warn', this.formatMsg(message), ...obj)
    }
  }

  error(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      this.logFn('error', this.formatMsg(message), ...obj)
    }
  }

  success(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('success', `✅ ${message}`, ...obj)
    }
  }

  critical(message: unknown, ...obj: unknown[]): void {
    if (this.logLevel < LogLevel.OFF) {
      this.logFn('critical', `🛑 ${message}`, ...obj)
    }
  }

  run(message: unknown = '', ...obj: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      if (typeof message === 'string' && message.length > 0) {
        this.log(`🚀 ${message}`, ...obj)
      } else {
        this.log(`🚀 ${this.getCallerName()}`, ...obj)
      }
    }
  }
}

const useLogger = (name?: string, debug = false): Logger => {
  let level = LogLevel.INFO
  if (debug) {
    level = LogLevel.DEBUG
  }
  return new Logger({
    logLevel: import.meta.env.MODE === 'development' ? level : LogLevel.ERROR,
    name: name,
  })
}

const useVueLogger = (name?: string, level?: LogLevel): Logger => {
  const defaultLevel = import.meta.env.MODE === 'development' ? LogLevel.INFO : LogLevel.ERROR
  return new Logger({
    logLevel: level ?? defaultLevel,
    logFn: VueLogFn,
    name: name,
  })
}
export { Logger, LogLevel, useLogger, useVueLogger, VueLogFn, type LoggerFunction }
