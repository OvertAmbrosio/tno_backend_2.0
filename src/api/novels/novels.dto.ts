import { IsNotEmpty, IsIn } from 'class-validator';

export class CreateNovelDTO {
  @IsNotEmpty()
  readonly titulo: string;
  readonly titulo_alt?: string;
  slug: string;
  @IsNotEmpty()
  readonly acron: string;
  readonly autor: string;
  readonly autor_usuario?: string;
  @IsNotEmpty()
  readonly sinopsis: string;
  @IsNotEmpty()
  @IsIn(['emision','finalizado','cancelado'])
  readonly estado: string;
  @IsNotEmpty()
  readonly tipo: string;
  readonly categorias?: string[];
  readonly etiquetas?: string[];
  readonly observacion?: string;
  subidoPor?: string;
};

export class UpdateNovelDTO {
  readonly titulo: string;
  readonly titulo_alt?: string;
  slug: string;
  readonly acron: string;
  readonly autor: string;
  readonly autor_usuario?: string;
  readonly sinopsis: string;
  @IsIn(['emision','finalizado','cancelado'])
  readonly estado: string;
  readonly tipo: string;
  readonly categorias?: string[];
  readonly etiquetas?: string[];
  readonly observacion?: string;
  actualizadoPor?: string;
}