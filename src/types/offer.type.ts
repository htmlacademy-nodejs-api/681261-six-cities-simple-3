import {Facilities} from './facilities.enum';
import {ApartmentType} from './apartment-type.enum';
import {CityEnum} from './city.enum.js';


export type Ad = {
  name: string;
  description: string;
  createdDate: Date;
  city: CityEnum;
  preview: string;
  pictures: string[];
  isPremium: boolean;
  rating: number;
  apartmentType: ApartmentType;
  roomsAmount: number;
  guestCapacity: number;
  price: number;
  facilities: Facilities[];
  author: string;
  commentsAmount: number;
  coordinates: string[]
}
