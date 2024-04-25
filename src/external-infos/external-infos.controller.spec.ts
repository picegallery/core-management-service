import { Test, TestingModule } from '@nestjs/testing';
import { ExternalInfosController } from './external-infos.controller';
import { ExternalInfosService } from './external-infos.service';

describe('ExternalInfosController', () => {
  let controller: ExternalInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalInfosController],
      providers: [ExternalInfosService],
    }).compile();

    controller = module.get<ExternalInfosController>(ExternalInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
