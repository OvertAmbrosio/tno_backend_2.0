import { Document } from "mongoose";
import { INovel } from "../novels/novels.interface";
import { IsEmpty } from "class-validator";

export interface IImage extends Document {
  readonly titulo: string,
  readonly tipo: string,
  readonly contentType: string,
  readonly url: string,
  readonly key: string,
  readonly novela: INovel['_id'];
  readonly subidoPor: string,
  readonly actualizadoPor: string
}

export class ImageDTO {
  @IsEmpty()
  readonly titulo: string;
  @IsEmpty()
  readonly tipo: string;
  readonly contentType: string;
  readonly url: string;
  readonly key: string;
  readonly novela: string;
  readonly subidoPor?: string;
  readonly actualizadoPor?: string;
};

export class FileDTO {
  @IsEmpty()
  readonly Bucket: string;
  @IsEmpty()
  readonly ACL: string;
  @IsEmpty()
  readonly Key: string; // File name you want to save as in S3
  @IsEmpty()
  readonly Body: Buffer;
  @IsEmpty()
  readonly ContentType: string;
}

