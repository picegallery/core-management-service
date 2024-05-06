import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './entities/user.providers';
import { DatabaseModule } from './../database/database.module';
import { CognitoService } from 'src/auth/cognito/cognito.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [...userProviders, UsersService, CognitoService],
  exports: [UsersService],
  imports: [DatabaseModule, ConfigModule],
})
export class UsersModule {}
