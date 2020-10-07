import { Document } from "mongoose";
import { IChapter } from "../chapters/chapters.interface";
import { INovel } from "../novels/novels.interface";

type TBiblioteca = {
  readonly novela: INovel["_id"],
  readonly capitulo: IChapter
}

export interface IUser extends Document{
  readonly idProvider: string,
  readonly name: string,
  readonly email: string,
  readonly image: string,
  username: string,
  readonly estado?: number,
  readonly tipo?: string,
  readonly biblioteca?: [TBiblioteca]
};
