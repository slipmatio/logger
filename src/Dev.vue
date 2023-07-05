<script setup lang="ts">
import { ref, computed } from 'vue'
import { testFnOne } from './testfn'
import { logger, vueLogger } from './loggertest'

logger.log('Hello logger')
vueLogger.log('Hello logger')
logger.run()
vueLogger.run()

const result = ref<number>(0)
const timesTwo = computed(() => result.value * 2)

function add(a: number, b: number) {
  logger.run()
  vueLogger.run()
  result.value = a + b

  console.log('console.log result:', a, b, result, timesTwo)
  logger.log('logger.log result:', a, b, result, timesTwo)
  vueLogger.log('vuelogger.log result:', a, b, result, timesTwo)
  return result
}

function testLog() {
  logger.log('logger log')
  vueLogger.log('logger log')
}

function testDebug() {
  logger.debug('logger debug')
  vueLogger.debug('logger debug')
}

function testInfo() {
  logger.info('logger info')
  vueLogger.info('logger info')
}

function testWarn() {
  logger.warn('logger warn')
  vueLogger.warn('logger warn')
}

function testError() {
  logger.error('logger error')
  vueLogger.error('logger error')
}

function testCritical() {
  logger.critical('logger critical')
  vueLogger.critical('logger critical')
}

function testSuccess() {
  logger.success('logger success')
  vueLogger.success('logger success')
}
</script>
<template>
  <h1>Hello logger</h1>

  <button data-testid="add" @click="add(1, 2)">Add</button>
  <button data-testid="fn" @click="testFnOne()">Test fn</button>
  <button data-testid="log" @click="testLog()">Test log</button>
  <button data-testid="debug" @click="testDebug()">Test debug</button>
  <button data-testid="info" @click="testInfo()">Test info</button>
  <button data-testid="warn" @click="testWarn()">Test warn</button>
  <button data-testid="errorb" @click="testError()">Test error</button>
  <button data-testid="critical" @click="testCritical()">Test critical</button>
  <button data-testid="success" @click="testSuccess()">Test success</button>
</template>
