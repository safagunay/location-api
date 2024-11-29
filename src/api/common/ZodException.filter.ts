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

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      statusCode: httpStatus,
      message: 'internal server error',
    };

    if (exception instanceof ZodError) {
      const validationErrorMessage = `Invalid input: ${exception.errors
        .map((e) => e.message)
        .join(', ')}`;

      responseBody.statusCode = HttpStatus.BAD_REQUEST;
      responseBody.message = validationErrorMessage;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
