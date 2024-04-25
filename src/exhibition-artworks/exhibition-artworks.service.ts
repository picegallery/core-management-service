import { Injectable } from '@nestjs/common';
import { CreateExhibitionArtworkDto } from './dto/create-exhibition-artwork.dto';
import { UpdateExhibitionArtworkDto } from './dto/update-exhibition-artwork.dto';

@Injectable()
export class ExhibitionArtworksService {
  create(createExhibitionArtworkDto: CreateExhibitionArtworkDto) {
    return 'This action adds a new exhibitionArtwork';
  }

  findAll() {
    return `This action returns all exhibitionArtworks`;
  }

  findOne(id: string) {
    return `This action returns a #${id} exhibitionArtwork`;
  }

  update(id: string, updateExhibitionArtworkDto: UpdateExhibitionArtworkDto) {
    return `This action updates a #${id} exhibitionArtwork`;
  }

  remove(id: string) {
    return `This action removes a #${id} exhibitionArtwork`;
  }
}
