import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { variables } from './config'

import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const configService = app.get(ConfigService);
  const port = configService.get(variables.puerto);

  app.setGlobalPrefix('api');

  app.use(helmet({
    referrerPolicy: {policy: 'same-origin'}
  }));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true}))
  app.use(cookieParser());
  app.use(csurf({cookie: true}));
  app.use(
    rateLimit({
      windowMs: 15*60*1000,
      max: 100
    })
  );

  await app.listen(port);
}
bootstrap();
