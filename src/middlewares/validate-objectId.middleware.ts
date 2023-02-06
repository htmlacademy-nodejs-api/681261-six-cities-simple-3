import {MiddlewareInterface} from '../types/middleware.interface';
import mongoose from 'mongoose';
import {NextFunction, Request, Response} from 'express';
import HttpError from '../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';

const {Types} = mongoose;

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private param: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
