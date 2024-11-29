import {
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    if (exception instanceof ZodError) {
      const description = `Invalid input: ${exception.errors
        .map((e) => e.message)
        .join(", ")}`;
        
      throw new BadRequestException('invalid data', {
        cause: exception,
        description,
      });
    }
  }
}
