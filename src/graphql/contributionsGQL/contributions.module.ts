import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContributionSchema } from 'src/api/contributions/contributions.model';
import { variables } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Contribution',
      schema: ContributionSchema
    }], variables.db_name),
  ],
  // providers: [ChaptersResolver, ChaptersService]
})
export class ContributionsModule {}
