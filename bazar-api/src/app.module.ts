import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmconfigAsync } from './configs/typeorm.config';


import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './users/users.module';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientsModule.register([
    {
      name: 'ECOMMERCE_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//npm install --save @nestjs/config