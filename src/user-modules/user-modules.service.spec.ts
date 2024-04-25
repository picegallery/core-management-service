import { Test, TestingModule } from '@nestjs/testing';
import { UserModulesService } from './user-modules.service';

describe('UserModulesService', () => {
  let service: UserModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserModulesService],
    }).compile();

    service = module.get<UserModulesService>(UserModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
