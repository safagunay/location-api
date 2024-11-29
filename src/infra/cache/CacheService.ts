import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

const CACHE_KEY_AREAS_LAST_UPDATE_TIME = "areas:last-updated-time";

@Injectable()
export class CacheService {
  constructor(private readonly redis: Redis) {
  }

  async getAreasLastUpdateTime(): Promise<number>  {
    const res = await this.redis.get(CACHE_KEY_AREAS_LAST_UPDATE_TIME);
    return Number(res);
  }

  async setAreasLastUpdateTime(time: number): Promise<number>  {
    const res = await this.redis.set(CACHE_KEY_AREAS_LAST_UPDATE_TIME, time);
    return Number(res);
  }
}
