import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitionArtworksService } from './exhibition-artworks.service';

describe('ExhibitionArtworksService', () => {
  let service: ExhibitionArtworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionArtworksService],
    }).compile();

    service = module.get<ExhibitionArtworksService>(ExhibitionArtworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
