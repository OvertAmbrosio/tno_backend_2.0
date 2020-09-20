import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { INovel } from 'src/api/novels/novels.interface';

function getRandomArbitrary(min:number, max:number):number {
  return Math.round(Math.random() * (max - min) + min);
}

@Injectable()
export class NovelsService {
  constructor(
    @InjectModel('Novel') private readonly novelModel: Model<INovel>
  ) {}
  //listar novela aleatoria
  public async getNovelRecomended(): Promise<INovel> {
    return await this.novelModel.countDocuments({activo: true}).then(async(count) => {
      const random = Math.floor(Math.random() * count);
      return this.novelModel.findOne().skip(random)
        .select('imagen_portada titulo slug tipo sinopsis categorias rating')
    })
  };
  //listar novelas en emisión
  public async getNewChapterNovels(): Promise<INovel[]> {
    return await this.novelModel
      .find({activo: true, estado: 'emision'})
      .sort('-updatedAt')
      .limit(16)
      .populate('capitulo_emision', 'numero slug')
      .select('capitulo_emision imagen_miniatura titulo slug acron updatedAt')
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

    return await this.novelModel.find(objQuery)
      .sort('-rating.promedio')
      .limit(5).select('imagen_portada titulo slug rating visitas')
  };
  //listar ultimas novelas agregadas
  public async getLastNovels(): Promise<INovel[]> {
    return await this.novelModel.find({activo: true})
      .sort('-createdAt')
      .limit(16)
      .select('titulo tipo imagen_portada slug')
  };
  //listar novelas por categoria y ordenar por nombre
  public async getNovelCategory(limit: number, categoria?: string, estado?:string, tipo?:string): Promise<INovel[]> {
    let objQuery = {}
    if(categoria) {
      objQuery = {activo: true, categorias: {$regex: categoria, $options: "i"}, estado}
    } else {
      objQuery = {activo: true, estado}
    }

    if(tipo) objQuery['tipo'] = tipo;

    const total = await this.novelModel.find(objQuery).countDocuments();
    const novelas = await this.novelModel
                    .find(objQuery)
                    .sort('titulo')
                    .select('titulo slug autor estado acron categorias sinopsis imagen_portada')
                    .limit(limit < total ? 0:limit);

    return novelas
  }
  //obtener novela buscada por el titulo
  public async getNovelbyText(titulo: string): Promise<INovel> {
    return await this.novelModel.findOne({titulo: { "$regex": titulo, "$options": "i" } })
  };
  //obtener novela
  public async getNovel(slug: string): Promise<INovel> {
    return await this.novelModel.findOne({slug}).then( async(data) => 
      await this.novelModel.findByIdAndUpdate(data._id, { $inc: { visitas: 1 }})
        .select('imagen_portada titulo acron autor autor_usuario tipo estado titulo_alt rating sinopsis categorias capitulo_emision')
        .populate('capitulo_emision', 'titulo numero slug createdAt')
    )
  };
  //obtener novelas relacionadas 
  public async getNovelRelated(slug: string): Promise<INovel[]> {
    return await this.novelModel.findOne({slug}).select('etiquetas').then(async(data) => {
      if(data.etiquetas && data.etiquetas.length > 0) {
        const tagRandom = data.etiquetas[getRandomArbitrary(0, (data.etiquetas.length -1))]
        return await this.novelModel.find({ $and: [
          {etiquetas: tagRandom},
          { slug: { $ne: slug} }
        ]}).limit(4).select('imagen_portada titulo slug');
      } else {
        return null
      }
    })
  }
}