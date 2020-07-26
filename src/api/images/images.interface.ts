import { Document } from "mongoose";
import { INovel } from "../novels/novels.interface";

export interface IImage extends Document {
  readonly titulo: string,
  readonly tipo: string,
  readonly contentType: string,
  readonly url: string,
  readonly key: string,
  readonly novela: INovel['_id'];
}

export class DTOImage {
  readonly titulo: string;
  readonly tipo: string;
  readonly contentType: string;
  readonly url: string;
  readonly key: string;
  readonly novela: string;
}