import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBeefDto } from './dto/create-beef.dto';
import { UpdateBeefDto } from './dto/update-beef.dto';
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

  async findOne(id: number) {
    return await this.beefRepository.findOneBy({ id });
  }

  async create(createBeefDto: CreateBeefDto) {
    return await this.beefRepository.save(createBeefDto);
  }

  async update(updateBeefDto: UpdateBeefDto) {
    const beefToUpdate = await this.beefRepository.findOneBy({
      id: updateBeefDto.id,
    });
    beefToUpdate.name = updateBeefDto.name;
    return await this.beefRepository.save(beefToUpdate);
  }

  async delete(id: number) {
    const { affected } = await this.beefRepository.delete(id);
    return affected;
  }
}
