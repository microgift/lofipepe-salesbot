import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import Cache from './services/cache'
// import { createCollectionWebhook } from './services/webhook'
// createCollectionWebhook();

const HOST = process.env.HOST ?? 'http://localhost'
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())

const postedCache = new Cache()

app.post('/webhook', async (req, res) => {
  const webhooks = req.body || []

  console.log('Received incoming webook...')

  console.log(webhooks);

  console.log('---------------------------')

  let status = 200


  console.log('Finished processing incoming webhook...')
  res.status(status)
  res.send('ok')
})

app.get('/health', (req, res) => {
  console.log("I'm alive :)")
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`🚀 Lo-Fi pepe sales bot listening on ${HOST}:${PORT}`)
})
