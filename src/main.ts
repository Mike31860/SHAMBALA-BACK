import { AppModule } from './app.module';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService: EnvironmentConfigService = app.get(
    EnvironmentConfigService,
  );
  const contextPath = configService.getAppContextPath();
  app.setGlobalPrefix(contextPath);

  const config = new DocumentBuilder()
    .setTitle('shambala')
    .setDescription('This is an api built for a code test.')
    .setVersion('1.0')
    .addServer(contextPath)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const appPort = configService.getAppPort();
  await app.listen(appPort);
}

bootstrap();
