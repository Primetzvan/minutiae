import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes not expected attributes in post/update request body, help prevent malicious data from being sent into our Requests
      transform: true, // auto transforms payloads to DTO instances and performs primitive type conventions (path & query parameters come over the internet as string)
      forbidNonWhitelisted: true, // bad gatway error when not expected attributes in post/update request body
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const microserviceMQTT = app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    },
    { inheritAppConfig: true },
  );

  const config = new DocumentBuilder()
    .setTitle('Minutiae')
    .setDescription('API for a fingerprint system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
