import { Module } from '@nestjs/common';
import { ArtistArtworksService } from './artist-artworks.service';
import { ArtistArtworksController } from './artist-artworks.controller';

@Module({
  controllers: [ArtistArtworksController],
  providers: [ArtistArtworksService],
})
export class ArtistArtworksModule {}
