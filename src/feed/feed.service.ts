import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feed } from './entities/feed.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  findAll() {
    return this.feedRepository.find();
  }
}
