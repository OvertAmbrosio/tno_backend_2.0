import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import slug from 'slug';

import { INovel } from './novels.interface';
import { CreateNovelDTO, UpdateNovelDTO } from './novels.dto';
import { IChapter } from '../chapters/chapters.interface';
import { IImage } from '../images/images.interface';

@Injectable()
export class NovelsService {
  constructor(
    @InjectModel('Novel') private readonly novelsModel: PaginateModel<INovel>,
    @InjectModel('Chapter') private readonly chaptersModel: Model<IChapter>,
    @InjectModel('Image') private readonly imagesModel: Model<IImage>
  ) {}
  //listar 
  public async getNovels(page: number, limit: number): Promise<PaginateResult<INovel>> {
    const options = {
      page, limit, 
      populate: [{
        path: 'subidoPor actualizadoPor',
        select: 'username -_id'
      }],
      select: 'titulo activo estado tipo subidoPor actualizadoPor',
      sort: 'updatedAt'
    }
    return await this.novelsModel.paginate({}, options);
  };

  public async getNovel(novelId: string): Promise<INovel> {
    return await this.novelsModel.findById(novelId)
      .populate('autor.usuario', 'nombre')//pendiente usuario falta modelar
      .populate('tipo categorias etiquetas', 'nombre')
      .populate('capitulo_emision', 'titulo numero')
      .populate('enviadoPor', 'nombre')//pendiente grupo falta modelar
      .populate('subidoPor actualizadoPor', 'username')
  };
  //crear
  public async createNovel(createNovel: CreateNovelDTO, adminUser: string,): Promise<CreateNovelDTO> {
    createNovel.slug = slug(createNovel.titulo);
    createNovel.subidoPor = adminUser;
    const newNovel = new this.novelsModel(createNovel);
    return await newNovel.save();
  };
  //actualizar
  public async updateNovel(novelId: string, updateNovel: UpdateNovelDTO, adminUser: string): Promise<UpdateNovelDTO> {
    if (updateNovel.titulo !== null && updateNovel.titulo !== undefined) {
      updateNovel.slug = updateNovel.titulo
    };
    updateNovel.actualizadoPor = adminUser;
    return await this.novelsModel.findByIdAndUpdate(novelId, updateNovel);
  };

  public async updateChapterNovel(novelId: string, chapterId: string, adminUser: string): Promise<INovel> {
    return await this.novelsModel.findByIdAndUpdate(novelId, {
      capitulo_emision: chapterId,
      actualizadoPor: adminUser,
    }, {
      new: true
    }).populate('autor.usuario', 'nombre')//pendiente usuario falta modelar
      .populate('tipo categorias etiquetas', 'nombre')
      .populate('capitulo_emision', 'titulo numero')
      .populate('enviadoPor', 'nombre')//pendiente grupo falta modelar
      .populate('subidoPor actualizadoPor', 'username')
  };

  public async updateImagesNovel(novelId: string, imageId: string, tipo: string, extencion: string, adminUser: string): Promise<INovel> {
    let objUpdate = {};

    if(tipo === 'miniatura') objUpdate = { $set: { imagen_miniatura: { url: imageId, tipo: extencion}, actualizadoPor: adminUser}};
    if(tipo === 'portada') objUpdate = { $set: {imagen_portada: { url: imageId, tipo: extencion}, actualizadoPor: adminUser}};

    return await this.novelsModel.findByIdAndUpdate(novelId, objUpdate, { new: true })
      .populate('autor.usuario', 'nombre')//pendiente usuario falta modelar
      .populate('tipo categorias etiquetas', 'nombre')
      .populate('capitulo_emision', 'titulo numero')
      .populate('enviadoPor', 'nombre')//pendiente grupo falta modelar
      .populate('subidoPor actualizadoPor', 'username');
  };

  public async updateActiveNovel(novelId: string): Promise<INovel> {
    return await this.novelsModel.findByIdAndUpdate(novelId, {$set: { activo: true }}, { new: true })
      .populate('autor.usuario', 'nombre')//pendiente usuario falta modelar
      .populate('tipo categorias etiquetas', 'nombre')
      .populate('capitulo_emision', 'titulo numero')
      .populate('enviadoPor', 'nombre')//pendiente grupo falta modelar
      .populate('subidoPor actualizadoPor', 'username');
  };
  //borra novela
  public async deleteNovel(novelId: string): Promise<INovel> {
    return await this.chaptersModel.find({novela: novelId}).then(async (chapters) => {
      if (chapters.length > 0) {
        return await this.novelsModel.findByIdAndUpdate(novelId, {activo: false}).catch(error => error);;
      } else {
        return await this.imagesModel.find({novela: novelId}).then(async(images) => {
          if (images.length > 0) {
            return await this.novelsModel.findByIdAndUpdate(novelId, {activo: false}).catch(error => error);;
          } else {
            return await this.novelsModel.findByIdAndDelete(novelId).catch(error => error);;
          }
        }).catch(error => error);
      }
    }).catch(error => error);
  };
};
