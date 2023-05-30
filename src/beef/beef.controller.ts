import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BeefService } from './beef.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBeefDto } from './dto/create-beef.dto';
import { UpdateBeefDto } from './dto/update-beef.dto';
// import { PaginationDto } from './dto/pagination.dto';
@Controller('beef')
@ApiTags('cow')
export class BeefController {
  constructor(private readonly beefService: BeefService) {}

  @Get()
  async get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
  ) {
    const { beefs, totalCount } = await this.beefService.paginate(
      page,
      pageSize,
    );
    return { beefs, totalCount };
  }

  @Get('/all')
  findAll() {
    return this.beefService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.beefService.findOne(id);
  }

  @Post('/add')
  create(@Body() createBeefDto: CreateBeefDto) {
    return this.beefService.create(createBeefDto);
  }

  @Get('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.beefService.delete(id);
  }

  @Post('/update')
  update(@Body() updateBeefDto: UpdateBeefDto) {
    return this.beefService.update(updateBeefDto);
  }
}
