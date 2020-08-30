import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageSchema } from 'src/api/images/images.model';
import { variables } from 'src/config';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Image',
      schema: ImageSchema
    }], variables.db_name),
  ],
  providers: [ImagesResolver, ImagesService]
})
export class ImagesModule {}
