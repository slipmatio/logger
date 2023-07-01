import { Logger, LogLevel } from './index'

const logger = new Logger({
  logLevel: LogLevel.DEBUG,
  name: 'loggertest',
})

export default logger
