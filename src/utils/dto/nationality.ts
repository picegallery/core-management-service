import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NationalityDto {
  @IsString()
  @ApiProperty({ example: 'Brazil' })
  country: string;

  @IsString()
  @ApiProperty({ example: 'Brazilian' })
  nationality: string;
}
