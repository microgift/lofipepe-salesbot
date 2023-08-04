import Redis from 'ioredis'
import { REDIS_CHANNEL } from './config';
import * as dotenv from 'dotenv'
dotenv.config()

const main = () => {
    const REDIS_URL = process.env.REDIS_URL;

    if (!REDIS_URL)
        return;

    const redis = new Redis(REDIS_URL)
    redis.subscribe(REDIS_CHANNEL, (err, count) => {
        if (err) console.error(err.message)
        console.log(`Subscribed to ${count} channels.`)
    })

    redis.on('message', (channel, message) => {
        console.log(`Received message from ${channel} channel.`)
        console.log(JSON.parse(message))
    })
}

main()