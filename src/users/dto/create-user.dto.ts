import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { AuthType, UserType } from '../entities/user.entity';

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

  @IsEnum(UserType)
  @IsOptional()
  userType: UserType;

  @IsString()
  @IsOptional()
  password: string;
}
