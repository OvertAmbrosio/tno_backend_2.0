import { Module } from '@nestjs/common';
import { NovelsModule } from './novels/novels.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [NovelsModule, ChaptersModule, ImagesModule],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ApiModule {}
