import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BeefService } from './beef.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBeefDto } from './dto/create-beef.dto';
import { UpdateBeefDto } from './dto/update-beef.dto';
@Controller('beef')
@ApiTags('cow')
export class BeefController {
  constructor(private readonly beefService: BeefService) {}

  @Get()
  findAll() {
    return this.beefService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.beefService.findOne(id);
  }

  @Post()
  create(@Body() createBeefDto: CreateBeefDto) {
    return this.beefService.create(createBeefDto);
  }

  @Get('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.beefService.delete(id);
  }

  @Post('update')
  update(@Body() updateBeefDto: UpdateBeefDto) {
    return this.beefService.update(updateBeefDto);
  }
}
