import { ObjectType, InterfaceType, Field, Int, Float, ID, } from '@nestjs/graphql';
import { ChapterType } from '../chaptersGQL/chapters.type';

@InterfaceType()
class ImageNovel {
  @Field()
  readonly url: string;
  @Field()
  readonly tipo: string;
};

@InterfaceType()
class RatingNovel {
  @Field(() => Int)
  readonly contador: number;
  @Field(() => Int)
  readonly valor: number;
  @Field(() => Float)
  readonly promedio: number;
  @Field(() => Date)
  readonly actualizado: Date;
}

@ObjectType()
export class NovelType {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly activo: boolean;
  @Field()
  readonly titulo: string;
  @Field()
  readonly titulo_alt?: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly acron: string;
  @Field()
  readonly autor: string;
  // @Field(() => User)
  // readonly autor_usuario: User;
  @Field()
  readonly sinopsis: string;
  @Field()
  readonly estado: string;
  @Field()
  readonly tipo: string;
  @Field(() => [String])
  readonly categorias?: Array<string>;
  @Field(() => [String])
  readonly etiquetas?: Array<string>;
  @Field(() => ImageNovel)
  readonly imagen_portada: ImageNovel;
  @Field(() => ImageNovel)
  readonly imagen_miniatura: ImageNovel;
  @Field(() => ChapterType)
  readonly capitulo_emision?: ChapterType;
  // @Field(() => GroupType)
  // readonly enviadoPor: GroupType;
  @Field(() => RatingNovel)
  readonly rating?: RatingNovel;
}