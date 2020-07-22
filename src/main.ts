import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { variables } from './config'

import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const configService = app.get(ConfigService);
  const port = configService.get(variables.puerto);
  
  await app.listen(port);

  app.use(helmet());
  app.use(compression());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15*60*1000,
      max: 100
    })
  );
}
bootstrap();
