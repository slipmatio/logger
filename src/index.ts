export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  CRITICAL,
  OFF,
}

export interface LoggerFunction {
  (
    method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
    message: string,
    obj: unknown
  ): void
}

export interface LoggerConfig {
  logLevel?: LogLevel
  name?: string
  logFn?: LoggerFunction
}

const defaultLogger: LoggerFunction = function (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: string,
  obj: unknown
) {
  let logFn: (...params: any[]) => void

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

  if (obj) {
    logFn(message, obj)
  } else {
    logFn(message)
  }
}

export class Logger {
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
      try {
        const stack = error.stack.split('\n')[2]
        return stack.split('@')[0] + '()'
      } catch (e) {
        return ''
      }
    }
  }

  log(message: string, obj: any = undefined): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('log', this.formatMsg(message), obj)
    }
  }

  debug(message: string, obj: any = undefined): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      this.logFn('debug', this.formatMsg(message), obj)
    }
  }

  info(message: string, obj: any = undefined): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('info', this.formatMsg(message), obj)
    }
  }

  warn(message: string, obj: any = undefined): void {
    if (this.logLevel <= LogLevel.WARN) {
      this.logFn('warn', this.formatMsg(message), obj)
    }
  }

  error(message: string, obj: any = undefined): void {
    if (this.logLevel <= LogLevel.ERROR) {
      this.logFn('error', this.formatMsg(message), obj)
    }
  }

  success(message: string, obj: any = undefined): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.logFn('success', '✅ ' + message, obj)
    }
  }

  critical(message: string, obj: any = undefined): void {
    if (this.logLevel < LogLevel.OFF) {
      this.logFn('critical', '🛑 ' + message, obj)
    }
  }

  run(message = '', obj: any = undefined): void {
    if (this.logLevel <= LogLevel.INFO) {
      if (message.length > 0) {
        this.log('🚀 ' + message, obj)
      } else {
        this.log('🚀 ' + this.getCallerName(), obj)
      }
    }
  }
}
