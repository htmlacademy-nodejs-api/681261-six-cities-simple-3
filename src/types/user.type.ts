import {UserType} from './user-type.enum';

export type User = {
  name: string;
  email: string;
  avatarImg: string;
  password: string;
  type: UserType;
}
