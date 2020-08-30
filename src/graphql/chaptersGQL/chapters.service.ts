import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IChapter } from 'src/api/chapters/chapters.interface';


@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel('Chapter') private readonly chapterModel: Model<IChapter>
  ) {}
  //listar todos los capitulos para mostrar los ultimos subidos
  public async getChapters(limit:number): Promise<IChapter[]> {
    return await this.chapterModel.find()
      .sort('-updatedAt')
      .limit(limit)
      .populate('novela', 'titulo')
      .select('titulo capitulo numero updatedAt createdAt')
      .exec();
  };
  //
}