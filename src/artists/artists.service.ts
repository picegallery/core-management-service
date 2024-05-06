import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { ARTIST_REPOSITORY } from 'constants/repository';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(ARTIST_REPOSITORY)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      const artist = this.artistRepository.create({
        ...createArtistDto,
      });

      await this.artistRepository.save(artist);

      return artist;
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }

  findAll() {
    return this.artistRepository.find({
      order: { createdDate: 'ASC', deletedDate: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artistRepository.softDelete(id);
  }
}
