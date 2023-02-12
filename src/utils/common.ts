import {Ad} from '../types/offer.type.js';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import {ApartmentType} from '../types/apartment-type.enum.js';
import {Facilities} from '../types/facilities.enum.js';
import crypto from 'crypto';
import * as jose from 'jose';

export const createAd = (row: string) => {
  const tokens = row.replace('\n', '');
  const splitToken = tokens.split('/t');
  const [name, description, pictures, createdDate, adType, city, preview, isPremium, rating, apartmentType, roomsAmount, guestCapacity, price, facilities, userName, email, password, avatarImg, userType, commentsAmount, coordinates] = splitToken;
  return {
    name,
    description,
    pictures: pictures.split(','),
    createdDate: new Date(createdDate),
    city,
    type: adType,
    preview,
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    apartmentType: apartmentType as ApartmentType,
    roomsAmount: Number(roomsAmount),
    guestCapacity: Number(guestCapacity),
    price: Number.parseInt(price, 10),
    facilities: facilities.split(',') as Facilities[],
    user: {name: userName, email, password, avatarImg, type: userType},
    commentsAmount: Number(commentsAmount),
    coordinates: coordinates.split(',')
  } as Ad;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
