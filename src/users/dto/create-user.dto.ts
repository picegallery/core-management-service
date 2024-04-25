import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { AuthType } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsEnum(AuthType)
  @IsOptional()
  authType: AuthType;

  @IsString()
  @IsOptional()
  password: string;
}
