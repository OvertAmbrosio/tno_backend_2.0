import { IsNotEmpty, IsIn } from 'class-validator';

type TAutor = {
  readonly nombre: string,
  readonly usuario?: string
}

type TRating = {
  readonly contador: number,
  readonly valor: number
}

type TImage = {
  url: string, 
  tipo: string
}

export class CreateNovelDTO {
  @IsNotEmpty()
  readonly titulo: string;
  readonly titulo_alt?: string;
  slug: string;
  @IsNotEmpty()
  readonly acron: string;
  readonly autor?: TAutor;
  @IsNotEmpty()
  readonly sinopsis: string;
  @IsNotEmpty()
  @IsIn(['emision','finalizado','cancelado'])
  readonly estado: string;
  @IsNotEmpty()
  readonly tipo: string;
  readonly categorias?: string[];
  readonly etiquetas?: string[];
  subidoPor?: string;
};

export class UpdateNovelDTO {
  readonly titulo: string;
  readonly titulo_alt?: string;
  slug: string;
  readonly acron: string;
  readonly autor?: TAutor;
  readonly sinopsis: string;
  @IsIn(['emision','finalizado','cancelado'])
  readonly estado: string;
  readonly tipo: string;
  readonly categorias?: string[];
  readonly etiquetas?: string[];
  actualizadoPor?: string;
}