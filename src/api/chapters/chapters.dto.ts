import { IsEmpty, IsNumber } from 'class-validator'

export class CreateChapterDTO {
  @IsEmpty()
  readonly titulo: string;
  @IsEmpty()
  @IsNumber({},{message: 'El campo debe ser de tipo numero.'})
  readonly numero: number;
  @IsEmpty()
  readonly novela: string;
  @IsEmpty()
  slug: string;
  @IsEmpty()
  readonly cuerpo: string;
  //temporal
  readonly traductor?: string;
  readonly editor?: string;
  readonly nota?: string;
  //sistema
  readonly subidoPor: string;
}

export class UpdateChapterDTO {
  readonly titulo: string;
  readonly numero: number;
  readonly novela: string;
  slug: string;
  readonly cuerpo: string;
  //temporal
  readonly traductor?: string;
  readonly editor?: string;
  readonly nota?: string;
  //sistema
  readonly subidoPor: string;
  readonly actualizadoPor: string;
}

