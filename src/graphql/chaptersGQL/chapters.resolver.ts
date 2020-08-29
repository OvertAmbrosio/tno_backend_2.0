import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChaptersService } from './chapters.service';
import { ChapterType } from './chapters.type';

@Resolver()
export class ChaptersResolver {
  constructor(private readonly charptersService: ChaptersService) {}

  @Query(() => [ChapterType])
  async lastChapters(@Args('limit') limit:number):Promise<ChapterType[]> {
    const limite = limit === 0 || limit === NaN ? 100 : limit;
    return await this.charptersService.getChapters(limite);
  }

  // @Query(returns => Recipe)
  // async recipe(@Args('id') id: string): Promise<Recipe> {
  //   const recipe = await this.recipesService.findOneById(id);
  //   if (!recipe) {
  //     throw new NotFoundException(id);
  //   }
  //   return recipe;
  // }
}