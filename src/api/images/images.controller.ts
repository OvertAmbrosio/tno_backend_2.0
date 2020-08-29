import { 
  Controller, Inject, HttpStatus,
  Res, Body, Headers, Param, 
  Get, Post, Delete, UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Req, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { AwsClientService } from '@app/aws-client';
import { ImagesService } from './images.service';
import { ImageDTO } from './images.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('private/images')
export class ImagesController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly imagesService: ImagesService,
    private readonly awsService: AwsClientService
  ) {}

  //obtener todas las imagenes de la base de datos
  @Get('/')
  private async getImages(@Query() params:any, @Res() res: Response):Promise<any> {
    const page = parseInt(params.page,10) || 1;
    const limit = parseInt(params.limit,10) || 30;

    return await this.imagesService.getImages(page, limit).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getImages'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  };
  //obtener las imagenes de la novela
  @Get('/novel')
  private async getImageNovel(@Query() params:any, @Res() res: Response):Promise<any> {
    const page = parseInt(params.page,10) || 1;
    const limit = parseInt(params.limit,10) || 30;
    const novelaId = params.novela;

    if(!novelaId) return res.send({data:[], status: 'error', message: 'No se pude obtener la novela.'})

    return await this.imagesService.getImagesForNovel(novelaId, page, limit).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getImageNovel'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  };
  //obtener la lista compacta para escoger la imagen de portada y miniatura
  @Get('/list')
  private async getImagesList(@Query('novela') idNovela:string, @Res() res: Response): Promise<Response> {
    if(!idNovela) return res.send({data:[], status: 'error', message: 'No se pude obtener la novela.'})
    
    return await this.imagesService.getImagesList(idNovela).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Lista de imagenes correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getImagesList'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  }
  //obtener los datos de la imagen
  @Get('/image/:id')
  private async getImage(@Param('id') imageId:any, @Res() res: Response):Promise<any> {
    if(!imageId) return res.send({data: null, status: 'error', message: 'No se pude obtener la imagen.'})

    return await this.imagesService.getImage(imageId).then((data) => {
      return res.status(HttpStatus.OK).json({data, status: 'success', message: 'Busqueda correcta.'});
    }).catch((error) => {
      this.logger.error({
        message: error.message,
        service: 'getChapter'
      });
      return res.status(HttpStatus.BAD_REQUEST).json({data: null, status: 'success', message: error.message});
    });    
  };
  // guardar nueva Imagen
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  private async createImage(
    @Req() req: Request, 
    @Res() res: Response, 
    @UploadedFile() file:any, 
    @Body() imageDTO:ImageDTO
  ): Promise<Response> {
    const admin:any = req.user;
    if(!file) return res.send({status: 'error', message: 'No se encontró una imagen para subir.'})
    try {
      return await this.awsService.uploadImage(file.buffer, imageDTO.novela, imageDTO.titulo, imageDTO.tipo, file.mimetype).then(async(imagenSubida) => {
        return await this.imagesService.createImage(imagenSubida, admin.id).then(() => {
          return res.status(HttpStatus.OK).json({status: 'success', message: 'Imagen creada correctamente.'});
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'createImage(service)'
          });
          return res.json({status: 'error', message: error.message})
        })
      }).catch(error => {
        this.logger.error({
          message: error.message,
          service: 'createImage(uploadImage)'
        });
        return res.json({status: 'error', message: error.message})
      }); 
    } catch (error) {
      this.logger.error({
        message: error.message,
        service: 'createImage(try/catch)'
      });
      return res.json({status: 'error', message: error})
    }
  };
  //borrar imagen
  @Delete()
  private async deleteImage (
    @Res() res: Response,
    @Headers('metodo') metodo: string,
    @Query('id') imageId: string,
    @Query('key') imageKey: string,
  ): Promise<Response> {
    if (metodo === 'borrarImagen') {
      try {
        return await this.awsService.deleteImage(imageKey).then(async() => {
          return await this.imagesService.deleteImage(imageId).then(data => {
              return res.status(HttpStatus.OK).json({
                status: 'success',
                message: `Objeto borrado correctamente (${data.titulo})`
              })
            }).catch(error => {
              this.logger.error({
                message: error.message,
                service: 'borrarImagen(mongoose)'
              })
              return res.send({status: 'error', message: error.message})
            })
        }).catch(error => {
          this.logger.error({
            message: error.message,
            service: 'borrarImagen(awsClient)'
          })
          return res.send({status: 'error', message: error.message})
        })
      } catch (error) {
        this.logger.error({
          message: error.message,
          service: 'borrarImagen(try/catch)'
        })
        return res.send({status: 'error', message: error})
      }
    } else {
      return res.json({status: 'error', message: 'Metodo incorrecto'})
    }
  }
}
