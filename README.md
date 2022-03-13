# Dexscreener to Notion

🦉 Import current price of a chart in a notion database 


## Usage

### Manual 

Just download the projet, add dependencies and use it like a Node.js project.

The project use node-cron to schedule data recuperation.

### Heroku

You can automatically deploy it on Heroku : [One click deploy](https://heroku.com/deploy?template=https://github.com/Craaftx/dexscreener-to-notion)

As node-cron don't work on free Heroku plan, it install the scheduler plugin. You can open it with the command : `heroku addons:open scheduler`


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file or fill them in Heroku.

🔑 `NOTION_SECRET` A secret key for access to Notion API. For more information about the secret see : https://developers.notion.com/docs/getting-started

📚 `NOTION_DATABASES` A strigified array of all the IDs of your shared Notion databases. Like ["ID-1", "ID-2", "ID-3"]

🎟 `NOTION_VALUE_KEY` The key of the value column.

🔗 `NOTION_URL_KEY` The key of the dexscreener link column of type URL.

⌚ `CRON_DELAY` (not-required) The delay in minutes between each digit update (by default 30). If the value is equal to 0, the app will be executed once.

