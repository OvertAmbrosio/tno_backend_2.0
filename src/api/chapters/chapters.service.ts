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
        select: 'nombre'
      }, {
        path: 'subidoPor actualizadoPor',
        select: 'username -_id'
      }],
      select: 'titulo numero novela subidoPor actualizadoPor createdAt updatedAt'
    }
    return await this.chapterModel.paginate({}, options);
  };

  public async getChaptersForNovel(novelId: string, page: number, limit: number): Promise<PaginateResult<IChapter>> {
    const options = {
      page, limit, 
      populate: [{
        path: 'novela',
        select: 'nombre'
      }, {
        path: 'subidoPor actualizadoPor',
        select: 'username -_id'
      }],
      select: 'titulo numero novela subidoPor actualizadoPor createdAt updatedAt'
    }
    return await this.chapterModel.paginate({novela: novelId}, options);
  };

  public async getChapter(chapterId: string): Promise<IChapter> {
    return await this.chapterModel.findById(chapterId)
      .populate('novela', 'nombre -_id')
      .populate('subidoPor actualizadoPor', 'username -_id')
  };
  //crear
  public async createChapter(createChapter: CreateChapterDTO): Promise<CreateChapterDTO> {
    createChapter.slug = 'capitulo-' + createChapter.numero;
    const newChapter = new this.chapterModel(createChapter);
    return await newChapter.save()
  };
  //actualizar
  public async updateChapter(chapterId: string, updateChapter: UpdateChapterDTO): Promise<UpdateChapterDTO> {
    if (updateChapter.numero !== null && updateChapter.numero !== undefined) {
      updateChapter.slug = 'capitulo-'+ updateChapter.numero;
    }
    return await this.chapterModel.findByIdAndUpdate(chapterId, updateChapter);
  };
  //borrar
  public async deleteChapter(chapterId: string): Promise<IChapter> {
    return await this.chapterModel.findByIdAndDelete(chapterId);
  };
  
}
