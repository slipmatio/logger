import { test, expect } from '@playwright/test'

test('log buttons', async ({ page }) => {
  const consoleMessages: string[] = []

  page.on('console', (msg) => {
    consoleMessages.push(msg.text())
  })

  await page.goto('/')
  await page.getByTestId('fn').click()

  expect(consoleMessages[4]).toBe('[logger] 🚀 setup()')
  expect(consoleMessages[5]).toBe('[vuelogger] 🚀 setup()')
  expect(consoleMessages[6]).toBe('[logger] 🚀 testFnOne()')
  expect(consoleMessages[7]).toBe('[vuelogger] 🚀 testFnOne()')
})
