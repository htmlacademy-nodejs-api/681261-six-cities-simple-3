import {Container} from 'inversify';
import {Component} from '../../types/component.types.js';
import {AdServiceInterface} from './ad-service.interface.js';
import AdService from './ad.service.js';
import {AdEntity, AdModel} from './ad.entity.js';
import {types} from '@typegoose/typegoose';
import {ControllerInterface} from '../../common/controller/controller.interface.js';
import AdController from './ad.controller.js';

const adContainer = new Container();

adContainer.bind<AdServiceInterface>(Component.AdServiceInterface).to(AdService);
adContainer.bind<types.ModelType<AdEntity>>(Component.AdModel).toConstantValue(AdModel);
adContainer.bind<ControllerInterface>(Component.AdController).to(AdController).inSingletonScope();

export {adContainer};
