import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IImage } from 'src/api/images/images.interface';


@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<IImage>
  ) {}
  //listar wallpapers de la novela
  public async getWallpapers(novela: string): Promise<IImage[]> {
    return await this.imageModel.find({novela, tipo: 'wallpaper'}).select('titulo contentType url');
  };
  
}