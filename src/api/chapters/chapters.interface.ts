import { Document } from "mongoose";
import { INovel } from "../novels/novels.interface";

export interface IChapter extends Document{
  readonly titulo: string,
  readonly numero: number,
  readonly novela: INovel['_id'],
  readonly slug: string,
  readonly cuerpo: string,
  readonly traductor: string,
  readonly editor: string,
  readonly nota: string,
  readonly subidoPor: string,
  readonly actualizadoPor: string
}
