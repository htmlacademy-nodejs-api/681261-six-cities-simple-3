import {CityEnum} from '../../../types/city.enum.js';
import {ApartmentType} from '../../../types/apartment-type.enum.js';
import {Facilities} from '../../../types/facilities.enum.js';

export default class CreateAdDto {
  name!: string;
  description!: string;
  createdDate!: Date;
  city!: CityEnum;
  preview!: string;
  pictures!: string[];
  isPremium!: boolean;
  rating!: number;
  apartmentType!: ApartmentType;
  roomsAmount!: number;
  guestCapacity!: number;
  price!: number;
  facilities!: Facilities[];
  userId!: string;
  commentsAmount!: number;
  coordinates!: string[];
}
