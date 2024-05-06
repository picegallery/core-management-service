import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  ConfirmationCode: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
