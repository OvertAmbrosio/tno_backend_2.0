type TAutor = {
  readonly nombre: string,
  readonly usuario?: string
}

type TRating = {
  readonly contador: number,
  readonly valor: number
}

export class CreateNovelDTO {
  readonly activo: boolean;
  readonly titulo: string;
  readonly titulo_alt?: string;
  readonly slug: string;
  readonly acron: string;
  readonly autor?: TAutor;
  readonly sinopsis: string;
  readonly estado: string;
  readonly tipo?: string;
  readonly categorias?: string[];
  readonly etiquetas?: string[];
  readonly imagen_portada?: string;
  readonly imagen_mini?: string;
  readonly imagen_wallpaper?: string[];
  readonly capitulo_emision?: string;
  readonly subidoPor?: string;
  readonly rating?: TRating;
  readonly aprobadoPor?: string;
  readonly observacion?: string;
}