import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';
import {Facilities} from '../../types/facilities.enum';
import {ApartmentType} from '../../types/apartment-type.enum';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, createdDate, city, preview, pictures, isPremium, rating, apartmentType, roomsAmount, guestCapacity, price, facilities, author, commentsAmount, coordinates]) => ({
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
      }));
  }
}
