import { Test, TestingModule } from '@nestjs/testing';
import { ArtistNationalitiesController } from './artist-nationalities.controller';
import { ArtistNationalitiesService } from './artist-nationalities.service';

describe('ArtistNationalitiesController', () => {
  let controller: ArtistNationalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistNationalitiesController],
      providers: [ArtistNationalitiesService],
    }).compile();

    controller = module.get<ArtistNationalitiesController>(ArtistNationalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
