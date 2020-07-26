type TContenido = {
  cuerpo: string,
  traductor: string,
  editor: string,
  nota: string
}

export class CreateChapterDTO {
  readonly titulo: string;
  readonly numero: number;
  readonly novela: string;
  readonly slug: string;
  readonly contenido: TContenido;
}

