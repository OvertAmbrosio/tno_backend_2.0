import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';

import createLogger from './config/createLogger'
import { MongoModule } from './database/mongo.module';

import { ApiModule } from './private/api.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    RateLimiterModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    WinstonModule.forRoot(createLogger),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    ApiModule,
    MongoModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/cms*',
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController, AuthController],
})
export class AppModule {}
