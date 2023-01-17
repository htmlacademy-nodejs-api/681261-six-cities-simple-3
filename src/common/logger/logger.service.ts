import {LoggerInterface} from './logger.interface.js';
import pino, {Logger} from 'pino';
import {injectable} from 'inversify';

@injectable()
export default class LoggerService implements LoggerInterface {
  private logger!: Logger;

  constructor() {
    this.logger = pino();
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }
}
