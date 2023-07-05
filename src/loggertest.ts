import { useLogger, useVueLogger } from './index'

const logger = useLogger('loggertest', true)
const vueLogger = useVueLogger('vueloggertest')

export { logger, vueLogger }
