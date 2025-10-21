import { isReactive, isReadonly, isRef, toValue, unref } from 'vue'

import type { LoggerFunction } from './types'

export const VueLogFn: LoggerFunction = (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: unknown,
  ...optionalParams: unknown[]
) => {
  let logFn: (message: unknown, ...optionalParams: unknown[]) => void

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

  if (optionalParams) {
    const parsedParams: unknown[] = []
    let msg = ''

    for (const param of optionalParams) {
      if (isRef(param)) {
        if (isReadonly(param)) {
          msg = '(computed):'
          parsedParams.push(msg, unref(param))
        } else {
          msg = '(ref):'
          parsedParams.push(msg, unref(param))
        }
      } else if (isReactive(param)) {
        msg = '(reactive):'
        parsedParams.push(msg, toValue(param))
      } else {
        parsedParams.push(param)
      }
    }
    logFn(message, ...parsedParams)
  } else {
    logFn(message)
  }
}
