import { ObjectType, Field, Int, Float, ID, } from '@nestjs/graphql';
import { ChapterType } from '../chaptersGQL/chapters.type';

@ObjectType()
class ImageNovel {
  @Field({ nullable: true })
  readonly url: string;
  @Field({ nullable: true })
  readonly tipo: string;
};

@ObjectType()
class RatingNovel {
  @Field(() => Int, { nullable: true })
  readonly contador: number;
  @Field(() => Int, { nullable: true })
  readonly valor: number;
  @Field(() => Float, { nullable: true })
  readonly promedio: number;
  @Field(() => Date, { nullable: true })
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
  @Field(() => Int)
  readonly visitas?: number;
  @Field(() => Date)
  readonly updatedAt?: Date;
}