import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  async set(key: string, value: any, ttl?: number) {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await this.redisClient.set(key, serializedValue, 'EX', ttl);
    } else {
      await this.redisClient.set(key, serializedValue);
    }
  }

  async get(key: string) {
    const value = await this.redisClient.get(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async delete(key: string) {
    await this.redisClient.del(key);
  }

  async setUserSession(userId: string, sessionData: any) {
    await this.set(`session:${userId}`, sessionData, 86400); // TTL 24 heures
  }

  async getUserSession(userId: string) {
    return this.get(`session:${userId}`);
  }

  async setEloScore(userId: string, score: number) {
    await this.set(`elo:${userId}`, score, 3600); // TTL 1 heure
  }

  async getEloScore(userId: string) {
    return this.get(`elo:${userId}`);
  }
}
