import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { NovelType } from '../novelsGQL/novels.type';

@ObjectType()
export class ChapterType {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly titulo: string;
  @Field(() => Float)
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
  @Field(() => Date)
  readonly updatedAt?: Date;
  @Field(() => Date)
  readonly createdAt?: Date;
}