import { Test, TestingModule } from '@nestjs/testing';
import { ArtistArtworksService } from './artist-artworks.service';

describe('ArtistArtworksService', () => {
  let service: ArtistArtworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistArtworksService],
    }).compile();

    service = module.get<ArtistArtworksService>(ArtistArtworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
