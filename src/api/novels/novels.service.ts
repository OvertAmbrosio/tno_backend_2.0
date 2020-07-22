import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { INovel } from './novels.interface';
import { Model } from 'mongoose';

@Injectable()
export class NovelsService {
  constructor(@InjectModel('Novels') private readonly novelsModel: Model<INovel>) {}

  public async getNovels(): Promise<INovel[]> {
    return await this.novelsModel.find();
  }
}
