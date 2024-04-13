import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSignUpDto } from './dto/signUp-userdto';
import { SignInUserDto } from './dto/signIn-userdto';

@Controller()
export class UsersController {
  constructor(
    // @InjectRepository(User)
    private readonly usersService: UsersService) {}

@MessagePattern({cmd:'addUser'})
async signUpUser(userSignUpDto:UserSignUpDto){
    try{
    console.log("details",userSignUpDto);
    // let resp = await this.usersService.userSignUp(userSignUpDto);
    let resp=this.usersService.userSignUp(userSignUpDto);
    console.log("response",resp);
     return resp;
    }catch(err){
        console.log("err in controller",err)
        return err;
    }
}


async signInUser(signInUserDto:SignInUserDto)
{
  try{
   let resp=this.usersService.signInUser(signInUserDto);
   return resp;
  }
  catch(error)
  {
    console.log(error);
    return error;
  }
}


}