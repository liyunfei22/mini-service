import { Controller, Get } from '@nestjs/common';
import { BeefService } from './beef.service';

@Controller('beef')
export class BeefController {
  constructor(private readonly beefService: BeefService) {}

  @Get()
  findAll() {
    return this.beefService.findAll();
  }
}
