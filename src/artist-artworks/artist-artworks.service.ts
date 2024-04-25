import { Injectable } from '@nestjs/common';
import { CreateArtistArtworkDto } from './dto/create-artist-artwork.dto';
import { UpdateArtistArtworkDto } from './dto/update-artist-artwork.dto';

@Injectable()
export class ArtistArtworksService {
  create(createArtistArtworkDto: CreateArtistArtworkDto) {
    return 'This action adds a new artistArtwork';
  }

  findAll() {
    return `This action returns all artistArtworks`;
  }

  findOne(id: string) {
    return `This action returns a #${id} artistArtwork`;
  }

  update(id: string, updateArtistArtworkDto: UpdateArtistArtworkDto) {
    return `This action updates a #${id} artistArtwork`;
  }

  remove(id: string) {
    return `This action removes a #${id} artistArtwork`;
  }
}
