import { Injectable } from '@nestjs/common';
import { CreateBeefDto } from './dto/create-beef.dto';
import { UpdateBeefDto } from './dto/update-beef.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Beef } from './entities/beef.entity';

@Injectable()
export class BeefService {
  constructor(
    @InjectRepository(Beef)
    private readonly beefRepository: Repository<Beef>,
  ) {}

  async findAll() {
    return await this.beefRepository.find();
  }
}