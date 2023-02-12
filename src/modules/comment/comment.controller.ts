import {Controller} from '../../common/controller/controller.js';
import {inject} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {AdServiceInterface} from '../Ad/ad-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {ValidateDtoMiddleware} from '../../middlewares/validate-dto.middleware.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {Request, Response} from 'express';
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './comment.response.js';
import {PrivateRouteMiddleware} from '../../middlewares/private-route.middleware.js';

export class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface,
    @inject(Component.AdServiceInterface) private adService: AdServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto),
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create(
    {body}: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    if (!await this.adService.exists(body.adId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.adId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.adService.incCommentCount(body.adId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
