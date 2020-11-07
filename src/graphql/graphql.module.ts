import { Module } from '@nestjs/common';

import { NovelsModule } from './novelsGQL/novels.module';
import { ChaptersModule } from './chaptersGQL/chapters.module';
import { ImagesModule } from './imagesGQL/images.module';
import { UsersModule } from './usersGQL/users.module';
import { RatesModule } from './ratesGQL/rates.module';
import { ContributionsModule } from './contributionsGQL/contributions.module';

@Module({
  imports: [
    NovelsModule, 
    ChaptersModule, 
    ImagesModule, 
    UsersModule, 
    RatesModule,
    ContributionsModule
  ]
})

export class GraphqlModule {}
