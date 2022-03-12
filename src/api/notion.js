import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const API_URL = 'https://api.notion.com/v1'

const headers = {
  'Notion-Version': '2022-02-22',
  Authorization: `Bearer ${process.env.NOTION_SECRET}`,
}

export const getPagesFromDatabase = async ({ id }) => {
  const url = `${API_URL}/databases/${id}/query`

  const response = await fetch(url, {
    headers,
    method: 'POST',
  })

  if (!response.ok) {
    console.error(`${response.status} - Unable to fetch Notion databases`)
    return []
  }

  const body = await response.json()

  if (!body.results) {
    console.error(`${response.status} - Unable to query Notion databases`)
    return []
  }

  return body.results || []
}

export const patchPage = async ({ id, properties }) => {
  const url = `${API_URL}/pages/${id}`

  const response = await fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      properties,
    }),
  })

  if (!response.ok) {
    console.error(`${response.status} - Unable to fetch Notion pages`)
  }
}
