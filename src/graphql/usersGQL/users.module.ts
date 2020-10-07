import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { variables } from 'src/config';
import { UserSchema } from 'src/api/users/users.model';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
    }], variables.db_name),
  ],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}