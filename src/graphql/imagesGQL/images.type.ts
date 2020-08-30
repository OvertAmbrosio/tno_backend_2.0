import { ObjectType, Field } from '@nestjs/graphql';
import { NovelType } from '../novelsGQL/novels.type';

@ObjectType()
export class ImageType {
  @Field()
  readonly titulo: string;
  @Field()
  readonly tipo: string;
  @Field()
  readonly contentType: string;
  @Field()
  readonly url: string;
  @Field(() => NovelType)
  readonly novela: NovelType;
}