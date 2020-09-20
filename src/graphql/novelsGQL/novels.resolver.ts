import { Args, Query, Resolver, Int } from '@nestjs/graphql';
import { NovelsService } from './novels.service';
import { NovelType } from './novels.type';

@Resolver()
export class NovelsResolver {
  constructor(private readonly novelsService: NovelsService) {}
  //consulta que trae una novela recomendada
  @Query(() => NovelType)
  async getNovelRecomended(): Promise<NovelType> {
    return await this.novelsService.getNovelRecomended();
  }
  //consulta que trae las novelas en emisión
  @Query(() => [NovelType])
  async getNewChapterNovels(): Promise<NovelType[]> {
    return await this.novelsService.getNewChapterNovels();
  };
  //consulta que trae la lista de novelas en el raking (global en true para traer el global)
  @Query(() => [NovelType])
  async getRankingListNovels(
    @Args('global', {type: () => Boolean, defaultValue: false}) global?: boolean
  ): Promise<NovelType[]> {
    return await this.novelsService.getNovelRanking(global);
  };
  //consulta que trae las ultimas novelas agregadas
  @Query(() => [NovelType])
  async getLastNovels(): Promise<NovelType[]> {
    return await this.novelsService.getLastNovels();
  };
  //consulta que trae las novelas filtradas por categoria o tipo y por estado
  @Query(() => [NovelType])
  async getListCategoryNovel(
    @Args('limit', {type: () => Int, defaultValue: 25}) limit: number,
    @Args('categoria', {defaultValue: null}) categoria: string,
    @Args('estado', {defaultValue: "emision"}) estado: string,
    @Args('tipo', {defaultValue: null}) tipo: string
  ): Promise<NovelType[]> {
    return await this.novelsService.getNovelCategory(limit, categoria, estado, tipo);
  };
  //consulta para buscar una novela por el titulo 
  @Query(() => NovelType)
  async findNovelTitle(@Args('titulo') titulo: string): Promise<NovelType> {
    return await this.novelsService.getNovelbyText(titulo)
  };
  //obtener novela por el slug
  @Query(() => NovelType)
  async findNovel(@Args('slug') slug: string): Promise<NovelType> {
    return await this.novelsService.getNovel(slug);
  };
  //obtener novelas relacionadas 
  @Query(() => [NovelType])
  async getNovelRelated(@Args('slug') slug: string): Promise<NovelType[]> {
    return await this.novelsService.getNovelRelated(slug);
  }; 
}