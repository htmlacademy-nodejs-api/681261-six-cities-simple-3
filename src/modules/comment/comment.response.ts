import {Expose, Type} from 'class-transformer';
import UserResponse from '../user/user.response.js';

export default class CommentResponse {
  @Expose()
  public text!: string;

  @Expose()
  public time!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;
}
