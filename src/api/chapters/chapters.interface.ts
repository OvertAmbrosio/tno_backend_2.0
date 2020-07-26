import { Document } from "mongoose";
import { INovel } from "../novels/novels.interface";

type TContenido = {
  cuerpo: string,
  traductor: string,
  editor: string,
  nota: string
}

export interface IChapter extends Document{
  readonly titulo: string,
  readonly numero: number,
  readonly novela: INovel['_id'],
  readonly slug: string,
  readonly contenido: TContenido

}
