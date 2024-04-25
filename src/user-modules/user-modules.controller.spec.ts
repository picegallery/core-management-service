import { Test, TestingModule } from '@nestjs/testing';
import { UserModulesController } from './user-modules.controller';
import { UserModulesService } from './user-modules.service';

describe('UserModulesController', () => {
  let controller: UserModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserModulesController],
      providers: [UserModulesService],
    }).compile();

    controller = module.get<UserModulesController>(UserModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
