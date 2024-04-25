import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './entities/user.providers';
import { DatabaseModule } from './../database/database.module';

@Module({
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
