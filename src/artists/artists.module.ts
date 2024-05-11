import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { RepositoryEnum } from 'constants/repository';
import { DataSource } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { UsersModule } from 'src/users/users.module';

export const artistProviders = [
  {
    provide: RepositoryEnum.ARTIST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
    inject: [RepositoryEnum.DATA_SOURCE],
  },
];

@Module({
  controllers: [ArtistsController],
  providers: [...artistProviders, ArtistsService],
  imports: [DatabaseModule, ConfigModule, UsersModule],
})
export class ArtistsModule {}
