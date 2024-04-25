import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitionArtworksController } from './exhibition-artworks.controller';
import { ExhibitionArtworksService } from './exhibition-artworks.service';

describe('ExhibitionArtworksController', () => {
  let controller: ExhibitionArtworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExhibitionArtworksController],
      providers: [ExhibitionArtworksService],
    }).compile();

    controller = module.get<ExhibitionArtworksController>(ExhibitionArtworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
