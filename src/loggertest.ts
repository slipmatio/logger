import { Logger, LogLevel } from './index'
import { VueLogFn } from './vue'

const logger = new Logger({
  logLevel: LogLevel.DEBUG,
  name: 'loggertest',
})

const vueLogger = new Logger({
  logLevel: LogLevel.DEBUG,
  name: 'vueloggertest',
  logFn: VueLogFn,
})

export { logger, vueLogger }
