import { HttpException, HttpStatus } from "@nestjs/common";

export class NullPointerException extends HttpException {
  constructor(message = 'no message', status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(`Null Pointer Exception: ${message}`, status);
  }
}
