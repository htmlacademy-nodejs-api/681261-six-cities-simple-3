import { MockData } from '../types/src/types/mock-data.type';
import { CliCommandInterface } from './cli-command.interface.js';
import AdGenerator from '../common/ad-generator/ad-generator.js';
import got from 'got';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';


export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const AdGeneratorString = new AdGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(AdGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
