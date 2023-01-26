import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {CityEnum} from '../../types/city.enum.js';
import {ApartmentType} from '../../types/apartment-type.enum.js';
import {Facilities} from '../../types/facilities.enum.js';
import {UserEntity} from '../user/user.entity.js';
import {CommentEntity} from '../comment/comment.entity';

export interface AdEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'ad'
  }
})
export class AdEntity extends defaultClasses.TimeStamps {

  @prop({ required: true, minlength: 10, maxlength: 100 })
  public name!: string;

  @prop({required: true, minlength: 20, maxlength: 1024})
  public description!: string;

  @prop({required: true})
  public createdDate!: Date;

  @prop({
    type: () => String,
    enum: CityEnum
  })
  public city!: CityEnum;

  @prop({required: true})
  public preview!: string;

  @prop({required: true})
  public pictures!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true, min: 1, max: 5})
  public rating!: number;

  @prop({
    type: () => String,
    enum: ApartmentType
  })
  public apartmentType!: ApartmentType;

  @prop({required: true, min: 1, max: 8})
  public roomsAmount!: number;

  @prop({required: true, min: 1, max: 10})
  public guestCapacity!: number;

  @prop({required: true, min: 100, max: 100000})
  public price!: number;

  @prop({required: true})
  public facilities!: Facilities[];

  @prop({
    ref: UserEntity,
    require: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    default: 0
  })
  public commentsAmount!: number;

  @prop({
    ref: CommentEntity,
    required: true,
    default: [],
  })
  public comments!: Ref<CommentEntity[]>;

  @prop({required: true})
  public coordinates!: string[];
}

export const AdModel = getModelForClass(AdEntity);
