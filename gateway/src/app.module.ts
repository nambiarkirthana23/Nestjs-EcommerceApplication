// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { GatewayMqttModule } from './Ecommerce/module/EcommerceGatewayModule';

// import { HealthCheckMicroservicesService } from './mqtt/services/HealthCheck.service';
@Module({
  imports: [
    ClientsModule.register([
     
      {
        name: 'ECOMMERCE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001, 
        },
      },
   
    ]),
   
    GatewayMqttModule
  ],
  
  providers: []
})
export class AppModule {}
