import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GatewayEcommerceController } from '../controller/Ecommerce.controller';
import { EcommerceGatewayService } from '../service/Ecommerce.service';
import { HealthCheckMicroservicesService } from '../service/HealthCheckService';

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
    ])],
  controllers: [GatewayEcommerceController],
  providers: [EcommerceGatewayService,HealthCheckMicroservicesService],
})
export class GatewayMqttModule {}