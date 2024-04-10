import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CONSTANT_MSG } from './common-dto/const';
import { CommonService } from './common-service/common-service';

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


  async signUp(body: CreateUserDto): Promise<any> {
    try {
        console.log(body);
        let user = await this.UserRepository.save(body);
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
