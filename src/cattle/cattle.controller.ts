import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CattleService } from './cattle.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCattleDto } from './dto/create-cattle.dto';
import { UpdateCattleDto } from './dto/update-cattle.dto';

@Controller('cattle')
@ApiTags('cow')
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Get()
  async get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
  ) {
    const { cattles, totalCount } = await this.cattleService.paginate(
      page,
      pageSize,
    );
    return { cattles, totalCount };
  }

  @Get('/all')
  findAll() {
    return this.cattleService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cattleService.findOne(id);
  }

  @Post('/add')
  create(@Body() createCattleDto: CreateCattleDto) {
    return this.cattleService.create(createCattleDto);
  }

  @Get('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cattleService.delete(id);
  }

  @Post('/update')
  update(@Body() updateCattleDto: UpdateCattleDto) {
    return this.cattleService.update(updateCattleDto);
  }
}
