import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IChapter } from 'src/api/chapters/chapters.interface';
import { INovel } from 'src/api/novels/novels.interface';


@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel('Chapter') private readonly chapterModel: Model<IChapter>,
    @InjectModel('Novel') private readonly novelModel: Model<INovel>
  ) {}
  //listar todos los capitulos para mostrar los ultimos subidos
  public async getChapters(limit:number): Promise<IChapter[]> {
    return await this.chapterModel.find()
      .sort('-createdAt')
      .limit(limit<100?limit:100)
      .populate('novela', 'titulo slug')
      .select('titulo numero novela slug updatedAt createdAt')
      .exec();
  };
  //listar los capitulos de la novela segun el slug
  public async getNovelChapters(novela:string): Promise<IChapter[]> {
    return await this.chapterModel.find({novela}).select('numero titulo slug createdAt').sort('-numero');
  };
  //listar capitulo
  public async getChapter(novelaSlug:string, capituloSlug: string): Promise<IChapter> {
    return await this.novelModel.findOne({slug: novelaSlug}).select('_id').then(async(novela) => 
      await this.chapterModel.findOne({novela: novela._id, slug: capituloSlug})
        .select('cuerpo titulo numero slug novela')
        .populate('novela', 'titulo')
    )
  };
  //obtener capitulo anterior
  public async getPrevChapter(novela:string, numero: number): Promise<IChapter[]> {
    return await this.chapterModel.find({ 
      $and: [
        {novela},
        {numero: { $lt: numero}}
      ]
    }).sort({numero: -1}).limit(1).select('numero titulo slug')
  }
  //obtener siguiente capitulo
  public async getNextChapter(novela:string, numero: number): Promise<IChapter[]> {
    return await this.chapterModel.find({ 
      $and: [
        {novela},
        {numero: { $gt: numero}}
      ]
    }).sort({numero: 1}).limit(1).populate('novela', 'acron').select('numero titulo slug')
  }

}