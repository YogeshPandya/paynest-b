import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import setLanguage from './middleware/setLocales';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
      origin: '*',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
  app.use(morgan('dev')); 
  app.use(setLanguage);
    // Set up global validation pipe
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
