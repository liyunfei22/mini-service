import { Module } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { CattleController } from './cattle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cattle } from './entities/cattle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cattle])],
  controllers: [CattleController],
  providers: [CattleService],
})
export class CattleModule {}
