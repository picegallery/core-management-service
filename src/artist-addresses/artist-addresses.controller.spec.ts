import { Test, TestingModule } from '@nestjs/testing';
import { ArtistAddressesController } from './artist-addresses.controller';
import { ArtistAddressesService } from './artist-addresses.service';

describe('ArtistAddressesController', () => {
  let controller: ArtistAddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistAddressesController],
      providers: [ArtistAddressesService],
    }).compile();

    controller = module.get<ArtistAddressesController>(
      ArtistAddressesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
