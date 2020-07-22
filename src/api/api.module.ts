import { Module } from '@nestjs/common';
import { NovelsModule } from './novels/novels.module';

@Module({
  imports: [NovelsModule]
})
export class ApiModule {}
