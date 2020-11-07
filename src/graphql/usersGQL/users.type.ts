import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { NovelType } from '../novelsGQL/novels.type';
import { ChapterType } from '../chaptersGQL/chapters.type';

@ObjectType()
class BibliotecaType {
  @Field(() => NovelType, { nullable: true })
  readonly novela: NovelType;
  @Field(() => ChapterType, { nullable: true })
  readonly capitulo: ChapterType;
};

@ObjectType()
export class UserType {
  @Field()
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly image: string;
  @Field({ nullable: true })
  readonly username?: string;
  @Field(() => Int, { nullable: true})
  readonly estado?: number;
  @Field()
  readonly tipo?: string;
  @Field(() => [BibliotecaType])
  readonly biblioteca?: [BibliotecaType];
};

@InputType()
export class NewUserInput {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  image: string;
}