import {AdGeneratorInterface} from './ad-generator-interface.js';
import {MockData} from '../../types/src/types/mock-data.type';
import {getRandomItem, getRandomItems, generateRandomValue} from '../../utils/random.js';
import dayjs from 'dayjs';

const enum WEEK_DAY {
  First = 1,
  Last = 7,
}

export default class AdGenerator implements AdGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  private generateUser() {
    return {
      name: getRandomItem<string>(this.mockData.authorNames),
      email: `test${generateRandomValue(1, 1000)}@mail.ru`,
      avatarImg: 'avatar.png',
      password: 'secret',
      type: getRandomItem<string>(this.mockData.userTypes)
    };
  }

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const pictures = getRandomItems<string>(this.mockData.pictures);
    const type = getRandomItem<string>(this.mockData.types);
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.preview);
    const isPremium = generateRandomValue(1, 6) > 2;
    const rating = generateRandomValue(1, 5);
    const apartmentType = getRandomItem<string>(this.mockData.apartmentType);
    const roomsAmount = generateRandomValue(1,8);
    const guestCapacity = generateRandomValue(1, 10);
    const price = generateRandomValue(1000, 20000);
    const facilities = getRandomItems<string>(this.mockData.facilities);
    const author = this.generateUser();
    const commentsAmount = 0;
    const coordinates = [generateRandomValue(40, generateRandomValue(35, 40, 3)),
      generateRandomValue(40, generateRandomValue(35, 40, 3))];

    const createdDate = dayjs().subtract(generateRandomValue(WEEK_DAY.First, WEEK_DAY.Last), 'day').toISOString();

    return [name, description, pictures, createdDate, type, city, preview, isPremium, rating,
      apartmentType, roomsAmount, guestCapacity, price, facilities, author.name, author.email, author.password, author.avatarImg, author.type, commentsAmount, coordinates].join('/t');
  }
}
