import {IsEmail, IsString} from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email should be an email string'})
  public email!: string;

  @IsString({message: 'password is required'})
  public password!: string;
}
