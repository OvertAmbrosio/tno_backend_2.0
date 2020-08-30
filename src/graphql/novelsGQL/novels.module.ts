import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NovelsService } from './novels.service';
import { NovelSchema } from 'src/api/novels/novels.model';
import { NovelsResolver } from './novels.resolver';
import { variables } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Novel',
      schema: NovelSchema
    }], variables.db_name),
  ],
  providers: [NovelsResolver, NovelsService]
})
export class NovelsModule {}
