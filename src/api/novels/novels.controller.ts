import {
  Controller, Inject, HttpStatus,
  Res, Req, Body, Headers, 
  Get, Post, Patch, Delete,
  Query, UseGuards, Param
} from '@nestjs/common';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { NovelsService } from './novels.service';
import { CreateNovelDTO, UpdateNovelDTO } from './novels.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('private/novels')
export class NovelsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly novelsService: NovelsService
  ) {}
  //obtener todas las novelas
  @Get()
  private async getNovels(@Query() params:any, @Res() res: Response):Promise<any> {
    const page = parseInt(params.page,10) || 1;
    const limit = parseInt(params.limit,10) || 30;
    
    return await this.novelsService.getNovels(page, limit).then((data) => {
      return res.json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getNovels'
      });
      return res.json({data: null, status: 'success', message: error.message});
    });    
  };
  //obtener los datos de la novela
  @Get('/:id')
  private async getNovel(@Param('id') novelaId:string, @Res() res: Response):Promise<any> {
    if(!novelaId) return res.send({data: null, status: 'error', message: 'No se pude obtener la novela.'})

    return await this.novelsService.getNovel(novelaId).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getNovel'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  };  
  //crear la novela
  @Post()
  private async createNovel(
    @Res() res: Response, 
    @Req() req: Request,
    @Body() createNovelDTO:CreateNovelDTO,
  ): Promise<Response> {
    const admin:any = req.user;
    if (!createNovelDTO.titulo) return res.status(HttpStatus.BAD_REQUEST).json({status: 'error', message: 'Se necesita el titulo.'})
    return await this.novelsService.createNovel(createNovelDTO, admin.id).then(() => {
      return res.status(HttpStatus.OK).json({status: 'success', message: 'Novela creada correctamente.'});
    }).catch(error => {
      this.logger.error({
        message: error.message,
        service: 'createNovel'
      });
      return res.json({status: 'error', message: error.message})
    })
  };
  //actualizar novela
  @Patch()
  private async updateNovel(
    @Res() res: Response, 
    @Req() req: Request,
    @Headers('metodo') metodo: string,
    @Body() updateNovelDTO: UpdateNovelDTO,
    @Query('id') novelId: string,
    @Query('chapter') chapter: string,
    @Query('image') image: string,//url
    @Query('extencion') extencion: string,
    @Query('tipo') tipo: string,
  ): Promise<Response> {
    try {
      const admin:any = req.user;
      if (metodo === 'actualizarNovela') {//metodo que actualiza toda la novela, luego regresa al menu principal
        if(!novelId) return res.send({status: 'error', message: 'No se encontró el id de la novela.'});
        return await this.novelsService.updateNovel(novelId, updateNovelDTO, admin.id)
          .then(() => {
            return res.json({status: 'success', message: 'Capitulo en emisión actualizado.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateNovel(actualizarNovela)'
          });
          return res.json({status: 'error', message: error.message});
        });
      } else if (metodo === 'actualizarCapituloEmision'){//metodo que actualiza el capitulo en emisión, regresa la novela
        if(!chapter) return res.send({status: 'error', message: 'No se encontró el id del capitulo.'})
        return await this.novelsService.updateChapterNovel(novelId, chapter, admin.id).then(data => {
          return res.json({data, status: 'success', message: 'Capitulo en emisión agregado correctamente.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateNovel(actualizarCapituloEmision)'
          });
          return res.json({data: null, status: 'error', message: error.message});
        });
      } else if (metodo === 'actualizarImagenes') {//metodo que actualiza las imagenes
        if(!image) return res.send({status: 'error', message: 'No se encontró el id de la imagen.'})

        return await this.novelsService.updateImagesNovel(novelId, image, extencion, tipo, admin.id).then(data => {
          return res.json({data, status: 'success', message: 'Imagenes actualizadas.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateNovel(actualizarImagenes)'
          });
          return res.json({data: null, status: 'error', message: error.message});
        });
      } else if (metodo === 'activarNovela') {//activar novela en caso de haberla desactivado
        return await this.novelsService.updateActiveNovel(novelId).then(data => {
          return res.json({data, status: 'success', message: 'Novela activada correctamente.'})
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateNovel(activarNovela)'
          });
          return res.json({data: null, status: 'error', message: error.message});
        });
      } else {
        return res.json({status: 'error', message: 'Metodo incorrecto'})
      }
    } catch (error) {
      this.logger.error({
        message: error.message,
        service: 'updateNovel(try/catch)'
      });
      return res.json({status: 'error', message: error.message});
    }
  };
  //borrar novela
  @Delete()
  private async deleteNovel (
    @Res() res: Response,
    @Req() req: Request,
    @Headers('metodo') metodo: string,
    @Query('id') novelId: string,
  ): Promise<Response> {
    try {
      if(!novelId) return res.send({status: 'error', message: 'No se encontró la novela.'})
      const admin:any = req.user;
      if (metodo === 'borrarNovela') {
        return await this.novelsService.deleteNovel(novelId).then(data => {
          this.logger.info(`Novela eliminada por ${admin.username}`);
          return res.status(HttpStatus.OK).json({
            status: 'success',
            message: `Objeto borrado correctamente (${data.titulo})`
          })
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'borrarNovela'
          })
          return res.send({status: 'error', message: error.message})
        })
      } else {
        return res.json({status: 'error', message: 'Metodo incorrecto'})
      }
    } catch (error) {
      this.logger.error({
        message: error.message,
        service: 'borrarNovela(try/catch)'
      })
      return res.json({status: 'error', message: error})
    }
  };
};
