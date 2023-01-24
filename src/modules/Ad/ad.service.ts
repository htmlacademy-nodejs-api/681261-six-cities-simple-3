import {AdServiceInterface} from './ad-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {AdEntity} from './ad.entity.js';
import CreateAdDto from './dto/create-ad.dto.js';
import {DocumentType} from '@typegoose/typegoose';

@injectable()
export default class AdService implements AdServiceInterface {
  // ВОПРОС
  // Мы ожидаем, что при создании класса AdService
  // будут переданы логгер и модел, что есть модель в данном случае
  // путаю похожие сущности model, entity, dto объясни еще раз разницу, пожалуйста
  // для чего нужна каждая из сущностей и как у них зависимости между собой
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.AdModel) private adModel: ModelType<AdEntity>
  ) {}

  public async create(dto: CreateAdDto): Promise<DocumentType<AdEntity>> {
    const result = await this.adModel.create(dto);
    this.logger.info(`New Ad created: ${dto.name}`);
    return result;
  }

  //ВОПРОС
  // откуда в модели берется id?
  // Это тот самый который наследуется от дефолтного класса?
  // Что такое .exec() в конце?
  // если это внутренний id значит ли это, что данный метод не подходит для поиска
  //объявления по запросу юзера?
  public findById(id: string): Promise<DocumentType<AdEntity> | null> {
    return this.adModel.findById(id).exec();
  }
}
