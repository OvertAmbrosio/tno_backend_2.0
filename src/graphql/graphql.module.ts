import { Module } from '@nestjs/common';
import { ChaptersModule } from './chaptersGQL/chapters.module';

@Module({
  imports: [ChaptersModule]
})

export class GraphqlModule {}
