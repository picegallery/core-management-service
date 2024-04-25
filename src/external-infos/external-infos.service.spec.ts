import { Test, TestingModule } from '@nestjs/testing';
import { ExternalInfosService } from './external-infos.service';

describe('ExternalInfosService', () => {
  let service: ExternalInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalInfosService],
    }).compile();

    service = module.get<ExternalInfosService>(ExternalInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
