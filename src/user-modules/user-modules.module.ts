import { Module } from '@nestjs/common';
import { UserModulesService } from './user-modules.service';
import { UserModulesController } from './user-modules.controller';

@Module({
  controllers: [UserModulesController],
  providers: [UserModulesService],
})
export class UserModulesModule {}
