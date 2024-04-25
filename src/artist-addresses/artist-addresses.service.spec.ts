import { Test, TestingModule } from '@nestjs/testing';
import { ArtistAddressesService } from './artist-addresses.service';

describe('ArtistAddressesService', () => {
  let service: ArtistAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistAddressesService],
    }).compile();

    service = module.get<ArtistAddressesService>(ArtistAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
