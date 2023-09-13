import { OpenSeaStreamClient } from "@opensea/stream-js";
import WebSocket from "ws";
import { OPENSEA_SLUG } from "./config";
import SalesModel from "../model/salesModel"

const OPENSEA_API = process.env.OPENSEA_API || "";

const openSeaClient = new OpenSeaStreamClient({
    token: OPENSEA_API,
    connectOptions: {
        transport: WebSocket,
    },
});

//init the client
export const init = () => {
    openSeaClient.connect();
};

//get subscribed guild id from parse.js

openSeaClient.onItemSold(OPENSEA_SLUG, async (event: any) => {
    console.log("Received sale event: ", event.payload.transaction.hash);

    const takerAddress = event.payload.taker.address;
    const makerAddress = event.payload.maker.address;
    let takerF = takerAddress.slice(0, 4);
    let takerL = takerAddress.length;
    let takerF2 = takerAddress.slice(takerL - 4, takerL);
    const c = takerF + "..." + takerF2;
    let makerF = makerAddress.slice(0, 4);
    let makerL = makerAddress.length;
    let makerF2 = makerAddress.slice(makerL - 4, makerL);
    const c2 = makerF + "..." + makerF2;

    // const takerName =
    //     (
    //         await fetch("https://api.opensea.io/user/" + takerAddress, {
    //             method: "GET",
    //             headers: {
    //                 "X-API-KEY": OPENSEA_API,
    //             },
    //         }).then((result) => {
    //             return result.json();
    //         })
    //     ).username ?? c;

    // const makerName =
    //     (
    //         await fetch("https://api.opensea.io/user/" + makerAddress, {
    //             method: "GET",
    //             headers: {
    //                 "X-API-KEY": OPENSEA_API,
    //             },
    //         }).then((result) => {
    //             return result.json();
    //         })
    //     ).username ?? c2;

    const nameNFT = event.payload.item.metadata.name;
    const NFTLink = event.payload.item.permalink;
    const price =
        event.payload.sale_price / Math.pow(10, 18) +
        ` ${event.payload.payment_token.symbol}`;

    //here  comes the part we save the sale in the database
    // console.log("saving sale data", event.payload);

    //tokenId is in the event payload/ item/ nft_id
    const token = event.payload.item.nft_id;

    //split nft_id by "/"
    const split = token.split("/");
    const contract = split[1];
    const tokenId = split[2];

    //  add to db
    const stakeData = new SalesModel({
        contract: contract,
        tokenId: tokenId,
        nameNFT: nameNFT,
        link: NFTLink,
        imageUrl: event.payload.item.metadata.image_url,
        price: price,
        takerName: takerAddress,
        makerName: makerAddress,
        timestamp: Date.now()
    });

    await stakeData.save();

    //  delete one
    await SalesModel.deleteOne();

    console.log("Processed sale: ", nameNFT);
});
