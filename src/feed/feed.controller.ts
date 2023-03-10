import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('feed')
@ApiTags('料')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  findAll() {
    return this.feedService.findAll();
  }
}
