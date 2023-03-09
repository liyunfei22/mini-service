import { Controller, Get } from '@nestjs/common';
import { BeefService } from './beef.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('beef')
@ApiTags('cow')
export class BeefController {
  constructor(private readonly beefService: BeefService) {}

  @Get()
  findAll() {
    return this.beefService.findAll();
  }
}
