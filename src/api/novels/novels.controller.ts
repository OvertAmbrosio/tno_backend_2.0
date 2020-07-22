import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { NovelsService } from './novels.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('novels')
export class NovelsController {
  constructor(private readonly novelService: NovelsService) {}

  @Get('/')
  private async getNovels(@Res() res:any) {
    const novels = this.novelService.getNovels();
    return res.status(HttpStatus.OK).json(novels)
  }
}
