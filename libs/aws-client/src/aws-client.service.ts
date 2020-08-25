import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as slug from 'slug';
import { variables } from 'src/config';
import { FileDTO, ImageDTO } from 'src/private/images/images.interface';

@Injectable()
export class AwsClientService {
  constructor(private configService: ConfigService, ) {}

  private s3: AWS.S3 = new AWS.S3({
    accessKeyId: this.configService.get(variables.s3_id),
    secretAccessKey: this.configService.get(variables.s3_pass)
  })

  //subir imagenes
  public async uploadImage(fileBuffer: Buffer, novela:string, titulo: string, tipo:string, type: string ): Promise<ImageDTO> {
    //crear objeto para subira amazon
    const s3imagen: FileDTO = {
      Bucket: this.configService.get(variables.s3_bucket),
      ACL: "public-read",
      Key: 'Novelas/' + slug(titulo), // File name you want to save as in S3
      Body: fileBuffer,
      ContentType: type
    };
    //retornar funcion que ejecuta la subida
    return await this.s3.upload(s3imagen).promise().then((imagen) => {
      const newImage:ImageDTO = {
        titulo,
        contentType: type,
        tipo,
        novela,
        key: imagen.Key,
        url: imagen.Location
      }
      return newImage;
    }).catch((err) => {
      return err
    });
  };
  //borrar imagenes
  public async deleteImage(key: string): Promise<any> {
    AWS.config.update({
      accessKeyId: this.configService.get(variables.s3_id), 
      secretAccessKey: this.configService.get(variables.s3_pass)
    })
  
    return await this.s3.deleteObject({
      Bucket: this.configService.get(variables.s3_bucket), 
      Key: key
    }).promise()
  }
}
