import { isRef, unref, isReactive, toValue, isReadonly } from 'vue'

import type { LoggerFunction } from './types'

export const VueLogFn: LoggerFunction = function (
  method: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'success' | 'critical',
  message: any,
  ...optionalParams: any[]
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

  if (optionalParams) {
    const parsedParams: any[] = []
    let msg = ''

    optionalParams.forEach((param) => {
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
    })
    logFn(message, ...parsedParams)
  } else {
    logFn(message)
  }
}
