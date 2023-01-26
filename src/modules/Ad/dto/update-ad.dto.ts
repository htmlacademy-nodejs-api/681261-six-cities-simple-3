import {CityEnum} from '../../../types/city.enum.js';
import {ApartmentType} from '../../../types/apartment-type.enum.js';
import {Facilities} from '../../../types/facilities.enum.js';

export default class UpdateAdDto {
  public name?: string;
  public description?: string;
  public city?: CityEnum;
  public preview?: string;
  public pictures?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public apartmentType?: ApartmentType;
  public roomsAmount?: number;
  public guestCapacity?: number;
  public price?: number;
  public facilities?: Facilities[];
  coordinates?: string[];
}
