import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthAdminSchema } from './admins.model';
import { variables } from 'src/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'admins',
      schema: AuthAdminSchema
    }], variables.db_name),
    PassportModule
  ],
  providers: [AdminsService],
  exports: [AdminsService]
})
export class AdminsModule {}
