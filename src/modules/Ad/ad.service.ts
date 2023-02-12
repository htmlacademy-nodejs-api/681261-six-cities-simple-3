import {AdServiceInterface} from './ad-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {AdEntity} from './ad.entity.js';
import CreateAdDto from './dto/create-ad.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import UpdateAdDto from './dto/update-ad.dto.js';

@injectable()
export default class AdService implements AdServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.AdModel) private adModel: ModelType<AdEntity>
  ) {}

  public async create(dto: CreateAdDto): Promise<DocumentType<AdEntity>> {
    const result = await this.adModel.create(dto);
    this.logger.info(`New Ad created: ${dto.name}`);
    return result;
  }

  public findById(id: string): Promise<DocumentType<AdEntity> | null> {
    return this.adModel.findById(id).populate(['userId']).exec();
  }

  public async find(limit: number): Promise<DocumentType<AdEntity>[]> {
    return this.adModel.find().limit(limit).sort({createdDate: -1});
  }

  public async deleteById(id: string): Promise<DocumentType<AdEntity> | null> {
    return this.adModel.findByIdAndDelete(id);
  }

  public async updateById(id: string, dto: UpdateAdDto): Promise<DocumentType<AdEntity> | null> {
    return this.adModel.findByIdAndUpdate(id, dto, {new: true});
  }

  public async incCommentCount(adId: string): Promise<DocumentType<AdEntity> | null> {
    return this.adModel
      .findByIdAndUpdate(adId, {'$inc': {
        commentsAmount: 1,
      }}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.adModel
      .exists({_id: documentId})) !== null;
  }
}
