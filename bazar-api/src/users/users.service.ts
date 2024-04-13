import { HttpStatus, Injectable } from '@nestjs/common';
import {  UserSignUpDto } from './dto/signUp-userdto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CONSTANT_MSG } from './common-dto/const';
import { CommonService } from './common-service/common-service';
import { hash } from 'bcrypt';
import { SignInUserDto } from './dto/signIn-userdto';
import { single } from 'rxjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository:Repository<User>,
    private readonly commonService: CommonService,
  ){}

  //  async signUp(createUserDto: CreateUserDto) {
  //    return await this.UserRepository.save(createUserDto);
    
  // }

  async userSignUp(UserSignUpDto: UserSignUpDto): Promise<any> {
    try {
        console.log("u",UserSignUpDto);
        const userExist=await this.findUserByEmail(UserSignUpDto.email);
        if(userExist)
        {
          return  this.commonService.errorMessage('',CONSTANT_MSG.EMAIL_NOT_AVAILABLE,HttpStatus.BAD_REQUEST)
        }
        UserSignUpDto.password= await hash(UserSignUpDto.password,10)
        console.log("password",UserSignUpDto.password)
        let user = await this.UserRepository.save(UserSignUpDto);
        console.log("query", user);

        if (!user) {
            return this.commonService.errorMessage('',CONSTANT_MSG.UNABLE_TO_ADD_USER,HttpStatus.BAD_REQUEST );
        } else {

            return this.commonService.successMessage(
                user,
                CONSTANT_MSG.USER_ADDED_SUCCESSFULLY,
                HttpStatus.CREATED,
            );
        }

    } catch (err) {
        console.log(err);
        return this.commonService.errorMessage(
            {},
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

  // async findUserByEmail(email:string)
  // {
  //   return await this.UserRepository.findOneBy({email});
  // }


  async findUserByEmail(email: string) {
    return  this.UserRepository.findOne({ where: { email } });
  }
  async signInUser(SignInUserDto:SignInUserDto)
  {
    try{
         console.log("signInUserDto",SignInUserDto);
    }
    catch(error)
    {
        console.log(error);
        return error;

    }
  }


  
}
