import { Document } from "mongoose";
import { IsEmpty, IsNumber } from 'class-validator';

export interface IExtra extends Document {
  readonly nombre: string,
  readonly tipo: number,
  readonly slug: string,
  readonly descripcion?: string
};


export class ExtraDTO {
  @IsEmpty()
  readonly nombre: string;
  @IsEmpty()
  @IsNumber()
  readonly tipo: number;
  @IsEmpty()
  slug: string;
  readonly descripcion?: string;
}

export class ExtraUpdateDTO {
  readonly nombre?: string;
  @IsNumber()
  readonly tipo?: number;
  slug: string;
  readonly descripcion?: string;
}