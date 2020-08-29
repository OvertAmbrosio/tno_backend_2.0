import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser'
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit'

import { AppModule } from './app.module';
import { variables } from './config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const port = configService.get(variables.puerto);
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    handler: (req, res) => 
    res.status(401)
    .send({message: "Haz superado el numero de peticiones, porfavor espera 60 minutos para volver a intentar."})
  });

  app.setGlobalPrefix('api')

  app.use(helmet({
    referrerPolicy: {policy: 'same-origin'}
  }));

  app.use('/api/private/auth/login', limiter);
  app.use(compression({level: 9}));
  app.use(bodyParser.urlencoded({ extended: true}));

  await app.listen(port);
}
bootstrap();
