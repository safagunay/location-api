import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { Location } from 'src/core';
import { QueueService } from 'src/infra';

@Controller('/locations')
export class LocationController {
  constructor(
    private readonly queueService: QueueService,
  ) {}

  @Post()
  async sendLocation(@Body() payload: Location): Promise<void> {
    await this.queueService.sendLocationMessage(payload);
  }
}
