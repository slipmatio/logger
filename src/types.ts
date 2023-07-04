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
    message: any,
    ...optionalParams: any[]
  ): void
}

export interface LoggerConfig {
  logLevel?: LogLevel
  name?: string
  logFn?: LoggerFunction
}
