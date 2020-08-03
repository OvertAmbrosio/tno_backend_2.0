import {
  Controller, Inject, HttpStatus,
  Res, Body, Headers, Param, 
  Get, Post, Patch, Delete,
  CacheInterceptor, UseInterceptors, UseGuards, CACHE_MANAGER, CacheKey
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { NovelsService } from './novels.service';
import { CreateNovelDTO, UpdateNovelDTO } from './novels.dto';
import { cacheKey } from 'src/config';
// import { AuthGuard } from '@nestjs/passport';


// @UseGuards(AuthGuard('jwt'))
@Controller('private/novels')
export class NovelsController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager:any,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly novelsService: NovelsService
  ) {}
  //obtener todas las novelas
  @UseInterceptors(CacheInterceptor)
  @CacheKey(cacheKey.todoNovels)
  @Get()
  private async getNovels(@Param() params:any):Promise<any> {
    const page = parseInt(params.page,10) || 1;
    const limit = parseInt(params.limit,10) || 30;

    return await this.novelsService.getNovels(page, limit).then((data) => {
      return ({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getNovels'
      });
      return ({data: null, status: 'success', message: error.message});
    });    
  };
  //obtener los datos de la novela
  @Get(':id')
  private async getNovel(@Param() params:any, @Res() res: Response):Promise<any> {
    const novelaId = params.novela;

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
  private async createNovel(@Res() res: Response, @Body() createNovelDTO:CreateNovelDTO): Promise<Response> {
    return await this.novelsService.createNovel(createNovelDTO, 'adminid').then(() => this.cacheManager.del(cacheKey.todoNovels)
    ).then(() => {
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
    @Headers('metodo') metodo: string,
    @Body('data') updateNovelDTO: UpdateNovelDTO,
    @Param('id') novelId: string,
    @Param('chapter') chapter: string,
    @Param('image') image: string,
    @Param('extencion') extencion: string,
    @Param('tipo') tipo: string,
  ): Promise<Response> {
    try {
      if (metodo === 'actualizarNovela') {//metodo que actualiza toda la novela, luego regresa al menu principal
        if(!novelId) return res.send({status: 'error', message: 'No se encontró el id de la novela.'});

        return await this.novelsService.updateNovel(novelId, updateNovelDTO, 'adminid')
          .then(() => this.cacheManager.del(cacheKey.todoNovels))
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
        return await this.novelsService.updateChapterNovel(novelId, chapter, 'admin').then(data => {
          return res.json({data, status: 'success', message: 'Novela actualizada.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateNovel(actualizarCapituloEmision)'
          });
          return res.json({data: null, status: 'error', message: error.message});
        });
      } else if (metodo === 'actualizarImagenes') {
        if(!image) return res.send({status: 'error', message: 'No se encontró el id de la imagen.'})

        return await this.novelsService.updateImagesNovel(novelId, image, extencion,tipo,'admin').then(data => {
          return res.json({data, status: 'success', message: 'Imagenes actualizadas.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'updateNovel(actualizarImagenes)'
          });
          return res.json({data: null, status: 'error', message: error.message});
        });
      } else if (metodo === 'activarNovela') {
        return await this.novelsService.updateActiveNovel(novelId).then(data => {
          return res.json({data, status: 'success', message: 'Novela actualizada correctamente.'})
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
    @Headers('metodo') metodo: string,
    @Param('id') novelId: string,
  ): Promise<Response> {
    try {
      if (metodo === 'borrarNovela') {
        return await this.novelsService.deleteNovel(novelId).then((data) => {
          this.cacheManager.del(cacheKey.todoNovels);
          return data
        }).then(data => {
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
