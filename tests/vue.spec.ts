import { Logger, LogLevel, useVueLogger, VueLogFn } from '../src/index'
import { ref, reactive, computed } from 'vue'

describe('Vue logger', () => {
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

  const mockedLog = (output: any, ...args: any[]) => consoleOutput.push(output, ...args)
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

  const logger2 = new Logger({
    logLevel: LogLevel.DEBUG,
    logFn: VueLogFn,
  })

  it('logs with log', () => {
    logger2.log('hello vue tests')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with debug', () => {
    logger2.debug('hello debug')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with info', () => {
    logger2.info('hello info')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with warn', () => {
    logger2.warn('hello warn')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs with error', () => {
    logger2.error('hello error')
    expect(consoleOutput.length).toBe(1)
  })

  it('logs an emoji with success', () => {
    const text = 'hello success'
    logger2.success(text)
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0].length).not.toBe(text.length)
  })

  it('logs an emoji with critical', () => {
    const text = 'hello critical'
    logger2.critical(text)
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0].length).not.toBe(text.length)
  })

  it('displays caller name with empty run', () => {
    logger2.run()
    expect(consoleOutput.length).toBe(1)
  })

  it('logs normal object', () => {
    const num = 1
    logger2.log('hello ref', num)
    expect(consoleOutput.length).toBe(2)
  })

  it('logs ref', () => {
    const num = ref(1)
    logger2.log('hello ref', num)
    expect(consoleOutput.length).toBe(3)
    expect(consoleOutput[1]).toContain('(ref):')
  })

  it('logs reactive', () => {
    const obj = reactive({ hello: 'vue' })
    logger2.log('hello reactive', obj)
    expect(consoleOutput.length).toBe(3)
    expect(consoleOutput[1]).toContain('(reactive):')
  })

  it('logs computed', () => {
    const r1 = ref(1)
    const r2 = ref(2)
    const res = computed(() => r1.value + r2.value)
    logger2.log('hello computed', res)
    expect(consoleOutput.length).toBe(3)
    expect(consoleOutput[1]).toContain('(computed):')
  })

  it('works with useLogger', () => {
    const mylogger = useVueLogger()
    mylogger.log('hello vue')
    expect(consoleOutput.length).toBe(1)
  })

  it('sets options correctly', () => {
    const mylogger = useVueLogger()

    mylogger.debug('hello vue')
    expect(consoleOutput.length).toBe(0)
  })
})
