import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IChapter } from './chapters.interface';
import { CreateChapterDTO, UpdateChapterDTO } from './chapters.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel('Chapter') private readonly chapterModel: PaginateModel<IChapter>
  ) {}
  //listar
  public async getChapters(page: number, limit: number): Promise<PaginateResult<IChapter>> {
    const options = {
      page, limit, 
      populate: [{
        path: 'novela',
        select: 'titulo'
      }, {
        path: 'subidoPor actualizadoPor',
        select: 'username -_id'
      }],
      select: 'titulo numero novela subidoPor actualizadoPor createdAt updatedAt',
      sort: '-updatedAt'
    }
    return await this.chapterModel.paginate({}, options);
  };

  public async getChaptersForNovel(novelId: string, page: number, limit: number): Promise<PaginateResult<IChapter>> {
    const options = {
      page, limit, 
      populate: [{
        path: 'novela',
        select: 'titulo'
      },{
        path: 'subidoPor actualizadoPor',
        select: 'username -_id'
      }],
      select: 'titulo numero subidoPor actualizadoPor createdAt updatedAt',
      sort: '-numero'
    }
    return await this.chapterModel.paginate({novela: novelId}, options);
  };
  //lista de todos los capitulos de la novela
  public async getChaptersListForNovel(novelId: string): Promise<IChapter[]>{
    return await this.chapterModel.find({novela: novelId}).sort('-numero').select('titulo numero')
  }

  public async getChapter(chapterId: string): Promise<IChapter> {
    return await this.chapterModel.findById(chapterId)
      .populate('novela', 'nombre _id')
      .populate('subidoPor actualizadoPor', 'username -_id')
  };
  //crear
  public async createChapter(createChapter: CreateChapterDTO, admin: string): Promise<CreateChapterDTO> {
    createChapter.slug = 'capitulo-' + createChapter.numero;
    createChapter.subidoPor = admin;
    const newChapter = new this.chapterModel(createChapter);
    return await newChapter.save()
  };
  //actualizar
  public async updateChapter(chapterId: string, updateChapter: UpdateChapterDTO, admin: string): Promise<UpdateChapterDTO> {
    if (updateChapter.numero !== null && updateChapter.numero !== undefined) {
      updateChapter.slug = 'capitulo-'+ updateChapter.numero;
    }
    updateChapter.actualizadoPor = admin;
    return await this.chapterModel.findByIdAndUpdate(chapterId, updateChapter);
  };
  //borrar
  public async deleteChapter(chapterId: string): Promise<IChapter> {
    return await this.chapterModel.findByIdAndDelete(chapterId);
  };
  
}
