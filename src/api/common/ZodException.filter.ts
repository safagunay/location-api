import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      statusCode: httpStatus,
      message: 'internal server error',
      errors: [],
    };

    if (exception instanceof ZodError) {
      const validationErrorMessages = exception.errors.map(
        (e) => `${e.path}: ${e.message}`,
      );
      httpStatus = HttpStatus.BAD_REQUEST;

      responseBody.message = 'invalid data';
      responseBody.errors = validationErrorMessages;
    }

    responseBody.statusCode = httpStatus;
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
