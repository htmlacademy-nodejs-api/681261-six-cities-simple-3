import {Container} from 'inversify';
import {Component} from '../../types/component.types.js';
import {types} from '@typegoose/typegoose';
import {CommentServiceInterface} from './comment-service.interface.js';
import CommentService from './comment.service.js';
import {CommentEntity, CommentModel} from './comment.entity.js';

const commentContainer = new Container();

commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

export {commentContainer}
