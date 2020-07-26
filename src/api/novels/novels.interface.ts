import { Document } from "mongoose";
import { IImage } from "../images/images.interface";
import { IChapter } from '../chapters/chapters.interface';

type TAutor = {
  readonly nombre: string,
  readonly usuario?: string
}

type TRating = {
  readonly contador: number,
  readonly valor: number
}

export interface INovel extends Document{
  readonly activo: boolean,
  readonly titulo: string,
  readonly titulo_alt?: string,
  readonly slug: string,
  readonly acron: string,
  readonly autor?: TAutor,
  readonly sinopsis: string,
  readonly estado: string,
  readonly tipo?: string,
  readonly categorias?: string[],
  readonly etiquetas?: string[],
  readonly imagen_portada: IImage['_id'],
  readonly imagen_mini: IImage['_id'],
  readonly imagen_wallpaper?: IImage['_id'][],
  readonly capitulo_emision?: IChapter['_id'],
  readonly subidoPor?: string,
  readonly rating?: TRating,
  readonly aprobadoPor?: string,
  readonly observacion?: string
}

export interface IFindNovel extends Document{
  readonly activo: boolean,
  readonly titulo: string,
  readonly titulo_alt?: string,
  readonly slug: string,
  readonly acron: string,
  readonly autor?: TAutor,
  readonly sinopsis: string,
  readonly estado: string,
  readonly tipo?: string,
  readonly categorias?: string[],
  readonly etiquetas?: string[],
  readonly imagen_portada: IImage,
  readonly imagen_mini: IImage,
  readonly imagen_wallpaper?: IImage[],
  readonly capitulo_emision?: IChapter,
  readonly subidoPor?: string,
  readonly rating?: TRating,
  readonly aprobadoPor?: string,
  readonly observacion?: string
}
