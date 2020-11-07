import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { INovel } from 'src/api/novels/novels.interface';
import { IRate } from 'src/api/rates/rates.interface';
import { novelCache } from 'src/config/memoryCache';
import { cacheKey } from 'src/config/variables';

function getRandomArbitrary(min:number, max:number):number {
  return Math.round(Math.random() * (max - min) + min);
}

@Injectable()
export class NovelsService {
  constructor(
    @InjectModel('Novel') private readonly novelModel: Model<INovel>,
    @InjectModel('Rate') private readonly rateModel: Model<IRate>
  ) {}
  //listar novela aleatoria
  public async getNovelRecomended(): Promise<INovel> {
    return await this.novelModel.countDocuments({activo: true}).then(async(count) => {
      let random:number = await novelCache.get(cacheKey.novelaRecomendada)
      if (!random) {
        const aux:number = Math.floor(Math.random() * count);
        await novelCache.set(cacheKey.novelaRecomendada, aux, {ttl: 86400});
        random = aux;
      }
      return this.novelModel.findOne().skip(random)
        .select('imagen_portada titulo slug tipo sinopsis categorias rating')
    })
  };
  //listar novelas en emisión
  public async getNewChapterNovels(): Promise<INovel[]> {
    return await this.novelModel
      .find({activo: true, estado: 'emision'})
      .limit(16)
      .populate({
        path: 'capitulo_emision', 
        select: 'numero slug createdAt'
      }).select('capitulo_emision imagen_miniatura titulo slug acron updatedAt').then((data) => {
        if (data) {
          const sortData = data.sort((a,b) => (a.capitulo_emision.createdAt > b.capitulo_emision.createdAt) ? -1 : ((b.capitulo_emision.createdAt > a.capitulo_emision.createdAt) ? 1 : 0))
          return sortData;
        } else {
          return data;
        }
      })
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
    return await this.novelModel.aggregate([
      {$match: objQuery},
      {$addFields: {"promedio": {$cond: [ { $eq: [ "$rating.valor", 0 ] }, 1, {"$divide":["$rating.valor", "$rating.contador"]}]}}},
      {$sort:{"promedio":-1}},
      {$limit : 5}
    ])
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
  public async getNovelbyText(titulo: string): Promise<INovel[]> {
    return await this.novelModel.find({titulo: { "$regex": titulo, "$options": "i" } }).limit(5)
  };
  //obtener novela
  public async getNovel(slug: string): Promise<INovel> {
    return await this.novelModel.findOne({slug}).then( async(data) => {
      if (data) {
        return await this.novelModel.findByIdAndUpdate(data._id, { $inc: { visitas: 1 }})
        .select('imagen_portada titulo acron autor autor_usuario tipo estado titulo_alt rating sinopsis categorias capitulo_emision')
        .populate('capitulo_emision', 'titulo numero slug createdAt')
      } else {
        return null
      }        
    })
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
  };
  //actualizar puntaje de la novela
  public async updateRateNovel(idProvider: string, novela: string, valor: number): Promise<INovel> {
    const ratedBefore = await this.rateModel.find({ usuario: idProvider, novela}).countDocuments();
    if (!ratedBefore) {
      const newRate = new this.rateModel({ usuario: idProvider, novela, valor });
      await newRate.save();
      return await this.novelModel.findByIdAndUpdate(
        {_id: novela}, 
        { $inc: { 'rating.contador': 1, 'rating.valor': valor }, 'rating.actualizado': new Date() 
      })
    } else { return null; };
  };
}