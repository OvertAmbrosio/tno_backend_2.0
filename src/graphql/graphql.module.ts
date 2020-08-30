import { Module } from '@nestjs/common';
import { ChaptersModule } from './chaptersGQL/chapters.module';
import { NovelsModule } from './novelsGQL/novels.module';

@Module({
  imports: [NovelsModule, ChaptersModule]
})

export class GraphqlModule {}
