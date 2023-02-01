import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose()
  public email!: string ;

  @Expose()
  public avatarImg!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: string;
}
