import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/user.response.js';

export default class AdResponse {
  @Expose()
  public id!: string;

  @Expose()
  public price!: number;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public pictures!: string;

  @Expose()
  public isPremium!: string;

  @Expose()
  public rating!: string;

  @Expose()
  public apartmentType!: string;

  @Expose()
  public roomsAmount!: string;

  @Expose()
  public guestCapacity!: string;

  @Expose()
  public facilities!: string;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public commentsAmount!: string;

  @Expose()
  public coordinates!: string;
}
