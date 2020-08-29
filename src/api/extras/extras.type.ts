import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExtraType {
  @Field()
  readonly nombre?: string;
  @Field(() => Int)
  readonly tipo?: number;
  @Field()
  readonly slug?: string;
  @Field()
  readonly descripcion?: string;
}