import * as amqp from 'amqplib';
import { ConfigService } from '../config';

export async function initQueue(config: ConfigService) {
  const connectionString = `amqp://${config.AMQP_USER}:${config.AMQP_PASSWORD}@${config.AMQP_HOST}:${config.AMQP_PORT}/`;

  const connection = await amqp.connect(connectionString);
  const channel = await connection.createChannel();

  await channel.assertQueue(config.AMQP_QUEUE_NAME, {
    durable: true,
    autoDelete: false,
    exclusive: false,
  });

  await channel.close();

  return connection;
}
