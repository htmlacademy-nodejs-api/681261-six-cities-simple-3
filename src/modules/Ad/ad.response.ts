import {Expose} from 'class-transformer';

export default class AdResponse {
  @Expose()
  public id!: string;

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
  public price!: string;

  @Expose()
  public facilities!: string;

  @Expose()
  public userId!: string;

  @Expose()
  public commentsAmount!: string;

  @Expose()
  public comments!: string;

  @Expose()
  public coordinates!: string;
}
