import { Controller, Inject, Get, Res, HttpStatus, UseGuards, Post, Body } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { NovelsService } from './novels.service';
import { CreateNovelDTO } from './novels.dto';
import { Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';


// @UseGuards(AuthGuard('jwt'))
@Controller('novels')
export class NovelsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly novelsService: NovelsService
  ) {}

  @Get('/')
  private async getNovels(@Res() res:any) {
    const novels = await this.novelsService.getNovels();
    // this.logger.info({message: 'hola'});
    return res.status(HttpStatus.OK).json(novels)
  };

  @Post('/create')
  private async createNovel(@Res() res: Response, @Body() createNovelDTO:CreateNovelDTO) {
    const novel = await this.novelsService.createNovel(createNovelDTO);

    return res.status(HttpStatus.OK).json({
      message: 'recibido',
      novel
    });
  }
}
