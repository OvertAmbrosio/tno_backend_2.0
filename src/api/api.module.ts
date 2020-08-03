import { Module } from '@nestjs/common';
import { NovelsModule } from './novels/novels.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ImagesModule } from './images/images.module';
import { ExtrasModule } from './extras/extras.module';

@Module({
  imports: [NovelsModule, ChaptersModule, ImagesModule, ExtrasModule]
})
export class ApiModule {}
