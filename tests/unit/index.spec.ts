import { Logger, LogLevel, type LoggerFunction, useLogger } from '../../src/index'

const testLogger: LoggerFunction = function (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: any,
  ...optionalParams: any[]
) {
  console.log('from testlogger: ' + message)
}

describe('Logger', () => {
  let consoleOutput: string[] = []
  const originalLog = console.log
  const originalDebug = console.debug
  const originalInfo = console.info
  const originalWarn = console.warn
  const originalError = console.error
  afterEach(() => {
    console.log = originalLog
    console.debug = originalDebug
    console.info = originalInfo
    console.warn = originalWarn
    console.error = originalError
    consoleOutput = []
  })

  const mockedLog = (output: string) => consoleOutput.push(output)
  const mockedDebug = (output: string) => consoleOutput.push(output)
  const mockedInfo = (output: string) => consoleOutput.push(output)
  const mockedWarn = (output: string) => consoleOutput.push(output)
  const mockedError = (output: string) => consoleOutput.push(output)
  beforeEach(() => {
    console.log = mockedLog
    console.debug = mockedDebug
    console.info = mockedInfo
    console.warn = mockedWarn
    console.error = mockedError
  })

  const logger = new Logger({
    logLevel: LogLevel.DEBUG,
  })

  const logger2 = new Logger({
    logLevel: LogLevel.INFO,
    name: 'logger2',
  })

  const logger3 = new Logger({
    logLevel: LogLevel.ERROR,
    name: 'logger3',
    logFn: testLogger,
  })

  const logger4 = new Logger({
    logLevel: LogLevel.CRITICAL,
  })

  const logger5 = new Logger({
    logLevel: LogLevel.OFF,
  })

  it('logs with log', () => {
    logger.log('hello tests')
    expect(consoleOutput.length).toBe(1)
  })

  it('includes logger name with log', () => {
    logger2.log('hello tests')
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0]).toBe('[logger2] hello tests')
  })

  it('uses given logger', () => {
    logger3.error('hello tests')
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0]).toBe('from testlogger: [logger3] hello tests')
  })

  it('includes given argument with log', () => {
    const arg = 1
    logger.log('hello log', arg)
    expect(consoleOutput.length).toBe(1)
  })

  it('logs only critical when level is critical', () => {
    logger4.log('hello log')
    logger4.debug('hello log')
    logger4.error('hello log')
    logger4.critical('hello log')
    expect(consoleOutput.length).toBe(1)
  })

  it('stays silent when off', () => {
    logger5.log('hello log')
    logger5.debug('hello log')
    logger5.error('hello log')
    logger5.critical('hello log')
    expect(consoleOutput.length).toBe(0)
  })

  it('logs with debug', () => {
    logger.debug('hello debug')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with info', () => {
    logger.info('hello info')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with warn', () => {
    logger.warn('hello warn')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with error', () => {
    expect(consoleOutput.length).toBe(0)
    logger.error('hello error')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs an emoji with success', () => {
    const text = 'hello success'
    logger.success(text)
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0].length).not.toBe(text.length)
  })

  it('logs an emoji with critical', () => {
    const text = 'hello critical'
    logger.critical(text)
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0].length).not.toBe(text.length)
  })

  it('logs an emoji with run', () => {
    const text = 'hello run'
    logger.run(text)
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0].length).not.toBe(text.length)
  })

  it('displays caller name with empty run', () => {
    logger.run()
    expect(consoleOutput.length).toBe(1)
  })
})
