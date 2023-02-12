import {Expose} from 'class-transformer';

export default class AdListResponse {
  @Expose()
  public price!: number;

  @Expose()
  public name!: string;

  @Expose()
  public apartmentType!: string;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: string;

  @Expose()
  public rating!: string;

  @Expose()
  public commentsAmount!: string;
}
