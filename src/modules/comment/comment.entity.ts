import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {AdEntity} from '../Ad/ad.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop()
  public text!: string;

  @prop()
  public time!: Date;

  @prop()
  public rating!: number;

  @prop({
    ref: UserEntity,
    require: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: AdEntity,
    require: true
  })
  public adId!: Ref<AdEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
