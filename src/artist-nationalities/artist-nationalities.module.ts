import { Module } from '@nestjs/common';
import { ArtistNationalitiesService } from './artist-nationalities.service';
import { ArtistNationalitiesController } from './artist-nationalities.controller';

@Module({
  controllers: [ArtistNationalitiesController],
  providers: [ArtistNationalitiesService],
})
export class ArtistNationalitiesModule {}
