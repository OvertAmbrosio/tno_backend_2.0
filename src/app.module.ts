import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';

import createLogger from './config/createLogger'
import { MongoModule } from './database/mongo.module';

import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    WinstonModule.forRoot(createLogger),
    ApiModule,
    MongoModule,
    AuthModule,
  ],
  controllers: [AuthController]
})
export class AppModule {}
