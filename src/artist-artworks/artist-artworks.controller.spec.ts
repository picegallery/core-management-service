import { Test, TestingModule } from '@nestjs/testing';
import { ArtistArtworksController } from './artist-artworks.controller';
import { ArtistArtworksService } from './artist-artworks.service';

describe('ArtistArtworksController', () => {
  let controller: ArtistArtworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistArtworksController],
      providers: [ArtistArtworksService],
    }).compile();

    controller = module.get<ArtistArtworksController>(ArtistArtworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
