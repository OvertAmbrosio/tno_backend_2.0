import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { INovel } from 'src/api/novels/novels.interface';


@Injectable()
export class NovelsService {
  constructor(
    @InjectModel('Novel') private readonly novelModel: Model<INovel>
  ) {}
  //listar novela aleatoria
  public async getNovelRecomended(): Promise<INovel> {
    return await this.novelModel.count({activo: true}).then(async(count) => {
      const random = Math.floor(Math.random() * count);
      return this.novelModel.findOne().skip(random)
    })
  };
  //listar novelas en emisión
  public async getNovelsNew(): Promise<INovel[]> {
    return await this.novelModel
      .find({activo: true, estado: 'emision'})
      .sort('-updatedAt')
      .limit(16)
      .populate('capitulo_emision', 'numero')
      .select('capitulo_emision imagen_miniatura titulo acron updatedAt')
  };
  //listar novelas ranking (global y semanal)
  public async getNovelRanking(global:boolean): Promise<INovel[]> {
    let objQuery = {}

    if (!global) {
      objQuery = { 
        $and: [
          { activo: true },
          { 'rating.actualizado': { $gte: new Date(Number(new Date()) - 7 * 60 * 60 * 24 * 1000) } }
        ]  
      }
    } else {
      objQuery = { activo: true }
    }

    return await this.novelModel.find(objQuery).sort('-rating.promedio').limit(5)
  };
  //listar ultimas novelas agregadas
  public async getLastNovels(): Promise<INovel[]> {
    return await this.novelModel.find({activo: true})
      .sort('-createdAt')
      .limit(16)
      .select('titulo tipo imagen_portada')
  };
  //listar novelas por categoria y ordenar por nombre
  public async getNovelCategory(limit: number, categoria?: string, estado?:string, tipo?:string): Promise<{novelas: INovel[], total: number}> {
    let objQuery = {}
    if(categoria) {
      objQuery = {activo: true, categorias: categoria, estado}
    } else {
      objQuery = {activo: true, estado}
    }

    if(tipo) objQuery['tipo'] = tipo;

    const total = await this.novelModel.find(objQuery).count();
    const novelas = await this.novelModel
                    .find(objQuery)
                    .sort('titulo')
                    .limit(limit > total ? 0:limit);

    return ({novelas, total})
  }
  //obtener novela buscada por el titulo
  public async getNovelbyText(titulo: string): Promise<INovel> {
    return await this.novelModel.findOne({titulo: { "$regex": titulo, "$options": "i" } })
  };
  //obtener novela
  public async getNovel(slug: string): Promise<INovel> {
    return await this.novelModel.findOne({slug})
      .select('imagen_portada titulo acron autor autor_usuario tipo titulo_alt ranking sinopsis categorias capitulo_emision')
      .populate('capitulo_emision', 'titulo numero createdAt')
  };
}