import { Module } from '@nestjs/common';
import { NovelsController } from './novels.controller'
import { NovelsService } from './novels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NovelSchema } from './novels.model';
import { variables } from 'src/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Novels',
      schema: NovelSchema
    }], variables.db_name),
    PassportModule
  ],
  controllers: [NovelsController],
  providers: [NovelsService]
})

export class NovelsModule {}
