import { isRef, unref, isReactive, toRaw } from 'vue'

import type { LoggerFunction, LogLevel } from './types'

const vueLogger: LoggerFunction = function (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: string,
  obj: unknown
) {
  let logFn: (message: any, ...optionalParams: any[]) => void

  switch (method) {
    case 'log':
      logFn = console.log
      break
    case 'debug':
      logFn = console.debug
      break
    case 'info':
      logFn = console.info
      break
    case 'warn':
      logFn = console.warn
      break
    case 'error':
      logFn = console.error
      break
    case 'critical':
      logFn = console.error
      break
    default:
      logFn = console.log
  }

  if (obj) {
    if (isRef(obj)) {
      message += ' (ref): '
      obj = unref(obj)
    } else if (isReactive(obj)) {
      message += ' (reactive): '
      obj = toRaw(obj)
    }
    logFn(message, obj)
  } else {
    logFn(message)
  }
}

export { LogLevel, vueLogger }
