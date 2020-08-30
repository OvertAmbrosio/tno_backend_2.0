import { Module } from '@nestjs/common';

import { NovelsModule } from './novelsGQL/novels.module';
import { ChaptersModule } from './chaptersGQL/chapters.module';
import { ImagesModule } from './imagesGQL/images.module';

@Module({
  imports: [NovelsModule, ChaptersModule, ImagesModule]
})

export class GraphqlModule {}
