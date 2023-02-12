import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {AdServiceInterface} from './ad-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import AdResponse from './rdo/ad.response.js';
import CreateAdDto from './dto/create-ad.dto.js';
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/comment.response.js';
import {ValidateObjectIdMiddleware} from '../../middlewares/validate-objectId.middleware.js';
import {ValidateDtoMiddleware} from '../../middlewares/validate-dto.middleware.js';
import UpdateAdDto from './dto/update-ad.dto.js';
import {DocumentExistsMiddleware} from '../../middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../middlewares/private-route.middleware.js';
import AdListResponse from './rdo/ad-list.response.js';

type ParamsGetAd = {
  adId: string
}

const DEFAULT_AD_LIMIT = 60;

@injectable()
export default class AdController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.AdServiceInterface) private readonly adService: AdServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for AdController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});


    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateAdDto), new PrivateRouteMiddleware()]
    });

    this.addRoute({
      path: '/:adId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('adId'),
        new DocumentExistsMiddleware(this.adService, 'Ad', 'adId')
      ]
    });

    this.addRoute({
      path: '/:adId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('adId'),
        new ValidateDtoMiddleware(UpdateAdDto),
        new DocumentExistsMiddleware(this.adService, 'Ad', 'adId'),
        new PrivateRouteMiddleware()
      ]
    });

    this.addRoute({
      path: '/:adId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('adId'),
        new DocumentExistsMiddleware(this.adService, 'Ad', 'adId'),
        new PrivateRouteMiddleware()
      ]
    });

    this.addRoute({
      path: '/:adId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('adId'),
        new DocumentExistsMiddleware(this.adService, 'Ad', 'adId')
      ]
    });
  }

  public async index(
    { body }: Request<core.ParamsDictionary | ParamsGetAd>,
    res: Response
  ): Promise<void> {
    const limit = body.limit || DEFAULT_AD_LIMIT;
    const ads = await this.adService.find(Number(limit));
    const categoryResponse = fillDTO(AdListResponse, ads);
    this.send(res, StatusCodes.OK, categoryResponse);
  }

  public async create(
    req: Request<object, object, CreateAdDto>,
    res: Response): Promise<void> {

    const existAd = false;

    if (existAd) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${req.body.name}» exists.`,
        'AdController '
      );
    }

    const result = await this.adService.create({...req.body, userId: req.user.id});
    const ad = await this.adService.findById(result.id);
    this.created(
      res,
      fillDTO(AdResponse, ad)
    );
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetAd>,
    res: Response ): Promise<void> {
    const {adId} = params;
    const result = await this.adService.findById(adId);

    this.ok(res, fillDTO(AdResponse, result));
  }

  public async update(
    { params, body }: Request<core.ParamsDictionary | ParamsGetAd>,
    res: Response ): Promise<void> {
    const {adId} = params;

    const updatedAd = await this.adService.updateById(adId, body);

    this.ok(res, fillDTO(AdResponse, updatedAd));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetAd>,
    res: Response ): Promise<void> {
    const {adId} = params;
    const deletedAd = await this.adService.deleteById(adId);

    this.ok(res, fillDTO(AdResponse, deletedAd));
  }

  public async getComments(
    { params }: Request<core.ParamsDictionary | ParamsGetAd, object, object>,
    res: Response
  ): Promise<void> {
    const {adId} = params;
    const comments = await this.commentService.findByAdId(adId);

    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
