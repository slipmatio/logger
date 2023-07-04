<script setup lang="ts">
import { ref } from 'vue'
import { testFnOne } from './testfn'
import logger from './loggertest'

logger.log('Hello logger')
logger.run()

const one = ref(1)
const two = ref(2)

function add(a: number, b: number) {
  const result = a + b
  logger.run('Add result: ', result)
  return result
}
</script>
<template>
  <h1>Hello logger</h1>

  <button @click="add(one, two)">Add</button>
  <button @click="testFnOne()">Test fn</button>
</template>
