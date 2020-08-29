import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { NovelType } from '../novels/novels.type';

@ObjectType()
export class ChapterType {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly titulo: string;
  @Field(() => Int)
  readonly numero: number;
  @Field(() => NovelType)
  readonly novela: NovelType;
  @Field()
  readonly slug: string;
  @Field()
  readonly cuerpo: string;
  @Field()
  readonly traductor: string;
  @Field()
  readonly editor: string;
  @Field()
  readonly nota: string;
}