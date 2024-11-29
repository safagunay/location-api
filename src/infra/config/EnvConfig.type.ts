export interface EnvConfig {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  AMQP_HOST: string;
  AMQP_USER: string;
  AMQP_PASSWORD: string;
  AMQP_PORT: number;
  AMQP_QUEUE_NAME: string;
}
