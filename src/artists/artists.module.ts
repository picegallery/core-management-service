import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ARTIST_REPOSITORY, DATA_SOURCE } from 'constants/repository';
import { DataSource } from 'typeorm';
import { Artist } from './entities/artist.entity';

export const artistProviders = [
  {
    provide: ARTIST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
    inject: [DATA_SOURCE],
  },
];

@Module({
  controllers: [ArtistsController],
  providers: [...artistProviders, ArtistsService],
  imports: [DatabaseModule, ConfigModule],
})
export class ArtistsModule {}
