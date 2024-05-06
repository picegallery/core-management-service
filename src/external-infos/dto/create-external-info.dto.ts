import { IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OriginType, SourceType } from '../entities/external-info.entity';

export class CreateExternalInfoDto {
  @IsEnum(SourceType)
  @ApiPropertyOptional({
    enum: SourceType,
    default: SourceType.OTHER,
    description: 'The type of source from which the external info is derived.',
  })
  sourceType: SourceType;

  @IsEnum(OriginType)
  @ApiPropertyOptional({
    enum: OriginType,
    default: OriginType.OTHER,
    description:
      'The origin type, defining where the external info comes from.',
  })
  originType: OriginType;
}
