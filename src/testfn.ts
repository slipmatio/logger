import { logger, vueLogger } from './loggertest'

export function testFnOne(message?: string) {
  logger.run(message)
  vueLogger.run(message)
  return 'testFn'
}
