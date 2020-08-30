import { Args, Query, Resolver, Int } from '@nestjs/graphql';
import { NovelsService } from './novels.service';
import { NovelType } from './novels.type';

@Resolver()
export class NovelsResolver {
  constructor(private readonly novelsService: NovelsService) {}
  //consulta que trae una novela recomendada
  @Query(() => [NovelType])
  async getNovelRecomended(): Promise<NovelType> {
    return await this.novelsService.getNovelRecomended();
  }
  //consulta que trae las novelas en emisión
  @Query(() => [NovelType])
  async getNewNovels(): Promise<NovelType[]> {
    return await this.novelsService.getNovelsNew();
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
  async getListNovels(): Promise<NovelType[]> {
    return await this.novelsService.getLastNovels();
  };
  //consulta que trae las novelas filtradas por categoria o tipo y por estado
  @Query(() => [NovelType])
  async getListCategoryNovel(
    @Args('limit', {type: () => Int, defaultValue: 25}) limit: number,
    @Args('categoria') categoria?: string,
    @Args('estado') estado?: string,
    @Args('tipo') tipo?: string
  ): Promise<{novelas:NovelType[], total: number}> {
    return await this.novelsService.getNovelCategory(limit, categoria, estado, tipo);
  };
  //consulta para buscar una novela por el titulo 
  @Query(() => [NovelType])
  async findNovelTitle(@Args('titulo') titulo: string): Promise<NovelType> {
    return await this.novelsService.getNovelbyText(titulo)
  };
  //obtener novela por el id
  @Query(() => [NovelType])
  async findNovel(@Args('slug') slug: string): Promise<NovelType> {
    return await this.novelsService.getNovel(slug);
  };
}