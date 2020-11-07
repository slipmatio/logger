import { Logger, LoggerConfig } from './index'
import { vueLogger } from './vue/index'

declare global {
  const logger: Logger

  interface Window {
    logger: Logger
  }
}

export const useLogger = (options?: LoggerConfig): void => {
  window.logger = new Logger(options)
}

export const useVueLogger = (options?: LoggerConfig): void => {
  if (options) {
    options = { ...options, logFn: vueLogger }
  } else {
    options = { logFn: vueLogger }
  }
  window.logger = new Logger(options)
}
