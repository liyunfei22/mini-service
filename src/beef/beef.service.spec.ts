import { Test, TestingModule } from '@nestjs/testing';
import { BeefService } from './beef.service';

describe('BeefService', () => {
  let service: BeefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeefService],
    }).compile();

    service = module.get<BeefService>(BeefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
