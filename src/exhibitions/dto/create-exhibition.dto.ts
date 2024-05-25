import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { ExhibitionType } from '../entities/exhibition.entity';

export class CreateExhibitionDto {
  @IsString()
  @ApiProperty({ example: 'enchanted realms' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'enchanted realms description' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'https://via.placeholder.com/1920x320' })
  bannerUrl: string;

  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  startDate: string;

  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  endDate: string;

  @IsEnum(ExhibitionType)
  @ApiProperty({ example: ExhibitionType.OTHER })
  exhibitionType: ExhibitionType;
}
