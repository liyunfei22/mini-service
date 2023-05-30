import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCattleDto } from './dto/create-cattle.dto';
import { UpdateCattleDto } from './dto/update-cattle.dto';
import { Cattle } from './entities/cattle.entity';
@Injectable()
export class CattleService {
  constructor(
    @InjectRepository(Cattle)
    private readonly cattleRepository: Repository<Cattle>,
  ) {}

  async findAll() {
    return await this.cattleRepository.find();
  }

  async paginate(
    page: number,
    pageSize: number,
  ): Promise<{ cattle: Cattle[]; totalCount: number }> {
    const [cattle, totalCount] = await this.cattleRepository
      .createQueryBuilder('cattle')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      cattle,
      totalCount,
    };
  }

  async findOne(id: number) {
    return await this.cattleRepository.findOneBy({ id });
  }

  async create(createCattleDto: CreateCattleDto) {
    return await this.cattleRepository.save(createCattleDto);
  }

  async update(updateCattleDto: UpdateCattleDto) {
    const beefToUpdate = await this.cattleRepository.findOneBy({
      id: updateCattleDto.id,
    });
    beefToUpdate.name = updateCattleDto.name;
    return await this.cattleRepository.save(beefToUpdate);
  }

  async delete(id: number) {
    const { affected } = await this.cattleRepository.delete(id);
    return affected;
  }
}
