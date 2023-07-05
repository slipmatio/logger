import { useLogger, useVueLogger } from './index'

const logger = useLogger('logger', true)
const vueLogger = useVueLogger('vuelogger')

export { logger, vueLogger }
