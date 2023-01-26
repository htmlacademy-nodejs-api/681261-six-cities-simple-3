import 'reflect-metadata';
import Application from './app/application.js';
import {applicationContainer} from './app/application.container.js';
import {Component} from './types/component.types.js';
import {Container} from 'inversify';
import {userContainer} from './modules/user/user.container.js';
import {commentContainer} from './modules/comment/comment.container.js';
import {adContainer} from './modules/Ad/ad.container.js';


const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  commentContainer,
  adContainer
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
