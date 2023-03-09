import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;
    const errors = exception.value;

    response.status(status).json({
      code: 2,
      message: 'Validation failed',
      data: this.formatErrors(errors),
    });
  }

  private formatErrors(errors: any[]) {
    return errors.map(error => {
      const constraints = error.constraints;
      const keys = Object.keys(constraints);
      return {
        field: error.property,
        errors: keys.map(key => constraints[key]),
      };
    });
  }
}
