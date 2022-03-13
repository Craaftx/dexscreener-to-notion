import app from './src/app.js'
import dotenv from 'dotenv'

dotenv.config()

const REQUIRED_ENVIRONNEMENTS = [
  'NOTION_SECRET',
  'NOTION_DATABASES',
  'NOTION_VALUE_KEY',
  'NOTION_URL_KEY',
]

if (Object.keys(process.env).some((k) => REQUIRED_ENVIRONNEMENTS.includes(k))) {
  console.log(`App started`)

  app()
} else {
  console.log('Fill the required environnements variables')
}
