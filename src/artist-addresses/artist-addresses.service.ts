import { Injectable } from '@nestjs/common';
import { CreateArtistAddressDto } from './dto/create-artist-address.dto';
import { UpdateArtistAddressDto } from './dto/update-artist-address.dto';

@Injectable()
export class ArtistAddressesService {
  create(createArtistAddressDto: CreateArtistAddressDto) {
    return 'This action adds a new artistAdress';
  }

  findAll() {
    return `This action returns all artistAddresses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} artistAdress`;
  }

  update(id: string, updateArtistAddressDto: UpdateArtistAddressDto) {
    return `This action updates a #${id} artistAdress`;
  }

  remove(id: string) {
    return `This action removes a #${id} artistAdress`;
  }
}
