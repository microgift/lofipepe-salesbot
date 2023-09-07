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

export let salesData: SalesData[] = [{"contract":"0x0fcbd68251819928c8f6d182fc04be733fa94170","tokenId":"4096","nameNFT":"LofiPepe #4096","link":"https://opensea.io/assets/ethereum/0x0fcbd68251819928c8f6d182fc04be733fa94170/4096","imageUrl":"https://i.seadn.io/gcs/files/f81a548d29b8e1908251d594968b6848.png?w=500&auto=format","price":"0.026999 ETH","takerName":"0xb48357c60cf0f426975c1aad532a1d43d9a28c25","makerName":"0x4f59ce7bb4777b536f09116b66c95a5d1ea8a8e6","timestamp":1693957480447},{"contract":"0x0fcbd68251819928c8f6d182fc04be733fa94170","tokenId":"6712","nameNFT":"LofiPepe #6712","link":"https://opensea.io/assets/ethereum/0x0fcbd68251819928c8f6d182fc04be733fa94170/6712","imageUrl":"https://i.seadn.io/gcs/files/bed9a242e3eebf55f670574cf8b9d19e.png?w=500&auto=format","price":"0.025 WETH","takerName":"0xb057e81a8a3d4dc12294c22eb1cdb574dce96bfb","makerName":"0x197af95de395f038de823df7e1a3cb912d8ff6ab","timestamp":1693950375215},{"contract":"0x0fcbd68251819928c8f6d182fc04be733fa94170","tokenId":"1759","nameNFT":"LofiPepe #1759","link":"https://opensea.io/assets/ethereum/0x0fcbd68251819928c8f6d182fc04be733fa94170/1759","imageUrl":"https://i.seadn.io/gcs/files/7ac943e17586801a4f5955a394922996.png?w=500&auto=format","price":"0.0339 ETH","takerName":"0xa65b96b43e5df32f553201470f96754237dfffd0","makerName":"0x622a5b6c4e544a4c085745c4b147d995bb235bbe","timestamp":1693879095092},{"contract":"0x0fcbd68251819928c8f6d182fc04be733fa94170","tokenId":"2701","nameNFT":"LofiPepe #2701","link":"https://opensea.io/assets/ethereum/0x0fcbd68251819928c8f6d182fc04be733fa94170/2701","imageUrl":"https://i.seadn.io/gcs/files/5559b49be76ffc7ab6d38ed6ee4ef2b1.png?w=500&auto=format","price":"0.029 ETH","takerName":"0x65d3afc84aab1e87fcd64c2e7977155320910f33","makerName":"0xb77d6feb72ddbc2291e09cc8bed901268f2ad5e3","timestamp":1693847656009},{"contract":"0x0fcbd68251819928c8f6d182fc04be733fa94170","tokenId":"3346","nameNFT":"LofiPepe #3346","link":"https://opensea.io/assets/ethereum/0x0fcbd68251819928c8f6d182fc04be733fa94170/3346","imageUrl":"https://i.seadn.io/gcs/files/d89dc5a2b90341958be20eb54f8818e0.png?w=500&auto=format","price":"0.0306 WETH","takerName":"0x805da6ffce9a133e852423ea7f8c6102b92fd730","makerName":"0x6f0d7d31f8124621a91c7d27803f60dbf54e42bc","timestamp":1693827808663}];

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
