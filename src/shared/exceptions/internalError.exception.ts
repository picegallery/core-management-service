import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalErrorException extends HttpException {
  constructor(error) {
    super(`Internal Error ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
