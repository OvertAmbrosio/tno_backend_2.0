import { Document } from "mongoose";
import { IsNumber, IsNotEmpty } from 'class-validator';

export interface IExtra extends Document {
  readonly nombre: string,
  readonly tipo: number,
  readonly slug: string,
  readonly descripcion?: string
};

export class ExtraDTO {
  @IsNotEmpty()
  readonly nombre: string;
  @IsNotEmpty()
  @IsNumber()
  readonly tipo: number;
  @IsNotEmpty()
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