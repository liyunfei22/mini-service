import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './common/http-exception.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from 'src/common/validator-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  console.log('s', process.env.NODE_ENV);

  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationExceptionFilter()); // 使用全局过滤器

  app.useGlobalInterceptors(new TransformInterceptor()); // 使用全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
      disableErrorMessages: false,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
