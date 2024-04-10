// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// export class UsersModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CommonService } from "./common-service/common-service";
// import { CommonService } from "src/device/services/common-service";

// import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        // ScheduleModule.forRoot(),
        ClientsModule.register([
            {
              name: 'ECOMMERCE_SERVICE',
              transport: Transport.TCP,
              options: {
                host: 'localhost',
                port: 3001,
              },
            },
          ])
    ],
    controllers:[UsersController],
    providers:[UsersService,CommonService],
    exports:[]
})
export class UserModule{}
