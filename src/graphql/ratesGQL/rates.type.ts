import { ObjectType, Field, Float } from '@nestjs/graphql';
import { NovelType } from '../novelsGQL/novels.type';

@ObjectType()
export class RateType {
  @Field()
  readonly usuario: string;
  @Field(()=> NovelType)
  readonly novela: NovelType
  @Field(() => Float)
  readonly valor: number;
  @Field()
  readonly createdAt: Date;
}