import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { RepositoryEnum } from 'constants/repository';
import { UsersService } from 'src/users/users.service';
import { InternalErrorException } from 'src/shared/exceptions/internalError.exception';
import { UserType } from 'src/users/entities/user.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(RepositoryEnum.ARTIST_REPOSITORY)
    private artistRepository: Repository<Artist>,
    private readonly usersService: UsersService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      const user = await this.usersService.create({
        ...createArtistDto.user,
        userType: UserType.ARTIST,
      });
      const nationalities = createArtistDto.nationalities.map((nationality) =>
        JSON.stringify(nationality),
      );
      const artist = this.artistRepository.create({
        ...createArtistDto,
        user: user,
        nationalities,
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
      relations: ['user'],
    });
  }

  findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const nationalities = updateArtistDto.nationalities.map((nationality) =>
        JSON.stringify(nationality),
      );
      const updatedArtistDto = { ...updateArtistDto, nationalities };
      await this.artistRepository.update(id, updatedArtistDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  remove(id: string) {
    return this.artistRepository.softDelete(id);
  }
}
