// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv'


async function bootstrap() {
  const envFilePath = path.resolve(__dirname, '..', '..', 'common', '.env');

  dotenv.config({ path: envFilePath });
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001, 
    },
    
    


    
  });

  
  //app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  // app.setGlobalPrefix('api')
  await app.listen();
  
}

bootstrap();
//npm run migration:generate -- db/migrations/initial
//npm run migration:run
