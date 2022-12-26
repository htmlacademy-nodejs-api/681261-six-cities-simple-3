import {Facilities} from './facilities.enum';
import {ApartmentType} from './apartment-type.enum';


export type Offer = {
  name: string;
  description: string;
  createdDate: Date;
  city: string;
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
