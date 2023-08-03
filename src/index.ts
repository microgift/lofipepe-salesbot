import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'

// import { createCollectionWebhook } from './services/webhook'
// createCollectionWebhook();

interface SalesData {
  sender: string;
  receiver: string;
  nftId: string;
}

let salesData: SalesData[] = [];

const HOST = process.env.HOST ?? 'http://localhost'
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())

app.post('/webhook', async (req, res) => {
  const webhooks = req.body || []
  console.log('Received incoming webook...')

  const activitys = webhooks.event.activity;
  activitys.map((activity: any) => {
    console.log('+++++++++++++++++++++++++++')
    console.log(activity);
    console.log('---------------------------')
  });

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
