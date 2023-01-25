import {CommentServiceInterface} from './comment-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private commentModel: ModelType<CommentEntity>
  ) {}

  // Вопрос
  // Если я правильно понимаю мы чтобы найти комменты к одной записи перебираем все комменты в базе, это вобще законно?
  // Можем рассмотреть пример реализации этого метода через агрегацию?
  public async findByAdId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}).populate('userId');
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    return result;
  }

  public async deleteByAdId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({offerId}).exec();
    return result.deletedCount;
  }
}
