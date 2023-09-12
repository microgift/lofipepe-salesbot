import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { init } from './lib/opensea';
import cors from "cors";
import mongoose from 'mongoose'
import SalesModel from './model/salesModel'

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

const app = express()
app.use(express.json())

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

init();

mongoose
    .connect(process.env.MONGO_URI || '')
    .then(async () => {
        console.log("Connected to the database! ❤️");

        app.listen(PORT, () => {
          console.log(`🚀 Lo-Fi pepe sales bot listening on ${HOST}:${PORT}`)
        })
    })
    .catch((err) => {
        console.log("Cannot connect to the database! 😭", err);
        process.exit();
    });

app.get('/', (req, res) => {
  console.log("I'm alive :)")
  res.send('ok')
})

app.get('/sales', async (req, res) => {
  console.log("get sales data");

  const salesData = await SalesModel.find();

  res.send(salesData)
})
