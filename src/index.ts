import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { init } from './opensea';
import cors from "cors";
import { SALES_DEMO } from './config';


const HOST = process.env.HOST ?? 'http://localhost'
const PORT = process.env.PORT ?? 6969

export interface SalesData {
  contract: string,
  tokenId: string,
  nameNFT: string,
  link: string,
  imageUrl: string,
  price: string,
  takerName: string,
  makerName: string,
  timestamp: number
}

export let salesData: SalesData[] = [];

const app = express()
app.use(express.json())

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

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

app.get('/sales-demo', (req, res) => {
  console.log("get sales demo data")
  res.send(SALES_DEMO)
})
