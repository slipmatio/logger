import { Logger, LoggerConfig } from './index'
import { vueLogger } from '../vue/index'

export const useLogger = (options?: LoggerConfig): void => {
  if (options) {
    options = { ...options, logFn: vueLogger }
  } else {
    options = { logFn: vueLogger }
  }
  window.logger = new Logger(options)
}
