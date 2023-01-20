import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {User} from '../../types/user.type.js';
import {UserType} from '../../types/user-type.enum.js';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatarImg = data.avatarImg;
    this.name = data.name;
    this.password = data.password;
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({default: 'default.jpg'})
  public avatarImg!: string;

  @prop({required: true, default: '', minlength: 1, maxlength: 15})
  public name!: string;

  @prop({required: true, default: ''})
  public type!: UserType;

  @prop({required: true, default: '', minlength: 6, maxlength: 12})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
