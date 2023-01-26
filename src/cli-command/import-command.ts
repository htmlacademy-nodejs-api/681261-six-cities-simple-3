import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createAd, getErrorMessage} from '../utils/common.js';
import DatabaseService from '../common/database-client/database.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {getURI} from '../utils/db.js';
import {AdServiceInterface} from '../modules/Ad/ad-service.interface.js';
import AdService from '../modules/Ad/ad.service.js';
import {AdModel} from '../modules/Ad/ad.entity.js';
import {Ad} from '../types/offer.type.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import UserService from '../modules/user/user.service.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {UserModel} from '../modules/user/user.entity.js';

const DEFAULT_DB_PORT = 27017;

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService: UserServiceInterface;
  private adService!: AdServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.adService = new AdService(this.logger, AdModel);
    this.databaseService = new DatabaseService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
  }

  private async saveAd(ad: Ad) {
    const user = await this.userService.findOrCreate({
      ...ad.user
    }, this.salt);

    await this.adService.create({
      ...ad,
      userId: user.id
    });
  }

  private async onLine(line: string, resole: () => void) {
    const ad = createAd(line);
    await this.saveAd(ad);
    console.log(ad);
    resole();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
