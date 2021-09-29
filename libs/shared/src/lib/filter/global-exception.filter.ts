import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = (exception as any).message;

    Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

    const name = exception?.constructor?.name || 'HttpException';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (name) {
      case 'HttpException':
        status = (exception as HttpException).getStatus();
        break;
      case 'UnauthorizedException':
        status = HttpStatus.UNAUTHORIZED;
        break;
      case 'ForbiddenException':
        status = HttpStatus.FORBIDDEN;
        break;
      case 'QueryFailedError':  // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      case 'EntityNotFoundError':  // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      case 'CannotCreateEntityIdMapError': // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(
      {
        statusCode: status,
        error: name,
        message,
        method: request.method,
        path: request.url,
        timestamp: new Date().toISOString()
      }
    );
  }
}
