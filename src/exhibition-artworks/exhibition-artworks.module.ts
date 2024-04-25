import { Module } from '@nestjs/common';
import { ExhibitionArtworksService } from './exhibition-artworks.service';
import { ExhibitionArtworksController } from './exhibition-artworks.controller';

@Module({
  controllers: [ExhibitionArtworksController],
  providers: [ExhibitionArtworksService],
})
export class ExhibitionArtworksModule {}
