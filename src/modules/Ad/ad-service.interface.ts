import CreateAdDto from './dto/create-ad.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {AdEntity} from './ad.entity.js';
import updateAdDto from './dto/update-ad.dto';

export interface AdServiceInterface {
  create(dto: CreateAdDto): Promise<DocumentType<AdEntity>>;
  findById(id: string): Promise<DocumentType<AdEntity> | null>;
  find(): Promise<DocumentType<AdEntity>[]>;
  updateById(id: string, dto: updateAdDto): Promise<DocumentType<AdEntity> | null>;
  deleteById(id: string): Promise<DocumentType<AdEntity> | null>;
  incCommentCount(adId: string): Promise<DocumentType<AdEntity> | null>
}
