import { Logger } from './index'
import { LoggerConfig } from '../index'

declare global {
  // @ts-ignore
  const logger: Logger

  interface Window {
    logger: Logger
  }
}

export const useLogger = (options?: LoggerConfig): void => {
  window.logger = new Logger(options)
}
