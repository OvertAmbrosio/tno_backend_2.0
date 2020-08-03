import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { ChapterSchema } from './chapters.model';
import { variables } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Chapter',
      schema: ChapterSchema
    }], variables.db_name),
    PassportModule
  ],
  providers: [ChaptersService],
  controllers: [ChaptersController]
})
export class ChaptersModule {}
