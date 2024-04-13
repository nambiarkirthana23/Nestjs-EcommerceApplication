import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserSignUpDto } from "../dto/signUpUser.dto";
import { EcommerceGatewayService } from "../service/Ecommerce.service";
import { CONSTANT_MSG } from "../common-dto/const";
import { SignInUserDto } from "../dto/signInUser.dto";

@Controller('api')

export class GatewayEcommerceController
{
    constructor(
        private readonly ecommerceService: EcommerceGatewayService) {}
    @Post('/signUp')
    @UsePipes(new ValidationPipe({ transform: true }))
    async SignUp(@Res() res: any, @Body() body:UserSignUpDto){
      try {
        console.log("body",body)
        let resp = await this.ecommerceService.signUp(body)
        console.log(resp);
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Device Microservice ECONNREFUSED' });
        } else if (resp.statusCode === HttpStatus.CREATED) {
          res
            .status(resp.statusCode)
            .send({ success: resp.message});
        } else {
          res.status(resp.statusCode).send({ error: resp.message });
        }
      } catch (err) {
        console.log(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }




@Post('/signIn')
async signIn(@Body() body:SignInUserDto,@Res() res:any) {
  try {
    console.log(body);
    const resp = await this.ecommerceService.signIn(body);

    if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.OK) {
      res
        .status(resp.statusCode)
        .send({ status:resp.statusCode,message: resp.message, data: resp.data });
    } else {
      res.status(resp.statusCode).send({ status:resp.statusCode, error: resp.message });
    }
    console.log("resp",resp)
 
  } catch (err) {
    console.error('Login Error:', err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
 
  }

}

}