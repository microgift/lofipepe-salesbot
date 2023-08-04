import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'

export interface SalesData {
  contract: string,
  tokenId: string,
  nameNFT: string,
  price: string,
  takerName: string,
  makerName: string,
  timestamp: number
}

export let salesData: SalesData[] = [];

const HOST = process.env.HOST ?? 'http://localhost'
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  console.log("I'm alive :)")
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`🚀 Lo-Fi pepe sales bot listening on ${HOST}:${PORT}`)
})
