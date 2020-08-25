import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateChapterDTO {
  @IsNotEmpty()
  readonly titulo: string;
  @IsNotEmpty()
  @IsNumber({},{message: 'El campo debe ser de tipo numero.'})
  readonly numero: number;
  @IsNotEmpty()
  readonly novela: string;
  @IsNotEmpty()
  slug: string;
  @IsNotEmpty()
  readonly cuerpo: string;
  //temporal
  readonly traductor?: string;
  readonly editor?: string;
  readonly nota?: string;
  //sistema
  subidoPor: string;
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
  actualizadoPor: string;
}

