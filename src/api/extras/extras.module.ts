import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';
import { ExtraSchema } from './extras.model';
import { ExtrasResolver } from './extras.resolver'

import { variables } from 'src/config';


@Module({
  imports: [
    CacheModule.register({ttl: 3600}),
    MongooseModule.forFeature([{
      name: 'Extra',
      schema: ExtraSchema
    }], variables.db_name),
    PassportModule
  ],
  providers: [ExtrasResolver, ExtrasService],
  controllers: [ExtrasController]
})
export class ExtrasModule {}
