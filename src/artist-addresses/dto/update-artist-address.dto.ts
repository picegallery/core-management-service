import { PartialType } from '@nestjs/swagger';
import { CreateArtistAddressDto } from './create-artist-address.dto';

export class UpdateArtistAddressDto extends PartialType(
  CreateArtistAddressDto,
) {}
