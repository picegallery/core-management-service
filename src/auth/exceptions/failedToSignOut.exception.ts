import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToSignOutException extends HttpException {
  constructor(message: string) {
    super(`Failed to logout: ${message}`, HttpStatus.BAD_REQUEST);
  }
}
