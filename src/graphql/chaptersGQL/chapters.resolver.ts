import { Args, Query, Resolver, Int } from '@nestjs/graphql';
import { ChaptersService } from './chapters.service';
import { ChapterType } from './chapters.type';

@Resolver()
export class ChaptersResolver {
  constructor(private readonly charptersService: ChaptersService) {}
  //consulta que trae los ultimos 100(?) capitulos agregados y ordenados por fecha de actualizacion
  @Query(() => [ChapterType])
  async lastChapters(@Args('limit', { type: () => Int, defaultValue: 100 }) limit?:number):Promise<ChapterType[]> {
    return await this.charptersService.getChapters(limit);
  };
}