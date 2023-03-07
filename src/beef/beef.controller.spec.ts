import { Test, TestingModule } from '@nestjs/testing';
import { BeefController } from './beef.controller';
import { BeefService } from './beef.service';

describe('BeefController', () => {
  let controller: BeefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeefController],
      providers: [BeefService],
    }).compile();

    controller = module.get<BeefController>(BeefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
