# Dexscreener to Notion

🦉 Import current price of a chart in a notion database 


## Usage

You can automatically deploy it to Heroku : [One click deploy](https://heroku.com/deploy?template=https://github.com/Craaftx/dexscreener-to-notion)

Or you can just download the projet and use it like a Node.js project.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file or fill them in Heroku.

🔑 `NOTION_SECRET` A secret key for access to Notion API. For more information about the secret see : https://developers.notion.com/docs/getting-started

📚 `NOTION_DATABASES` A strigified array of all the IDs of your shared Notion databases. Like ["ID-1", "ID-2", "ID-3"]

🎟 `NOTION_VALUE_KEY` The key of the value column.

🔗 `NOTION_URL_KEY` The key of the dexscreener link column of type URL.

