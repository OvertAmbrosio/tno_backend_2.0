import { Args, Query, Resolver, Int } from '@nestjs/graphql';
import { ChaptersService } from './chapters.service';
import { ChapterType } from './chapters.type';

@Resolver()
export class ChaptersResolver {
  constructor(private readonly charptersService: ChaptersService) {}
  //consulta que trae los ultimos 16(?) capitulos agregados y ordenados por fecha de actualizacion
  @Query(() => [ChapterType])
  async getLastChapters(@Args('limit', { type: () => Int, defaultValue: 16 }) limit?:number):Promise<ChapterType[]> {
    return await this.charptersService.getChapters(limit);
  };
  //consulta que trae los capitulos de una novela selccionada 
  @Query(() => [ChapterType])
  async getNovelChapters(@Args('novela') novela: string): Promise<ChapterType[]> {
    return await this.charptersService.getNovelChapters(novela);
  };
  //consulta que trae los datos del capitulo
  @Query(() => ChapterType)
  async findChapter(@Args('novela') novela: string, @Args('capitulo') capitulo: string): Promise<ChapterType> {
    return await this.charptersService.getChapter(novela, capitulo);
  };
  //consulta que trae el capitulo anterior
  @Query(() => ChapterType)
  async getNavChapter(@Args('novela') novela:string, @Args('numero') numero:number, @Args('next') next: boolean): Promise<ChapterType> {
    if (next) {
      return await this.charptersService.getNextChapter(novela, numero).then((data) => data[0])
    } else {
      return await this.charptersService.getPrevChapter(novela, numero).then((data) => data[0])
    }
  };
}