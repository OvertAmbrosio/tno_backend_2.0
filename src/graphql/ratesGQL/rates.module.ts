import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RateSchema } from 'src/api/rates/rates.model';
import { variables } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Rate',
      schema: RateSchema
    }], variables.db_name),
  ]
})
export class RatesModule {}