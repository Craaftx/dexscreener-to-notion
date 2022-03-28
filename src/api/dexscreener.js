import puppeteer from 'puppeteer'

const DEVICE_WIDTH = 1920
const DEVICE_HEIGHT = 1080
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0'

export const getLastUsdValue = async ({ url }) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setCacheEnabled(false)
  await page.setViewport({ width: DEVICE_WIDTH, height: DEVICE_HEIGHT })
  await page.setUserAgent(USER_AGENT)

  await page.goto(url)

  await page.waitForSelector('body tbody')

  const bodyHandle = await page.$('body')

  const innerText = await page.evaluate((body) => {
    return body.querySelector('tbody tr > td.chakra-text:nth-child(6)').innerText
  }, bodyHandle)

  await browser.close()

  const value = parseFloat(innerText.split('$')[1])

  return value || 0
}
