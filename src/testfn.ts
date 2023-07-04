import logger from './loggertest'

export function testFnOne(message?: string) {
  logger.run(message)
  return 'testFn'
}
