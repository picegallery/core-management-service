import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from './../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CognitoModule } from 'src/auth/cognito/cognito.module';
import { DATA_SOURCE, USER_REPOSITORY } from 'constants/repository';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];

@Module({
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, ConfigModule, CognitoModule],
})
export class UsersModule {}
