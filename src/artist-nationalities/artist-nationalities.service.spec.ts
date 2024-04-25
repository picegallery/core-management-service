import { Test, TestingModule } from '@nestjs/testing';
import { ArtistNationalitiesService } from './artist-nationalities.service';

describe('ArtistNationalitiesService', () => {
  let service: ArtistNationalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistNationalitiesService],
    }).compile();

    service = module.get<ArtistNationalitiesService>(ArtistNationalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
