import { Injectable } from '@nestjs/common';
import { CreateArtistNationalityDto } from './dto/create-artist-nationality.dto';
import { UpdateArtistNationalityDto } from './dto/update-artist-nationality.dto';

@Injectable()
export class ArtistNationalitiesService {
  create(createArtistNationalityDto: CreateArtistNationalityDto) {
    return 'This action adds a new artistNationality';
  }

  findAll() {
    return `This action returns all artistNationalities`;
  }

  findOne(id: string) {
    return `This action returns a #${id} artistNationality`;
  }

  update(id: string, updateArtistNationalityDto: UpdateArtistNationalityDto) {
    return `This action updates a #${id} artistNationality`;
  }

  remove(id: string) {
    return `This action removes a #${id} artistNationality`;
  }
}
