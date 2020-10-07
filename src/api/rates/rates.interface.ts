import { Document } from "mongoose";
import { INovel } from "../novels/novels.interface";

export interface IRate extends Document{
  readonly usuario: string,
  readonly novela: INovel['_id'],
  readonly value: number
};
