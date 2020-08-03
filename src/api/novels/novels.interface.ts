import { Document } from "mongoose";
import { IChapter } from '../chapters/chapters.interface';

type TAutor = {
  readonly nombre: string,
  readonly usuario?: string
}

type TRating = {
  readonly contador: number,
  readonly valor: number
}

type TImage = {
  url: string, 
  tipo: string
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
  readonly tipo: string,
  readonly categorias?: string[],
  readonly etiquetas?: string[],
  readonly imagen_portada: TImage,
  readonly imagen_mini: TImage,
  readonly capitulo_emision?: IChapter['_id'],
  readonly enviadoPor?: string,
  readonly rating?: TRating,
  readonly subidoPor?: string,
  readonly actualizadoPor?: string;
  readonly observacion?: string
}

