import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginWithGoogleException extends HttpException {
  constructor() {
    super(
      'This email previously registered with google, Please login with google',
      HttpStatus.BAD_REQUEST,
    );
  }
}
