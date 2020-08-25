import { Document } from "mongoose";
import { INovel } from "../novels/novels.interface";
import { IsNotEmpty } from "class-validator";

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
  @IsNotEmpty()
  readonly titulo: string;
  @IsNotEmpty()
  readonly tipo: string;
  readonly contentType: string;
  readonly url: string;
  readonly key: string;
  @IsNotEmpty()
  readonly novela: string;
  subidoPor?: string;
  actualizadoPor?: string;
};

export class FileDTO {
  @IsNotEmpty()
  readonly Bucket: string;
  @IsNotEmpty()
  readonly ACL: string;
  @IsNotEmpty()
  readonly Key: string; // File name you want to save as in S3
  @IsNotEmpty()
  readonly Body: Buffer;
  @IsNotEmpty()
  readonly ContentType: string;
}

