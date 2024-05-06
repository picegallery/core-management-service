import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsObject, IsOptional } from 'class-validator';
import { ExternalInfo } from 'src/external-infos/entities/external-info.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateArtistDto {
  @IsString()
  @ApiProperty({ example: 'Joe Doe' })
  artistName: string;

  @IsString()
  @ApiProperty({ example: 'Joe Doe' })
  biography: string;

  @IsString()
  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  photoUrl: string;

  @IsDateString()
  @ApiProperty({ example: '1990-01-01' })
  artistSince: Date;

  @IsString()
  @ApiProperty({ example: '1234567890' })
  vatNumber: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '1990-01-01' })
  birthDate: Date;

  @IsObject()
  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;

  @IsObject()
  @IsOptional()
  @ApiProperty({ type: ExternalInfo })
  externalInfo: ExternalInfo | null;
}
