import {
  Controller, Inject, HttpStatus,
  Res, Body, Headers, Query,
  Get, Post, Patch, Delete,
  CacheInterceptor, UseInterceptors, 
  UseGuards, CACHE_MANAGER, CacheKey
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { ExtrasService } from './extras.service';
import { ExtraDTO, ExtraUpdateDTO } from './extras.interface';
import { cacheKey } from 'src/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('private/extras')
export class ExtrasController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager:any,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly extrasService: ExtrasService
  ) {}
  
  @UseInterceptors(CacheInterceptor)
  @CacheKey(cacheKey.todoExtras)
  @Get('/all')
  private async getExtras():Promise<any> {
    return await this.extrasService.getExtras().then((data) => {
      return ({data, status: 'success', message: 'Extras cargados correctamente.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getExtras'
      });
      return ({data: [], status: 'success', message: error.message});
    });    
  }

  @Get()
  private async getExtra(
    @Res() res:Response,
    @Query('tipo') tipo: string
  ): Promise<Response> {
    return await this.extrasService.getExtra(Number(tipo)).then(data => 
        res.status(HttpStatus.OK).send({status: 'success', data, message: 'Busqueda correcta'})
      ).catch(error => {
        this.logger.error({
          message: error.message,
          service: 'listarExtra'
        })
        return res.send({status: 'error', message: error.message})
      })
  };

  @Post()
  private async createExtras(@Res() res: Response, @Body() createExtraDTO:ExtraDTO): Promise<Response> {
    return await this.extrasService.createExtra(createExtraDTO).then(() => this.cacheManager.del(cacheKey.todoExtras)
    ).then(() => {
      return res.status(HttpStatus.OK).json({status: 'success', message: 'Creación correcta.'});
    }).catch(error => {
      this.logger.error({
        message: error.message,
        service: 'createExtras'
      });
      return res.json({status: 'error', message: error.message})
    })
  };

  @Patch()
  private async updateExtra(
    @Res() res: Response, 
    @Headers('metodo') metodo: string,
    @Body('data') updateExtraDTO: ExtraUpdateDTO,
    @Body('id') extraId: string,
  ): Promise<Response> {
    if (metodo === 'actualizarExtra') {
      return await this.extrasService.updateExtra(extraId, updateExtraDTO)
        .then(() => this.cacheManager.del(cacheKey.todoExtras))
        .then(() => {
        return res.json({status: 'success', message: 'Objeto actualizado.'});
      }).catch(error => {
        this.logger.error({
          message: error.message,
          service: 'updateExtra'
        });
        return res.json({status: 'error', message: error.message});
      });
    } else {
      return res.json({status: 'error', message: 'Metodo incorrecto'})
    }
  };

  @Delete()
  private async deleteExtra (
    @Res() res: Response,
    @Headers('metodo') metodo: string,
    @Query('id') extraId: string,
  ): Promise<Response> {
    if (metodo === 'borrarExtra') {
      return await this.extrasService.deleteExtra(extraId)
        .then(data => {
          this.cacheManager.del(cacheKey.todoExtras)
          return res.status(HttpStatus.OK).json({
            status: 'success',
            message: `Objeto borrado correctamente (${data.nombre})`
          })
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'deleteExtra'
          })
          return res.send({status: 'error', message: error.message})
        })
    } else {
      return res.json({status: 'error', message: 'Metodo incorrecto'})
    }
  }

}
