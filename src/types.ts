export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
  OFF = 5,
}

export type LoggerFunction = (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: unknown,
  ...optionalParams: unknown[]
) => void
