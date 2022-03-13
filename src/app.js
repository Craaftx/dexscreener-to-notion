import { CronJob } from 'cron'
import dotenv from 'dotenv'
import { getLastUsdValue } from './api/dexscreener.js'
import { getPagesFromDatabase, patchPage } from './api/notion.js'

dotenv.config()

const fillDatabase = async (databaseId) => {
  const urlKey = process.env.NOTION_URL_KEY
  const valueKey = process.env.NOTION_VALUE_KEY

  const pages = await getPagesFromDatabase({ id: databaseId })

  await Promise.all(
    pages.map(async (page) => {
      if (!page.properties[urlKey]) {
        console.error(`Can't find the property 'dex_link' in the notion page ${page.id}`)
        return
      }

      if (!page.properties[urlKey].url) {
        console.error(
          `The property 'dex_link' is not of URL type in the notion page ${page.id}`,
        )
        return
      }

      if (page.properties[urlKey].url.split('/')['2'] !== 'dexscreener.com') {
        console.error(
          `The property 'dex_link' is not a dexscreener url in the notion page ${page.id}`,
        )
        return
      }

      const link = page.properties[urlKey].url

      const value = await getLastUsdValue({
        url: link,
      })

      const parsedPage = await patchPage({
        id: page.id,
        properties: {
          [valueKey]: {
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
  const delay = parseInt(process.env.CRON_DELAY)

  const databases = JSON.parse(process.env.NOTION_DATABASES)

  if (!databases || databases.length === 0) {
    console.error('Add some databases to start and retry')
    return
  }

  for (let index = 0; index < databases.length; index++) {
    const id = databases[index]

    if (delay === 0) {
      fillDatabase(id)
    } else {
      new CronJob(
        `*/${delay || 30} * * * *`,
        () => fillDatabase(id),
        null,
        true,
        'America/Los_Angeles',
      )
      console.log(`Add CRON job each ${delay || 30} minutes for database:`, id)
    }
  }
}

export default app
