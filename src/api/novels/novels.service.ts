import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { INovel, IFindNovel } from './novels.interface';
import { CreateNovelDTO } from './novels.dto';

@Injectable()
export class NovelsService {
  constructor(@InjectModel('Novel') private readonly novelsModel: Model<INovel>) {}

  public async getNovels(): Promise<INovel[]> {
    return await this.novelsModel.find();
  };

  public async getNovel(novelId: string): Promise<IFindNovel> {
    return await this.novelsModel.findById(novelId);
  };

  public async createNovel(createNovelDTO: CreateNovelDTO): Promise<INovel> {
    const newNovel = new this.novelsModel(createNovelDTO);
    return await newNovel.save();
  };

  public async deleteNovel(novelId: string): Promise<INovel> {
    return await this.novelsModel.findByIdAndDelete(novelId);
  };

  public async updateNovel(novelId: string, createNovelDTO: CreateNovelDTO): Promise<INovel> {
    return await this.novelsModel.findByIdAndUpdate(novelId, createNovelDTO, {new: true});
  }
}
