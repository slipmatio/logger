import { Logger, LoggerConfig } from '../index'

declare global {
  const logger: Logger

  interface Window {
    logger: Logger
  }
}

export const useLogger = (options?: LoggerConfig): void => {
  window.logger = new Logger(options)
}

export { Logger, LoggerConfig }
