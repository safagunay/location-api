import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { LocationDto } from 'src/core';
import { ConfigService } from '../config';

@Injectable()
export class QueueService {
  private _sendChannel: amqplib.Channel = null;

  constructor(
    private readonly conn: amqplib.Connection,
    private readonly config: ConfigService,
  ) {}

  async sendMessageToLocationQueue(location: LocationDto) {
    if (!this._sendChannel) {
      this._sendChannel = await this.conn.createChannel();
    }

    this._sendChannel.sendToQueue(
      this.config.AMQP_QUEUE_NAME,
      Buffer.from(JSON.stringify(location)),
    );
  }

  async consumeLocationQueue(
    consumerTag: string,
    consumer: (
      message: amqplib.ConsumeMessage,
      ack: amqplib.Channel['ack'],
      nack: amqplib.Channel['nack'],
    ) => void,
  ): Promise<void> {
    const channel = await this.conn.createChannel();
    await channel.consume(
      this.config.AMQP_QUEUE_NAME,
      (message) => {
        if (message !== null) {
          consumer(
            message,
            channel.ack.bind(channel),
            channel.nack.bind(channel),
          );
        }
      },
      { noAck: false, consumerTag },
    );
  }
}
