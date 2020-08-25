import {
  Controller, Inject, HttpStatus,
  Res, Body, Headers, Param, 
  Get, Post, Patch, Delete,
  UseGuards, Req, Query,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { ChaptersService } from './chapters.service';
import { CreateChapterDTO, UpdateChapterDTO } from './chapters.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('private/chapters')
export class ChaptersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly chaptersService: ChaptersService
  ) {}
  //obtener todos los capitulos de la base de datos
  @Get('/')
  private async getChapters(@Query() params:any, @Res() res: Response):Promise<any> {
    const page = parseInt(params.page,10) || 1;
    const limit = parseInt(params.limit,10) || 30;

    return await this.chaptersService.getChapters(page, limit).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getCapitulos'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  };
  //obtener los capitulos de la novela
  @Get('/novel')
  private async getChapterNovel(@Query() params:any, @Res() res: Response):Promise<any> {
    const page = parseInt(params.page,10) || 1;
    const limit = parseInt(params.limit,10) || 30;
    const novelaId = params.novela;

    if(!novelaId) return res.send({data:[], status: 'error', message: 'No se pude obtener la novela.'})

    return await this.chaptersService.getChaptersForNovel(novelaId, page, limit).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getChapterNovel'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: [], status: 'success', message: error.message});
    });    
  };
  //obtener los capitulos de la novela en lista
  @Get('/list')
  private async getChapterNovelList(@Query('id') novelaId:string, @Res() res: Response):Promise<any> {
    if(!novelaId) return res.send({data:[], status: 'error', message: 'No se pude obtener la novela.'})

    return await this.chaptersService.getChaptersListForNovel(novelaId).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Lista carpitulos cargados con exito.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getChapterNovel'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: [], status: 'success', message: error.message});
    });    
  };
  //obtener los datos del capitulo
  @Get('/chapter/:id')
  private async getChapter(@Param('id') capituloId:string, @Res() res: Response):Promise<any> {
    if(!capituloId) return res.send({data: null, status: 'error', message: 'No se pude obtener el capitulo.'})

    return await this.chaptersService.getChapter(capituloId).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getChapter'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  };
  //guardar nuevo Capitulo
  @Post()
  private async createChapter(
    @Res() res: Response, 
    @Req() req: Request,
    @Body() createChapterDTO:CreateChapterDTO
  ): Promise<Response> {
    const admin:any = req.user;
    return await this.chaptersService.createChapter(createChapterDTO, admin.id).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Capitulo creado correctamente.'});
    }).catch(error => {
      this.logger.error({
        message: error.message,
        service: 'createChapter'
      });
      return res.json({status: 'error', message: error.message})
    })
  };
  //actualizar capitulo
  @Patch()
  private async updateChapter(
    @Res() res: Response, 
    @Req() req: Request,
    @Headers('metodo') metodo: string,
    @Body('data') updateChapterDTO: UpdateChapterDTO,
    @Body('id') chapterId: string,
  ): Promise<Response> {
    try {
      const admin:any = req.user;
      if (metodo === 'actualizarCapitulo') {
        return await this.chaptersService.updateChapter(chapterId, updateChapterDTO, admin.id).then((data) => {
          return res.json({data, status: 'success', message: 'Capitulo actualizado.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateChapter'
          });
          return res.json({status: 'error', message: error.message});
        });
      } else {
        return res.json({status: 'error', message: 'Metodo incorrecto'})
      }
    } catch (error) {
      this.logger.error({
        message: error.message,
        service: 'updateChapter(try/catch)'
      });
      return res.json({status: 'error', message: error.message});
    }
  };
  //borrar capitulo
  @Delete()
  private async deleteChapter (
    @Res() res: Response,
    @Headers('metodo') metodo: string,
    @Query('id') chapterId: string,
  ): Promise<Response> {
    try {
      if (metodo === 'borrarCapitulo') {
        return await this.chaptersService.deleteChapter(chapterId).then(data => {
            return res.status(HttpStatus.OK).json({
              status: 'success',
              message: `Objeto borrado correctamente (Capitulo ${data.numero})`
            })
          }).catch(error => {
            this.logger.error({
              message: error.message,
              service: 'borrarCapitulo'
            })
            return res.send({status: 'error', message: error.message})
          })
      } else {
        return res.json({status: 'error', message: 'Metodo incorrecto'})
      }
    } catch (error) {
      this.logger.error({
        message: error.message,
        service: 'borrarCapitulo(try/catch)'
      })
      return res.json({status: 'error', message: error})
    }
  }
}
