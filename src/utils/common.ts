import {Ad} from '../types/offer.type';
import {ApartmentType} from '../types/apartment-type.enum';
import {Facilities} from '../types/facilities.enum';
import crypto from 'crypto';

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
  // раньше city в типе Ad у меня был строкой
  // потом в ТЗ я нашел что город может быть 1 из 6 вариантов
  // передлал его на enum и вот если написать что функция createAd
  // возвращает Ad то на 14 строчке будет ошибка, а если использовать кастинг то нет, почему?
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
