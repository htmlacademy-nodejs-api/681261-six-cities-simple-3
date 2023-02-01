import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {AdServiceInterface} from './ad-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import AdResponse from './ad.response.js';
import CreateAdDto from './dto/create-ad.dto.js';
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/comment.response.js';

type ParamsGetAd = {
  adId: string
}

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
    this.addRoute({path: '/create', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:adId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/:adId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:adId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/:adId/comments', method: HttpMethod.Get, handler: this.getComments});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const ads = await this.adService.find();
    const categoryResponse = fillDTO(AdResponse, ads);
    this.send(res, StatusCodes.OK, categoryResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateAdDto>,
    res: Response): Promise<void> {

    const existAd = false;

    if (existAd) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists.`,
        'CategoryController'
      );
    }

    const result = await this.adService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(AdResponse, result)
    );
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetAd>,
    res: Response ): Promise<void> {
    const {adId} = params;
    const result = await this.adService.findById(adId);
    console.log(result);
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
