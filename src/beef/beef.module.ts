import { Module } from '@nestjs/common';
import { BeefService } from './beef.service';
import { BeefController } from './beef.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beef } from './entities/beef.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beef])],
  controllers: [BeefController],
  providers: [BeefService],
})
export class BeefModule {}
