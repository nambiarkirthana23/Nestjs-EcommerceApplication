import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "../dto/create-user.dto";

export class EcommerceGatewayService
{
    constructor(
        @Inject('ECOMMERCE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    async signUp(body:CreateUserDto) {
        try {
          console.log("body2",body);
          let resp = await this.deviceProxy .send({ cmd: 'addUser' },body).toPromise();
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      }
}