import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './database/mongo.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    MongoModule,
    AuthModule,
  ],
  controllers: [AuthController]
})
export class AppModule {}
