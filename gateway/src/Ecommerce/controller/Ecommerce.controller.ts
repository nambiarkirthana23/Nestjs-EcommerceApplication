import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { EcommerceGatewayService } from "../service/Ecommerce.service";
import { CONSTANT_MSG } from "../common-dto/const";

@Controller('api')

export class GatewayEcommerceController
{
    constructor(
        private readonly ecommerceService: EcommerceGatewayService) {}
    @Post('/signUp')
    @UsePipes(new ValidationPipe({ transform: true }))
    async SignUp(@Res() res: any, @Body() body:CreateUserDto){
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
}