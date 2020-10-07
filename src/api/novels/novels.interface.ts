import { Document } from "mongoose";
import { IChapter } from '../chapters/chapters.interface';

type TRating = {
  readonly contador: number,
  readonly valor: number,
  readonly actualizado: Date 
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
  readonly autor: string,
  readonly autor_usuario?: string,
  readonly sinopsis: string,
  readonly estado: string,
  readonly tipo: string,
  readonly categorias?: string[],
  readonly etiquetas?: string[],
  readonly imagen_portada: TImage,
  readonly imagen_miniatura: TImage,
  readonly capitulo_emision?: IChapter['_id'],
  readonly enviadoPor?: string,
  readonly rating?: TRating,
  readonly visitas?: number,
  readonly subidoPor?: string,
  readonly actualizadoPor?: string;
  readonly observacion?: string
}

