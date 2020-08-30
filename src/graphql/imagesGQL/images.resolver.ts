import { Args, Query, Resolver } from '@nestjs/graphql';

import { ImagesService } from './images.service';
import { ImageType } from './images.type'

@Resolver()
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}
  //consulta que trae una novela recomendada
  @Query(() => [ImageType])
  async getImagesNovel(@Args('novela') novela:string): Promise<ImageType[]> {
    return await this.imagesService.getWallpapers(novela);
  }
  //consulta que trae las novelas en emisión
  
}