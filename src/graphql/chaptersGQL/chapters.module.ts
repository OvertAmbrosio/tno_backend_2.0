import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChaptersService } from './chapters.service';
import { ChaptersResolver } from './chapters.resolver';
import { ChapterSchema } from 'src/api/chapters/chapters.model';
import { NovelSchema } from 'src/api/novels/novels.model';
import { variables } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Chapter',
      schema: ChapterSchema
    },{
      name: 'Novel',
      schema: NovelSchema
    }], variables.db_name),
  ],
  providers: [ChaptersResolver, ChaptersService]
})
export class ChaptersModule {}
