import {IsDateString, IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {ERROR_MESSAGE} from '../../../constants/error-message.constant.js';

export default class CreateCommentDto {
  @IsString({message: `text ${ERROR_MESSAGE.NOT_STRING}`})
  @MinLength(5, {message: `text ${ERROR_MESSAGE.MIN_INT_VALUE} 5`})
  @MaxLength(1024, {message: `text ${ERROR_MESSAGE.MAX_INT_VALUE} 1024`})
  public text!: string;

  @IsDateString({}, {message: `time ${ERROR_MESSAGE.VALID_DATE}`})
  public time!: Date;

  @IsInt({message: `rating ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `rating ${ERROR_MESSAGE.MIN_INT_VALUE} 1`})
  @Max(5, {message: `rating ${ERROR_MESSAGE.MAX_INT_VALUE} 5`})
  public rating!: number;

  @IsMongoId({message: `userId ${ERROR_MESSAGE.INVALID_ID}`})
  public userId!: string;

  @IsMongoId({message: `adId ${ERROR_MESSAGE.INVALID_ID}`})
  public adId!: string;
}
