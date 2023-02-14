import {UserType} from '../../../types/user-type.enum.js';
import {IsEmail, IsEnum, IsString, MaxLength, MinLength} from 'class-validator';
import {ERROR_MESSAGE} from '../../../constants/error-message.constant.js';

export default class CreateUserDto {
  @IsString({message: `email ${ERROR_MESSAGE.NOT_STRING}`})
  @IsEmail({}, {message: 'email should be an email string'})
  public email!: string;

  @IsString({message: `avatarImg ${ERROR_MESSAGE.NOT_STRING}`})
  public avatarImg!: string;

  @IsString({message: `name ${ERROR_MESSAGE.NOT_STRING}`})
  public name!: string;

  @IsEnum(UserType, {message: `type ${ERROR_MESSAGE.INVALID_ENUM_TYPE}`})
  public type!: UserType;

  @IsString({message: `password ${ERROR_MESSAGE.NOT_STRING}`})
  @MinLength(6, {message: `${ERROR_MESSAGE.MIN_LENGTH} 6`})
  @MaxLength(12, {message: `${ERROR_MESSAGE.MAX_LENGTH} 12`})
  public password!: string;
}
