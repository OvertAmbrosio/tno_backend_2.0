import { ObjectType, Field, ID } from '@nestjs/graphql';

import { UserType } from '../usersGQL/users.type';
import { ChapterType } from '../chaptersGQL/chapters.type';
import { NovelType } from '../novelsGQL/novels.type';



@ObjectType()
export class ContributionType {
  @Field(() => ID)
  readonly _id: string;
  @Field(() => UserType)
  readonly usuario: UserType;
  // grupo
  @Field(() => ChapterType)
  readonly capitulo: ChapterType;
  @Field(() => NovelType)
  readonly novela: NovelType;
  @Field()
  readonly tipo: string;
  @Field()
  readonly estado: string;
  @Field()
  readonly contenido: string;
  @Field()
  readonly titulo: string;
  @Field()
  readonly numero: number;
  @Field()
  readonly portada: string;
  @Field()
  readonly miniatura: string;
}