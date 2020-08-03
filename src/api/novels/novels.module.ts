import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { NovelsController } from './novels.controller'
import { NovelsService } from './novels.service';
import { NovelSchema } from './novels.model';
import { variables } from 'src/config';
import { ChapterSchema } from '../chapters/chapters.model';
import { ImageSchema } from '../images/images.model';

@Module({
  imports: [
    CacheModule.register({ttl: 3600}),
    MongooseModule.forFeature([{
      name: 'Novel',
      schema: NovelSchema
    }, {
      name: 'Chapter',
      schema: ChapterSchema
    }, {
      name: 'Image',
      schema: ImageSchema
    }], variables.db_name),
    PassportModule
  ],
  controllers: [NovelsController],
  providers: [NovelsService]
})

export class NovelsModule {}
