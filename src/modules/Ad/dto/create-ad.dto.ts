import {CityEnum} from '../../../types/city.enum.js';
import {ApartmentType} from '../../../types/apartment-type.enum.js';
import {Facilities} from '../../../types/facilities.enum.js';
import {
  IsArray, IsBoolean,
  IsDateString,
  IsEnum, IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {ERROR_MESSAGE} from '../../../constants/error-message.constant.js';

export default class CreateAdDto {
  @MinLength(10, {message: `name ${ERROR_MESSAGE.MIN_LENGTH} 10`})
  @MaxLength(100, {message: `name ${ERROR_MESSAGE.MAX_LENGTH} 100`})
  public name!: string;

  @MinLength(20, {message: `description ${ERROR_MESSAGE.MIN_LENGTH} 10`})
  @MaxLength(1024, {message: `description ${ERROR_MESSAGE.MAX_LENGTH} 100`})
  public description!: string;

  @IsDateString({}, {message: `createdDate ${ERROR_MESSAGE.VALID_DATE}`})
  public createdDate!: Date;

  @IsEnum(CityEnum, {message: `city ${ERROR_MESSAGE.INVALID_ENUM_TYPE}`})
  public city!: CityEnum;

  @IsString({message: `preview ${ERROR_MESSAGE.NOT_STRING}`})
  public preview!: string;

  @IsArray({message: `pictures ${ERROR_MESSAGE.NOT_ARRAY}`})
  public pictures!: string[];

  @IsBoolean({message: `isPremium ${ERROR_MESSAGE.NOT_BOOL}`})
  public isPremium!: boolean;

  @IsInt({ message: `rating ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `rating ${ERROR_MESSAGE.MIN_INT_VALUE} 1`})
  @Max(5, {message: `rating ${ERROR_MESSAGE.MAX_INT_VALUE} 5`})
  public rating!: number;

  @IsEnum(ApartmentType, {message: `apartmentType ${ERROR_MESSAGE.INVALID_ENUM_TYPE}`})
  public apartmentType!: ApartmentType;

  @IsInt({message: `roomsAmount ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `roomsAmount ${ERROR_MESSAGE.MIN_INT_VALUE} 1`})
  @Max(8, {message: `roomsAmount ${ERROR_MESSAGE.MAX_INT_VALUE} 8`})
  public roomsAmount!: number;

  @IsInt({message: `guestCapacity ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `guestCapacity ${ERROR_MESSAGE.MIN_INT_VALUE} 10`})
  @Max(10, {message: `guestCapacity ${ERROR_MESSAGE.MAX_INT_VALUE} 10`})
  public guestCapacity!: number;

  @IsInt({message: `price ${ERROR_MESSAGE.NOT_INT}`})
  @Min(10, {message: `price ${ERROR_MESSAGE.MIN_INT_VALUE} 100`})
  @Max(100000, {message: `price ${ERROR_MESSAGE.MAX_INT_VALUE} 100000`})
  public price!: number;

  @IsArray({message: `facilities ${ERROR_MESSAGE.NOT_ARRAY}`})
  public facilities!: Facilities[];

  public userId!: string;

  public commentsAmount!: number;

  @IsArray({message: `coordinates ${ERROR_MESSAGE.NOT_ARRAY}`})
  public coordinates!: string[];
}
