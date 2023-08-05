import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { init } from './opensea';

const HOST = process.env.HOST ?? 'http://localhost'
const PORT = process.env.PORT ?? 3000

export interface SalesData {
  contract: string,
  tokenId: string,
  nameNFT: string,
  imageUrl: string,
  price: string,
  takerName: string,
  makerName: string,
  timestamp: number
}

export let salesData: SalesData[] = [];

const app = express()
app.use(express.json())

init();

app.get('/health', (req, res) => {
  console.log("I'm alive :)")
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`🚀 Lo-Fi pepe sales bot listening on ${HOST}:${PORT}`)
})

app.get('/sales', (req, res) => {
  console.log("get sales data")
  res.send(salesData)
})
