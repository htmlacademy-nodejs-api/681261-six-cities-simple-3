import CreateAdDto from './dto/create-ad.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {AdEntity} from './ad.entity.js';

export interface AdServiceInterface {
  create(dto: CreateAdDto): Promise<DocumentType<AdEntity>>;
  findById(id: string): Promise<DocumentType<AdEntity> | null>
}
