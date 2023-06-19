import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './common/http-exception.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from 'src/common/validator-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('api');
  // 使用全局过滤器
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  // 使用全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
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
  // swagger
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('测试接口文档')
    .addTag('其他')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
