import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Location } from 'src/core';
import { QueueService } from 'src/infra';

@Controller('/locations')
export class LocationController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async sendLocations(@Body() payload: Location[]): Promise<void> {
    if (!Array.isArray(payload) || !payload.length || payload.length > 100) {
      throw new BadRequestException(
        'body must be a JSON array of min length 1 and max length 100',
      );
    }
    await Promise.all(
      payload.map((location) =>
        this.queueService.sendMessageToLocationQueue(location),
      ),
    );
  }
}
