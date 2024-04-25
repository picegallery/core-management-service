import { PartialType } from '@nestjs/swagger';
import { CreateExhibitionArtworkDto } from './create-exhibition-artwork.dto';

export class UpdateExhibitionArtworkDto extends PartialType(CreateExhibitionArtworkDto) {}
