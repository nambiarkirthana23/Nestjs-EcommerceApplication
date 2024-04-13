import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {UserSignUpDto } from "../dto/signUpUser.dto";
import { SignInUserDto } from "../dto/signInUser.dto";

export class EcommerceGatewayService
{
    constructor(
        @Inject('ECOMMERCE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    async signUp(body:UserSignUpDto) {
        try {
          console.log("body2",body);
          let resp = await this.deviceProxy .send({ cmd: 'addUser' },body).toPromise();
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      }



      async signIn(body:SignInUserDto)
      {
        try
        {
          console.log("body",body);
          let resp=await this.deviceProxy.send({cmd:'loginUser'},body).toPromise();
          return resp;

        }
        catch(error){
          console.log(error);
          return error;
        }
      }
}