// import { PartialType } from '@nestjs/mapped-types';
// import { UserSignUpDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(UserSignUpDto) {}
export class SignInUserDto{
    email:string;
    password:string;
}