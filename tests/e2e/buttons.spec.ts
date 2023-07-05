import { test, expect } from '@playwright/test'

test('log buttons', async ({ page }) => {
  const consoleMessages: string[] = []

  page.on('console', (msg) => {
    consoleMessages.push(msg.text())
  })

  await page.goto('/')
  await page.getByTestId('add').click()
  await page.getByTestId('log').click()
  await page.getByTestId('debug').click()
  await page.getByTestId('info').click()
  await page.getByTestId('warn').click()
  await page.getByTestId('errorb').click()
  await page.getByTestId('critical').click()
  await page.getByTestId('success').click()

  expect(consoleMessages[2]).toBe('[logger] Hello logger')
  expect(consoleMessages[3]).toBe('[vuelogger] Hello logger')
  expect(consoleMessages[9]).toMatch(
    /\[logger\] logger\.log result: \d+ \d+ (RefImpl ComputedRefImpl|JSHandle@object JSHandle@object)/g
  )
  expect(consoleMessages[10]).toBe('[vuelogger] vuelogger.log result: 1 2 (ref): 3 (computed): 6')
  expect(consoleMessages[11]).toBe('[logger] logger log')
  expect(consoleMessages[12]).toBe('[vuelogger] logger log')
  expect(consoleMessages[13]).toBe('[logger] logger debug')
  expect(consoleMessages[14]).toBe('[logger] logger info')
  expect(consoleMessages[15]).toBe('[vuelogger] logger info')
  expect(consoleMessages[16]).toBe('[logger] logger warn')
  expect(consoleMessages[17]).toBe('[vuelogger] logger warn')
  expect(consoleMessages[18]).toBe('[logger] logger error')
  expect(consoleMessages[19]).toBe('[vuelogger] logger error')
  expect(consoleMessages[20]).toBe('🛑 logger critical')
  expect(consoleMessages[21]).toBe('🛑 logger critical')
  expect(consoleMessages[22]).toBe('✅ logger success')
  expect(consoleMessages[23]).toBe('✅ logger success')
})
