import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './filters/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalFilters(new AnyExceptionFilter()); // 全局使用异常处理器
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('调查问卷API')
    .setDescription('调查问卷API')
    .setVersion('1.0')
    .addTag('survey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8787);
}
bootstrap();
