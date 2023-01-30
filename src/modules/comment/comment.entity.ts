import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';

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
}

export const CommentModel = getModelForClass(CommentEntity);
