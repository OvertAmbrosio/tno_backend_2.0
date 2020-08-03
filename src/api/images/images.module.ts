import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { ImageSchema } from './images.model';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { variables } from 'src/config';
import { AwsClientModule, AwsClientService } from '@app/aws-client';

@Module({
  imports: [
    AwsClientModule,
    MongooseModule.forFeature([{
      name: 'Image',
      schema: ImageSchema
    }], variables.db_name),
    PassportModule
  ],
  providers: [ImagesService, AwsClientService],
  controllers: [ImagesController]
})
export class ImagesModule {}
