import { CronJob } from 'cron'
import { getLastUsdValue } from './api/dexscreener.js'
import { getPagesFromDatabase, patchPage } from './api/notion.js'

const fillDatabase = async (databaseId) => {
  const pages = await getPagesFromDatabase({ id: databaseId })

  await Promise.all(
    pages.map(async (page) => {
      if (!page.properties['dex_link']) {
        console.error(`Can't find the property 'dex_link' in the notion page ${page.id}`)
        return
      }

      if (!page.properties['dex_link'].url) {
        console.error(
          `The property 'dex_link' is not of URL type in the notion page ${page.id}`,
        )
        return
      }

      if (page.properties['dex_link'].url.split('/')['2'] !== 'dexscreener.com') {
        console.error(
          `The property 'dex_link' is not a dexscreener url in the notion page ${page.id}`,
        )
        return
      }

      const link = page.properties['dex_link'].url

      const value = await getLastUsdValue({
        url: link,
      })

      const parsedPage = await patchPage({
        id: page.id,
        properties: {
          dex_value: {
            number: value,
          },
        },
      })

      return parsedPage
    }),
  )

  console.log('Update database:', databaseId)
}

const app = async () => {
  new CronJob(
    '*/2 * * * *',
    () => fillDatabase('2cdca92a0c944cb6ad39e1175e6297c8'),
    null,
    true,
    'America/Los_Angeles',
  )
}

export default app
