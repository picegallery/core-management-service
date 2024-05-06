import { AuthType, Gender, UserType } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '1234567890' })
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  photoUrl: string;

  @IsEnum(AuthType)
  @IsOptional()
  @ApiProperty({ example: AuthType.DEFAULT })
  authType: AuthType;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty({ example: Gender.FEMALE })
  gender: Gender;

  @IsEnum(UserType)
  @IsOptional()
  @ApiProperty({ example: UserType.CUSTOMER })
  userType: UserType;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'password123' })
  password: string;
}
