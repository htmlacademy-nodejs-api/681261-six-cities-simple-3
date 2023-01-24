import {UserType} from '../../../types/user-type.enum';

export default class CreateUserDto {
  public email!: string;
  public avatarImg!: string;
  public name!: string;
  public type!: UserType;
  public password!: string;
}
