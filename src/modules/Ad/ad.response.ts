import {Expose, Type} from 'class-transformer';
import UserResponse from '../user/user.response.js';
import CommentResponse from '../comment/comment.response.js';

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

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public commentsAmount!: string;

  //Вопрос
  // Объясни еще раз как мы помещаем в поле ответа целый объект с данными
  // До этого в базе мы хранили только id этих объектов
  // Вобще нужно ли здесь отдавать комментарии, может их отедбным запросом получить?
  @Expose({name: 'comments'})
  @Type(() => CommentResponse)
  public comments!: CommentResponse[];

  @Expose()
  public coordinates!: string;
}
