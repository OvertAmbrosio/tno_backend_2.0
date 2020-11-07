import { Document } from "mongoose";
import { IUser } from "../users/users.interface";
import { IChapter } from "../chapters/chapters.interface";
import { INovel } from "../novels/novels.interface";


export interface IContribution extends Document{
  readonly usuario: IUser['_id'],
  // readonly grupo: IGroup
  readonly capitulo: IChapter['_id'],
  readonly novela: INovel['_id'],
  readonly tipo: string,
  readonly estado: string,
  readonly contenido: string,
  readonly titulo: string,
  readonly numero: number,
  readonly portada: string,
  readonly miniatura: string
}
