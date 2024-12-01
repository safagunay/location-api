import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from 'src/infra';
import { ZodError } from 'zod';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    if (
      !(exception instanceof HttpException) &&
      !(exception instanceof ZodError)
    ) {
      this.loggerService.error(
        `Internal server error: ${exception}`,
        this.constructor.name,
      );
    }

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error: string | object =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'internal server error';

    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      statusCode: httpStatus,
      error,
    };

    if (exception instanceof ZodError) {
      const error = {};
      exception.errors.forEach((e) => (error[e.path.toString()] = e.message));
      httpStatus = HttpStatus.BAD_REQUEST;
      responseBody.error = error;
    }

    responseBody.statusCode = httpStatus;
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
