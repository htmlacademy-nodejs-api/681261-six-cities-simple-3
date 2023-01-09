import {Ad} from '../types/offer.type';
import {ApartmentType} from '../types/apartment-type.enum';
import {Facilities} from '../types/facilities.enum';

export const createAd = (row: string) => {

  const tokens = row.replace('\n', '').split('\t');
  const [name, description, createdDate, city, preview, pictures, isPremium, rating, apartmentType, roomsAmount, guestCapacity, price, facilities, author, commentsAmount, coordinates] = tokens;
  return {
    name,
    description,
    createdDate: new Date(createdDate),
    city,
    preview,
    pictures: pictures.split(','),
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    apartmentType: apartmentType as ApartmentType,
    roomsAmount: Number(roomsAmount),
    guestCapacity: Number(guestCapacity),
    price: Number.parseInt(price, 10),
    facilities: facilities.split(',') as Facilities[],
    author,
    commentsAmount: Number(commentsAmount),
    coordinates: coordinates.split(',')
  } as Ad;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
