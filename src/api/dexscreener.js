import puppeteer from 'puppeteer'

export const getLastUsdValue = async ({ url }) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)

  await page.waitForSelector('.chakra-link.chakra-wrap__listitem', {
    visible: true,
  })

  const bodyHandle = await page.$('body')

  const innerText = await page.evaluate((body) => {
    return Array.from(body.querySelectorAll('span')).find(
      (el) => el.textContent === 'Price USD',
    ).nextElementSibling.innerText
  }, bodyHandle)

  await browser.close()

  const value = parseFloat(innerText.split('$')[1])

  return value || 0
}
