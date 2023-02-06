import {IsString} from 'class-validator';
import {ERROR_MESSAGE} from '../../../constants/error-message.constant.js';

export default class UpdateUserDto {
  @IsString({message: `name ${ERROR_MESSAGE.NOT_STRING}`})
  public name!: string;
}
