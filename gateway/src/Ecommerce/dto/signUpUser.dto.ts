import { IsNotEmpty,IsString, IsEmail, MinLength } from 'class-validator';
export class UserSignUpDto {
   @IsNotEmpty({message:'name cannot be empty'})
   @IsString({message:'name should be string'})
    name:string;
    @IsNotEmpty({message:'email cannot be empty'})
    @IsEmail({},{message:'please provide valid mail'})
    email:string;
    @IsNotEmpty({message:'password cannot be empty'})
    @MinLength(5,{message:'minimum password character is 5'})
    password:string;

}
