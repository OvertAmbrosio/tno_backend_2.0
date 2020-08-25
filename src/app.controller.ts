import { Controller, Get } from '@nestjs/common';
import memoryCache from './config/memoryCache';

@Controller()
export class AppController {

  @Get('/private/liberarUsuarios')
  private async getURL() {
    await memoryCache.reset();
    return 'Se han eliminado las sesiones.'
  }

}
