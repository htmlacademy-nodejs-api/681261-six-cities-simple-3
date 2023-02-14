import {CityEnum} from '../../../types/city.enum.js';
import {ApartmentType} from '../../../types/apartment-type.enum.js';
import {Facilities} from '../../../types/facilities.enum.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {ERROR_MESSAGE} from '../../../constants/error-message.constant.js';

export default class UpdateAdDto {

  @IsOptional()
  @IsString({message: `name ${ERROR_MESSAGE.NOT_STRING}`})
  @MinLength(10, {message: `name ${ERROR_MESSAGE.MIN_LENGTH} 10`})
  @MaxLength(100, {message: `name ${ERROR_MESSAGE.MAX_LENGTH} 100`})
  public name?: string;

  @IsOptional()
  @MinLength(20, {message: `description ${ERROR_MESSAGE.MIN_LENGTH} 10`})
  @MaxLength(1024, {message: `description ${ERROR_MESSAGE.MAX_LENGTH} 100`})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: `createdDate ${ERROR_MESSAGE.VALID_DATE}`})
  public createdDate?: Date;

  @IsOptional()
  @IsEnum(CityEnum, {message: `city ${ERROR_MESSAGE.INVALID_ENUM_TYPE}`})
  public city?: CityEnum;

  @IsOptional()
  @IsString({message: `preview ${ERROR_MESSAGE.NOT_STRING}`})
  public preview?: string;

  @IsOptional()
  @IsArray({message: `pictures ${ERROR_MESSAGE.NOT_ARRAY}`})
  public pictures?: string[];

  @IsOptional()
  @IsBoolean({message: `isPremium ${ERROR_MESSAGE.NOT_BOOL}`})
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({ message: `rating ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `rating ${ERROR_MESSAGE.MIN_INT_VALUE} 1`})
  @Max(5, {message: `rating ${ERROR_MESSAGE.MAX_INT_VALUE} 5`})
  public rating?: number;

  @IsOptional()
  @IsEnum(ApartmentType, {message: `apartmentType ${ERROR_MESSAGE.INVALID_ENUM_TYPE}`})
  public apartmentType?: ApartmentType;

  @IsOptional()
  @IsInt({message: `roomsAmount ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `roomsAmount ${ERROR_MESSAGE.MIN_INT_VALUE} 1`})
  @Max(8, {message: `roomsAmount ${ERROR_MESSAGE.MAX_INT_VALUE} 8`})
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({message: `guestCapacity ${ERROR_MESSAGE.NOT_INT}`})
  @Min(1, {message: `guestCapacity ${ERROR_MESSAGE.MIN_INT_VALUE} 10`})
  @Max(10, {message: `guestCapacity ${ERROR_MESSAGE.MAX_INT_VALUE} 10`})
  public guestCapacity?: number;

  @IsOptional()
  @IsInt({message: `price ${ERROR_MESSAGE.NOT_INT}`})
  @Min(10, {message: `price ${ERROR_MESSAGE.MIN_INT_VALUE} 100`})
  @Max(100000, {message: `price ${ERROR_MESSAGE.MAX_INT_VALUE} 100000`})
  public price?: number;

  @IsOptional()
  @IsArray({message: `facilities ${ERROR_MESSAGE.NOT_ARRAY}`})
  public facilities?: Facilities[];

  @IsOptional()
  @IsArray({message: `coordinates ${ERROR_MESSAGE.NOT_ARRAY}`})
  public coordinates?: string[];
}


