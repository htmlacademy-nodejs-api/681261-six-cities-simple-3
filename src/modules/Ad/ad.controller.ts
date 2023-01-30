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

@injectable()
export default class AdController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.AdServiceInterface) private readonly adService: AdServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for AdController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/create', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const ads = await this.adService.find();
    const categoryResponse = fillDTO(AdResponse, ads);
    this.send(res, StatusCodes.OK, categoryResponse);
  }

  public async create(
    // Вопрос
    //что происходит с типами на строчке ниже?)
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateAdDto>,
    res: Response): Promise<void> {

    // Вопрос
    //тут было бы логично искать объявление по id, но такого поля в CreateAdDto нет
    //его нет, потому что id для записи добавляет mongoose, что нужно сделать, просто добавить поле id в dto?
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
}
