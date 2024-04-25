import { PartialType } from '@nestjs/swagger';
import { CreateArtistArtworkDto } from './create-artist-artwork.dto';

export class UpdateArtistArtworkDto extends PartialType(CreateArtistArtworkDto) {}
