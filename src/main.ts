import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
// import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser'
import * as compression from 'compression';

import { AppModule } from './app.module';
import { variables } from './config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get(variables.puerto);

  app.setGlobalPrefix('api')

  app.use(helmet({
    referrerPolicy: {policy: 'same-origin'}
  }));
  app.enableCors();
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true}));

  await app.listen(port);
}
bootstrap();
