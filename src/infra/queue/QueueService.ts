import { Injectable } from '@nestjs/common';
import { Channel, Connection } from 'amqplib';
import { Location } from 'src/core';
import { ConfigService } from '../config';

@Injectable()
export class QueueService {
  private _sendChannel: Channel = null;

  constructor(
    private readonly conn: Connection,
    private readonly config: ConfigService,
  ) {}

  async sendLocationMessage(location: Location) {
    if (!this._sendChannel) {
      this._sendChannel = await this.conn.createChannel();
    }

    this._sendChannel.sendToQueue(
      this.config.AMQP_QUEUE_NAME,
      Buffer.from(JSON.stringify(location)),
    );
  }

  async consumeLocationMessage(
    consumer: (
      location: Location,
      ack: Channel['ack'],
      nack: Channel['nack'],
    ) => void,
  ) {
    const channel = await this.conn.createChannel();
    await channel.consume(
      this.config.AMQP_QUEUE_NAME,
      (message) => {
        if (message !== null) {
          consumer(
            JSON.parse(message.content.toString()) as Location,
            channel.ack,
            channel.nack,
          );
        }
      },
      { noAck: false },
    );
  }
}
