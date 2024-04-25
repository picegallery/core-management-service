import { PartialType } from '@nestjs/swagger';
import { CreateArtistNationalityDto } from './create-artist-nationality.dto';

export class UpdateArtistNationalityDto extends PartialType(CreateArtistNationalityDto) {}
