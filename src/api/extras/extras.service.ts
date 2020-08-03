import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slug from 'slug';

import { IExtra, ExtraDTO, ExtraUpdateDTO } from './extras.interface';

@Injectable()
export class ExtrasService {
  constructor(
    @InjectModel('Extra') private readonly extrasModel: Model<IExtra>
  ) {}
  //Obtener
  public async getExtras(): Promise<IExtra[]> {
    return await this.extrasModel.find().select('nombre slug descripcion tipo');
  };

  public async getExtra(tipo: number): Promise<IExtra[]> {
    return await this.extrasModel.find({tipo});
  };
  //crear
  public async createExtra(createExtra: ExtraDTO): Promise<ExtraDTO> {
    createExtra.slug = slug(createExtra.nombre, '-');
    const newExtra = new this.extrasModel(createExtra);
    return await newExtra.save()
  };
  //actualizar
  public async updateExtra(extraId: string, updateExtra: ExtraUpdateDTO): Promise<ExtraDTO> {
    if (updateExtra.nombre !== null && updateExtra.nombre !== undefined) {
      updateExtra.slug = slug(updateExtra.nombre);
    }
    return await this.extrasModel.findByIdAndUpdate(extraId, updateExtra);
  };
  //borrar
  public async deleteExtra(extraId: string): Promise<IExtra> {
    return await this.extrasModel.findByIdAndDelete(extraId);
  };
}
