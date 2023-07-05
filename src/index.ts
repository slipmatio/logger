import { LogLevel, type LoggerFunction } from './types'
import { VueLogFn } from './vue'

const defaultLogger: LoggerFunction = function (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: any,
  ...optionalParams: any[]
) {
  let logFn: (message: any, ...optionalParams: any[]) => void

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
      this.logLevel = process.env.NODE_ENV !== 'production' ? LogLevel.INFO : LogLevel.ERROR
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

  private formatMsg(msg: string): string {
    if (this.loggerName) {
      return `[${this.loggerName}] ${msg}`
    } else {
      return msg
    }
  }

  private getCallerName(): string {
    // TODO: currently works ok with Firefox but not that well in Chrome
    let error = {} as Error

    try {
      throw new Error('')
    } catch (e) {
      error = e as Error
    }

    if (error.stack === undefined) {
      return ''
    } else {
      // console.trace()
      // console.log('error', error)
      // console.log('error.stack', error.stack)

      try {
        const stack = error.stack.split('\n')[2]
        // Case: Firefox
        const fnName = stack.split('@')[0] + '()'
        if (fnName.includes(' (http')) {
          // Case: Chromium
          const stack2 = error.stack.split('\n')[3]
          const fnMatch = stack2.match(/at (?:Proxy\.)?(\w+)/)
          if (fnMatch) {
            return fnMatch[1] + '()'
          }
          return ''
        } else {
          return fnName
        }
      } catch (e) {
        return ''
      }
    }
  }

  log(message: any, ...obj: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('log', this.formatMsg(message), ...obj)
    }
  }

  debug(message: any, ...obj: any[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      this.logFn('debug', this.formatMsg(message), ...obj)
    }
  }

  info(message: any, ...obj: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('info', this.formatMsg(message), ...obj)
    }
  }

  warn(message: any, ...obj: any[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      this.logFn('warn', this.formatMsg(message), ...obj)
    }
  }

  error(message: any, ...obj: any[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      this.logFn('error', this.formatMsg(message), ...obj)
    }
  }

  success(message: any, ...obj: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('success', '✅ ' + message, ...obj)
    }
  }

  critical(message: any, ...obj: any[]): void {
    if (this.logLevel < LogLevel.OFF) {
      this.logFn('critical', '🛑 ' + message, ...obj)
    }
  }

  run(message: any = '', ...obj: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      if (message.length > 0) {
        this.log('🚀 ' + message, ...obj)
      } else {
        this.log(`🚀 ${this.getCallerName()}`, ...obj)
      }
    }
  }
}

const useLogger = (name?: string, debug: boolean = false): Logger => {
  let level = LogLevel.INFO
  if (debug) {
    level = LogLevel.DEBUG
  }
  return new Logger({
    logLevel: process.env.NODE_ENV !== 'production' ? level : LogLevel.ERROR,
    name: name,
  })
}

const useVueLogger = (name?: string, debug: boolean = false): Logger => {
  let level = LogLevel.INFO
  if (debug) {
    level = LogLevel.DEBUG
  }
  return new Logger({
    logLevel: process.env.NODE_ENV !== 'production' ? level : LogLevel.ERROR,
    logFn: VueLogFn,
    name: name,
  })
}
export { LogLevel, Logger, useLogger, useVueLogger, type LoggerFunction, VueLogFn }
