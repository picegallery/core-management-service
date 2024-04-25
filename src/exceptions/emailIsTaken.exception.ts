import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsTakenException extends HttpException {
  constructor(email: string) {
    super(`Email ${email} is already taken`, HttpStatus.CONFLICT);
  }
}
