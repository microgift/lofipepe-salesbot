import Redis from 'ioredis'
import { REDIS_CHANNEL } from './config'

const REDIS_URL = process.env.REDIS_URL

export default class Cache {
    cache

    constructor() {
        if (REDIS_URL)
            this.cache = new Redis(REDIS_URL)
        else
            console.log("Can not init redis")
    }

    async publish(data: string) {
        if (!this.cache)
            return null;

        return await this.cache.publish(REDIS_CHANNEL, data);
    }
}
