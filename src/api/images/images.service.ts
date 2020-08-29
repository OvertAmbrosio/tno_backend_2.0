import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IImage, ImageDTO } from './images.interface';



@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly imageModel: PaginateModel<IImage>
  ) {}
  
  //listar
  public async getImages(page: number, limit: number): Promise<PaginateResult<IImage>> {
    const options = {
      page, limit, 
      populate: [{
        path: 'novela',
        select: 'titulo'
      },{
        path: 'subidoPor',
        select: 'username -_id'
      }],
      select: 'titulo tipo key novela subidoPor createdAt updatedAt',
      sort: '-updatedAt'
    }
    return await this.imageModel.paginate({}, options);
  };

  public async getImagesForNovel(novelId: string, page: number, limit: number): Promise<PaginateResult<IImage>> {
    const options = {
      page, limit, 
      populate: [{
        path: 'novela',
        select: 'titulo'
      },{
        path: 'subidoPor',
        select: 'username -_id'
      }],
      select: 'titulo tipo key novela subidoPor createdAt updatedAt',
      sort: '-updatedAt'
    }
    return await this.imageModel.paginate({novela: novelId}, options);
  };
  //lista compacta de imagenes para seleccionar la portada o miniatura
  public async getImagesList(novelId: string): Promise<IImage[]> {
    return await this.imageModel.find({novela: novelId}).sort('tipo').select('titulo tipo contentType url -_id');
  }

  public async getImage(imageId: string): Promise<IImage> {
    return await this.imageModel.findById(imageId)
      .populate('novela', 'nombre -_id')
      .populate('subidoPor actualizadoPor', 'username -_id')
  };
  //crear
  public async createImage(createImage: ImageDTO, admin: string): Promise<ImageDTO> {
    createImage.subidoPor = admin;
    const newChapter = new this.imageModel(createImage);
    return await newChapter.save()
  };
  //borrar
  public async deleteImage(imageId: string): Promise<IImage> {
    return await this.imageModel.findByIdAndDelete(imageId);
  };
}
